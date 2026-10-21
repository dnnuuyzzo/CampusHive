import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, Course, Question, ProjectPitch, StudyRoom, Answer } from '../types';
import { CURRENT_USER, COURSES, INITIAL_QUESTIONS, INITIAL_PROJECTS, STUDY_ROOMS, ALL_BADGES } from '../data/mockData';

interface AppContextType {
  currentUser: User;
  courses: Course[];
  questions: Question[];
  projects: ProjectPitch[];
  studyRooms: StudyRoom[];
  activeTab: 'qna' | 'ideas' | 'leaderboard' | 'study_rooms';
  setActiveTab: (tab: 'qna' | 'ideas' | 'leaderboard' | 'study_rooms') => void;
  selectedCourseId: string | 'all';
  setSelectedCourseId: (id: string | 'all') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  statusFilter: 'all' | 'unsolved' | 'solved';
  setStatusFilter: (f: 'all' | 'unsolved' | 'solved') => void;
  activeQuestion: Question | null;
  setActiveQuestion: (q: Question | null) => void;
  isAskModalOpen: boolean;
  setIsAskModalOpen: (open: boolean) => void;
  isPitchModalOpen: boolean;
  setIsPitchModalOpen: (open: boolean) => void;
  isProfileModalOpen: boolean;
  setIsProfileModalOpen: (open: boolean) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  
  // Actions
  togglePseudonymous: () => void;
  askQuestion: (data: { title: string; content: string; codeSnippet?: string; courseId: string; tags: string[] }) => void;
  submitAnswer: (questionId: string, content: string, codeSnippet?: string) => void;
  toggleQuestionVote: (questionId: string) => void;
  toggleAnswerVote: (questionId: string, answerId: string) => void;
  acceptAnswer: (questionId: string, answerId: string) => void;
  createProjectPitch: (pitch: { title: string; tagline: string; description: string; category: ProjectPitch['category']; openRoles: { role: string; count: number; filled: number }[] }) => void;
  applyToProject: (projectId: string, role: string, pitch: string) => void;
  toggleProjectLike: (projectId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem('campushive_user');
    return saved ? JSON.parse(saved) : CURRENT_USER;
  });

  const [questions, setQuestions] = useState<Question[]>(() => {
    const saved = localStorage.getItem('campushive_questions');
    return saved ? JSON.parse(saved) : INITIAL_QUESTIONS;
  });

  const [projects, setProjects] = useState<ProjectPitch[]>(() => {
    const saved = localStorage.getItem('campushive_projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [studyRooms] = useState<StudyRoom[]>(STUDY_ROOMS);
  const [courses] = useState<Course[]>(COURSES);

  const [activeTab, setActiveTab] = useState<'qna' | 'ideas' | 'leaderboard' | 'study_rooms'>('qna');
  const [selectedCourseId, setSelectedCourseId] = useState<string | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'unsolved' | 'solved'>('all');

  const [activeQuestion, setActiveQuestion] = useState<Question | null>(null);
  const [isAskModalOpen, setIsAskModalOpen] = useState(false);
  const [isPitchModalOpen, setIsPitchModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('campushive_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('campushive_questions', JSON.stringify(questions));
  }, [questions]);

  useEffect(() => {
    localStorage.setItem('campushive_projects', JSON.stringify(projects));
  }, [projects]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const togglePseudonymous = () => {
    setCurrentUser(prev => ({ ...prev, isPseudonymous: !prev.isPseudonymous }));
    showToast(`Pseudonymous Mode ${!currentUser.isPseudonymous ? 'Enabled (Identitas disamarkan)' : 'Disabled'}`);
  };

  const askQuestion = ({ title, content, codeSnippet, courseId, tags }: { title: string; content: string; codeSnippet?: string; courseId: string; tags: string[] }) => {
    const course = courses.find(c => c.id === courseId) || courses[0];
    
    const displayAuthor = currentUser.isPseudonymous
      ? {
          ...currentUser,
          name: `Anonymous Student #${currentUser.nim.slice(-3)}`,
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80',
        }
      : currentUser;

    const newQ: Question = {
      id: `q-${Date.now()}`,
      title,
      content,
      codeSnippet: codeSnippet?.trim() ? codeSnippet : undefined,
      courseId: course.id,
      courseCode: course.code,
      courseName: course.name,
      faculty: course.faculty,
      tags,
      author: displayAuthor,
      createdAt: 'Just now',
      upvotes: 0,
      hasUpvoted: false,
      answers: [],
      isSolved: false,
    };

    setQuestions(prev => [newQ, ...prev]);
    // Reward for asking question: +2 points
    setCurrentUser(prev => ({ ...prev, reputation: prev.reputation + 2 }));
    showToast('Question published successfully! (+2 Rep Points)');
    setIsAskModalOpen(false);
  };

  const submitAnswer = (questionId: string, content: string, codeSnippet?: string) => {
    const newAnswer: Answer = {
      id: `ans-${Date.now()}`,
      questionId,
      author: currentUser,
      content,
      codeSnippet: codeSnippet?.trim() ? codeSnippet : undefined,
      createdAt: 'Just now',
      upvotes: 0,
      hasUpvoted: false,
      isAccepted: false,
    };

    setQuestions(prev =>
      prev.map(q => {
        if (q.id === questionId) {
          const updated = { ...q, answers: [...q.answers, newAnswer] };
          if (activeQuestion?.id === questionId) {
            setActiveQuestion(updated);
          }
          return updated;
        }
        return q;
      })
    );

    // Reward for answering: +5 points
    setCurrentUser(prev => ({ ...prev, reputation: prev.reputation + 5 }));
    showToast('Answer posted! Thank you for helping your peer. (+5 Rep Points)');
  };

  const toggleQuestionVote = (questionId: string) => {
    setQuestions(prev =>
      prev.map(q => {
        if (q.id === questionId) {
          const upvoted = !q.hasUpvoted;
          const updated = {
            ...q,
            hasUpvoted: upvoted,
            upvotes: upvoted ? q.upvotes + 1 : q.upvotes - 1,
          };
          if (activeQuestion?.id === questionId) {
            setActiveQuestion(updated);
          }
          return updated;
        }
        return q;
      })
    );
  };

  const toggleAnswerVote = (questionId: string, answerId: string) => {
    setQuestions(prev =>
      prev.map(q => {
        if (q.id === questionId) {
          const updatedAnswers = q.answers.map(ans => {
            if (ans.id === answerId) {
              const upvoted = !ans.hasUpvoted;
              return {
                ...ans,
                hasUpvoted: upvoted,
                upvotes: upvoted ? ans.upvotes + 1 : ans.upvotes - 1,
              };
            }
            return ans;
          });
          const updatedQ = { ...q, answers: updatedAnswers };
          if (activeQuestion?.id === questionId) {
            setActiveQuestion(updatedQ);
          }
          return updatedQ;
        }
        return q;
      })
    );
  };

  const acceptAnswer = (questionId: string, answerId: string) => {
    setQuestions(prev =>
      prev.map(q => {
        if (q.id === questionId) {
          const updatedAnswers = q.answers.map(ans => ({
            ...ans,
            isAccepted: ans.id === answerId,
          }));
          const updatedQ = { ...q, isSolved: true, answers: updatedAnswers };
          if (activeQuestion?.id === questionId) {
            setActiveQuestion(updatedQ);
          }
          return updatedQ;
        }
        return q;
      })
    );

    showToast('Solution marked as Accepted! +25 Reputation awarded to contributor 🏆');
  };

  const createProjectPitch = (pitch: { title: string; tagline: string; description: string; category: ProjectPitch['category']; openRoles: { role: string; count: number; filled: number }[] }) => {
    const newPitch: ProjectPitch = {
      id: `proj-${Date.now()}`,
      title: pitch.title,
      tagline: pitch.tagline,
      description: pitch.description,
      category: pitch.category,
      author: currentUser,
      openRoles: pitch.openRoles,
      applicants: [],
      createdAt: 'Just now',
      likes: 1,
      hasLiked: true,
    };

    setProjects(prev => [newPitch, ...prev]);
    setCurrentUser(prev => {
      const hasCatalystBadge = prev.badges.some(b => b.id === 'b3');
      const badges = hasCatalystBadge ? prev.badges : [...prev.badges, ALL_BADGES[2]];
      return { ...prev, reputation: prev.reputation + 15, badges };
    });
    showToast('Project pitch published! (+15 Rep Points & Idea Catalyst Badge)');
    setIsPitchModalOpen(false);
  };

  const applyToProject = (projectId: string, role: string, pitch: string) => {
    setProjects(prev =>
      prev.map(p => {
        if (p.id === projectId) {
          const applicant = {
            id: `app-${Date.now()}`,
            user: currentUser,
            role,
            pitch,
            appliedAt: 'Just now',
          };
          return {
            ...p,
            applicants: [...p.applicants, applicant],
          };
        }
        return p;
      })
    );
    showToast(`Application sent to project lead for role: "${role}"! 🚀`);
  };

  const toggleProjectLike = (projectId: string) => {
    setProjects(prev =>
      prev.map(p => {
        if (p.id === projectId) {
          const liked = !p.hasLiked;
          return {
            ...p,
            hasLiked: liked,
            likes: liked ? p.likes + 1 : p.likes - 1,
          };
        }
        return p;
      })
    );
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        courses,
        questions,
        projects,
        studyRooms,
        activeTab,
        setActiveTab,
        selectedCourseId,
        setSelectedCourseId,
        searchQuery,
        setSearchQuery,
        statusFilter,
        setStatusFilter,
        activeQuestion,
        setActiveQuestion,
        isAskModalOpen,
        setIsAskModalOpen,
        isPitchModalOpen,
        setIsPitchModalOpen,
        isProfileModalOpen,
        setIsProfileModalOpen,
        toastMessage,
        showToast,
        togglePseudonymous,
        askQuestion,
        submitAnswer,
        toggleQuestionVote,
        toggleAnswerVote,
        acceptAnswer,
        createProjectPitch,
        applyToProject,
        toggleProjectLike,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};

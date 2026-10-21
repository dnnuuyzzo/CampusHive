export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'academic' | 'community' | 'project';
  earnedAt?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  university: string;
  nim: string;
  faculty: string;
  major: string;
  semester: number;
  reputation: number;
  badges: Badge[];
  avatar: string;
  isPseudonymous?: boolean;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  faculty: string;
  color: string;
}

export interface Answer {
  id: string;
  questionId: string;
  author: User;
  content: string;
  codeSnippet?: string;
  createdAt: string;
  upvotes: number;
  hasUpvoted?: boolean;
  isAccepted: boolean;
}

export interface Question {
  id: string;
  title: string;
  content: string;
  codeSnippet?: string;
  courseId: string;
  courseCode: string;
  courseName: string;
  faculty: string;
  tags: string[];
  author: User;
  createdAt: string;
  upvotes: number;
  hasUpvoted?: boolean;
  answers: Answer[];
  isSolved: boolean;
}

export interface ProjectRole {
  role: string;
  count: number;
  filled: number;
}

export interface ProjectApplicant {
  id: string;
  user: User;
  role: string;
  pitch: string;
  appliedAt: string;
}

export interface ProjectPitch {
  id: string;
  title: string;
  tagline: string;
  description: string;
  author: User;
  category: 'Tech / App' | 'Business & Startup' | 'Academic Competition' | 'Research';
  openRoles: ProjectRole[];
  applicants: ProjectApplicant[];
  createdAt: string;
  likes: number;
  hasLiked?: boolean;
}

export interface StudyRoom {
  id: string;
  title: string;
  courseCode: string;
  courseName: string;
  hostName: string;
  activeUsers: number;
  maxUsers: number;
  topic: string;
  startedAt: string;
}

import React from 'react';
import { useApp } from '../context/AppContext';
import { QuestionCard } from './QuestionCard';
import { HelpCircle, Plus } from 'lucide-react';

export const QuestionList: React.FC = () => {
  const {
    questions,
    selectedCourseId,
    courses,
    searchQuery,
    statusFilter,
    setIsAskModalOpen,
  } = useApp();

  const selectedCourse = courses.find((c) => c.id === selectedCourseId);

  const filteredQuestions = questions.filter((q) => {
    const matchesCourse = selectedCourseId === 'all' || q.courseId === selectedCourseId;
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'solved' && q.isSolved) ||
      (statusFilter === 'unsolved' && !q.isSolved);
    const matchesSearch =
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCourse && matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-3">
      
      {/* Sleek Minimal Header */}
      <div className="bg-white rounded-2xl px-4 py-3 border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-base font-extrabold text-slate-900 tracking-tight">
            {selectedCourse ? `${selectedCourse.code} · ${selectedCourse.name}` : 'All Questions'}
          </h1>
          <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-slate-100 text-slate-700">
            {filteredQuestions.length}
          </span>
        </div>

        <button
          onClick={() => setIsAskModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs transition-transform active:scale-95"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Ask</span>
        </button>
      </div>

      {/* Questions Feed */}
      {filteredQuestions.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 text-center border border-dashed border-slate-200 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center mx-auto">
            <HelpCircle className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-800">No questions found</h3>
          <button
            onClick={() => setIsAskModalOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold"
          >
            Ask a Question
          </button>
        </div>
      ) : (
        <div className="space-y-2.5">
          {filteredQuestions.map((q) => (
            <QuestionCard key={q.id} question={q} />
          ))}
        </div>
      )}

    </div>
  );
};

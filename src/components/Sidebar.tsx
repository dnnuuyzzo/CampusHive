import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  MessageSquareQuote, 
  Lightbulb, 
  Trophy, 
  Headphones, 
  BookOpen, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    courses,
    selectedCourseId,
    setSelectedCourseId,
    statusFilter,
    setStatusFilter,
    currentUser,
  } = useApp();

  const navItems = [
    { id: 'qna' as const, label: 'Q&A', icon: MessageSquareQuote, count: '3' },
    { id: 'ideas' as const, label: 'Projects', icon: Lightbulb, count: '2' },
    { id: 'leaderboard' as const, label: 'Rankings', icon: Trophy, count: 'Top 5' },
    { id: 'study_rooms' as const, label: 'Study Rooms', icon: Headphones, count: 'Live' },
  ];

  return (
    <aside className="w-56 shrink-0 hidden lg:block space-y-4">
      
      {/* Primary Navigation */}
      <div className="bg-white rounded-2xl p-2.5 border border-slate-200/80 shadow-xs">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </div>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                    isActive ? 'bg-amber-600/70 text-white' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {item.count}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Course Filter (Visible when on Q&A tab) */}
      {activeTab === 'qna' && (
        <div className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              Courses
            </h3>
            {selectedCourseId !== 'all' && (
              <button
                onClick={() => setSelectedCourseId('all')}
                className="text-[10px] text-amber-600 hover:text-amber-700 font-bold"
              >
                Reset
              </button>
            )}
          </div>

          <div className="space-y-0.5">
            <button
              onClick={() => setSelectedCourseId('all')}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                selectedCourseId === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              All Courses
            </button>

            {courses.map((course) => {
              const isSelected = selectedCourseId === course.id;
              return (
                <button
                  key={course.id}
                  onClick={() => setSelectedCourseId(course.id)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                    isSelected
                      ? 'bg-amber-50 text-amber-900 font-bold border border-amber-200'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-1.5 truncate">
                    <span className={`w-2 h-2 rounded-full ${course.color} shrink-0`} />
                    <span className="font-bold">{course.code}</span>
                  </div>
                  {isSelected && <ChevronRight className="w-3 h-3 text-amber-600 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Status Filter */}
          <div className="pt-2 border-t border-slate-100">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Status</div>
            <div className="grid grid-cols-3 gap-1 bg-slate-100 p-0.5 rounded-xl text-xs">
              <button
                onClick={() => setStatusFilter('all')}
                className={`py-1 rounded-lg font-bold text-[11px] transition-colors ${
                  statusFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setStatusFilter('unsolved')}
                className={`py-1 rounded-lg font-bold text-[11px] transition-colors ${
                  statusFilter === 'unsolved' ? 'bg-white text-amber-600 shadow-xs' : 'text-slate-500'
                }`}
              >
                Open
              </button>
              <button
                onClick={() => setStatusFilter('solved')}
                className={`py-1 rounded-lg font-bold text-[11px] transition-colors ${
                  statusFilter === 'solved' ? 'bg-white text-emerald-600 shadow-xs' : 'text-slate-500'
                }`}
              >
                Solved
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Verified Campus Minimal Card */}
      <div className="p-3 bg-slate-100/80 rounded-2xl border border-slate-200/60 flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-emerald-600 shadow-xs shrink-0">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <div className="text-xs font-bold text-slate-900 truncate">{currentUser.name}</div>
          <div className="text-[10px] text-slate-500 truncate">{currentUser.university}</div>
        </div>
      </div>

    </aside>
  );
};

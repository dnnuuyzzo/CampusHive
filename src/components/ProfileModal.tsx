import React from 'react';
import { useApp } from '../context/AppContext';
import { X, User, Zap, Award, ShieldCheck, ShieldAlert, RotateCcw } from 'lucide-react';

export const ProfileModal: React.FC = () => {
  const { 
    isProfileModalOpen, 
    setIsProfileModalOpen, 
    currentUser, 
    togglePseudonymous,
  } = useApp();

  if (!isProfileModalOpen) return null;

  const handleResetData = () => {
    localStorage.removeItem('campushive_user');
    localStorage.removeItem('campushive_questions');
    localStorage.removeItem('campushive_projects');
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div 
        className="bg-white w-full max-w-sm rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-amber-600" />
            <h3 className="font-extrabold text-sm text-slate-900">Profile</h3>
          </div>

          <button
            onClick={() => setIsProfileModalOpen(false)}
            className="p-1 rounded-full hover:bg-slate-200 text-slate-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Profile Content */}
        <div className="p-5 space-y-4">
          
          {/* Avatar & Main Info */}
          <div className="flex items-center gap-3">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-amber-400 shadow-sm"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h4 className="font-bold text-sm text-slate-900 truncate">{currentUser.name}</h4>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              </div>
              <span className="text-[11px] text-slate-400 block truncate">{currentUser.university}</span>
              <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded inline-block mt-0.5">
                {currentUser.major}
              </span>
            </div>
          </div>

          {/* Stats Box */}
          <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-bold">Reputation</div>
              <div className="text-base font-black text-slate-900 flex items-center justify-center gap-1 mt-0.5">
                <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>{currentUser.reputation}</span>
              </div>
            </div>

            <div>
              <div className="text-[10px] text-slate-400 uppercase font-bold">Badges</div>
              <div className="text-base font-black text-slate-900 flex items-center justify-center gap-1 mt-0.5">
                <Award className="w-3.5 h-3.5 text-amber-600" />
                <span>{currentUser.badges.length}</span>
              </div>
            </div>
          </div>

          {/* Badges List */}
          <div>
            <div className="flex flex-wrap gap-1.5">
              {currentUser.badges.map((b) => (
                <span key={b.id} className="px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 flex items-center gap-1">
                  <span>{b.icon}</span>
                  <span>{b.name}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Pseudonymous Mode Toggle */}
          <div className="p-3 bg-amber-50/60 border border-amber-200/80 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-700" />
              <div>
                <span className="text-xs font-bold text-amber-900">Anonymous Mode</span>
                <span className="text-[10px] text-amber-800/80 block">Hide real name on questions</span>
              </div>
            </div>
            <button
              onClick={togglePseudonymous}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                currentUser.isPseudonymous ? 'bg-amber-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                  currentUser.isPseudonymous ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Reset Button */}
          <button
            onClick={handleResetData}
            className="w-full flex items-center justify-center gap-1 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-500 hover:text-slate-800 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Demo Data</span>
          </button>

        </div>

      </div>
    </div>
  );
};

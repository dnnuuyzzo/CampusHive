import React from 'react';
import { useApp } from '../context/AppContext';
import { Search, Plus, Zap } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentUser,
    searchQuery,
    setSearchQuery,
    setIsAskModalOpen,
    setIsPitchModalOpen,
    setIsProfileModalOpen,
    activeTab,
  } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo - Pure Typography */}
        <div className="flex items-center cursor-pointer select-none">
          <span className="font-black text-2xl tracking-tight text-slate-900">
            Campus<span className="text-amber-500">Hive</span>
          </span>
        </div>

        {/* Global Search Bar */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-100 hover:bg-slate-100/90 focus:bg-white border border-transparent focus:border-amber-400 rounded-full focus:outline-hidden transition-all text-slate-800 placeholder-slate-400"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 hover:text-slate-600 bg-slate-200 rounded-full w-4 h-4 flex items-center justify-center"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Right Actions & User Pill */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Post Action Button */}
          {activeTab === 'ideas' ? (
            <button
              onClick={() => setIsPitchModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-full bg-slate-900 hover:bg-slate-800 text-white shadow-xs transition-transform active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Pitch</span>
            </button>
          ) : (
            <button
              onClick={() => setIsAskModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-full bg-amber-500 hover:bg-amber-600 text-white shadow-xs shadow-amber-500/20 transition-transform active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Ask</span>
            </button>
          )}

          {/* Reputation Badge Pill */}
          <button 
            onClick={() => setIsProfileModalOpen(true)}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-200/80 rounded-full transition-colors"
            title="Reputation"
          >
            <Zap className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
            <span className="text-xs font-extrabold text-amber-900">{currentUser.reputation}</span>
          </button>

          {/* User Profile Avatar */}
          <button
            onClick={() => setIsProfileModalOpen(true)}
            className="flex items-center p-0.5 rounded-full hover:ring-2 hover:ring-amber-400 transition-all"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          </button>

        </div>
      </div>

      {/* Mobile Search Input */}
      <div className="px-4 pb-2.5 md:hidden">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-100 rounded-full border border-slate-200 focus:outline-hidden focus:border-amber-400"
          />
        </div>
      </div>
    </header>
  );
};

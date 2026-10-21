import React from 'react';
import { useApp } from '../context/AppContext';
import { MessageSquareQuote, Lightbulb, Trophy, Headphones } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();

  const items = [
    { id: 'qna' as const, label: 'Q&A', icon: MessageSquareQuote },
    { id: 'ideas' as const, label: 'Projects', icon: Lightbulb },
    { id: 'leaderboard' as const, label: 'Rankings', icon: Trophy },
    { id: 'study_rooms' as const, label: 'Study Rooms', icon: Headphones },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2 flex items-center justify-around shadow-lg">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
              isActive ? 'text-amber-600 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
            <span className="text-[10px] leading-none">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

import React from 'react';
import { useApp } from '../context/AppContext';
import { LEADERBOARD_USERS, ALL_BADGES } from '../data/mockData';
import { Zap, Award } from 'lucide-react';

export const LeaderboardView: React.FC = () => {
  const { currentUser } = useApp();

  return (
    <div className="space-y-4">
      
      {/* Sleek Minimal Header */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-base font-extrabold text-slate-900">Leaderboard</h1>
          <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-amber-100 text-amber-900">
            Top Mentors
          </span>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {LEADERBOARD_USERS.slice(0, 3).map((entry, idx) => {
          const podiumOrder = idx === 0 ? 'order-1 md:order-2 md:-translate-y-1' : idx === 1 ? 'order-2 md:order-1' : 'order-3';
          const medalBg = idx === 0 ? 'bg-amber-100 text-amber-800 border-amber-300' : idx === 1 ? 'bg-slate-100 text-slate-700 border-slate-300' : 'bg-amber-50 text-amber-900 border-amber-200';
          const medalIcon = idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉';

          return (
            <div
              key={entry.user.id}
              className={`bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col items-center text-center relative ${podiumOrder}`}
            >
              <div className={`w-7 h-7 rounded-full border flex items-center justify-center text-xs font-bold absolute top-3 left-3 ${medalBg}`}>
                {medalIcon}
              </div>

              <div className="relative mt-1">
                <img
                  src={entry.user.avatar}
                  alt={entry.user.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
                />
              </div>

              <h3 className="font-extrabold text-sm text-slate-900 mt-2">{entry.user.name}</h3>
              <span className="text-xs font-bold text-amber-600">{entry.title}</span>

              <div className="mt-3 w-full pt-3 border-t border-slate-100 flex items-center justify-around text-xs">
                <div>
                  <div className="font-black text-slate-900 flex items-center justify-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    {entry.points}
                  </div>
                  <span className="text-[10px] text-slate-400 font-semibold">Rep</span>
                </div>
                <div className="w-px h-6 bg-slate-100" />
                <div>
                  <div className="font-black text-slate-900">{entry.answersCount}</div>
                  <span className="text-[10px] text-slate-400 font-semibold">Solutions</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Leaderboard Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs space-y-2">
        <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
          Rankings
        </h3>

        <div className="divide-y divide-slate-100">
          {LEADERBOARD_USERS.map((entry) => (
            <div
              key={entry.user.id}
              className={`py-2.5 px-3 rounded-xl flex items-center justify-between transition-colors ${
                entry.user.id === currentUser.id ? 'bg-amber-50/80 border border-amber-200' : 'hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                  entry.rank === 1 ? 'bg-amber-400 text-slate-900' : entry.rank === 2 ? 'bg-slate-300 text-slate-800' : entry.rank === 3 ? 'bg-amber-700 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {entry.rank}
                </span>

                <img
                  src={entry.user.avatar}
                  alt={entry.user.name}
                  className="w-8 h-8 rounded-full object-cover"
                />

                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs text-slate-900">{entry.user.name}</span>
                    {entry.user.id === currentUser.id && (
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-200 text-amber-900">
                        You
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400">{entry.user.faculty}</span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs font-extrabold text-slate-900">
                <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>{entry.points}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Badges Showcase */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs space-y-3">
        <div className="flex items-center gap-1.5">
          <Award className="w-4 h-4 text-amber-600" />
          <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
            Badges
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {ALL_BADGES.map((b) => (
            <div key={b.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center text-center">
              <span className="text-xl mb-1">{b.icon}</span>
              <span className="text-xs font-bold text-slate-900">{b.name}</span>
              <span className="text-[10px] text-slate-400 mt-0.5">{b.description}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

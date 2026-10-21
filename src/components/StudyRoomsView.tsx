import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Headphones, Send, X } from 'lucide-react';
import type { StudyRoom } from '../types';

export const StudyRoomsView: React.FC = () => {
  const { studyRooms, currentUser } = useApp();
  const [activeRoom, setActiveRoom] = useState<StudyRoom | null>(null);
  const [roomChat, setRoomChat] = useState<{ sender: string; text: string; time: string }[]>([
    { sender: 'Amanda Kusuma', text: 'Working through Q4 of the 2025 exam paper right now.', time: '2m ago' },
    { sender: 'Rian Firdaus', text: 'Got it, is this the one with Red-Black Tree rotation?', time: '1m ago' },
  ]);
  const [chatInput, setChatInput] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setRoomChat([...roomChat, { sender: currentUser.name, text: chatInput, time: 'Just now' }]);
    setChatInput('');
  };

  return (
    <div className="space-y-4">
      
      {/* Sleek Minimal Header */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-base font-extrabold text-slate-900">Study Rooms</h1>
          <span className="flex items-center gap-1.5 text-xs px-2.5 py-0.5 rounded-full font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            3 Live
          </span>
        </div>
      </div>

      {/* Study Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {studyRooms.map((room) => (
          <div
            key={room.id}
            className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {room.courseCode}
                </span>

                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>{room.activeUsers} online</span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-extrabold text-slate-900 leading-snug">{room.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{room.topic}</p>
              </div>
            </div>

            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] text-slate-400">Host: {room.hostName.split(' ')[0]}</span>
              <button
                onClick={() => setActiveRoom(room)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition-transform active:scale-95"
              >
                <Headphones className="w-3.5 h-3.5 text-emerald-400" />
                <span>Join</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Room Session Modal */}
      {activeRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
            
            <div className="px-5 py-3.5 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <div>
                  <h3 className="font-bold text-sm">{activeRoom.title}</h3>
                  <span className="text-[10px] text-slate-400">{activeRoom.courseCode} · Host: {activeRoom.hostName}</span>
                </div>
              </div>
              <button
                onClick={() => setActiveRoom(null)}
                className="p-1 rounded-full hover:bg-slate-800 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Room Active Members Header */}
            <div className="p-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 text-[11px] font-semibold">{activeRoom.activeUsers} studying now</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">Mic Muted</span>
            </div>

            {/* Chat Log */}
            <div className="p-4 overflow-y-auto flex-1 space-y-3 min-h-[220px] max-h-[320px]">
              {roomChat.map((msg, i) => (
                <div key={i} className="text-xs">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="font-bold text-slate-800">{msg.sender}</span>
                    <span className="text-[10px] text-slate-400">{msg.time}</span>
                  </div>
                  <div className="p-2.5 bg-slate-100 rounded-xl text-slate-700 max-w-[85%]">
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-100 flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask room or discuss..."
                className="flex-1 px-3 py-1.5 text-xs bg-slate-100 rounded-xl border border-transparent focus:bg-white focus:border-amber-400 focus:outline-hidden"
              />
              <button
                type="submit"
                className="px-3.5 py-1.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};

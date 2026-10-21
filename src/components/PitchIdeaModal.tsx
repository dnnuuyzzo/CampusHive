import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Lightbulb, Plus, Trash2, Send } from 'lucide-react';
import type { ProjectPitch } from '../types';

export const PitchIdeaModal: React.FC = () => {
  const { isPitchModalOpen, setIsPitchModalOpen, createProjectPitch } = useApp();

  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ProjectPitch['category']>('Tech / App');
  const [roles, setRoles] = useState<{ role: string; count: number; filled: number }[]>([
    { role: 'UI/UX Designer', count: 1, filled: 0 },
    { role: 'Frontend Developer', count: 1, filled: 0 },
  ]);
  const [newRoleName, setNewRoleName] = useState('');

  if (!isPitchModalOpen) return null;

  const handleAddRole = () => {
    if (!newRoleName.trim()) return;
    setRoles([...roles, { role: newRoleName.trim(), count: 1, filled: 0 }]);
    setNewRoleName('');
  };

  const handleRemoveRole = (index: number) => {
    setRoles(roles.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !tagline.trim() || !description.trim()) return;

    createProjectPitch({
      title,
      tagline,
      description,
      category,
      openRoles: roles,
    });

    setTitle('');
    setTagline('');
    setDescription('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-slate-900 text-amber-400 flex items-center justify-center font-bold">
              <Lightbulb className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-extrabold text-slate-900">Pitch Idea</h2>
          </div>

          <button
            onClick={() => setIsPitchModalOpen(false)}
            className="p-1 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3.5">
          
          {/* Category */}
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {(['Tech / App', 'Business & Startup', 'Academic Competition', 'Research'] as const).map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg border text-center transition-all ${
                    category === cat
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cat.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Project Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. EcoFood Campus"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 text-xs focus:outline-hidden focus:border-slate-900"
              required
            />
          </div>

          {/* Tagline */}
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              1-Line Hook
            </label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="e.g. Real-time surplus food discounts for students"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 text-xs focus:outline-hidden focus:border-slate-900"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief summary of your concept..."
              rows={3}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 text-xs focus:outline-hidden focus:border-slate-900"
              required
            />
          </div>

          {/* Roles to recruit */}
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Roles Needed
            </label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {roles.map((r, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold"
                >
                  {r.role}
                  <button
                    type="button"
                    onClick={() => handleRemoveRole(idx)}
                    className="hover:text-red-600 ml-1 text-slate-400"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newRoleName}
                onChange={(e) => setNewRoleName(e.target.value)}
                placeholder="e.g. Flutter Dev, Marketing..."
                className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
              />
              <button
                type="button"
                onClick={handleAddRole}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-bold text-slate-700 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsPitchModalOpen(false)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim() || !tagline.trim() || !description.trim()}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-bold text-xs"
            >
              <Send className="w-3.5 h-3.5 text-amber-400" />
              <span>Publish</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

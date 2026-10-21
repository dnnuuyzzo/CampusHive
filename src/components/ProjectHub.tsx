import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Heart, 
  Plus, 
  Briefcase, 
  Send,
  X
} from 'lucide-react';
import type { ProjectPitch } from '../types';

export const ProjectHub: React.FC = () => {
  const { projects, setIsPitchModalOpen, toggleProjectLike, applyToProject, searchQuery } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Application Modal state
  const [applyingProject, setApplyingProject] = useState<ProjectPitch | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [applicationPitch, setApplicationPitch] = useState<string>('');

  const categories = ['All', 'Tech / App', 'Business & Startup', 'Academic Competition', 'Research'];

  const filteredProjects = projects.filter((p) => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.openRoles.some(r => r.role.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleOpenApply = (proj: ProjectPitch, role: string) => {
    setApplyingProject(proj);
    setSelectedRole(role);
    setApplicationPitch('');
  };

  const handleSendApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyingProject || !selectedRole) return;
    applyToProject(applyingProject.id, selectedRole, applicationPitch || 'Hi, interested in joining the team!');
    setApplyingProject(null);
  };

  return (
    <div className="space-y-4">
      
      {/* Sleek Minimal Header */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <h1 className="text-base font-extrabold text-slate-900">Projects</h1>
          <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-slate-100 text-slate-700">
            {filteredProjects.length}
          </span>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.split(' ')[0]}
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsPitchModalOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition-transform active:scale-95"
        >
          <Plus className="w-3.5 h-3.5 text-amber-400" />
          <span>Pitch</span>
        </button>
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredProjects.map((proj) => (
          <div
            key={proj.id}
            className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              
              {/* Category & Likes */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                  {proj.category}
                </span>

                <button
                  onClick={() => toggleProjectLike(proj.id)}
                  className={`flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full border transition-all ${
                    proj.hasLiked
                      ? 'bg-rose-50 text-rose-600 border-rose-200'
                      : 'bg-white text-slate-500 border-slate-200 hover:text-rose-500'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${proj.hasLiked ? 'fill-rose-500' : ''}`} />
                  <span>{proj.likes}</span>
                </button>
              </div>

              {/* Title & Tagline */}
              <div>
                <h3 className="text-base font-extrabold text-slate-900 leading-snug">{proj.title}</h3>
                <p className="text-xs font-semibold text-amber-600 mt-0.5">{proj.tagline}</p>
              </div>

              {/* Description */}
              <p className="text-slate-600 text-xs leading-relaxed line-clamp-2">
                {proj.description}
              </p>

              {/* Open Roles */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                  <Briefcase className="w-3 h-3" />
                  Roles
                </div>
                
                <div className="flex flex-wrap gap-1.5">
                  {proj.openRoles.map((roleObj, i) => (
                    <button
                      key={i}
                      onClick={() => handleOpenApply(proj, roleObj.role)}
                      className="group flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/70 transition-all"
                    >
                      <span>{roleObj.role}</span>
                      <span className="text-[10px] text-amber-600 font-bold group-hover:text-amber-800">
                        + Apply
                      </span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Author Footer */}
            <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <img
                  src={proj.author.avatar}
                  alt={proj.author.name}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="font-bold text-slate-800 text-xs">{proj.author.name}</span>
              </div>

              <span className="text-[10px] text-slate-400">{proj.createdAt}</span>
            </div>

          </div>
        ))}
      </div>

      {/* Application Modal */}
      {applyingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md rounded-2xl p-5 shadow-2xl border border-slate-200 space-y-4">
            
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">Apply for Role</h3>
                <p className="text-xs text-slate-500 truncate max-w-xs">{applyingProject.title}</p>
              </div>
              <button
                onClick={() => setApplyingProject(null)}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSendApplication} className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Role
                </label>
                <input
                  type="text"
                  value={selectedRole}
                  readOnly
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Message / Portfolio
                </label>
                <textarea
                  value={applicationPitch}
                  onChange={(e) => setApplicationPitch(e.target.value)}
                  placeholder="Share your major, relevant skills, or link..."
                  rows={3}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 text-xs focus:outline-hidden focus:border-slate-900"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setApplyingProject(null)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
                >
                  <Send className="w-3.5 h-3.5 text-amber-400" />
                  <span>Send</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};

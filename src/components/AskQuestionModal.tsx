import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, HelpCircle, Code2, ShieldAlert, Sparkles, Send } from 'lucide-react';

export const AskQuestionModal: React.FC = () => {
  const { 
    isAskModalOpen, 
    setIsAskModalOpen, 
    courses, 
    askQuestion, 
    currentUser, 
    togglePseudonymous 
  } = useApp();

  const [title, setTitle] = useState('');
  const [courseId, setCourseId] = useState(courses[0]?.id || 'c1');
  const [content, setContent] = useState('');
  const [codeSnippet, setCodeSnippet] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [tagsInput, setTagsInput] = useState('');

  if (!isAskModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    askQuestion({
      title,
      courseId,
      content,
      codeSnippet: showCode ? codeSnippet : undefined,
      tags: tags.length > 0 ? tags : ['GeneralDiscussion'],
    });

    setTitle('');
    setContent('');
    setCodeSnippet('');
    setTagsInput('');
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
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
              <HelpCircle className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-extrabold text-slate-900">New Question</h2>
          </div>

          <button
            onClick={() => setIsAskModalOpen(false)}
            className="p-1 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3.5">
          
          {/* Course Selection */}
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Course
            </label>
            <select
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-semibold focus:outline-hidden focus:border-amber-500"
            >
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.code} - {course.name}
                </option>
              ))}
            </select>
          </div>

          {/* Question Title */}
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Dijkstra with priority queue TLE fix?"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 text-xs focus:outline-hidden focus:border-amber-500"
              required
            />
          </div>

          {/* Details */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Details
              </label>
              <button
                type="button"
                onClick={() => setShowCode(!showCode)}
                className="text-[11px] font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
              >
                <Code2 className="w-3 h-3" />
                {showCode ? 'Hide Code' : '+ Code Snippet'}
              </button>
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Describe what you tried or where you are stuck..."
              rows={3}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 text-xs focus:outline-hidden focus:border-amber-500"
              required
            />
          </div>

          {/* Optional Code Snippet Field */}
          {showCode && (
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Code Snippet
              </label>
              <textarea
                value={codeSnippet}
                onChange={(e) => setCodeSnippet(e.target.value)}
                placeholder="// Paste code here..."
                rows={3}
                className="w-full font-mono text-[11px] px-3 py-2 rounded-xl bg-slate-950 text-slate-100 border border-slate-800 focus:outline-hidden focus:border-amber-500"
              />
            </div>
          )}

          {/* Tags */}
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="e.g. Python, Graph, Dijkstra"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 text-xs focus:outline-hidden focus:border-amber-500"
            />
          </div>

          {/* Anonymous Mode */}
          <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200/70 rounded-xl">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <div>
                <span className="text-xs font-bold text-slate-800">Anonymous Mode</span>
                <span className="text-[10px] text-slate-400 block">Hide identity as Anonymous Student</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={currentUser.isPseudonymous}
              onChange={togglePseudonymous}
              className="w-4 h-4 text-amber-600 rounded-sm focus:ring-amber-500 border-slate-300 cursor-pointer"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <div className="text-[11px] text-amber-700 font-bold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>+2 pts</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsAskModalOpen(false)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!title.trim() || !content.trim()}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-bold text-xs shadow-xs transition-transform active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Publish</span>
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};

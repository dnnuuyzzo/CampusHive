import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  ArrowBigUp, 
  CheckCircle2, 
  Send, 
  Code2, 
  HelpCircle,
  Copy,
  Check
} from 'lucide-react';

export const QuestionDetailModal: React.FC = () => {
  const { 
    activeQuestion, 
    setActiveQuestion, 
    toggleQuestionVote, 
    toggleAnswerVote, 
    acceptAnswer, 
    submitAnswer,
  } = useApp();

  const [answerContent, setAnswerContent] = useState('');
  const [answerCode, setAnswerCode] = useState('');
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  if (!activeQuestion) return null;

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handlePostAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answerContent.trim()) return;
    submitAnswer(activeQuestion.id, answerContent, answerCode);
    setAnswerContent('');
    setAnswerCode('');
    setShowCodeInput(false);
  };

  const sortedAnswers = [...activeQuestion.answers].sort((a, b) => {
    if (a.isAccepted) return -1;
    if (b.isAccepted) return 1;
    return b.upvotes - a.upvotes;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Bar */}
        <div className="px-5 py-3 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-[11px] px-2 py-0.5 rounded bg-amber-100 text-amber-900">
              {activeQuestion.courseCode}
            </span>
            <span className="text-xs font-semibold text-slate-500 truncate max-w-xs">
              {activeQuestion.courseName}
            </span>
          </div>

          <button
            onClick={() => setActiveQuestion(null)}
            className="p-1 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          
          {/* Question Title & Status */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {activeQuestion.isSolved ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Solved
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold">
                  <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                  Open
                </span>
              )}
              <span className="text-[10px] text-slate-400">
                {activeQuestion.createdAt}
              </span>
            </div>

            <h1 className="text-lg font-bold text-slate-900 leading-snug">
              {activeQuestion.title}
            </h1>
          </div>

          {/* Question Details Content */}
          <div className="text-slate-700 text-xs sm:text-sm leading-relaxed whitespace-pre-line bg-slate-50 p-3.5 rounded-xl border border-slate-100">
            {activeQuestion.content}
          </div>

          {/* Question Code Snippet (if available) */}
          {activeQuestion.codeSnippet && (
            <div className="relative rounded-xl bg-slate-950 text-slate-100 p-3 font-mono text-xs overflow-x-auto">
              <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-800 text-slate-400 text-[10px]">
                <span className="flex items-center gap-1 font-semibold text-amber-400">
                  <Code2 className="w-3.5 h-3.5" /> Code
                </span>
                <button
                  onClick={() => handleCopyCode(activeQuestion.codeSnippet!)}
                  className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px]"
                >
                  {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre>{activeQuestion.codeSnippet}</pre>
            </div>
          )}

          {/* Tags & Asker Card */}
          <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-100">
            <div className="flex flex-wrap items-center gap-1">
              {activeQuestion.tags.map((tag) => (
                <span key={tag} className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleQuestionVote(activeQuestion.id)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  activeQuestion.hasUpvoted
                    ? 'bg-amber-500 text-white'
                    : 'bg-slate-100 hover:bg-amber-100 text-slate-700'
                }`}
              >
                <ArrowBigUp className={`w-3.5 h-3.5 ${activeQuestion.hasUpvoted ? 'fill-white' : ''}`} />
                <span>{activeQuestion.upvotes}</span>
              </button>

              <div className="flex items-center gap-1.5 pl-2 border-l border-slate-200">
                <img
                  src={activeQuestion.author.avatar}
                  alt={activeQuestion.author.name}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-xs font-semibold text-slate-700">{activeQuestion.author.name}</span>
              </div>
            </div>
          </div>

          {/* Answers Section */}
          <div className="pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                Answers ({activeQuestion.answers.length})
              </h2>
            </div>

            {/* Answer List */}
            {sortedAnswers.length === 0 ? (
              <div className="text-center py-6 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                <p className="text-xs text-slate-500">No answers yet. Be the first to answer!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {sortedAnswers.map((ans) => (
                  <div
                    key={ans.id}
                    className={`rounded-xl p-3.5 border transition-all ${
                      ans.isAccepted
                        ? 'bg-emerald-50/50 border-emerald-300'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    {/* Accepted Solution Badge */}
                    {ans.isAccepted && (
                      <div className="flex items-center gap-1 text-emerald-800 text-[10px] font-bold mb-2 bg-emerald-100 px-2 py-0.5 rounded w-fit">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Accepted Answer
                      </div>
                    )}

                    {/* Answer Author Meta */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <img
                          src={ans.author.avatar}
                          alt={ans.author.name}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <div>
                          <span className="text-xs font-bold text-slate-900">{ans.author.name}</span>
                          <span className="text-[10px] text-slate-400 ml-1.5">{ans.createdAt}</span>
                        </div>
                      </div>

                      {/* Vote & Mark Accepted actions */}
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => toggleAnswerVote(activeQuestion.id, ans.id)}
                          className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold ${
                            ans.hasUpvoted
                              ? 'bg-amber-500 text-white'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                          }`}
                        >
                          <ArrowBigUp className={`w-3.5 h-3.5 ${ans.hasUpvoted ? 'fill-white' : ''}`} />
                          <span>{ans.upvotes}</span>
                        </button>

                        {!ans.isAccepted && (
                          <button
                            onClick={() => acceptAnswer(activeQuestion.id, ans.id)}
                            className="flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white"
                          >
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Accept</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Answer Content */}
                    <div className="text-slate-700 text-xs leading-relaxed whitespace-pre-line">
                      {ans.content}
                    </div>

                    {/* Answer Code Snippet */}
                    {ans.codeSnippet && (
                      <div className="mt-2 rounded-lg bg-slate-950 text-slate-100 p-2.5 font-mono text-[11px] overflow-x-auto">
                        <pre>{ans.codeSnippet}</pre>
                      </div>
                    )}

                  </div>
                ))}
              </div>
            )}

            {/* Answer Input Box */}
            <form onSubmit={handlePostAnswer} className="mt-4 pt-3 border-t border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Your Answer
                </label>

                <button
                  type="button"
                  onClick={() => setShowCodeInput(!showCodeInput)}
                  className="text-[11px] font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
                >
                  <Code2 className="w-3 h-3" />
                  {showCodeInput ? 'Hide Code' : '+ Code'}
                </button>
              </div>

              <textarea
                value={answerContent}
                onChange={(e) => setAnswerContent(e.target.value)}
                placeholder="Write your answer..."
                rows={2}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-xl focus:bg-white focus:outline-hidden"
                required
              />

              {showCodeInput && (
                <textarea
                  value={answerCode}
                  onChange={(e) => setAnswerCode(e.target.value)}
                  placeholder="// Code snippet..."
                  rows={2}
                  className="w-full font-mono text-[11px] px-3 py-2 bg-slate-900 text-slate-100 border border-slate-800 rounded-xl focus:outline-hidden"
                />
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!answerContent.trim()}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-bold text-xs shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit</span>
                </button>
              </div>
            </form>

          </div>

        </div>

      </div>
    </div>
  );
};

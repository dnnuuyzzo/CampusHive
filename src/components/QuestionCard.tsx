import React from 'react';
import type { Question } from '../types';
import { useApp } from '../context/AppContext';
import { ArrowBigUp, MessageSquare, CheckCircle2, HelpCircle, Code2 } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
  const { toggleQuestionVote, setActiveQuestion } = useApp();

  return (
    <article 
      className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex gap-3.5 cursor-pointer group"
      onClick={() => setActiveQuestion(question)}
    >
      
      {/* Upvote Column */}
      <div 
        className="flex flex-col items-center shrink-0"
        onClick={(e) => {
          e.stopPropagation();
          toggleQuestionVote(question.id);
        }}
      >
        <button
          className={`w-9 h-9 rounded-xl flex flex-col items-center justify-center transition-all ${
            question.hasUpvoted
              ? 'bg-amber-500 text-white font-bold shadow-xs'
              : 'bg-slate-100 hover:bg-amber-50 text-slate-600 hover:text-amber-600'
          }`}
          title="Upvote"
        >
          <ArrowBigUp className={`w-4 h-4 ${question.hasUpvoted ? 'fill-white' : ''}`} />
          <span className="text-[10px] font-bold leading-none">{question.upvotes}</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 space-y-1.5">
        
        {/* Meta Header */}
        <div className="flex items-center gap-2 text-xs">
          <span className="font-extrabold px-1.5 py-0.5 rounded bg-slate-100 text-amber-700 text-[11px]">
            {question.courseCode}
          </span>

          {question.isSolved ? (
            <span className="inline-flex items-center gap-1 text-emerald-600 text-[11px] font-bold">
              <CheckCircle2 className="w-3 h-3" />
              Solved
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-amber-600 text-[11px] font-bold">
              <HelpCircle className="w-3 h-3" />
              Open
            </span>
          )}

          <span className="text-slate-400 ml-auto text-[10px]">{question.createdAt}</span>
        </div>

        {/* Title */}
        <h2 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-1 leading-snug">
          {question.title}
        </h2>

        {/* Content Preview */}
        <p className="text-slate-500 text-xs line-clamp-1">
          {question.content}
        </p>

        {/* Code Snippet Preview (if present) */}
        {question.codeSnippet && (
          <div className="bg-slate-900 text-slate-200 text-[11px] rounded-xl px-3 py-2 font-mono flex items-center justify-between">
            <span className="truncate opacity-80">{question.codeSnippet.split('\n')[0]}</span>
            <span className="text-[9px] text-amber-400 shrink-0 ml-2 flex items-center gap-1">
              <Code2 className="w-3 h-3" /> code
            </span>
          </div>
        )}

        {/* Footer: Tags, Author, & Answers Count */}
        <div className="flex items-center justify-between gap-2 pt-1">
          
          {/* Tags */}
          <div className="flex items-center gap-1 truncate">
            {question.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-md"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Author & Answers Info */}
          <div className="flex items-center gap-2.5 text-xs text-slate-500 shrink-0">
            <div className="flex items-center gap-1">
              <img
                src={question.author.avatar}
                alt={question.author.name}
                className="w-4 h-4 rounded-full object-cover"
              />
              <span className="font-semibold text-slate-600 text-[11px]">{question.author.name.split(' ')[0]}</span>
            </div>

            <div className="flex items-center gap-1 text-slate-600 font-bold bg-slate-100 px-1.5 py-0.5 rounded-md text-[10px]">
              <MessageSquare className="w-3 h-3 text-slate-400" />
              <span>{question.answers.length}</span>
            </div>
          </div>

        </div>

      </div>

    </article>
  );
};

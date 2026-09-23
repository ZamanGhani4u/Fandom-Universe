import React from 'react';
import { X, Bookmark, Clock, User, Calendar, Share2, ArrowRight } from 'lucide-react';
import { Article } from '../data/types.ts';
import { CATEGORIES } from '../data/categories.ts';
import { ARTICLES } from '../data/articles.ts';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (article: Article) => void;
  onSelectRelatedArticle: (id: string) => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onSelectRelatedArticle,
}) => {
  if (!article) return null;

  const related = ARTICLES.filter(
    (a) => a.id !== article.id && (a.category === article.category || a.featured)
  ).slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md p-4 sm:p-6 md:p-10 flex items-start justify-center animate-in fade-in duration-150">
      <div className="w-full max-w-3xl bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden text-neutral-100 my-auto">
        {/* Top Floating Actions Bar */}
        <div className="p-4 sm:px-6 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/40">
          <div className="text-xs font-mono text-rose-400 uppercase tracking-wider">
            {CATEGORIES[article.category]?.name} · Editorial Analysis
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark(article)}
              className={`p-2 rounded-lg border transition-all text-xs flex items-center gap-1.5 ${
                isBookmarked
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                  : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:text-white'
              }`}
              title="Bookmark Article"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
              <span className="hidden sm:inline">{isBookmarked ? 'Saved' : 'Bookmark'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-lg transition-colors"
              aria-label="Close article"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-neutral-900">
          <img
            src={article.thumbnail}
            alt={article.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
        </div>

        {/* Article Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-white leading-tight">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400 mt-3 pt-3 border-t border-neutral-800/80">
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-neutral-500" />
                <span className="text-neutral-200">{article.author}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-1.5 font-mono">
                <Clock className="w-3.5 h-3.5 text-neutral-500" />
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>

          {/* Lead Summary */}
          <p className="text-base text-neutral-200 font-medium leading-relaxed bg-neutral-900/50 p-4 rounded-xl border border-neutral-800">
            {article.summary}
          </p>

          {/* Paragraphs */}
          <div className="space-y-4 text-neutral-300 text-sm sm:text-base leading-relaxed">
            {article.content.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* Tags */}
          <div className="pt-4 border-t border-neutral-800 flex flex-wrap items-center gap-2">
            <span className="text-xs text-neutral-500 font-mono">Tags:</span>
            {article.tags.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 text-neutral-400 rounded-md text-xs"
              >
                #{t}
              </span>
            ))}
          </div>

          {/* Related Articles Suggestions */}
          {related.length > 0 && (
            <div className="pt-6 border-t border-neutral-800 space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 font-mono">
                Related Fandom Reads
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {related.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectRelatedArticle(rel.id)}
                    className="p-3 bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-800 rounded-xl cursor-pointer transition-colors group flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-[11px] text-rose-400 font-mono">
                        {CATEGORIES[rel.category]?.name} · {rel.readTime}
                      </div>
                      <h4 className="text-xs font-semibold text-white group-hover:text-rose-400 transition-colors line-clamp-2 mt-1">
                        {rel.title}
                      </h4>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-neutral-400 mt-2">
                      <span>Read Story</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, X, BookOpen, User, Film, Calendar, ShoppingBag, ArrowRight } from 'lucide-react';
import { CategoryId } from '../data/types.ts';
import { CATEGORIES, CATEGORY_LIST } from '../data/categories.ts';
import { ARTICLES } from '../data/articles.ts';
import { CHARACTERS } from '../data/characters.ts';
import { MEDIA_ITEMS } from '../data/media.ts';
import { EVENTS } from '../data/events.ts';
import { MERCHANDISE_ITEMS } from '../data/merchandise.ts';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectArticle: (id: string) => void;
  onSelectCharacter: (id: string) => void;
  onSelectMedia: (id: string) => void;
  onSelectMerchandise: (id: string) => void;
  onSelectCategory: (catId: CategoryId) => void;
}

type SearchContentType = 'all' | 'articles' | 'characters' | 'media' | 'events' | 'merchandise';

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectArticle,
  onSelectCharacter,
  onSelectMedia,
  onSelectMerchandise,
  onSelectCategory,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [selectedType, setSelectedType] = useState<SearchContentType>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const results = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();
    if (!q) return [];

    interface SearchResultItem {
      id: string;
      title: string;
      subtitle: string;
      category: CategoryId;
      type: SearchContentType;
      image?: string;
      action: () => void;
    }

    const matched: SearchResultItem[] = [];

    // Search Articles
    if (selectedType === 'all' || selectedType === 'articles') {
      ARTICLES.forEach((a) => {
        if (
          (selectedCategory === 'all' || a.category === selectedCategory) &&
          (a.title.toLowerCase().includes(q) ||
            a.summary.toLowerCase().includes(q) ||
            a.tags.some((t) => t.toLowerCase().includes(q)) ||
            a.author.toLowerCase().includes(q))
        ) {
          matched.push({
            id: a.id,
            title: a.title,
            subtitle: `Article by ${a.author} · ${a.readTime}`,
            category: a.category,
            type: 'articles',
            image: a.thumbnail,
            action: () => onSelectArticle(a.id),
          });
        }
      });
    }

    // Search Characters
    if (selectedType === 'all' || selectedType === 'characters') {
      CHARACTERS.forEach((c) => {
        if (
          (selectedCategory === 'all' || c.category === selectedCategory) &&
          (c.name.toLowerCase().includes(q) ||
            c.series.toLowerCase().includes(q) ||
            c.biography.toLowerCase().includes(q) ||
            c.traits.some((t) => t.value.toLowerCase().includes(q)))
        ) {
          matched.push({
            id: c.id,
            title: c.name,
            subtitle: `${c.role} (${c.series})`,
            category: c.category,
            type: 'characters',
            image: c.image,
            action: () => onSelectCharacter(c.id),
          });
        }
      });
    }

    // Search Media
    if (selectedType === 'all' || selectedType === 'media') {
      MEDIA_ITEMS.forEach((m) => {
        if (
          (selectedCategory === 'all' || m.category === selectedCategory) &&
          (m.title.toLowerCase().includes(q) ||
            m.description.toLowerCase().includes(q) ||
            m.tags.some((t) => t.toLowerCase().includes(q)))
        ) {
          matched.push({
            id: m.id,
            title: m.title,
            subtitle: `${m.type.toUpperCase()} · ${m.duration}`,
            category: m.category,
            type: 'media',
            image: m.thumbnail,
            action: () => onSelectMedia(m.id),
          });
        }
      });
    }

    // Search Events
    if (selectedType === 'all' || selectedType === 'events') {
      EVENTS.forEach((e) => {
        if (
          (selectedCategory === 'all' || e.category === selectedCategory) &&
          (e.title.toLowerCase().includes(q) ||
            e.location.toLowerCase().includes(q) ||
            e.description.toLowerCase().includes(q))
        ) {
          matched.push({
            id: e.id,
            title: e.title,
            subtitle: `${e.eventType} · ${e.date} (${e.location})`,
            category: e.category,
            type: 'events',
            image: e.image,
            action: () => onSelectCategory(e.category),
          });
        }
      });
    }

    // Search Merchandise
    if (selectedType === 'all' || selectedType === 'merchandise') {
      MERCHANDISE_ITEMS.forEach((m) => {
        if (
          (selectedCategory === 'all' || m.category === selectedCategory) &&
          (m.name.toLowerCase().includes(q) ||
            m.franchise.toLowerCase().includes(q) ||
            m.description.toLowerCase().includes(q))
        ) {
          matched.push({
            id: m.id,
            title: m.name,
            subtitle: `${m.franchise} · $${m.price.toFixed(2)}`,
            category: m.category,
            type: 'merchandise',
            image: m.image,
            action: () => onSelectMerchandise(m.id),
          });
        }
      });
    }

    return matched;
  }, [searchTerm, selectedCategory, selectedType, onSelectArticle, onSelectCharacter, onSelectMedia, onSelectMerchandise, onSelectCategory]);

  if (!isOpen) return null;

  const contentTypes: { id: SearchContentType; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'All Content', icon: <Search className="w-3.5 h-3.5" /> },
    { id: 'articles', label: 'Articles', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: 'characters', label: 'Characters', icon: <User className="w-3.5 h-3.5" /> },
    { id: 'media', label: 'Media & Audio', icon: <Film className="w-3.5 h-3.5" /> },
    { id: 'events', label: 'Events', icon: <Calendar className="w-3.5 h-3.5" /> },
    { id: 'merchandise', label: 'Merchandise', icon: <ShoppingBag className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md p-4 sm:p-6 md:p-10 flex items-start justify-center animate-in fade-in duration-150">
      <div className="w-full max-w-3xl bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden text-neutral-100 flex flex-col max-h-[85vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-neutral-800 flex items-center gap-3 bg-neutral-900/50">
          <Search className="w-5 h-5 text-neutral-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search characters, articles, trailers, events, merch across all fandoms..."
            className="flex-1 bg-transparent text-sm sm:text-base text-white placeholder-neutral-500 focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-neutral-500 hover:text-neutral-300 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs text-neutral-400 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-lg border border-neutral-700"
          >
            ESC
          </button>
        </div>

        {/* Filter Controls (Allowed per Section 1.A: interactive segmented buttons with active/inactive states) */}
        <div className="px-4 py-2.5 border-b border-neutral-800 bg-neutral-950 flex flex-wrap gap-2 text-xs">
          {/* Content Type Tabs */}
          <div className="flex flex-wrap items-center gap-1 p-1 bg-neutral-900 rounded-lg border border-neutral-800">
            {contentTypes.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedType(t.id)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                  selectedType === t.id
                    ? 'bg-rose-600 text-white'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {t.icon}
                <span>{t.label}</span>
              </button>
            ))}
          </div>

          {/* Category Selector */}
          <div className="flex items-center gap-1 overflow-x-auto py-1">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-neutral-800 text-white border border-neutral-700'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              All Hubs
            </button>
            {CATEGORY_LIST.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                  selectedCategory === c.id
                    ? 'bg-neutral-800 text-rose-400 border border-neutral-700'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* Search Results Container */}
        <div className="flex-1 overflow-y-auto p-4 divide-y divide-neutral-800/80">
          {!searchTerm.trim() ? (
            <div className="py-12 text-center text-neutral-400">
              <Search className="w-10 h-10 text-neutral-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-neutral-300">
                Type anything to search across the entire Fandom Universe
              </p>
              <p className="text-xs text-neutral-500 mt-1">
                Try searching "Gojo", "Elden Ring", "BTS", "Dune", "Lightstick", "Anime Expo"
              </p>
            </div>
          ) : results.length === 0 ? (
            <div className="py-12 text-center text-neutral-400">
              <p className="text-sm font-medium text-neutral-300">
                No matching results found for "{searchTerm}"
              </p>
              <p className="text-xs text-neutral-500 mt-1">
                Try broadening your search term or resetting the category and content type filters.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-xs text-neutral-400 font-mono pb-2">
                Found {results.length} results
              </div>
              {results.map((item) => (
                <div
                  key={`${item.type}-${item.id}`}
                  onClick={() => {
                    item.action();
                    onClose();
                  }}
                  className="p-3 hover:bg-neutral-900 rounded-xl cursor-pointer transition-colors flex items-center gap-3 group"
                >
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-lg object-cover bg-neutral-900 shrink-0 border border-neutral-800"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-white group-hover:text-rose-400 transition-colors truncate">
                        {item.title}
                      </h4>
                      <span className="text-[11px] text-neutral-500 shrink-0">
                        {CATEGORIES[item.category]?.name}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 truncate mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-600 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

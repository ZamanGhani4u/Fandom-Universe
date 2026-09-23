import React, { useState, useMemo } from 'react';
import { Film, Play, Headphones, Bookmark } from 'lucide-react';
import { CategoryId, MediaItem } from '../data/types.ts';
import { CATEGORIES, CATEGORY_LIST } from '../data/categories.ts';
import { MEDIA_ITEMS } from '../data/media.ts';

interface TrailersViewProps {
  onSelectMedia: (id: string) => void;
  onToggleBookmark: (target: { id: string; type: any; title: string; category: CategoryId; thumbnail?: string; subtitle?: string }) => void;
  isItemBookmarked: (id: string) => boolean;
}

export const TrailersView: React.FC<TrailersViewProps> = ({
  onSelectMedia,
  onToggleBookmark,
  isItemBookmarked,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'upcoming' | 'recently_released'>('all');

  const filteredMedia = useMemo(() => {
    return MEDIA_ITEMS.filter((item) => {
      const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchStatus = selectedStatus === 'all' || item.releaseStatus === selectedStatus;
      return matchCategory && matchStatus;
    });
  }, [selectedCategory, selectedStatus]);

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div>
        <div className="text-xs font-mono uppercase tracking-wider text-rose-400 flex items-center gap-2">
          <Film className="w-4 h-4" />
          <span>Cinematics & Audio Showcase</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-white mt-1">
          Trailers & Audio Theater
        </h1>
        <p className="text-sm text-neutral-400 mt-2 max-w-2xl">
          Aggregating high-definition cinematic trailers, developer interviews, audio masterclasses, and fan documentaries across all seven fandom categories.
        </p>
      </div>

      {/* Filter Controls Bar */}
      <div className="p-4 bg-neutral-900/60 border border-neutral-800 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-rose-600 text-white'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
            }`}
          >
            All Fandoms
          </button>
          {CATEGORY_LIST.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-rose-600 text-white'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Release Status Filter */}
        <div className="flex items-center gap-1 bg-neutral-950 p-1 rounded-xl border border-neutral-800 shrink-0 text-xs">
          <button
            onClick={() => setSelectedStatus('all')}
            className={`px-3 py-1 rounded-lg transition-colors font-medium ${
              selectedStatus === 'all'
                ? 'bg-neutral-800 text-white shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            All Status
          </button>
          <button
            onClick={() => setSelectedStatus('upcoming')}
            className={`px-3 py-1 rounded-lg transition-colors font-medium ${
              selectedStatus === 'upcoming'
                ? 'bg-neutral-800 text-rose-400 shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setSelectedStatus('recently_released')}
            className={`px-3 py-1 rounded-lg transition-colors font-medium ${
              selectedStatus === 'recently_released'
                ? 'bg-neutral-800 text-rose-400 shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Recently Released
          </button>
        </div>
      </div>

      {/* Grid */}
      {filteredMedia.length === 0 ? (
        <div className="py-16 text-center text-neutral-400">
          <Film className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
          <p className="text-base font-semibold text-neutral-200 font-display">
            No trailers match this filter combination
          </p>
          <p className="text-xs text-neutral-500 mt-1">
            Try resetting your status or category filters above.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMedia.map((media) => {
            const bookmarked = isItemBookmarked(media.id);
            return (
              <div
                key={media.id}
                onClick={() => onSelectMedia(media.id)}
                className="group bg-neutral-900/50 border border-neutral-800 hover:border-neutral-700 rounded-2xl overflow-hidden cursor-pointer transition-all flex flex-col justify-between"
              >
                <div className="aspect-video relative overflow-hidden bg-neutral-950">
                  <img
                    src={media.thumbnail}
                    alt={media.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-neutral-950/40 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      {media.isAudio ? <Headphones className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 rounded text-[11px] font-mono text-neutral-300">
                    {media.duration}
                  </div>
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-neutral-950/80 backdrop-blur-md rounded text-[10px] font-mono text-rose-400 uppercase">
                    {media.releaseStatus === 'upcoming' ? 'Upcoming' : 'Released'}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBookmark({
                        id: media.id,
                        type: 'media',
                        title: media.title,
                        category: media.category,
                        thumbnail: media.thumbnail,
                        subtitle: `${media.type.toUpperCase()} · ${media.duration}`,
                      });
                    }}
                    className={`absolute top-2 right-2 p-1.5 rounded-lg backdrop-blur-md border transition-all ${
                      bookmarked
                        ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                        : 'bg-neutral-950/60 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                    title="Bookmark media"
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] font-mono text-rose-400 uppercase">
                      <span>{CATEGORIES[media.category]?.name}</span>
                      <span>·</span>
                      <span>{media.type.replace('_', ' ')}</span>
                    </div>
                    <h3 className="text-base font-bold font-display text-white group-hover:text-rose-400 transition-colors line-clamp-2 mt-1">
                      {media.title}
                    </h3>
                    <p className="text-xs text-neutral-400 line-clamp-2 mt-2 leading-relaxed">
                      {media.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
                    <span>{media.duration}</span>
                    <span className="text-neutral-200 group-hover:text-rose-400 flex items-center gap-1 font-medium transition-colors">
                      {media.isAudio ? 'Listen Clip' : 'Watch Trailer'} →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

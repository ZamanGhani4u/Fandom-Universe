import React, { useState, useMemo } from 'react';
import { Calendar, MapPin, Users, Globe, Bookmark, Filter } from 'lucide-react';
import { CategoryId, EventItem } from '../data/types.ts';
import { CATEGORIES, CATEGORY_LIST } from '../data/categories.ts';
import { EVENTS } from '../data/events.ts';

interface EventsViewProps {
  onToggleBookmark: (target: { id: string; type: any; title: string; category: CategoryId; thumbnail?: string; subtitle?: string }) => void;
  isItemBookmarked: (id: string) => boolean;
}

export const EventsView: React.FC<EventsViewProps> = ({
  onToggleBookmark,
  isItemBookmarked,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  const eventTypes = ['all', 'Convention', 'Watch Party', 'Tournament', 'Concert', 'Fan Meetup', 'Premiere'];

  const filteredEvents = useMemo(() => {
    return EVENTS.filter((evt) => {
      const matchCategory = selectedCategory === 'all' || evt.category === selectedCategory;
      const matchType = selectedType === 'all' || evt.eventType.toLowerCase() === selectedType.toLowerCase();
      return matchCategory && matchType;
    });
  }, [selectedCategory, selectedType]);

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div>
        <div className="text-xs font-mono uppercase tracking-wider text-rose-400 flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>Worldwide Fandom Gatherings</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-white mt-1">
          Events & Conventions Calendar
        </h1>
        <p className="text-sm text-neutral-400 mt-2 max-w-2xl">
          Track 21+ premier global fan gatherings across all seven categories—including Anime Expo, San Diego Comic-Con, Gamescom, MAMA Awards, and community watch parties.
        </p>
      </div>

      {/* Filter Controls */}
      <div className="p-4 bg-neutral-900/60 border border-neutral-800 rounded-2xl space-y-3">
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
          {CATEGORY_LIST.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                selectedCategory === c.id
                  ? 'bg-rose-600 text-white'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Event Type Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 pt-2 border-t border-neutral-800/80">
          <span className="text-xs text-neutral-400 font-mono mr-1">Type:</span>
          {eventTypes.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium capitalize transition-colors whitespace-nowrap ${
                selectedType === t
                  ? 'bg-neutral-800 text-white border border-neutral-700'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((evt) => {
          const bookmarked = isItemBookmarked(evt.id);
          return (
            <div
              key={evt.id}
              className="bg-neutral-900/50 border border-neutral-800 hover:border-neutral-700 rounded-2xl overflow-hidden transition-all flex flex-col justify-between"
            >
              {evt.image && (
                <div className="aspect-[16/9] relative overflow-hidden bg-neutral-950">
                  <img
                    src={evt.image}
                    alt={evt.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 bg-neutral-950/80 backdrop-blur-md rounded text-[11px] font-mono text-rose-400">
                    {CATEGORIES[evt.category]?.name}
                  </div>
                  <button
                    onClick={() =>
                      onToggleBookmark({
                        id: evt.id,
                        type: 'event',
                        title: evt.title,
                        category: evt.category,
                        thumbnail: evt.image,
                        subtitle: `${evt.date} (${evt.location})`,
                      })
                    }
                    className={`absolute top-2.5 right-2.5 p-1.5 rounded-lg backdrop-blur-md border transition-all ${
                      bookmarked
                        ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                        : 'bg-neutral-950/60 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                    title="Bookmark event"
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current' : ''}`} />
                  </button>
                </div>
              )}

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-rose-400">{evt.eventType}</span>
                    <span className="text-neutral-400 font-mono">{evt.date}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold font-display text-white mt-2">
                    {evt.title}
                  </h3>

                  <p className="text-xs text-neutral-300 mt-2 leading-relaxed">
                    {evt.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-800/80 space-y-2 text-xs text-neutral-400">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                    <span className="truncate">{evt.location}</span>
                  </div>
                  {evt.attendeesEstimate && (
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="flex items-center gap-1 text-neutral-400">
                        <Users className="w-3 h-3 text-neutral-500" />
                        <span>Attendance:</span>
                      </span>
                      <span className="text-neutral-200 font-mono">
                        {evt.attendeesEstimate}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

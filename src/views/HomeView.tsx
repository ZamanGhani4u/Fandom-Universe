import React from 'react';
import { Sparkles, ArrowRight, Play, Compass, Film, Calendar, ShoppingBag, BookOpen, Layers } from 'lucide-react';
import { CategoryId, Article, MediaItem, EventItem } from '../data/types.ts';
import { CATEGORIES, CATEGORY_LIST } from '../data/categories.ts';
import { ARTICLES } from '../data/articles.ts';
import { MEDIA_ITEMS } from '../data/media.ts';
import { EVENTS } from '../data/events.ts';
import { UPCOMING_RELEASES } from '../data/releases.ts';

interface HomeViewProps {
  onNavigateToCategory: (catId: CategoryId) => void;
  onNavigate: (view: string) => void;
  onSelectArticle: (id: string) => void;
  onSelectMedia: (id: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigateToCategory,
  onNavigate,
  onSelectArticle,
  onSelectMedia,
}) => {
  const featuredArticles = ARTICLES.filter((a) => a.featured).slice(0, 3);
  const featuredTrailers = MEDIA_ITEMS.filter((m) => m.type === 'trailer' && m.featured).slice(0, 3);
  const upcomingEvents = EVENTS.slice(0, 3);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-20 border-b border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Col: Headings & Intro */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Unified Fandom Gateway · Version 1.0</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-white leading-[1.1]">
                One Portal. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-400 to-amber-300">
                  Infinite Universes.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-neutral-300 max-w-xl leading-relaxed">
                Connect the scattered fragments of fan culture. Discover character lore, watch high-definition trailers, browse licensed merchandise, and track global conventions across Anime, Gaming, Movies, TV, K-Pop, Comics, and Manga.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onNavigate('hubs')}
                  className="px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-sm transition-all shadow-lg shadow-rose-950/60 flex items-center gap-2"
                >
                  <span>Explore 7 Categories</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('trailers')}
                  className="px-5 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 font-semibold text-sm transition-colors flex items-center gap-2"
                >
                  <Play className="w-4 h-4 text-rose-500" />
                  <span>Trailers Theater</span>
                </button>
              </div>

              {/* Zero-Pill Metric Discipline per guidelines */}
              <div className="flex items-center gap-3 text-xs text-neutral-400 font-mono pt-4 border-t border-neutral-900">
                <span>7 Fandom Hubs</span>
                <span aria-hidden="true" className="text-neutral-700">·</span>
                <span>35+ Character Dossiers</span>
                <span aria-hidden="true" className="text-neutral-700">·</span>
                <span>21+ Global Events</span>
                <span aria-hidden="true" className="text-neutral-700">·</span>
                <span>Rule-Based AI Assistant</span>
              </div>
            </div>

            {/* Right Col: Cinematic Spotlight Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl group">
                <img
                  src="/src/assets/images/fandom_verse_hero_1790152660476.jpg"
                  alt="Fandom Universe Nexus"
                  referrerPolicy="no-referrer"
                  className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-3 bg-neutral-950/80 backdrop-blur-md rounded-xl border border-neutral-800/80">
                  <div className="text-[11px] font-mono text-rose-400 uppercase tracking-wider">
                    Spotlight Nexus
                  </div>
                  <div className="text-sm font-semibold font-display text-white mt-0.5">
                    Bridging East & West Pop Culture
                  </div>
                  <div className="text-xs text-neutral-400 truncate mt-0.5">
                    Unified database indexing articles, galleries, audio & collectibles
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7 Category Hubs Navigation Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-rose-400">
              Dimensional Portals
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mt-1">
              Choose Your Fandom Hub
            </h2>
          </div>
          <p className="text-xs text-neutral-400 max-w-sm">
            Each category hub features dedicated character profiles, image galleries, audio clips, events, and merchandise.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORY_LIST.map((cat, idx) => {
            const isMarquee = idx === 0;
            return (
              <div
                key={cat.id}
                onClick={() => onNavigateToCategory(cat.id)}
                className={`group relative rounded-2xl overflow-hidden border border-neutral-800/90 hover:border-neutral-700 bg-neutral-900/60 p-5 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  isMarquee ? 'sm:col-span-2 lg:col-span-2' : ''
                }`}
              >
                {/* Background ambient banner */}
                <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
                  <img
                    src={cat.bannerImage}
                    alt={cat.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent" />
                </div>

                <div className="relative z-10 flex flex-col justify-between h-full min-h-[160px]">
                  <div>
                    <div className="flex items-center justify-between">
                      <span
                        className="text-xs font-mono font-semibold"
                        style={{ color: cat.accent }}
                      >
                        0{idx + 1} // HUB
                      </span>
                      <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </div>
                    <h3 className="text-xl font-bold font-display text-white mt-2 group-hover:text-rose-400 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-neutral-300 mt-1 line-clamp-2 leading-relaxed">
                      {cat.tagline}
                    </p>
                  </div>

                  {/* Subtags */}
                  <div className="pt-3 border-t border-neutral-800/60 flex flex-wrap gap-1.5 text-[11px] text-neutral-400">
                    {cat.subTags.slice(0, 3).map((sub, sIdx) => (
                      <span key={sub}>
                        {sub}{sIdx < 2 ? ' ·' : ''}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Articles Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-rose-400">
              Editorial Journalism
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mt-1">
              Featured Articles & Analyses
            </h2>
          </div>
          <button
            onClick={() => onNavigate('hubs')}
            className="text-xs font-semibold text-neutral-400 hover:text-white flex items-center gap-1 transition-colors"
          >
            <span>View Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => onSelectArticle(article.id)}
              className="group bg-neutral-900/50 border border-neutral-800 rounded-2xl overflow-hidden cursor-pointer hover:border-neutral-700 transition-all flex flex-col"
            >
              <div className="aspect-[16/9] overflow-hidden bg-neutral-950 relative">
                <img
                  src={article.thumbnail}
                  alt={article.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-neutral-950/80 backdrop-blur-sm rounded text-[11px] font-mono text-rose-400">
                  {CATEGORIES[article.category]?.name}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-neutral-400 font-mono">
                    <span>{article.author}</span>
                    <span>·</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="text-base font-bold font-display text-white mt-1.5 group-hover:text-rose-400 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-neutral-400 line-clamp-2 mt-2 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
                  <span>{article.date}</span>
                  <span className="group-hover:text-white flex items-center gap-1 font-medium transition-colors">
                    Read Analysis <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trailers & Media Aggregator Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                <Film className="w-3.5 h-3.5" />
                <span>Trailers & Audio Clips</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mt-1">
                Aggregated Trailers Showcase
              </h2>
            </div>
            <button
              onClick={() => onNavigate('trailers')}
              className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-xs font-semibold border border-neutral-700 transition-colors flex items-center gap-2 w-fit"
            >
              <span>Explore All Trailers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredTrailers.map((trailer) => (
              <div
                key={trailer.id}
                onClick={() => onSelectMedia(trailer.id)}
                className="group relative rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950 cursor-pointer shadow-lg hover:border-rose-500/50 transition-all"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={trailer.thumbnail}
                    alt={trailer.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-neutral-950/40 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 ml-0.5" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 rounded text-[11px] font-mono text-neutral-300">
                    {trailer.duration}
                  </div>
                </div>

                <div className="p-4">
                  <div className="text-[11px] font-mono text-rose-400">
                    {CATEGORIES[trailer.category]?.name} · {trailer.releaseStatus === 'upcoming' ? 'Upcoming' : 'Recently Released'}
                  </div>
                  <h4 className="text-sm font-semibold text-white mt-1 group-hover:text-rose-400 transition-colors line-clamp-1">
                    {trailer.title}
                  </h4>
                  <p className="text-xs text-neutral-400 mt-1 line-clamp-2">
                    {trailer.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Release Highlights Calendar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>Release Radar</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mt-1">
              Anticipated 2026 Releases
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {UPCOMING_RELEASES.map((rel) => (
            <div
              key={rel.id}
              className="p-4 bg-neutral-900/60 border border-neutral-800 rounded-2xl flex items-center gap-3.5 hover:border-neutral-700 transition-colors"
            >
              <img
                src={rel.image}
                alt={rel.title}
                referrerPolicy="no-referrer"
                className="w-16 h-16 rounded-xl object-cover bg-neutral-950 shrink-0 border border-neutral-800"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-rose-400">
                    {CATEGORIES[rel.category]?.name}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400 bg-neutral-800 px-1.5 py-0.5 rounded">
                    {rel.releaseDate}
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-semibold text-white truncate mt-0.5">
                  {rel.title}
                </h4>
                <div className="text-[11px] text-neutral-400 truncate mt-0.5">
                  {rel.platformOrMedium}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Worldwide Event Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-rose-400">
              Community Conventions
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mt-1">
              Highlighted Fan Events
            </h2>
          </div>
          <button
            onClick={() => onNavigate('events')}
            className="text-xs font-semibold text-neutral-400 hover:text-white flex items-center gap-1 transition-colors"
          >
            <span>All Events ({EVENTS.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {upcomingEvents.map((evt) => (
            <div
              key={evt.id}
              className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-5 space-y-3 flex flex-col justify-between hover:border-neutral-700 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-rose-400">
                    {CATEGORIES[evt.category]?.name}
                  </span>
                  <span className="text-neutral-400 font-mono">{evt.date}</span>
                </div>
                <h3 className="text-base font-bold font-display text-white mt-2">
                  {evt.title}
                </h3>
                <p className="text-xs text-neutral-400 mt-1 line-clamp-3 leading-relaxed">
                  {evt.description}
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
                <span className="truncate">{evt.location}</span>
                <span className="text-neutral-200 font-mono shrink-0 ml-2">{evt.attendeesEstimate}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

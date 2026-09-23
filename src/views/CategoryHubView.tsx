import React, { useState, useMemo } from 'react';
import { 
  CategoryId, 
  Article, 
  Character, 
  GalleryItem, 
  MediaItem, 
  EventItem, 
  MerchandiseItem 
} from '../data/types.ts';
import { CATEGORIES } from '../data/categories.ts';
import { ARTICLES } from '../data/articles.ts';
import { CHARACTERS } from '../data/characters.ts';
import { GALLERY_ITEMS } from '../data/galleries.ts';
import { MEDIA_ITEMS } from '../data/media.ts';
import { EVENTS } from '../data/events.ts';
import { MERCHANDISE_ITEMS } from '../data/merchandise.ts';
import { 
  Bookmark, 
  Play, 
  Image as ImageIcon, 
  User, 
  BookOpen, 
  Calendar, 
  ShoppingBag, 
  SlidersHorizontal,
  ArrowRight,
  Headphones,
  Check
} from 'lucide-react';

interface CategoryHubViewProps {
  categoryId: CategoryId;
  onSelectArticle: (id: string) => void;
  onSelectCharacter: (id: string) => void;
  onSelectMedia: (id: string) => void;
  onSelectMerchandise: (id: string) => void;
  onOpenLightbox: (items: GalleryItem[], index: number) => void;
  onToggleBookmark: (target: { id: string; type: any; title: string; category: CategoryId; thumbnail?: string; subtitle?: string }) => void;
  isItemBookmarked: (id: string) => boolean;
  onAddToCart: (item: MerchandiseItem) => void;
}

type TabType = 'all' | 'characters' | 'articles' | 'gallery' | 'media' | 'events' | 'merchandise';
type SortOption = 'featured' | 'alphabetical' | 'newest';

export const CategoryHubView: React.FC<CategoryHubViewProps> = ({
  categoryId,
  onSelectArticle,
  onSelectCharacter,
  onSelectMedia,
  onSelectMerchandise,
  onOpenLightbox,
  onToggleBookmark,
  isItemBookmarked,
  onAddToCart,
}) => {
  const category = CATEGORIES[categoryId] || CATEGORIES.anime;
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [selectedSubTag, setSelectedSubTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  // Filter category-specific items
  const categoryArticles = useMemo(
    () => ARTICLES.filter((a) => a.category === categoryId),
    [categoryId]
  );
  const categoryCharacters = useMemo(
    () => CHARACTERS.filter((c) => c.category === categoryId),
    [categoryId]
  );
  const categoryGalleries = useMemo(
    () => GALLERY_ITEMS.filter((g) => g.category === categoryId),
    [categoryId]
  );
  const categoryMedia = useMemo(
    () => MEDIA_ITEMS.filter((m) => m.category === categoryId),
    [categoryId]
  );
  const categoryEvents = useMemo(
    () => EVENTS.filter((e) => e.category === categoryId),
    [categoryId]
  );
  const categoryMerchandise = useMemo(
    () => MERCHANDISE_ITEMS.filter((m) => m.category === categoryId),
    [categoryId]
  );

  // Filter and sort articles
  const filteredArticles = useMemo(() => {
    let list = [...categoryArticles];
    if (selectedSubTag) {
      list = list.filter((a) => a.tags.some((t) => t.toLowerCase() === selectedSubTag.toLowerCase()));
    }
    if (sortBy === 'alphabetical') {
      list.sort((a, b) => a.title.localeCompare(b.title));
    }
    return list;
  }, [categoryArticles, selectedSubTag, sortBy]);

  // Filter and sort characters
  const filteredCharacters = useMemo(() => {
    let list = [...categoryCharacters];
    if (selectedSubTag) {
      list = list.filter(
        (c) =>
          c.series.toLowerCase().includes(selectedSubTag.toLowerCase()) ||
          c.traits.some((t) => t.value.toLowerCase().includes(selectedSubTag.toLowerCase()))
      );
    }
    if (sortBy === 'alphabetical') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }
    return list;
  }, [categoryCharacters, selectedSubTag, sortBy]);

  const tabs: { id: TabType; label: string; count: number; icon: React.ReactNode }[] = [
    {
      id: 'all',
      label: 'Hub Overview',
      count:
        categoryCharacters.length +
        categoryArticles.length +
        categoryGalleries.length +
        categoryMedia.length +
        categoryEvents.length +
        categoryMerchandise.length,
      icon: <SlidersHorizontal className="w-3.5 h-3.5" />,
    },
    { id: 'characters', label: 'Characters', count: categoryCharacters.length, icon: <User className="w-3.5 h-3.5" /> },
    { id: 'articles', label: 'Articles', count: categoryArticles.length, icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: 'gallery', label: 'Gallery', count: categoryGalleries.length, icon: <ImageIcon className="w-3.5 h-3.5" /> },
    { id: 'media', label: 'Media & Audio', count: categoryMedia.length, icon: <Play className="w-3.5 h-3.5" /> },
    { id: 'events', label: 'Events', count: categoryEvents.length, icon: <Calendar className="w-3.5 h-3.5" /> },
    { id: 'merchandise', label: 'Merchandise', count: categoryMerchandise.length, icon: <ShoppingBag className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="space-y-10 pb-20">
      {/* Category Hero Header */}
      <section className="relative rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-950">
        <div className="absolute inset-0 opacity-30">
          <img
            src={category.bannerImage}
            alt={category.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent" />
        </div>

        <div className="relative p-6 sm:p-10 lg:p-14 space-y-4 max-w-4xl">
          <div className="flex items-center gap-3">
            <span
              className="text-xs font-mono font-bold tracking-wider px-2.5 py-1 rounded bg-neutral-900/80 border border-neutral-700"
              style={{ color: category.accent }}
            >
              FANDOM HUB // {category.id.toUpperCase()}
            </span>
            <span className="text-neutral-400 text-xs font-mono">
              {categoryCharacters.length} Characters · {categoryArticles.length} Articles · {categoryEvents.length} Events
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight">
            {category.name}
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-3xl">
            {category.description}
          </p>

          {/* Subtags / Franchise Filter */}
          <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-neutral-400 font-mono">Filter Tag:</span>
            <button
              onClick={() => setSelectedSubTag(null)}
              className={`px-3 py-1 rounded-lg transition-colors font-medium ${
                selectedSubTag === null
                  ? 'bg-rose-600 text-white'
                  : 'bg-neutral-900/80 text-neutral-400 hover:text-neutral-200 border border-neutral-800'
              }`}
            >
              All Topics
            </button>
            {category.subTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedSubTag(selectedSubTag === tag ? null : tag)}
                className={`px-3 py-1 rounded-lg transition-colors font-medium ${
                  selectedSubTag === tag
                    ? 'bg-rose-600 text-white'
                    : 'bg-neutral-900/80 text-neutral-400 hover:text-neutral-200 border border-neutral-800'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation Tabs & Sorting Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
        {/* Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-neutral-800 text-white shadow-sm border border-neutral-700'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              <span className="font-mono text-[10px] text-neutral-400 ml-0.5">
                ({tab.count})
              </span>
            </button>
          ))}
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2 text-xs text-neutral-400 shrink-0">
          <span>Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="bg-neutral-900 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs text-neutral-200 focus:outline-none focus:border-rose-500"
          >
            <option value="featured">Featured / Curated</option>
            <option value="alphabetical">Alphabetical (A-Z)</option>
            <option value="newest">Recent Highlights</option>
          </select>
        </div>
      </div>

      {/* Tab: All / Overview Sections */}
      {(activeTab === 'all' || activeTab === 'characters') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
              <User className="w-5 h-5 text-rose-500" />
              <span>Character Profiles ({filteredCharacters.length})</span>
            </h2>
            {activeTab === 'all' && (
              <button
                onClick={() => setActiveTab('characters')}
                className="text-xs text-neutral-400 hover:text-white flex items-center gap-1"
              >
                <span>View All ({categoryCharacters.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {(activeTab === 'all' ? filteredCharacters.slice(0, 5) : filteredCharacters).map(
              (char) => {
                const bookmarked = isItemBookmarked(char.id);
                return (
                  <div
                    key={char.id}
                    onClick={() => onSelectCharacter(char.id)}
                    className="group bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 rounded-2xl overflow-hidden cursor-pointer transition-all flex flex-col justify-between"
                  >
                    <div className="relative aspect-square overflow-hidden bg-neutral-950">
                      <img
                        src={char.image}
                        alt={char.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleBookmark({
                            id: char.id,
                            type: 'character',
                            title: char.name,
                            category: char.category,
                            thumbnail: char.image,
                            subtitle: `${char.role} (${char.series})`,
                          });
                        }}
                        className={`absolute top-2.5 right-2.5 p-1.5 rounded-lg backdrop-blur-md border transition-all ${
                          bookmarked
                            ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                            : 'bg-neutral-950/60 border-neutral-800 text-neutral-400 hover:text-white'
                        }`}
                        title="Bookmark character"
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
                      <div>
                        <div className="text-[10px] font-mono text-rose-400 truncate">
                          {char.series}
                        </div>
                        <h3 className="text-sm font-bold font-display text-white group-hover:text-rose-400 transition-colors truncate">
                          {char.name}
                        </h3>
                        <p className="text-[11px] text-neutral-400 line-clamp-2 mt-1">
                          {char.biography}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-neutral-400">
                        <span className="truncate">{char.role}</span>
                        <span className="text-neutral-200 group-hover:text-rose-400 transition-colors">
                          Profile →
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </section>
      )}

      {/* Tab: Articles */}
      {(activeTab === 'all' || activeTab === 'articles') && (
        <section className="space-y-4 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-rose-500" />
              <span>Featured Articles & Journalism ({filteredArticles.length})</span>
            </h2>
            {activeTab === 'all' && (
              <button
                onClick={() => setActiveTab('articles')}
                className="text-xs text-neutral-400 hover:text-white flex items-center gap-1"
              >
                <span>View All ({categoryArticles.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredArticles.map((article) => {
              const bookmarked = isItemBookmarked(article.id);
              return (
                <div
                  key={article.id}
                  onClick={() => onSelectArticle(article.id)}
                  className="group bg-neutral-900/50 border border-neutral-800 hover:border-neutral-700 rounded-2xl overflow-hidden cursor-pointer transition-all flex flex-col justify-between"
                >
                  <div className="aspect-[16/9] relative overflow-hidden bg-neutral-950">
                    <img
                      src={article.thumbnail}
                      alt={article.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark({
                          id: article.id,
                          type: 'article',
                          title: article.title,
                          category: article.category,
                          thumbnail: article.thumbnail,
                          subtitle: `By ${article.author} · ${article.readTime}`,
                        });
                      }}
                      className={`absolute top-2.5 right-2.5 p-1.5 rounded-lg backdrop-blur-md border transition-all ${
                        bookmarked
                          ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                          : 'bg-neutral-950/60 border-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                      title="Bookmark article"
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center gap-2 text-[11px] text-neutral-400 font-mono">
                        <span>{article.author}</span>
                        <span>·</span>
                        <span>{article.readTime}</span>
                      </div>
                      <h3 className="text-base font-bold font-display text-white mt-1 group-hover:text-rose-400 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-xs text-neutral-400 line-clamp-2 mt-2 leading-relaxed">
                        {article.summary}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
                      <span>{article.date}</span>
                      <span className="text-neutral-200 group-hover:text-rose-400 flex items-center gap-1 font-medium transition-colors">
                        Read Story <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Tab: Image Gallery with Lightbox */}
      {(activeTab === 'all' || activeTab === 'gallery') && (
        <section className="space-y-4 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-rose-500" />
              <span>Image Gallery & Artworks ({categoryGalleries.length})</span>
            </h2>
            <span className="text-xs text-neutral-400 font-mono">
              Click any image to launch fullscreen Lightbox
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {categoryGalleries.map((gal, idx) => (
              <div
                key={gal.id}
                onClick={() => onOpenLightbox(categoryGalleries, idx)}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 cursor-pointer shadow-lg"
              >
                <img
                  src={gal.imageUrl}
                  alt={gal.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="text-[10px] font-mono text-rose-400 uppercase">
                    {gal.franchise}
                  </div>
                  <h4 className="text-sm font-semibold text-white group-hover:text-rose-400 transition-colors truncate">
                    {gal.title}
                  </h4>
                  <div className="text-[11px] text-neutral-400 truncate mt-0.5">
                    Artist: {gal.photographerOrArtist}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tab: Media & Audio Clips */}
      {(activeTab === 'all' || activeTab === 'media') && (
        <section className="space-y-4 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
              <Play className="w-5 h-5 text-rose-500" />
              <span>Trailers, Podcasts & Audio Clips ({categoryMedia.length})</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {categoryMedia.map((med) => {
              const bookmarked = isItemBookmarked(med.id);
              return (
                <div
                  key={med.id}
                  onClick={() => onSelectMedia(med.id)}
                  className="group bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 rounded-2xl overflow-hidden cursor-pointer transition-all flex flex-col justify-between"
                >
                  <div className="aspect-video relative overflow-hidden bg-neutral-950">
                    <img
                      src={med.thumbnail}
                      alt={med.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-neutral-950/40 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        {med.isAudio ? <Headphones className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 rounded text-[11px] font-mono text-neutral-300">
                      {med.duration}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark({
                          id: med.id,
                          type: 'media',
                          title: med.title,
                          category: med.category,
                          thumbnail: med.thumbnail,
                          subtitle: `${med.type.toUpperCase()} · ${med.duration}`,
                        });
                      }}
                      className={`absolute top-2.5 right-2.5 p-1.5 rounded-lg backdrop-blur-md border transition-all ${
                        bookmarked
                          ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                          : 'bg-neutral-950/60 border-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                      title="Bookmark media"
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  <div className="p-4 space-y-2">
                    <div className="text-[11px] font-mono text-rose-400 uppercase">
                      {med.type.replace('_', ' ')}
                    </div>
                    <h3 className="text-sm font-semibold text-white group-hover:text-rose-400 transition-colors line-clamp-2">
                      {med.title}
                    </h3>
                    <p className="text-xs text-neutral-400 line-clamp-2">
                      {med.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Tab: Events */}
      {(activeTab === 'all' || activeTab === 'events') && (
        <section className="space-y-4 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-rose-500" />
              <span>Conventions, Watch Parties & Meetups ({categoryEvents.length})</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {categoryEvents.map((evt) => {
              const bookmarked = isItemBookmarked(evt.id);
              return (
                <div
                  key={evt.id}
                  className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-5 space-y-3 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-rose-400">{evt.eventType}</span>
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
                        className={`p-1.5 rounded-lg border transition-all ${
                          bookmarked
                            ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                            : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                        }`}
                        title="Bookmark event"
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                    <h3 className="text-base font-bold font-display text-white mt-1">
                      {evt.title}
                    </h3>
                    <div className="text-xs text-neutral-400 font-mono mt-0.5">{evt.date}</div>
                    <p className="text-xs text-neutral-300 mt-2 leading-relaxed">
                      {evt.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
                    <span className="truncate">{evt.location}</span>
                    <span className="text-neutral-200 font-mono shrink-0 ml-2">{evt.attendeesEstimate}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Tab: Merchandise Showcase */}
      {(activeTab === 'all' || activeTab === 'merchandise') && categoryMerchandise.length > 0 && (
        <section className="space-y-4 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-rose-500" />
              <span>Official Merchandise & Collectibles ({categoryMerchandise.length})</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {categoryMerchandise.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectMerchandise(item.id)}
                className="group bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 rounded-2xl overflow-hidden cursor-pointer transition-all flex flex-col justify-between"
              >
                <div className="aspect-square relative overflow-hidden bg-neutral-950">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {item.badge && (
                    <div className="absolute top-2.5 left-2.5 bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase">
                      {item.badge}
                    </div>
                  )}
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="text-[10px] font-mono text-neutral-400">{item.franchise}</div>
                    <h3 className="text-sm font-bold font-display text-white group-hover:text-rose-400 transition-colors line-clamp-2 mt-0.5">
                      {item.name}
                    </h3>
                    <p className="text-xs text-neutral-400 line-clamp-2 mt-1">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between">
                    <span className="text-base font-bold font-mono text-white">
                      ${item.price.toFixed(2)}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(item);
                      }}
                      className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

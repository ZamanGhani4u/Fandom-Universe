import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  CategoryId, 
  Article, 
  Character, 
  GalleryItem, 
  MediaItem, 
  MerchandiseItem, 
  BookmarkRecord, 
  CartItem 
} from './data/types.ts';
import { CATEGORIES, CATEGORY_LIST } from './data/categories.ts';
import { ARTICLES } from './data/articles.ts';
import { CHARACTERS } from './data/characters.ts';
import { MEDIA_ITEMS } from './data/media.ts';
import { MERCHANDISE_ITEMS } from './data/merchandise.ts';
import { 
  getSavedBookmarks, 
  saveBookmark, 
  removeBookmark, 
  isBookmarked, 
  getSavedCart, 
  addToCart, 
  updateCartQuantity, 
  clearCart, 
  getAndIncrementVisitorCount 
} from './utils/storage.ts';

// Components
import { VisitorClockBar } from './components/VisitorClockBar.tsx';
import { Header } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';
import { Breadcrumbs } from './components/Breadcrumbs.tsx';
import { ChatbotWidget } from './components/ChatbotWidget.tsx';
import { CartModal } from './components/CartModal.tsx';
import { SearchModal } from './components/SearchModal.tsx';
import { AuthModal } from './components/AuthModal.tsx';
import { MediaModal } from './components/MediaModal.tsx';
import { LightboxModal } from './components/LightboxModal.tsx';
import { CharacterModal } from './components/CharacterModal.tsx';
import { MerchandiseModal } from './components/MerchandiseModal.tsx';
import { ArticleModal } from './components/ArticleModal.tsx';

// Views
import { HomeView } from './views/HomeView.tsx';
import { CategoryHubView } from './views/CategoryHubView.tsx';
import { TrailersView } from './views/TrailersView.tsx';
import { MerchandiseView } from './views/MerchandiseView.tsx';
import { EventsView } from './views/EventsView.tsx';
import { BookmarksView } from './views/BookmarksView.tsx';
import { AboutView } from './views/AboutView.tsx';
import { ContactView } from './views/ContactView.tsx';

export function App() {
  // Navigation State
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('anime');

  // Interactive Detail Modals
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(null);
  const [selectedMediaId, setSelectedMediaId] = useState<string | null>(null);
  const [selectedMerchandiseId, setSelectedMerchandiseId] = useState<string | null>(null);

  // Lightbox State
  const [lightboxData, setLightboxData] = useState<{
    items: GalleryItem[];
    currentIndex: number;
  } | null>(null);

  // Cart & Bookmarks State
  const [cartItems, setCartItems] = useState<CartItem[]>(() => getSavedCart());
  const [bookmarks, setBookmarks] = useState<BookmarkRecord[]>(() => getSavedBookmarks());
  const [visitorCount, setVisitorCount] = useState<number>(() => getAndIncrementVisitorCount());

  // Global Dialogs
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Active item objects for modals
  const activeArticle = useMemo(
    () => (selectedArticleId ? ARTICLES.find((a) => a.id === selectedArticleId) || null : null),
    [selectedArticleId]
  );
  const activeCharacter = useMemo(
    () => (selectedCharacterId ? CHARACTERS.find((c) => c.id === selectedCharacterId) || null : null),
    [selectedCharacterId]
  );
  const activeMedia = useMemo(
    () => (selectedMediaId ? MEDIA_ITEMS.find((m) => m.id === selectedMediaId) || null : null),
    [selectedMediaId]
  );
  const activeMerchandise = useMemo(
    () => (selectedMerchandiseId ? MERCHANDISE_ITEMS.find((m) => m.id === selectedMerchandiseId) || null : null),
    [selectedMerchandiseId]
  );

  // Scroll to top upon navigation
  const handleNavigate = useCallback((view: string, categoryId?: CategoryId) => {
    if (view === 'category' || categoryId) {
      setSelectedCategory(categoryId || 'anime');
      setCurrentView('category');
    } else if (view === 'hubs') {
      setCurrentView('category');
    } else {
      setCurrentView(view);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleNavigateToCategory = useCallback((catId: CategoryId) => {
    setSelectedCategory(catId);
    setCurrentView('category');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Cart handlers
  const handleAddToCart = useCallback((merch: MerchandiseItem, quantity = 1) => {
    const updated = addToCart(merch, quantity);
    setCartItems([...updated]);
  }, []);

  const handleUpdateCartQuantity = useCallback((merchandiseId: string, quantity: number) => {
    const updated = updateCartQuantity(merchandiseId, quantity);
    setCartItems([...updated]);
  }, []);

  const handleClearCart = useCallback(() => {
    const updated = clearCart();
    setCartItems([...updated]);
  }, []);

  // Bookmarking Handlers
  const handleToggleBookmark = useCallback((target: {
    id: string;
    type: any;
    title: string;
    category: CategoryId;
    thumbnail?: string;
    subtitle?: string;
  }) => {
    if (isBookmarked(target.id)) {
      const updated = removeBookmark(target.id);
      setBookmarks([...updated]);
    } else {
      const record: BookmarkRecord = {
        targetId: target.id,
        type: target.type,
        title: target.title,
        category: target.category,
        thumbnail: target.thumbnail,
        subtitle: target.subtitle,
        savedAt: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
      };
      const updated = saveBookmark(record);
      setBookmarks([...updated]);
    }
  }, []);

  const handleRemoveBookmark = useCallback((targetId: string) => {
    const updated = removeBookmark(targetId);
    setBookmarks([...updated]);
  }, []);

  const handleClearAllBookmarks = useCallback(() => {
    try {
      localStorage.removeItem('fandomverse_bookmarks');
      setBookmarks([]);
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Lightbox Handlers
  const handleOpenLightbox = useCallback((items: GalleryItem[], index: number) => {
    setLightboxData({ items, currentIndex: index });
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setLightboxData(null);
  }, []);

  // Cart badge quantity count
  const cartBadgeCount = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.quantity, 0),
    [cartItems]
  );

  // Dynamic Breadcrumb Trail
  const breadcrumbItems = useMemo(() => {
    if (currentView === 'home') return [];
    if (currentView === 'category') {
      return [
        { label: 'Category Hubs', view: 'category', categoryId: selectedCategory },
        { label: CATEGORIES[selectedCategory]?.name || selectedCategory },
      ];
    }
    if (currentView === 'trailers') return [{ label: 'Trailers Theater' }];
    if (currentView === 'merchandise') return [{ label: 'Merchandise Showcase' }];
    if (currentView === 'events') return [{ label: 'Events & Conventions' }];
    if (currentView === 'bookmarks') return [{ label: 'My Saved Bookmarks' }];
    if (currentView === 'about') return [{ label: 'About FandomVerse' }];
    if (currentView === 'contact') return [{ label: 'Contact & Radar' }];
    return [{ label: currentView }];
  }, [currentView, selectedCategory]);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col selection:bg-rose-500 selection:text-white antialiased font-sans">
      {/* 1. Real-Time Clock & Visitor Counter Status Bar */}
      <VisitorClockBar />

      {/* 2. Primary Navigation Header */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        cartCount={cartBadgeCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        bookmarkCount={bookmarks.length}
      />

      {/* 3. Main Content Stage */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation Trail */}
        {breadcrumbItems.length > 0 && (
          <Breadcrumbs items={breadcrumbItems} onNavigate={handleNavigate} />
        )}

        {/* View Switching */}
        {currentView === 'home' && (
          <HomeView
            onNavigateToCategory={handleNavigateToCategory}
            onNavigate={handleNavigate}
            onSelectArticle={setSelectedArticleId}
            onSelectMedia={setSelectedMediaId}
          />
        )}

        {currentView === 'category' && (
          <CategoryHubView
            categoryId={selectedCategory}
            onSelectArticle={setSelectedArticleId}
            onSelectCharacter={setSelectedCharacterId}
            onSelectMedia={setSelectedMediaId}
            onSelectMerchandise={setSelectedMerchandiseId}
            onOpenLightbox={handleOpenLightbox}
            onToggleBookmark={handleToggleBookmark}
            isItemBookmarked={isBookmarked}
            onAddToCart={handleAddToCart}
          />
        )}

        {currentView === 'trailers' && (
          <TrailersView
            onSelectMedia={setSelectedMediaId}
            onToggleBookmark={handleToggleBookmark}
            isItemBookmarked={isBookmarked}
          />
        )}

        {currentView === 'merchandise' && (
          <MerchandiseView
            onSelectMerchandise={setSelectedMerchandiseId}
            onAddToCart={handleAddToCart}
            cartItems={cartItems}
            onOpenCart={() => setIsCartOpen(true)}
            onToggleBookmark={handleToggleBookmark}
            isItemBookmarked={isBookmarked}
          />
        )}

        {currentView === 'events' && (
          <EventsView
            onToggleBookmark={handleToggleBookmark}
            isItemBookmarked={isBookmarked}
          />
        )}

        {currentView === 'bookmarks' && (
          <BookmarksView
            bookmarks={bookmarks}
            onRemoveBookmark={handleRemoveBookmark}
            onClearAll={handleClearAllBookmarks}
            onSelectArticle={setSelectedArticleId}
            onSelectCharacter={setSelectedCharacterId}
            onSelectMedia={setSelectedMediaId}
            onSelectMerchandise={setSelectedMerchandiseId}
            onNavigateToCategory={handleNavigateToCategory}
          />
        )}

        {currentView === 'about' && <AboutView />}

        {currentView === 'contact' && <ContactView />}
      </main>

      {/* 4. Quiet Structural Footer */}
      <Footer
        onNavigateToCategory={handleNavigateToCategory}
        onNavigate={handleNavigate}
        visitorCount={visitorCount}
      />

      {/* 5. Floating AI-Powered Rule-Based Chatbot */}
      <ChatbotWidget onNavigate={handleNavigate} />

      {/* 6. Modals & Dialogs */}
      {/* Temporary Cart Slide-Over */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onClearCart={handleClearCart}
        onNavigateToMerchandise={() => handleNavigate('merchandise')}
      />

      {/* Global Search Dialog */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectArticle={setSelectedArticleId}
        onSelectCharacter={setSelectedCharacterId}
        onSelectMedia={setSelectedMediaId}
        onSelectMerchandise={setSelectedMerchandiseId}
        onSelectCategory={handleNavigateToCategory}
      />

      {/* Dummy Authentication Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      {/* Article Reader Modal */}
      <ArticleModal
        article={activeArticle}
        onClose={() => setSelectedArticleId(null)}
        isBookmarked={activeArticle ? isBookmarked(activeArticle.id) : false}
        onToggleBookmark={(art) =>
          handleToggleBookmark({
            id: art.id,
            type: 'article',
            title: art.title,
            category: art.category,
            thumbnail: art.thumbnail,
            subtitle: `By ${art.author} · ${art.readTime}`,
          })
        }
        onSelectRelatedArticle={setSelectedArticleId}
      />

      {/* Character Profile Modal */}
      <CharacterModal
        character={activeCharacter}
        onClose={() => setSelectedCharacterId(null)}
        isBookmarked={activeCharacter ? isBookmarked(activeCharacter.id) : false}
        onToggleBookmark={(char) =>
          handleToggleBookmark({
            id: char.id,
            type: 'character',
            title: char.name,
            category: char.category,
            thumbnail: char.image,
            subtitle: `${char.role} (${char.series})`,
          })
        }
      />

      {/* Media Video & Audio Player Modal */}
      <MediaModal
        media={activeMedia}
        onClose={() => setSelectedMediaId(null)}
      />

      {/* Merchandise Detail Modal */}
      <MerchandiseModal
        item={activeMerchandise}
        onClose={() => setSelectedMerchandiseId(null)}
        onAddToCart={handleAddToCart}
        isBookmarked={activeMerchandise ? isBookmarked(activeMerchandise.id) : false}
        onToggleBookmark={(item) =>
          handleToggleBookmark({
            id: item.id,
            type: 'merchandise',
            title: item.name,
            category: item.category,
            thumbnail: item.image,
            subtitle: `${item.franchise} · $${item.price.toFixed(2)}`,
          })
        }
      />

      {/* Gallery Lightbox Carousel Modal */}
      {lightboxData && (
        <LightboxModal
          isOpen={Boolean(lightboxData)}
          onClose={handleCloseLightbox}
          items={lightboxData.items}
          currentIndex={lightboxData.currentIndex}
          onSelectIndex={(newIdx) =>
            setLightboxData((prev) => (prev ? { ...prev, currentIndex: newIdx } : null))
          }
        />
      )}
    </div>
  );
}

export default App;

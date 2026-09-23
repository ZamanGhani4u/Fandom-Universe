import React, { useState } from 'react';
import { Search, ShoppingBag, Bookmark, User, Menu, X } from 'lucide-react';
import { CategoryId } from '../data/types.ts';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string, categoryId?: CategoryId) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenAuth: () => void;
  bookmarkCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenAuth,
  bookmarkCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'hubs', label: 'Categories' },
    { id: 'trailers', label: 'Trailers' },
    { id: 'merchandise', label: 'Merchandise' },
    { id: 'events', label: 'Events' },
    { id: 'bookmarks', label: `Saved (${bookmarkCount})` },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('home');
          }}
          className="text-2xl font-bold tracking-tight text-white font-display hover:text-rose-400 transition-colors whitespace-nowrap"
        >
          FandomVerse
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-neutral-300">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`transition-colors whitespace-nowrap py-1 relative ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-neutral-400 hover:text-neutral-100'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-500 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Global Search Button */}
          <button
            onClick={onOpenSearch}
            className="p-2 text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-medium"
            title="Search FandomVerse"
            aria-label="Search FandomVerse"
          >
            <Search className="w-4 h-4" />
            <span className="hidden xl:inline text-neutral-400">Search</span>
          </button>

          {/* Bookmarks quick button on tablet/desktop */}
          <button
            onClick={() => onNavigate('bookmarks')}
            className="p-2 text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors relative"
            title="Bookmarks"
            aria-label="Bookmarks"
          >
            <Bookmark className="w-4 h-4" />
            {bookmarkCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-neutral-950 font-bold text-[10px] rounded-full flex items-center justify-center font-mono">
                {bookmarkCount}
              </span>
            )}
          </button>

          {/* Cart launcher */}
          <button
            onClick={onOpenCart}
            className="p-2 text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors relative"
            title="Shopping Cart"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white font-bold text-[10px] rounded-full flex items-center justify-center font-mono">
                {cartCount}
              </span>
            )}
          </button>

          {/* Dummy Login/Signup */}
          <button
            onClick={onOpenAuth}
            className="px-3 py-1.5 text-xs font-semibold text-white bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
          >
            <User className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign In</span>
          </button>

          {/* Mobile menu hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-neutral-900 border-b border-neutral-800 px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === item.id
                  ? 'bg-neutral-800 text-rose-400'
                  : 'text-neutral-300 hover:bg-neutral-800/60'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

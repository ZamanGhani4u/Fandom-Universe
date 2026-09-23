import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Image as ImageIcon, Camera, Maximize2 } from 'lucide-react';
import { GalleryItem } from '../data/types.ts';
import { CATEGORIES } from '../data/categories.ts';

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: GalleryItem[];
  currentIndex: number;
  onSelectIndex: (index: number) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  onClose,
  items,
  currentIndex,
  onSelectIndex,
}) => {
  const currentItem = items[currentIndex];

  const handlePrev = useCallback(() => {
    onSelectIndex(currentIndex === 0 ? items.length - 1 : currentIndex - 1);
  }, [currentIndex, items.length, onSelectIndex]);

  const handleNext = useCallback(() => {
    onSelectIndex(currentIndex === items.length - 1 ? 0 : currentIndex + 1);
  }, [currentIndex, items.length, onSelectIndex]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !currentItem) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/95 backdrop-blur-xl flex flex-col justify-between animate-in fade-in duration-200">
      {/* Top Controls */}
      <div className="p-4 sm:p-6 flex items-center justify-between text-neutral-100 z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-rose-400">
            <ImageIcon className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold font-display truncate max-w-sm sm:max-w-md">
              {currentItem.title}
            </h3>
            <div className="text-xs text-neutral-400">
              {CATEGORIES[currentItem.category]?.name} · {currentItem.franchise}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-neutral-400 mr-2">
            {currentIndex + 1} / {items.length}
          </span>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-lg transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div className="relative flex-1 flex items-center justify-center p-4 sm:p-8 min-h-0">
        {/* Prev Arrow */}
        <button
          onClick={handlePrev}
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 bg-neutral-900/80 hover:bg-neutral-800 text-white rounded-full border border-neutral-700/60 shadow-xl transition-all hover:scale-105 z-10"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Current Image */}
        <div className="max-w-5xl max-h-[68vh] flex items-center justify-center overflow-hidden rounded-xl border border-neutral-800/80 bg-neutral-950 shadow-2xl">
          <img
            src={currentItem.imageUrl}
            alt={currentItem.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain max-h-[68vh] transition-transform duration-300"
          />
        </div>

        {/* Next Arrow */}
        <button
          onClick={handleNext}
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 bg-neutral-900/80 hover:bg-neutral-800 text-white rounded-full border border-neutral-700/60 shadow-xl transition-all hover:scale-105 z-10"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Caption & Carousel Strip */}
      <div className="p-4 sm:p-6 bg-neutral-950/80 border-t border-neutral-900 flex flex-col gap-3">
        <div className="max-w-4xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <p className="text-neutral-300 text-center sm:text-left">
            {currentItem.caption}
          </p>
          <div className="flex items-center gap-1.5 text-neutral-400 font-mono text-[11px] shrink-0">
            <Camera className="w-3.5 h-3.5 text-neutral-400" />
            <span>Credit: {currentItem.photographerOrArtist}</span>
          </div>
        </div>

        {/* Bottom thumbnail strip */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto py-1 max-w-2xl mx-auto">
          {items.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => onSelectIndex(idx)}
              className={`w-12 h-12 rounded-lg overflow-hidden shrink-0 border transition-all ${
                currentIndex === idx
                  ? 'border-rose-500 scale-105 shadow-md shadow-rose-950'
                  : 'border-neutral-800 opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

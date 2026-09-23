import React, { useState } from 'react';
import { X, ShoppingBag, Bookmark, Star, Check, ShieldCheck, Truck } from 'lucide-react';
import { MerchandiseItem } from '../data/types.ts';
import { CATEGORIES } from '../data/categories.ts';

interface MerchandiseModalProps {
  item: MerchandiseItem | null;
  onClose: () => void;
  onAddToCart: (item: MerchandiseItem, quantity: number) => void;
  isBookmarked: boolean;
  onToggleBookmark: (item: MerchandiseItem) => void;
}

export const MerchandiseModal: React.FC<MerchandiseModalProps> = ({
  item,
  onClose,
  onAddToCart,
  isBookmarked,
  onToggleBookmark,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!item) return null;

  const handleAdd = () => {
    onAddToCart(item, quantity);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm p-4 sm:p-6 flex items-center justify-center animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden text-neutral-100 flex flex-col md:flex-row relative">
        {/* Top Action Bar */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          <button
            onClick={() => onToggleBookmark(item)}
            className={`p-2 rounded-xl backdrop-blur-md border transition-all ${
              isBookmarked
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                : 'bg-neutral-900/80 border-neutral-700/60 text-neutral-300 hover:text-white'
            }`}
            title={isBookmarked ? 'Bookmarked' : 'Add to Bookmarks'}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-neutral-900/80 border border-neutral-700/60 text-neutral-300 hover:text-white backdrop-blur-md transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Product Image Column */}
        <div className="w-full md:w-1/2 h-64 md:h-auto bg-neutral-900 relative flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-neutral-800">
          <img
            src={item.image}
            alt={item.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          {item.badge && (
            <div className="absolute top-4 left-4 bg-rose-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-md tracking-wider uppercase">
              {item.badge}
            </div>
          )}
        </div>

        {/* Product Details Column */}
        <div className="w-full md:w-1/2 p-5 sm:p-6 flex flex-col justify-between space-y-4">
          <div>
            <div className="text-xs font-mono text-rose-400 uppercase tracking-wider">
              {CATEGORIES[item.category]?.name} · {item.type}
            </div>
            <h3 className="text-lg sm:text-xl font-bold font-display text-white mt-1">
              {item.name}
            </h3>
            <div className="text-xs text-neutral-400 mt-0.5">{item.franchise}</div>

            {/* Price & Rating */}
            <div className="flex items-center justify-between mt-3 pb-3 border-b border-neutral-800">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold font-mono text-white">
                  ${item.price.toFixed(2)}
                </span>
                {item.originalPrice && (
                  <span className="text-xs line-through text-neutral-500 font-mono">
                    ${item.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1 text-xs text-amber-400">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="font-mono font-semibold">{item.rating}</span>
                <span className="text-neutral-500">({item.reviewsCount})</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-neutral-300 leading-relaxed mt-3">
              {item.description}
            </p>

            {/* Specifications */}
            <div className="mt-4 pt-3 border-t border-neutral-800/80 space-y-1.5 text-[11px]">
              <div className="text-xs font-semibold font-mono text-neutral-400 uppercase">
                Item Specifications
              </div>
              {Object.entries(item.specs).map(([key, val]) => (
                <div key={key} className="flex justify-between text-neutral-400">
                  <span>{key}</span>
                  <span className="text-neutral-200 font-medium">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Add To Cart Controls */}
          <div className="pt-3 border-t border-neutral-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center border border-neutral-700 rounded-lg overflow-hidden bg-neutral-900">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-2.5 py-1 text-neutral-400 hover:text-white"
                >
                  -
                </button>
                <span className="px-3 text-xs font-mono font-semibold text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-2.5 py-1 text-neutral-400 hover:text-white"
                >
                  +
                </button>
              </div>

              <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> In Stock & Ready
              </span>
            </div>

            <button
              onClick={handleAdd}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                addedAnimation
                  ? 'bg-emerald-600 text-white'
                  : 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-950/50'
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Temporary Cart</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

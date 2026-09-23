import React, { useState, useMemo } from 'react';
import { ShoppingBag, Star, Filter, ArrowUpDown, Bookmark, Check, AlertCircle } from 'lucide-react';
import { CategoryId, MerchandiseItem, CartItem } from '../data/types.ts';
import { CATEGORIES, CATEGORY_LIST } from '../data/categories.ts';
import { MERCHANDISE_ITEMS } from '../data/merchandise.ts';

interface MerchandiseViewProps {
  onSelectMerchandise: (id: string) => void;
  onAddToCart: (item: MerchandiseItem) => void;
  cartItems: CartItem[];
  onOpenCart: () => void;
  onToggleBookmark: (target: { id: string; type: any; title: string; category: CategoryId; thumbnail?: string; subtitle?: string }) => void;
  isItemBookmarked: (id: string) => boolean;
}

export const MerchandiseView: React.FC<MerchandiseViewProps> = ({
  onSelectMerchandise,
  onAddToCart,
  cartItems,
  onOpenCart,
  onToggleBookmark,
  isItemBookmarked,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [sortOption, setSortOption] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});

  const types = ['all', 'Figure', 'Apparel', 'Plushie', 'Collectibles', 'Lightstick', 'Print & Art'];

  const handleQuickAdd = (item: MerchandiseItem, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(item);
    setAddedItemIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1200);
  };

  const filteredItems = useMemo(() => {
    let list = MERCHANDISE_ITEMS.filter((item) => {
      const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchType = selectedType === 'all' || item.type.toLowerCase() === selectedType.toLowerCase();
      return matchCategory && matchType;
    });

    if (sortOption === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [selectedCategory, selectedType, sortOption]);

  const cartSubtotal = cartItems.reduce(
    (sum, item) => sum + item.merchandise.price * item.quantity,
    0
  );
  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="space-y-8 pb-24">
      {/* Header & SRS Cart Disclaimer */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-rose-400">
          <ShoppingBag className="w-4 h-4" />
          <span>Collector Artifacts & Fan Gear</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
          Merchandise Showcase
        </h1>
        <p className="text-sm text-neutral-400 max-w-2xl">
          Officially inspired collectibles, heavyweight apparel, plushies, and concert gear. Add items to your temporary shopping cart to calculate total billing estimates.
        </p>

        {/* SRS Constraint Banner */}
        <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl flex items-center gap-3 text-xs text-neutral-300">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong>Aptech SRS Note:</strong> This showcase includes temporary cart functionality allowing visitors to calculate total billing amounts. Live payment and checkout are not included.
          </span>
        </div>
      </div>

      {/* Persistent Sticky Cart Summary Bar if items in cart */}
      {totalCartCount > 0 && (
        <div className="sticky top-20 z-30 bg-neutral-900/95 border border-neutral-700/80 backdrop-blur-md rounded-2xl p-4 shadow-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-600/20 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-neutral-400">Temporary Shopping Cart</div>
              <div className="text-sm font-semibold text-white font-display">
                {totalCartCount} {totalCartCount === 1 ? 'item' : 'items'} · <span className="font-mono text-rose-400">${cartSubtotal.toFixed(2)} subtotal</span>
              </div>
            </div>
          </div>

          <button
            onClick={onOpenCart}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-semibold shadow-md transition-colors"
          >
            Review Cart & Total
          </button>
        </div>
      )}

      {/* Filters Bar */}
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

        {/* Type Filter & Sort Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-neutral-800/80">
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            <span className="text-xs text-neutral-400 font-mono mr-1">Type:</span>
            {types.map((t) => (
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

          <div className="flex items-center gap-2 text-xs text-neutral-400 shrink-0">
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>Sort:</span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as any)}
              className="bg-neutral-950 border border-neutral-800 rounded-lg px-2 py-1 text-xs text-neutral-200 focus:outline-none"
            >
              <option value="featured">Featured Picks</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Customer Rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* Merchandise Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item) => {
          const bookmarked = isItemBookmarked(item.id);
          const isAdded = addedItemIds[item.id];
          return (
            <div
              key={item.id}
              onClick={() => onSelectMerchandise(item.id)}
              className="group bg-neutral-900/50 border border-neutral-800 hover:border-neutral-700 rounded-2xl overflow-hidden cursor-pointer transition-all flex flex-col justify-between"
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
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleBookmark({
                      id: item.id,
                      type: 'merchandise',
                      title: item.name,
                      category: item.category,
                      thumbnail: item.image,
                      subtitle: `${item.franchise} · $${item.price.toFixed(2)}`,
                    });
                  }}
                  className={`absolute top-2.5 right-2.5 p-1.5 rounded-lg backdrop-blur-md border transition-all ${
                    bookmarked
                      ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                      : 'bg-neutral-950/60 border-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                  title="Bookmark merchandise"
                >
                  <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current' : ''}`} />
                </button>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-mono text-rose-400 uppercase">
                      {CATEGORIES[item.category]?.name}
                    </span>
                    <div className="flex items-center gap-1 text-amber-400">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="font-mono">{item.rating}</span>
                    </div>
                  </div>

                  <h3 className="text-sm font-bold font-display text-white group-hover:text-rose-400 transition-colors line-clamp-2 mt-1">
                    {item.name}
                  </h3>
                  <div className="text-xs text-neutral-400 mt-0.5">{item.franchise}</div>

                  <p className="text-xs text-neutral-400 line-clamp-2 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold font-mono text-white">
                      ${item.price.toFixed(2)}
                    </span>
                    {item.originalPrice && (
                      <span className="text-xs line-through text-neutral-500 ml-2 font-mono">
                        ${item.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={(e) => handleQuickAdd(item, e)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                      isAdded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-950/40'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

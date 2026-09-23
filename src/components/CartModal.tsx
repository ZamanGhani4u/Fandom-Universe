import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';
import { CartItem } from '../data/types.ts';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (merchandiseId: string, quantity: number) => void;
  onClearCart: () => void;
  onNavigateToMerchandise: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onClearCart,
  onNavigateToMerchandise,
}) => {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.merchandise.price * item.quantity,
    0
  );
  const estimatedTax = subtotal * 0.085; // 8.5%
  const grandTotal = subtotal > 0 ? subtotal + estimatedTax : 0;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-neutral-950 border-l border-neutral-800 h-full flex flex-col shadow-2xl text-neutral-100">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-rose-500" />
            <h2 className="text-lg font-semibold font-display">Temporary Shopping Cart</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-lg transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SRS Notice Disclaimer */}
        <div className="bg-amber-950/40 border-b border-amber-900/50 px-4 py-2.5 flex items-start gap-2 text-xs text-amber-200/90">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p>
            <strong className="font-semibold">Notice (Aptech SRS Specification):</strong> This merchandise showcase includes temporary cart functionality to calculate billing totals. Checkout and live transactions are not part of the website.
          </p>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-neutral-400">
              <div className="w-16 h-16 rounded-full bg-neutral-900 flex items-center justify-center mb-3 border border-neutral-800">
                <ShoppingBag className="w-8 h-8 text-neutral-600" />
              </div>
              <h3 className="text-base font-semibold text-neutral-200 font-display">Your cart is currently empty</h3>
              <p className="text-xs text-neutral-500 mt-1 max-w-xs">
                Explore our officially curated collectibles, apparel, plushies, and lightsticks across 7 fandoms.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onNavigateToMerchandise();
                }}
                className="mt-4 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <span>Browse Merchandise</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.merchandise.id}
                className="p-3 bg-neutral-900/70 border border-neutral-800/90 rounded-xl flex gap-3 items-center"
              >
                <img
                  src={item.merchandise.image}
                  alt={item.merchandise.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-lg object-cover bg-neutral-950 shrink-0 border border-neutral-800"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-medium text-white truncate">
                    {item.merchandise.name}
                  </h4>
                  <div className="text-[11px] text-neutral-400 flex items-center gap-1.5 mt-0.5">
                    <span>{item.merchandise.franchise}</span>
                    <span className="text-neutral-600">·</span>
                    <span className="font-mono text-rose-400">
                      ${item.merchandise.price.toFixed(2)}
                    </span>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center border border-neutral-700 bg-neutral-950 rounded-lg">
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.merchandise.id, item.quantity - 1)
                        }
                        className="p-1 text-neutral-400 hover:text-white"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-mono tabular-nums text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.merchandise.id, item.quantity + 1)
                        }
                        className="p-1 text-neutral-400 hover:text-white"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => onUpdateQuantity(item.merchandise.id, 0)}
                      className="text-neutral-500 hover:text-rose-400 p-1 transition-colors ml-auto"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Billing Breakdown */}
        {cartItems.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-neutral-800 bg-neutral-950/90 space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-neutral-400">
                <span>Merchandise Subtotal</span>
                <span className="font-mono tabular-nums text-neutral-200">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Estimated Sales Tax (8.5%)</span>
                <span className="font-mono tabular-nums text-neutral-200">
                  ${estimatedTax.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-white pt-2 border-t border-neutral-800">
                <span>Calculated Total Billing</span>
                <span className="font-mono tabular-nums text-rose-400 text-base">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={onClearCart}
                className="flex-1 py-2 px-3 border border-neutral-800 hover:bg-neutral-900 text-neutral-400 hover:text-neutral-200 rounded-lg text-xs font-medium transition-colors"
              >
                Clear Cart
              </button>
              <button
                onClick={() => {
                  onClose();
                  onNavigateToMerchandise();
                }}
                className="flex-1 py-2 px-3 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-semibold transition-colors text-center"
              >
                Continue Browsing
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

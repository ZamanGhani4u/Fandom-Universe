import React from 'react';
import { CategoryId } from '../data/types.ts';
import { CATEGORY_LIST } from '../data/categories.ts';
import { Heart, Compass, Shield, Users } from 'lucide-react';

interface FooterProps {
  onNavigateToCategory: (catId: CategoryId) => void;
  onNavigate: (view: string) => void;
  visitorCount: number;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateToCategory,
  onNavigate,
  visitorCount,
}) => {
  return (
    <footer className="border-t border-neutral-900 bg-neutral-950 text-neutral-400 text-xs mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-xl font-bold font-display text-white tracking-tight">
              FandomVerse
            </span>
            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
              The unified digital portal connecting pop culture fans across the globe. Curating character lore, official galleries, high-definition trailers, community events, and licensed collectibles.
            </p>

            <div className="pt-2 flex items-center gap-2 font-mono text-[11px] text-neutral-500">
              <Users className="w-3.5 h-3.5 text-neutral-400" />
              <span>Community Visits:</span>
              <span className="text-rose-400 font-semibold tabular-nums">
                {visitorCount.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Categories Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-200 font-mono">
              Fandom Hubs
            </h4>
            <ul className="space-y-2">
              {CATEGORY_LIST.map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => onNavigateToCategory(c.id)}
                    className="hover:text-rose-400 transition-colors text-left"
                  >
                    {c.name} Hub
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Nav Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-200 font-mono">
              Portal Directory
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('trailers')}
                  className="hover:text-rose-400 transition-colors"
                >
                  Trailers & Audio Theater
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('merchandise')}
                  className="hover:text-rose-400 transition-colors"
                >
                  Merchandise Showcase
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('events')}
                  className="hover:text-rose-400 transition-colors"
                >
                  Events & Conventions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('bookmarks')}
                  className="hover:text-rose-400 transition-colors"
                >
                  My Saved Bookmarks
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-rose-400 transition-colors"
                >
                  About & SRS Specs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-rose-400 transition-colors"
                >
                  Contact & GPS Location
                </button>
              </li>
            </ul>
          </div>

          {/* Compliance & Accreditation */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-200 font-mono">
              Specifications
            </h4>
            <p className="text-[11px] text-neutral-500 leading-relaxed">
              Engineered strictly per Aptech Limited SRS Guidelines. Pure client-side Single Page Application without server storage.
            </p>
            <div className="text-[10px] text-neutral-600 font-mono pt-2">
              Theme: Fandom Universe<br />
              Category: Web Innovation Unleashed
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500 font-mono">
          <div>© Aptech Limited · FandomVerse Version 1.0</div>
          <div className="flex items-center gap-4">
            <span>Client-Side Local Storage & Session State</span>
            <span>·</span>
            <span>Non-Commercial Fan Hub</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

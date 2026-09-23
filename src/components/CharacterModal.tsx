import React from 'react';
import { X, Bookmark, Quote, Zap, Shield, Sparkles } from 'lucide-react';
import { Character } from '../data/types.ts';
import { CATEGORIES } from '../data/categories.ts';

interface CharacterModalProps {
  character: Character | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (character: Character) => void;
}

export const CharacterModal: React.FC<CharacterModalProps> = ({
  character,
  onClose,
  isBookmarked,
  onToggleBookmark,
}) => {
  if (!character) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm p-4 sm:p-6 flex items-center justify-center animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden text-neutral-100 relative">
        {/* Top Action Bar */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          <button
            onClick={() => onToggleBookmark(character)}
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
            aria-label="Close character modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Hero banner & Avatar */}
        <div className="relative h-48 sm:h-56 bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 overflow-hidden">
          <img
            src={character.image}
            alt={character.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-40 blur-sm scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />

          {/* Profile Card Header Info */}
          <div className="absolute bottom-4 left-4 sm:left-6 flex items-end gap-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-neutral-700 bg-neutral-900 shadow-xl shrink-0">
              <img
                src={character.image}
                alt={character.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="text-xs font-mono text-rose-400 uppercase tracking-wider">
                {CATEGORIES[character.category]?.name} · {character.series}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
                {character.name}
              </h2>
              <div className="text-xs text-neutral-400 mt-0.5">{character.role}</div>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 space-y-5 text-xs sm:text-sm">
          {/* Signature Quote */}
          {character.signatureQuote && (
            <div className="p-3.5 bg-neutral-900/60 border border-neutral-800/80 rounded-xl flex items-start gap-3 text-neutral-300 italic">
              <Quote className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <p>"{character.signatureQuote}"</p>
            </div>
          )}

          {/* Biography */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-mono">
              Biographical Profile
            </h4>
            <p className="text-neutral-300 leading-relaxed text-xs sm:text-sm">
              {character.biography}
            </p>
          </div>

          {/* Core Traits Grid */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-mono">
              Traits & Attributes
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {character.traits.map((trait, idx) => (
                <div
                  key={idx}
                  className="p-2.5 bg-neutral-900/50 border border-neutral-800 rounded-lg flex items-center justify-between text-xs"
                >
                  <span className="text-neutral-400">{trait.label}</span>
                  <span className="text-neutral-200 font-medium">{trait.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Abilities & Techniques */}
          {character.abilities && character.abilities.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-mono">
                Key Abilities & Disciplines
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {character.abilities.map((ability, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 px-3 py-1 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-neutral-300"
                  >
                    <Zap className="w-3 h-3 text-rose-400" />
                    <span>{ability}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

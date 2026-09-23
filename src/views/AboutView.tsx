import React from 'react';
import { ShieldCheck, Compass, Sparkles, Database, Layers, CheckCircle2, Cpu } from 'lucide-react';
import { CATEGORY_LIST } from '../data/categories.ts';

export const AboutView: React.FC = () => {
  return (
    <div className="space-y-12 pb-24 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-3">
        <div className="text-xs font-mono uppercase tracking-wider text-rose-400 flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          <span>Aptech Limited SRS Documentation & Blueprint</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight">
          About FandomVerse
        </h1>
        <p className="text-base text-neutral-300 leading-relaxed">
          The centralized digital portal engineered for global fan culture under the theme <em>"Web Innovation Unleashed"</em>.
        </p>
      </div>

      {/* Section 1.1: Background & Necessity */}
      <section className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
          <Compass className="w-5 h-5 text-rose-500" />
          <span>1.1 Background & Necessity for the Website</span>
        </h2>
        <div className="space-y-3 text-xs sm:text-sm text-neutral-300 leading-relaxed">
          <p>
            A fandom represents a passionate community of individuals who share deep enthusiasm for a specific creative work—from shonen anime sagas and open-world video games to cinematic universes, television epics, K-pop groups, graphic novels, and serialized manga.
          </p>
          <p>
            Traditionally, the fandom experience is fragmented. Fans must navigate dozens of disjointed social platforms, chaotic wikis laden with advertisements, and disparate forum threads just to follow lore, discover conventions, check release dates, or inspect licensed collectibles.
          </p>
          <p>
            <strong>FandomVerse solves this fragmentation</strong> by unifying these passionate communities into a single, cohesive, high-performance portal. It elevates fan engagement through curated character dossiers, official image galleries, high-definition trailer showcases, event tracking, and licensed merchandise exploration.
          </p>
        </div>
      </section>

      {/* Section 1.2: Proposed Solution */}
      <section className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-rose-500" />
          <span>1.2 Proposed Solution & Architecture</span>
        </h2>
        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
          FandomVerse is architected as an ultra-fast, responsive <strong>Single Page Application (SPA)</strong>. It integrates seven distinct dimensional hubs:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
          {CATEGORY_LIST.map((cat) => (
            <div
              key={cat.id}
              className="p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-center"
            >
              <div className="text-xs font-semibold text-white font-display">{cat.name}</div>
              <div className="text-[10px] text-neutral-500 font-mono mt-0.5">{cat.subTags[0]}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 1.5: Technical Constraints & Zero-Backend Compliance */}
      <section className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-rose-500" />
          <span>1.5 Compliance with SRS Constraints</span>
        </h2>
        <div className="space-y-2 text-xs sm:text-sm text-neutral-300">
          <div className="flex items-start gap-2.5 p-3 bg-neutral-950 rounded-xl border border-neutral-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white">Zero Server Data Storage:</strong> The application does not write or upload user records to external server databases.
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 bg-neutral-950 rounded-xl border border-neutral-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white">Structured JSON Dataset:</strong> All articles, character records, media embeds, events, and merchandise catalogs are loaded strictly from client-side JSON/data structures.
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 bg-neutral-950 rounded-xl border border-neutral-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white">Dual Storage Engine:</strong> Bookmarks and cart items utilize persistent browser <code className="text-rose-400 font-mono">LocalStorage</code>. Personal annotations remain strictly in <code className="text-amber-400 font-mono">SessionStorage</code> per SRS requirements.
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 bg-neutral-950 rounded-xl border border-neutral-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white">Pre-scripted Rule-Based AI Chatbot:</strong> VerseBot operates locally from a pre-scripted knowledge graph, delivering immediate guidance and deep-links without third-party LLM latency or costs.
            </div>
          </div>
        </div>
      </section>

      {/* Project Deliverables & Accreditation */}
      <section className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 text-center space-y-2 text-xs text-neutral-400 font-mono">
        <div>© Aptech Limited · FandomVerse Software Requirements Specification v1.0</div>
        <div>Theme: Fandom Universe · Category: Web Innovation Unleashed</div>
      </section>
    </div>
  );
};

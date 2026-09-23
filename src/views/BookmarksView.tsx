import React, { useState, useMemo } from 'react';
import { 
  Bookmark, 
  Trash2, 
  Download, 
  FileText, 
  Copy, 
  Check, 
  ExternalLink, 
  StickyNote, 
  AlertCircle,
  Clock
} from 'lucide-react';
import { BookmarkRecord, CategoryId } from '../data/types.ts';
import { CATEGORIES } from '../data/categories.ts';
import { getSessionNotes, saveSessionNote } from '../utils/storage.ts';

interface BookmarksViewProps {
  bookmarks: BookmarkRecord[];
  onRemoveBookmark: (targetId: string) => void;
  onClearAll: () => void;
  onSelectArticle: (id: string) => void;
  onSelectCharacter: (id: string) => void;
  onSelectMedia: (id: string) => void;
  onSelectMerchandise: (id: string) => void;
  onNavigateToCategory: (catId: CategoryId) => void;
}

export const BookmarksView: React.FC<BookmarksViewProps> = ({
  bookmarks,
  onRemoveBookmark,
  onClearAll,
  onSelectArticle,
  onSelectCharacter,
  onSelectMedia,
  onSelectMerchandise,
  onNavigateToCategory,
}) => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [sessionNotes, setSessionNotes] = useState<Record<string, string>>(() => getSessionNotes());
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteDraft, setNoteDraft] = useState<string>('');
  const [copiedNotification, setCopiedNotification] = useState(false);

  const filtered = useMemo(() => {
    if (selectedType === 'all') return bookmarks;
    return bookmarks.filter((b) => b.type === selectedType);
  }, [bookmarks, selectedType]);

  const handleStartEditNote = (targetId: string) => {
    setEditingNoteId(targetId);
    setNoteDraft(sessionNotes[targetId] || '');
  };

  const handleSaveNote = (targetId: string) => {
    const updated = saveSessionNote(targetId, noteDraft);
    setSessionNotes({ ...updated });
    setEditingNoteId(null);
  };

  const handleExportFile = () => {
    let output = `# FandomVerse Bookmarked Collections\n`;
    output += `Exported on: ${new Date().toLocaleString()}\n`;
    output += `Total Saved Items: ${bookmarks.length}\n\n`;

    bookmarks.forEach((b, idx) => {
      output += `### ${idx + 1}. [${b.type.toUpperCase()}] ${b.title}\n`;
      output += `- Category: ${CATEGORIES[b.category]?.name || b.category}\n`;
      if (b.subtitle) output += `- Detail: ${b.subtitle}\n`;
      output += `- Saved At: ${b.savedAt}\n`;
      if (sessionNotes[b.targetId]) {
        output += `- Personal Session Note: "${sessionNotes[b.targetId]}"\n`;
      }
      output += `\n`;
    });

    const blob = new Blob([output], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `fandomverse_bookmarks_${Date.now()}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyToClipboard = () => {
    let text = `FANDOMVERSE BOOKMARKS LIST:\n\n`;
    bookmarks.forEach((b, i) => {
      text += `${i + 1}. [${b.type.toUpperCase()}] ${b.title} (${CATEGORIES[b.category]?.name || b.category})\n`;
      if (sessionNotes[b.targetId]) {
        text += `   Note: ${sessionNotes[b.targetId]}\n`;
      }
    });
    navigator.clipboard.writeText(text);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2000);
  };

  const handleClickItem = (b: BookmarkRecord) => {
    if (b.type === 'article') onSelectArticle(b.targetId);
    else if (b.type === 'character') onSelectCharacter(b.targetId);
    else if (b.type === 'media') onSelectMedia(b.targetId);
    else if (b.type === 'merchandise') onSelectMerchandise(b.targetId);
    else onNavigateToCategory(b.category);
  };

  return (
    <div className="space-y-8 pb-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-amber-400 flex items-center gap-2">
            <Bookmark className="w-4 h-4 fill-current" />
            <span>Local Curation & Notes</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-white mt-1">
            My Bookmarked Lore ({bookmarks.length})
          </h1>
          <p className="text-sm text-neutral-400 mt-1 max-w-xl">
            Saved articles, characters, trailers, and events. Bookmarks persist in Local Storage; attached personal notes stay active in Session Storage per SRS specifications.
          </p>
        </div>

        {bookmarks.length > 0 && (
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopyToClipboard}
              className="px-3.5 py-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700/80 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors"
              title="Copy list to clipboard"
            >
              {copiedNotification ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedNotification ? 'Copied!' : 'Copy List'}</span>
            </button>
            <button
              onClick={handleExportFile}
              className="px-3.5 py-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700/80 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors"
              title="Export formatted Markdown file"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export List</span>
            </button>
            <button
              onClick={onClearAll}
              className="px-3.5 py-2 bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 border border-rose-800/50 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
          </div>
        )}
      </div>

      {/* SRS Storage Architecture Note */}
      <div className="p-3 bg-neutral-900/80 border border-neutral-800 rounded-xl flex items-center gap-3 text-xs text-neutral-400">
        <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
        <span>
          <strong className="text-neutral-200">Aptech SRS Storage Rule:</strong> Bookmark IDs and metadata are preserved in your browser’s <code className="text-rose-400 font-mono">LocalStorage</code>. Personal commentary notes are isolated to <code className="text-amber-400 font-mono">SessionStorage</code> and reset when the session ends.
        </span>
      </div>

      {/* Filter Tabs */}
      {bookmarks.length > 0 && (
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 border-b border-neutral-800 pb-3">
          {['all', 'article', 'character', 'media', 'event', 'merchandise'].map((t) => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors whitespace-nowrap ${
                selectedType === t
                  ? 'bg-amber-500 text-neutral-950 font-semibold'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
              }`}
            >
              {t === 'all' ? 'All Bookmarks' : `${t}s`}
            </button>
          ))}
        </div>
      )}

      {/* Empty State */}
      {bookmarks.length === 0 ? (
        <div className="py-20 text-center text-neutral-400 bg-neutral-950/50 border border-neutral-900 rounded-3xl p-8">
          <Bookmark className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold font-display text-white">No saved bookmarks yet</h3>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto mt-1">
            Click the bookmark ribbon icon on any character profile, news article, video trailer, event, or merchandise item to curate your personal collection.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((b) => {
            const hasNote = Boolean(sessionNotes[b.targetId]);
            const isEditingThis = editingNoteId === b.targetId;

            return (
              <div
                key={b.targetId}
                className="bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 rounded-2xl p-4 flex flex-col justify-between space-y-4 transition-all"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between text-xs pb-3 border-b border-neutral-800/80">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-amber-400">
                      {CATEGORIES[b.category]?.name} · {b.type}
                    </span>
                    <button
                      onClick={() => onRemoveBookmark(b.targetId)}
                      className="p-1 text-neutral-500 hover:text-rose-400 transition-colors"
                      title="Remove from bookmarks"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Body with image */}
                  <div
                    onClick={() => handleClickItem(b)}
                    className="flex gap-3 mt-3 cursor-pointer group"
                  >
                    {b.thumbnail && (
                      <img
                        src={b.thumbnail}
                        alt={b.title}
                        referrerPolicy="no-referrer"
                        className="w-14 h-14 rounded-xl object-cover bg-neutral-950 shrink-0 border border-neutral-800"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-white group-hover:text-amber-400 transition-colors line-clamp-2">
                        {b.title}
                      </h4>
                      {b.subtitle && (
                        <p className="text-xs text-neutral-400 truncate mt-0.5">
                          {b.subtitle}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Session Note Display / Editor */}
                  <div className="mt-4 pt-3 border-t border-neutral-800/70 space-y-2">
                    {isEditingThis ? (
                      <div className="space-y-2">
                        <textarea
                          rows={2}
                          value={noteDraft}
                          onChange={(e) => setNoteDraft(e.target.value)}
                          placeholder="Attach a session note (e.g. read later, compare traits)..."
                          className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                        />
                        <div className="flex items-center justify-end gap-2 text-xs">
                          <button
                            onClick={() => setEditingNoteId(null)}
                            className="px-2.5 py-1 text-neutral-400 hover:text-white"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleSaveNote(b.targetId)}
                            className="px-3 py-1 bg-amber-500 text-neutral-950 font-semibold rounded-md text-xs hover:bg-amber-400"
                          >
                            Save Note
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start justify-between gap-2">
                        <div className="text-xs text-neutral-300 flex items-start gap-1.5">
                          <StickyNote className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          {hasNote ? (
                            <span className="italic text-neutral-300">"{sessionNotes[b.targetId]}"</span>
                          ) : (
                            <span className="text-neutral-500 text-[11px]">No session note attached</span>
                          )}
                        </div>
                        <button
                          onClick={() => handleStartEditNote(b.targetId)}
                          className="text-[11px] text-neutral-400 hover:text-white underline shrink-0"
                        >
                          {hasNote ? 'Edit' : '+ Note'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Time */}
                <div className="pt-2 flex items-center justify-between text-[10px] text-neutral-500 font-mono">
                  <span>Saved: {b.savedAt}</span>
                  <button
                    onClick={() => handleClickItem(b)}
                    className="text-amber-400/90 hover:text-amber-300 flex items-center gap-1 font-sans text-xs"
                  >
                    <span>Inspect</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

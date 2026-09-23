import { BookmarkRecord, CartItem, MerchandiseItem } from '../data/types.ts';

const VISITOR_KEY = 'fandomverse_visitor_count';
const BOOKMARKS_KEY = 'fandomverse_bookmarks';
const CART_KEY = 'fandomverse_cart';
const SESSION_NOTES_KEY = 'fandomverse_session_notes';

// Visitor Counter (Local Storage)
export function getAndIncrementVisitorCount(): number {
  try {
    const raw = localStorage.getItem(VISITOR_KEY);
    let count = raw ? parseInt(raw, 10) : 148290;
    if (isNaN(count)) count = 148290;
    
    // Increment once per page load / session
    const hasIncrementedSession = sessionStorage.getItem('fandomverse_visited_flag');
    if (!hasIncrementedSession) {
      count += 1;
      localStorage.setItem(VISITOR_KEY, count.toString());
      sessionStorage.setItem('fandomverse_visited_flag', 'true');
    }
    return count;
  } catch {
    return 148295;
  }
}

// Bookmarks (Local Storage)
export function getSavedBookmarks(): BookmarkRecord[] {
  try {
    const raw = localStorage.getItem(BOOKMARKS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveBookmark(record: BookmarkRecord): BookmarkRecord[] {
  const current = getSavedBookmarks();
  if (current.some((b) => b.targetId === record.targetId)) {
    return current;
  }
  const updated = [record, ...current];
  try {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save bookmark', e);
  }
  return updated;
}

export function removeBookmark(targetId: string): BookmarkRecord[] {
  const current = getSavedBookmarks();
  const updated = current.filter((b) => b.targetId !== targetId);
  try {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to remove bookmark', e);
  }
  return updated;
}

export function isBookmarked(targetId: string): boolean {
  const current = getSavedBookmarks();
  return current.some((b) => b.targetId === targetId);
}

// Session Notes (Strictly Session Storage per SRS)
export function getSessionNotes(): Record<string, string> {
  try {
    const raw = sessionStorage.getItem(SESSION_NOTES_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveSessionNote(targetId: string, note: string): Record<string, string> {
  const notes = getSessionNotes();
  if (!note.trim()) {
    delete notes[targetId];
  } else {
    notes[targetId] = note.trim();
  }
  try {
    sessionStorage.setItem(SESSION_NOTES_KEY, JSON.stringify(notes));
  } catch (e) {
    console.error('Failed to save session note', e);
  }
  return notes;
}

// Shopping Cart (Local Storage temporary persistence)
export function getSavedCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]): void {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  } catch (e) {
    console.error('Failed to save cart', e);
  }
}

export function addToCart(merchandise: MerchandiseItem, quantity = 1): CartItem[] {
  const current = getSavedCart();
  const existingIdx = current.findIndex((item) => item.merchandise.id === merchandise.id);
  let updated: CartItem[];

  if (existingIdx >= 0) {
    updated = [...current];
    updated[existingIdx].quantity += quantity;
  } else {
    updated = [...current, { merchandise, quantity }];
  }
  saveCart(updated);
  return updated;
}

export function updateCartQuantity(merchandiseId: string, quantity: number): CartItem[] {
  const current = getSavedCart();
  let updated: CartItem[];
  if (quantity <= 0) {
    updated = current.filter((item) => item.merchandise.id !== merchandiseId);
  } else {
    updated = current.map((item) =>
      item.merchandise.id === merchandiseId ? { ...item, quantity } : item
    );
  }
  saveCart(updated);
  return updated;
}

export function clearCart(): CartItem[] {
  saveCart([]);
  return [];
}

export type CategoryId = 'anime' | 'gaming' | 'movies' | 'tv_shows' | 'kpop' | 'comics' | 'manga';

export interface CategoryInfo {
  id: CategoryId;
  name: string;
  tagline: string;
  description: string;
  accent: string;
  bannerImage: string;
  subTags: string[];
}

export interface Character {
  id: string;
  name: string;
  series: string;
  category: CategoryId;
  role: string;
  image: string;
  biography: string;
  traits: {
    label: string;
    value: string;
  }[];
  abilities: string[];
  signatureQuote: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  category: CategoryId;
  author: string;
  date: string;
  readTime: string;
  thumbnail: string;
  summary: string;
  content: string[];
  tags: string[];
  featured?: boolean;
}

export type MediaType = 'trailer' | 'interview' | 'podcast' | 'fan_content';

export interface MediaItem {
  id: string;
  title: string;
  category: CategoryId;
  type: MediaType;
  duration: string;
  thumbnail: string;
  mediaUrl: string; // embedded preview video or audio
  description: string;
  tags: string[];
  isAudio?: boolean;
  featured?: boolean;
  releaseStatus?: 'upcoming' | 'recently_released';
}

export interface EventItem {
  id: string;
  title: string;
  category: CategoryId;
  date: string;
  location: string;
  eventType: 'Convention' | 'Tournament' | 'Concert' | 'Watch Party' | 'Fan Meetup' | 'Premiere';
  description: string;
  attendeesEstimate: string;
  image: string;
  websiteUrl?: string;
}

export interface MerchandiseItem {
  id: string;
  name: string;
  category: CategoryId;
  franchise: string;
  type: 'Apparel' | 'Figure' | 'Plushie' | 'Collectibles' | 'Audio & Vinyl' | 'Lightstick' | 'Print & Art';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  inStock: boolean;
  badge?: string;
  specs: { [key: string]: string };
}

export interface CartItem {
  merchandise: MerchandiseItem;
  quantity: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: CategoryId;
  franchise: string;
  imageUrl: string;
  caption: string;
  photographerOrArtist: string;
}

export interface UpcomingRelease {
  id: string;
  title: string;
  category: CategoryId;
  releaseDate: string;
  platformOrMedium: string;
  hypeScore: number;
  description: string;
  image: string;
}

export interface BookmarkRecord {
  id?: string;
  targetId: string;
  title: string;
  type: 'article' | 'character' | 'media' | 'event' | 'merchandise';
  category: CategoryId;
  thumbnail?: string;
  subtitle?: string;
  createdAt?: string;
  savedAt?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  quickReplies?: string[];
  navigationLink?: {
    page: string;
    tab?: string;
    label: string;
  };
}

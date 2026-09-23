import { CategoryInfo, CategoryId } from './types.ts';

export const CATEGORIES: Record<CategoryId, CategoryInfo> = {
  anime: {
    id: 'anime',
    name: 'Anime',
    tagline: 'Sakuga animations, legendary shonen arcs, and transcendent fantasy epics.',
    description: 'Immerse in the dynamic realm of Japanese animation, spanning iconic classics to seasonal blockbusters, director spotlights, and studio revelations.',
    accent: '#ef4444', // Crimson / Red
    bannerImage: '/src/assets/images/anime_hub_spotlight_1790152673502.jpg',
    subTags: ['Shonen', 'Seinen', 'Isekai', 'Dark Fantasy', 'Mecha', 'Studio MAPPA', 'Studio Ghibli', 'ufotable'],
  },
  gaming: {
    id: 'gaming',
    name: 'Gaming',
    tagline: 'High-octane esports battles, sprawling open worlds, and indie masterpieces.',
    description: 'Explore world-class competitive arenas, next-gen hardware benchmarks, cinematic RPGs, and deep lore behind gaming legends.',
    accent: '#06b6d4', // Cyan / Electric Blue
    bannerImage: '/src/assets/images/gaming_hub_spotlight_1790152688003.jpg',
    subTags: ['Action RPG', 'Competitive FPS', 'Souls-like', 'Open World', 'Esports', 'Indie Highlights', 'PC Master Race', 'PlayStation 5'],
  },
  movies: {
    id: 'movies',
    name: 'Movies',
    tagline: 'Cinematic universes, auteur directors, and blockbuster spectacles.',
    description: 'Step onto the red carpet and behind the camera of box office juggernauts, sci-fi masterstrokes, and festival darlings reshaping modern cinema.',
    accent: '#f59e0b', // Amber / Gold
    bannerImage: '/src/assets/images/fandom_verse_hero_1790152660476.jpg',
    subTags: ['Sci-Fi', 'Blockbusters', 'Auteur Cinema', 'IMAX Experience', 'Horror', 'Directorial Vision', 'Academy Contenders', 'Film Lore'],
  },
  tv_shows: {
    id: 'tv_shows',
    name: 'TV Shows',
    tagline: 'Prestige serials, binge-worthy narratives, and legendary season finales.',
    description: 'From gripping high-fantasy dramas and mind-bending mystery thrillers to iconic sitcoms and dystopian anthologies dominating global streaming screens.',
    accent: '#8b5cf6', // Violet
    bannerImage: '/src/assets/images/fandom_verse_hero_1790152660476.jpg',
    subTags: ['Prestige Drama', 'Sci-Fi Serials', 'Mystery Thrillers', 'Dark Fantasy', 'Post-Apocalyptic', 'Stream Exclusives', 'Mini-Series'],
  },
  kpop: {
    id: 'kpop',
    name: 'K-Pop',
    tagline: 'Synchronized choreography, chart-topping comebacks, and global fandom energy.',
    description: 'The dazzling universe of Korean pop music, world stadium tours, concept albums, lightstick seas, and passionate global fan clubs.',
    accent: '#ec4899', // Pink / Magenta
    bannerImage: '/src/assets/images/kpop_hub_spotlight_1790152706456.jpg',
    subTags: ['Girl Groups', 'Boy Groups', 'Comeback Spotlights', 'Choreography', 'World Tours', 'Lightstick Culture', 'K-OST', 'Concept Analysis'],
  },
  comics: {
    id: 'comics',
    name: 'Comics',
    tagline: 'Graphic storytelling, mythic superheroes, and indie auteur panels.',
    description: 'Journey across legendary comic book multiverses, seminal graphic novels, visionary colorists, and groundbreaking comic creators.',
    accent: '#3b82f6', // Cobalt
    bannerImage: '/src/assets/images/fandom_verse_hero_1790152660476.jpg',
    subTags: ['DC Universe', 'Marvel Multiverse', 'Image Comics', 'Dark Horse', 'Graphic Novels', 'Artist Spotlights', 'Vintage Collectibles'],
  },
  manga: {
    id: 'manga',
    name: 'Manga',
    tagline: 'Intricate ink work, unforgettable page-turns, and serialized serialized sagas.',
    description: 'From legendary Weekly Shonen Jump serialized epics and dark seinen ink masterpieces to gripping webtoons shaping modern pop culture.',
    accent: '#10b981', // Emerald
    bannerImage: '/src/assets/images/anime_hub_spotlight_1790152673502.jpg',
    subTags: ['Weekly Shonen Jump', 'Seinen Masterpieces', 'Dark Fantasy', 'Manhwa & Webtoons', 'Mangaka Profiles', 'Volume Releases', 'Art Technique'],
  },
};

export const CATEGORY_LIST = Object.values(CATEGORIES);

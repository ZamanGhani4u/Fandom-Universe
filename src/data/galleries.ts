import { GalleryItem } from './types.ts';

export const GALLERY_ITEMS: GalleryItem[] = [
  // Anime
  {
    id: 'gal-anime-1',
    title: 'Floating Sky Haven at Twilight',
    category: 'anime',
    franchise: 'Original Sakuga Showcase',
    imageUrl: '/src/assets/images/anime_hub_spotlight_1790152673502.jpg',
    caption: 'Dynamic key visual showcasing floating crystalline archipelago and cherry blossom vortex.',
    photographerOrArtist: 'FandomVerse Studio Arts',
  },
  {
    id: 'gal-anime-2',
    title: 'Tokyo Rain & Neon Reflections',
    category: 'anime',
    franchise: 'Makoto Shinkai Tribute',
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1000&auto=format&fit=crop&q=80',
    caption: 'Atmospheric raindrops falling on urban asphalt with neon kanji reflections.',
    photographerOrArtist: 'Tokyo Lens Collective',
  },
  {
    id: 'gal-anime-3',
    title: 'Solar Eclipse over Cursed Shrine',
    category: 'anime',
    franchise: 'Jujutsu Arts',
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1000&auto=format&fit=crop&q=80',
    caption: 'Torii gates silhouetted against a crimson lunar eclipse with swirling cursed energy.',
    photographerOrArtist: 'Kyoto Archive',
  },

  // Gaming
  {
    id: 'gal-game-1',
    title: 'Cyberpunk Colosseum Battleground',
    category: 'gaming',
    franchise: 'Cyber Odyssey 2088',
    imageUrl: '/src/assets/images/gaming_hub_spotlight_1790152688003.jpg',
    caption: 'Holographic arena overlooking the neon skyscrapers of Neo-Shinjuku.',
    photographerOrArtist: 'Virtual Capture Guild',
  },
  {
    id: 'gal-game-2',
    title: 'The Golden Canopy of Erdtree',
    category: 'gaming',
    franchise: 'Lands Between Chronicles',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1000&auto=format&fit=crop&q=80',
    caption: 'Breathtaking vista of the colossal sacred tree illuminating crumbling stone bridges.',
    photographerOrArtist: 'Tarnished Photomode Hub',
  },
  {
    id: 'gal-game-3',
    title: 'Overgrown Post-Apocalyptic Highway',
    category: 'gaming',
    franchise: 'The Last Frontier',
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1000&auto=format&fit=crop&q=80',
    caption: 'Lush greenery reclaiming abandoned concrete flyovers under misty morning sunlight.',
    photographerOrArtist: 'Naughty Dog Concept Team',
  },

  // Movies
  {
    id: 'gal-movie-1',
    title: 'Dunes of Arrakis at Sunset',
    category: 'movies',
    franchise: 'Dune Chronicle',
    imageUrl: '/src/assets/images/fandom_verse_hero_1790152660476.jpg',
    caption: 'Unforgiving golden desert ridges sculpted by spice winds under twin moons.',
    photographerOrArtist: 'IMAX Cinematic Stills',
  },
  {
    id: 'gal-movie-2',
    title: 'Interstellar Event Horizon',
    category: 'movies',
    franchise: 'Cosmic Cinema',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1000&auto=format&fit=crop&q=80',
    caption: 'The gravitational accretion disk warping starlight into a breathtaking golden ring.',
    photographerOrArtist: 'Caltech Astrophysical Render',
  },

  // TV Shows
  {
    id: 'gal-tv-1',
    title: 'Dragonflight Over King’s Landing',
    category: 'tv_shows',
    franchise: 'House of the Dragon',
    imageUrl: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?w=1000&auto=format&fit=crop&q=80',
    caption: 'A scarlet dragon diving through stormclouds above red keep towers.',
    photographerOrArtist: 'HBO Visual FX Studio',
  },
  {
    id: 'gal-tv-2',
    title: 'The Upside Down Forest Mist',
    category: 'tv_shows',
    franchise: 'Hawkins Mystery',
    imageUrl: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?w=1000&auto=format&fit=crop&q=80',
    caption: 'Bioluminescent spores floating gently between decaying dark pine trees.',
    photographerOrArtist: 'Stranger Stills',
  },

  // K-Pop
  {
    id: 'gal-kpop-1',
    title: 'Galaxy of Lightsticks at Olympic Stadium',
    category: 'kpop',
    franchise: 'World Tour Stadium Finale',
    imageUrl: '/src/assets/images/kpop_hub_spotlight_1790152706456.jpg',
    caption: 'Sixty-thousand synchronized bluetooth lightsticks shifting in unison to the encore beat.',
    photographerOrArtist: 'Seoul Music Photo Agency',
  },
  {
    id: 'gal-kpop-2',
    title: 'Pastel Cyberpunk Stage Setup',
    category: 'kpop',
    franchise: 'Kwangya Dimension Showcase',
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1000&auto=format&fit=crop&q=80',
    caption: 'Laser projections cutting through theatrical haze during solo dance breaks.',
    photographerOrArtist: 'SM & HYBE Global Media',
  },

  // Comics
  {
    id: 'gal-comic-1',
    title: 'Gargoyle Perch over Gotham',
    category: 'comics',
    franchise: 'DC Comics',
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1000&auto=format&fit=crop&q=80',
    caption: 'Noir ink composition of the Caped Crusader watching over rain-soaked Gothic spires.',
    photographerOrArtist: 'Jim Lee Splash Archive',
  },
  {
    id: 'gal-comic-2',
    title: 'Cosmic Multiverse Fracture',
    category: 'comics',
    franchise: 'Marvel Comics',
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1000&auto=format&fit=crop&q=80',
    caption: 'Shattered glass dimension panels reflecting alternate reality heroes.',
    photographerOrArtist: 'Alex Ross Gallery',
  },

  // Manga
  {
    id: 'gal-manga-1',
    title: 'The Great Waves of Wano',
    category: 'manga',
    franchise: 'One Piece',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&auto=format&fit=crop&q=80',
    caption: 'Traditional Ukiyo-e woodblock inspired roaring waves carrying the Thousand Sunny.',
    photographerOrArtist: 'Shueisha Jump Archives',
  },
  {
    id: 'gal-manga-2',
    title: 'Solitary Eclipse & Iron Greatsword',
    category: 'manga',
    franchise: 'Berserk',
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1000&auto=format&fit=crop&q=80',
    caption: 'Masterwork cross-hatch ink study of the Black Swordsman resting atop a rocky hill.',
    photographerOrArtist: 'Studio Gaga',
  },
];

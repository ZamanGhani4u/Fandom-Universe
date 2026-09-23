export interface PreScriptedFAQ {
  keywords: string[];
  response: string;
  quickReplies?: string[];
  navigationLink?: {
    page: string;
    tab?: string;
    label: string;
  };
}

export const INITIAL_BOT_MESSAGE = {
  id: 'bot-welcome',
  sender: 'bot' as const,
  text: 'Greetings, fellow traveler! I am VerseBot, your guide through FandomVerse. How can I assist your fandom journey today?',
  timestamp: 'Just now',
  quickReplies: [
    'Explore Anime Hub',
    'Find K-Pop Lightsticks',
    'Upcoming 2026 Releases',
    'Browse Character Profiles',
    'How do Bookmarks work?',
    'What is FandomVerse?',
  ],
};

export const CHATBOT_RULES: PreScriptedFAQ[] = [
  {
    keywords: ['anime', 'shonen', 'manga', 'jujutsu', 'gojo', 'demon slayer'],
    response: 'Our Anime Hub features character dossiers (like Gojo Satoru and Levi Ackerman), analyses on modern sakuga animation techniques, convention schedules, and trailers!',
    navigationLink: {
      page: 'category',
      tab: 'anime',
      label: 'Teleport to Anime Hub',
    },
    quickReplies: ['Anime Characters', 'Sakuga Article', 'Anime Expo 2026'],
  },
  {
    keywords: ['kpop', 'k-pop', 'bts', 'blackpink', 'aespa', 'stray kids', 'lightstick', 'army', 'blink'],
    response: 'Step onto the stage! Our K-Pop Hub covers world tour highlights, concept album dissections, random play dance meetups, and our official Bluetooth-sync concert lightsticks in the merch store.',
    navigationLink: {
      page: 'category',
      tab: 'kpop',
      label: 'Explore K-Pop Hub',
    },
    quickReplies: ['View K-Pop Lightstick', 'K-Pop Comebacks 2026', 'MAMA Awards 2026'],
  },
  {
    keywords: ['gaming', 'game', 'cyberpunk', 'elden ring', 'kratos', 'witcher', 'geralt', 'esports'],
    response: 'Power up! The Gaming Hub includes character bios for Geralt, Kratos, Ellie, and Master Chief, plus breakdowns of open-world design and upcoming trailers like Cyber Odyssey 2088.',
    navigationLink: {
      page: 'category',
      tab: 'gaming',
      label: 'Jump to Gaming Hub',
    },
    quickReplies: ['Gaming Characters', 'Cyber Odyssey Trailer', 'EVO 2026'],
  },
  {
    keywords: ['movie', 'movies', 'cinema', 'dune', 'batman', 'paul atreides', 'imax', 'villeneuve'],
    response: 'Dim the lights! Our Movies Hub gathers high-octane trailers, articles on Denis Villeneuve’s 70mm Dune cinematography, festival schedules, and prop replicas.',
    navigationLink: {
      page: 'category',
      tab: 'movies',
      label: 'Visit Movies Hub',
    },
    quickReplies: ['Watch Trailers', 'Dune Prop Knife', 'Cannes Film Festival'],
  },
  {
    keywords: ['tv', 'shows', 'series', 'house of the dragon', 'breaking bad', 'stranger things', 'homelander'],
    response: 'Binge-mode engaged! Explore our TV Shows section featuring in-depth retrospectives on prestige dark fantasy, character files for Walter White and Daemon Targaryen, and trailer premieres.',
    navigationLink: {
      page: 'category',
      tab: 'tv_shows',
      label: 'Browse TV Shows',
    },
    quickReplies: ['TV Show Characters', 'Dark Sister Sword Merch', 'House of Dragon S3'],
  },
  {
    keywords: ['merch', 'merchandise', 'shop', 'cart', 'buy', 'price', 'store', 't-shirt', 'hoodie', 'figure'],
    response: 'Our Merchandise Showcase features curated collector statues, heavyweight apparel, plushies, and prop replicas across all fandoms. You can add items to your temporary cart to calculate totals anytime!',
    navigationLink: {
      page: 'merchandise',
      label: 'Open Merchandise Showcase',
    },
    quickReplies: ['Gojo Satoru Figure', 'Scouting Cloak Hoodie', 'Pochita Plushie'],
  },
  {
    keywords: ['bookmark', 'favorite', 'save', 'note', 'session'],
    response: 'FandomVerse lets you bookmark any article, character, media clip, event, or merchandise item! Bookmarks are saved in your browser’s LocalStorage, and you can attach session-only personal notes to keep track of your thoughts.',
    navigationLink: {
      page: 'bookmarks',
      label: 'View My Bookmarks & Notes',
    },
    quickReplies: ['How to export bookmarks?', 'Go to Bookmarks Page'],
  },
  {
    keywords: ['trailer', 'trailers', 'teaser', 'video', 'watch'],
    response: 'You can watch trailers from Anime, Gaming, Movies, and TV Shows directly in our dedicated Trailers showcase with filterable release status (Upcoming vs. Recently Released).',
    navigationLink: {
      page: 'trailers',
      label: 'Go to Trailers Theater',
    },
    quickReplies: ['Demon Slayer Teaser', 'Chrono Rift Trailer', 'Cyber Odyssey 2088'],
  },
  {
    keywords: ['event', 'events', 'convention', 'con', 'expo', 'party', 'meetup', 'comic-con', 'ax'],
    response: 'Never miss a gathering! We track major worldwide fandom events including Anime Expo, San Diego Comic-Con, Gamescom, MAMA Awards, and local fan watch parties.',
    navigationLink: {
      page: 'events',
      label: 'Open Events Calendar',
    },
    quickReplies: ['Anime Expo 2026', 'SDCC 2026', 'EVO 2026'],
  },
  {
    keywords: ['about', 'team', 'who made this', 'aptech', 'project'],
    response: 'FandomVerse was conceived under the theme "Web Innovation Unleashed" to unify scattered fan communities into a single responsive, media-rich portal without server bloat.',
    navigationLink: {
      page: 'about',
      label: 'Read About Us',
    },
    quickReplies: ['Contact Us', 'Explore All Categories'],
  },
  {
    keywords: ['contact', 'address', 'map', 'gps', 'location', 'email'],
    response: 'You can reach the FandomVerse team through our Contact Us page, complete with GPS coordinates, simulated interactive radar locator, and responsive inquiry dispatch form.',
    navigationLink: {
      page: 'contact',
      label: 'Open Contact Page',
    },
    quickReplies: ['Send Inquiry', 'Find Headquarters'],
  },
  {
    keywords: ['character', 'characters', 'bio', 'profiles', 'traits'],
    response: 'Every category in FandomVerse features detailed character dossiers with traits, combat powers, series info, signature quotes, and high-res imagery! We have 35+ profiles across all 7 categories.',
    navigationLink: {
      page: 'category',
      tab: 'anime',
      label: 'View Character Profiles',
    },
    quickReplies: ['Anime Characters', 'Gaming Characters', 'Comic Heroes'],
  },
];

export function getBotResponse(userQuery: string): {
  text: string;
  quickReplies?: string[];
  navigationLink?: { page: string; tab?: string; label: string };
} {
  const query = userQuery.toLowerCase().trim();

  // Search through pre-scripted rules
  for (const rule of CHATBOT_RULES) {
    if (rule.keywords.some((kw) => query.includes(kw))) {
      return {
        text: rule.response,
        quickReplies: rule.quickReplies,
        navigationLink: rule.navigationLink,
      };
    }
  }

  // Recommendation fallback based on general query
  return {
    text: `I understand you're interested in "${userQuery}". You can explore all seven fandom dimensions—Anime, Gaming, Movies, TV Shows, K-Pop, Comics, and Manga—or search our global catalog above!`,
    quickReplies: [
      'Explore Anime Hub',
      'Gaming Hub',
      'K-Pop Lightsticks',
      'Merchandise Showcase',
      'Events Calendar',
    ],
    navigationLink: {
      page: 'home',
      label: 'Return to Hub Center',
    },
  };
}

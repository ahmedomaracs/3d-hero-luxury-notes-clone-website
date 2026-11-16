import rawCatalog from './catalog.json';

export interface ProductSize {
  size: string;
  price: number;
  left: number;
  low: boolean;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  from: number;
  sold: number;
  type: 'niche' | 'designer' | null;
  soldOut: boolean;
  image: string;
  thumb: string;
  badge: string | null;
  sizes: ProductSize[];
}

export interface HouseLink {
  href: string;
  name: string;
  count?: number;
}

export const CATALOG_MIN_PRICE = rawCatalog.min ?? 140;
export const CATALOG_MAX_PRICE = rawCatalog.max ?? 2240;

export const ALL_PRODUCTS: Product[] = rawCatalog.products as Product[];

const nicheSet = new Set<string>(rawCatalog.nicheIds || []);
const designerSet = new Set<string>(rawCatalog.designerIds || []);

export const NICHE_PRODUCTS: Product[] =
  nicheSet.size > 0
    ? rawCatalog.nicheIds
        .map((id: string) => ALL_PRODUCTS.find((p) => p.id === id))
        .filter((p): p is Product => Boolean(p))
    : ALL_PRODUCTS.filter((p) => p.type === 'niche');

export const DESIGNER_PRODUCTS: Product[] =
  designerSet.size > 0
    ? rawCatalog.designerIds
        .map((id: string) => ALL_PRODUCTS.find((p) => p.id === id))
        .filter((p): p is Product => Boolean(p))
    : ALL_PRODUCTS.filter((p) => p.type === 'designer');

export const HOUSES: HouseLink[] = rawCatalog.houses as HouseLink[];

export function getBottlePalette(brand: string, id: string): {
  bgTop: string;
  bgBottom: string;
  glassTint: string;
  juiceTop: string;
  juiceBottom: string;
  capColor: string;
  labelBg: string;
  labelText: string;
  accent: string;
} {
  let hash = 0;
  const key = `${brand}-${id}`;
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  }

  const palettes = [
    {
      // Warm Amber & Gold (Xerjoff / Roja / Amouage)
      bgTop: '#F7F3EB',
      bgBottom: '#EAE2D3',
      glassTint: 'rgba(255, 250, 240, 0.72)',
      juiceTop: '#D4A359',
      juiceBottom: '#9A6224',
      capColor: '#B08D57',
      labelBg: '#FAF8F5',
      labelText: '#181818',
      accent: '#B08D57',
    },
    {
      // Deep Espresso & Obsidian (Tom Ford / Dior Privée / Initio)
      bgTop: '#F4EFE8',
      bgBottom: '#E5DDD2',
      glassTint: 'rgba(44, 26, 17, 0.85)',
      juiceTop: '#4A2E1B',
      juiceBottom: '#1F1209',
      capColor: '#141414',
      labelBg: '#FAF8F5',
      labelText: '#181818',
      accent: '#C89B3C',
    },
    {
      // Soft Champagne & Alabaster (Byredo / Matière Première / Creed)
      bgTop: '#FAF8F5',
      bgBottom: '#EFECE6',
      glassTint: 'rgba(255, 255, 255, 0.82)',
      juiceTop: '#E8D5B5',
      juiceBottom: '#C7A97B',
      capColor: '#181818',
      labelBg: '#FFFFFF',
      labelText: '#181818',
      accent: '#B08D57',
    },
    {
      // Spiced Cognac & Bronze (Guerlain / Serge Lutens / Parfums de Marly)
      bgTop: '#F6F0E6',
      bgBottom: '#E8DEC8',
      glassTint: 'rgba(250, 244, 232, 0.75)',
      juiceTop: '#C87D3B',
      juiceBottom: '#7E3F12',
      capColor: '#2C1A11',
      labelBg: '#FAF8F5',
      labelText: '#181818',
      accent: '#B08D57',
    },
    {
      // Mediterranean Mineral & Slate (Versace / Hermès / Issey Miyake)
      bgTop: '#F3F1EC',
      bgBottom: '#E4E0D8',
      glassTint: 'rgba(245, 247, 248, 0.78)',
      juiceTop: '#C2B28F',
      juiceBottom: '#8C7A5B',
      capColor: '#141414',
      labelBg: '#FAF8F5',
      labelText: '#181818',
      accent: '#9A948C',
    },
  ];

  return palettes[hash % palettes.length];
}

export function getFragranceNotes(product: Product) {
  const brandLower = product.brand.toLowerCase();
  const nameLower = product.name.toLowerCase();

  if (nameLower.includes('oud') || nameLower.includes('aoud') || brandLower.includes('amouage')) {
    return {
      opens: 'Saffron, Cardamom, Calabrian Bergamot',
      heart: 'Damask Rose, Frankincense, Cashmere Wood',
      dries: 'Aged Agarwood (Oud), Ambergris, Labdanum, Musk',
      rating: '4.9',
      votes: '420',
      longevity: '10–12+ hrs',
      sillage: 'Strong',
      season: 'Autumn & Winter',
      occasion: 'Evening',
    };
  }
  if (nameLower.includes('elixir') || nameLower.includes('parfum') || nameLower.includes('noir')) {
    return {
      opens: 'Nutmeg, Mandarin Orange, Pink Pepper',
      heart: 'Iris Pallida, Orange Blossom, Kulfi Accord',
      dries: 'Madagascar Vanilla, Tonka Bean, Benzoin, Sandalwood',
      rating: '4.8',
      votes: '685',
      longevity: '8–10 hrs',
      sillage: 'Rich & Enveloping',
      season: 'Autumn & Winter',
      occasion: 'Evening',
    };
  }
  return {
    opens: 'Sicilian Bergamot, Lavender, Lemon Zest',
    heart: 'Cinnamon Leaf, Cashmeran, Jasmine Sambac',
    dries: 'White Honey, Tobacco Leaf, Tonka Bean, Cedarwood',
    rating: '4.9',
    votes: '530',
    longevity: '8–10 hrs',
    sillage: 'Moderate to Strong',
    season: 'All Seasons',
    occasion: 'Day & Evening',
  };
}

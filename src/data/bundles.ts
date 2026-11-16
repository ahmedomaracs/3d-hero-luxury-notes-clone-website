export interface BundleItem {
  name: string;
  brand: string;
}

export interface Bundle {
  id: string;
  title: string;
  sub: string;
  price: number;
  oldPrice: number;
  saveBadge: string;
  soldOut: boolean;
  items: BundleItem[];
}

export const BUNDLES: Bundle[] = [
  {
    id: 'gym-bag',
    title: 'Gym Bag',
    sub: '5 × 4 ML decants · Sample sizes, not full bottles',
    price: 810,
    oldPrice: 905,
    saveBadge: 'Save 10%',
    soldOut: false,
    items: [
      { name: 'Versace Eau Fraiche', brand: 'Versace' },
      { name: 'Versace Eros Energy', brand: 'Versace' },
      { name: 'Kenzo Homme EDT Intense', brand: 'Kenzo' },
      { name: 'D&G Light Blue Intense', brand: 'Dolce & Gabbana' },
      { name: 'Versace Dylan Blue', brand: 'Versace' },
    ],
  },
  {
    id: 'date-night',
    title: 'Date Night',
    sub: '5 × 4 ML decants · Sample sizes, not full bottles',
    price: 1595,
    oldPrice: 1775,
    saveBadge: 'Save 10%',
    soldOut: false,
    items: [
      { name: 'Gucci Guilty Elixir', brand: 'Gucci' },
      { name: 'D&G The One PARFUM', brand: 'Dolce & Gabbana' },
      { name: 'JPG Le Male Elixir', brand: 'Jean Paul Gaultier' },
      { name: 'Tom Ford Noir Extreme', brand: 'Tom Ford' },
      { name: 'Dior Homme Intense', brand: 'Dior' },
    ],
  },
  {
    id: 'niche-discovery',
    title: 'Niche Discovery',
    sub: '5 × 4 ML decants · Sample sizes, not full bottles',
    price: 2420,
    oldPrice: 2690,
    saveBadge: 'Save 10%',
    soldOut: false,
    items: [
      { name: "Initio Can't Get Enough", brand: 'Initio' },
      { name: 'Xerjoff Naxos', brand: 'Xerjoff' },
      { name: "Woud And Mood Absolute Unique'e Luxury", brand: "Unique'e Luxury" },
      { name: 'Mancera Red Tobacco', brand: 'Mancera' },
      { name: 'Serge Lutens Chergui', brand: 'Serge Lutens' },
    ],
  },
  {
    id: 'winter-warmers',
    title: 'Winter Warmers',
    sub: '5 × 4 ML decants · Sample sizes, not full bottles',
    price: 1525,
    oldPrice: 1695,
    saveBadge: 'Save 10%',
    soldOut: false,
    items: [
      { name: 'Tom Ford Noir Extreme', brand: 'Tom Ford' },
      { name: 'SpiceBomb Extreme', brand: 'Viktor & Rolf' },
      { name: 'Guerlain Habit Rouge Parfum', brand: 'Guerlain' },
      { name: 'D&G The One PARFUM', brand: 'Dolce & Gabbana' },
      { name: 'Mancera Red Tobacco', brand: 'Mancera' },
    ],
  },
  {
    id: 'versace-house',
    title: 'Versace House',
    sub: '4 × 4 ML decants · Sample sizes, not full bottles',
    price: 615,
    oldPrice: 685,
    saveBadge: 'Save 10%',
    soldOut: false,
    items: [
      { name: 'Versace Eau Fraiche', brand: 'Versace' },
      { name: 'Versace Dylan Blue', brand: 'Versace' },
      { name: 'Versace Eros Energy', brand: 'Versace' },
      { name: 'Versace EROS Najim', brand: 'Versace' },
    ],
  },
  {
    id: 'xerjoff-house',
    title: 'Xerjoff House',
    sub: '5 × 4 ML decants · Sample sizes, not full bottles',
    price: 2835,
    oldPrice: 3150,
    saveBadge: 'Save 10%',
    soldOut: false,
    items: [
      { name: 'Xerjoff Alexandria II', brand: 'Xerjoff' },
      { name: 'Xerjoff 40 Knots', brand: 'Xerjoff' },
      { name: 'Xerjoff More Than Words', brand: 'Xerjoff' },
      { name: 'Xerjoff Naxos', brand: 'Xerjoff' },
      { name: 'Xerjoff Erba Pura', brand: 'Xerjoff' },
    ],
  },
  {
    id: 'elixir-night',
    title: 'Elixir Night',
    sub: '4 × 4 ML decants · Sample sizes, not full bottles',
    price: 1175,
    oldPrice: 1310,
    saveBadge: 'Save 10%',
    soldOut: false,
    items: [
      { name: 'Gucci Guilty Elixir', brand: 'Gucci' },
      { name: 'Hugo Boss The Scent Elixir', brand: 'Hugo Boss' },
      { name: 'JPG Le Male Elixir', brand: 'Jean Paul Gaultier' },
      { name: 'Paco Rabanne One Million Elixir', brand: 'Paco Rabanne' },
    ],
  },
  {
    id: 'sweet-and-warm',
    title: 'Sweet & Warm',
    sub: '5 × 4 ML decants · Sample sizes, not full bottles',
    price: 2005,
    oldPrice: 2230,
    saveBadge: 'Save 10%',
    soldOut: false,
    items: [
      { name: "Initio Can't Get Enough", brand: 'Initio' },
      { name: 'Montale Arabians Tonka', brand: 'Montale' },
      { name: 'D&G The One PARFUM', brand: 'Dolce & Gabbana' },
      { name: 'Gucci Guilty Absolu de Parfum', brand: 'Gucci' },
      { name: 'Mancera Red Tobacco', brand: 'Mancera' },
    ],
  },
  {
    id: 'amber-and-incense',
    title: 'Amber & Incense',
    sub: '4 × 4 ML decants · Sample sizes, not full bottles',
    price: 1680,
    oldPrice: 1870,
    saveBadge: 'Save 10%',
    soldOut: false,
    items: [
      { name: 'Serge Lutens Ambre Sultan', brand: 'Serge Lutens' },
      { name: 'Serge Lutens Chergui', brand: 'Serge Lutens' },
      { name: 'Montale Arabians Tonka', brand: 'Montale' },
      { name: "Beverly Hills Exclusive Unique'e Luxury", brand: "Unique'e Luxury" },
    ],
  },
  {
    id: 'spice-cabinet',
    title: 'Spice Cabinet',
    sub: '5 × 4 ML decants · Sample sizes, not full bottles',
    price: 1530,
    oldPrice: 1700,
    saveBadge: 'Save 10%',
    soldOut: false,
    items: [
      { name: 'SpiceBomb Extreme', brand: 'Viktor & Rolf' },
      { name: 'SpiceBomb Metallic Musk', brand: 'Viktor & Rolf' },
      { name: 'Mancera Red Tobacco', brand: 'Mancera' },
      { name: 'Azzaro Forever Wanted Absolu', brand: 'Azzaro' },
      { name: 'Gucci Guilty Absolu de Parfum', brand: 'Gucci' },
    ],
  },
  {
    id: 'night-out',
    title: 'Night Out',
    sub: '5 × 4 ML decants · Sample sizes, not full bottles',
    price: 1290,
    oldPrice: 1435,
    saveBadge: 'Save 10%',
    soldOut: false,
    items: [
      { name: 'D&G The One PARFUM', brand: 'Dolce & Gabbana' },
      { name: 'Paco Rabanne One Million Elixir', brand: 'Paco Rabanne' },
      { name: 'Hugo Boss The Scent Elixir', brand: 'Hugo Boss' },
      { name: 'Versace EROS Najim', brand: 'Versace' },
      { name: 'Carolina Herrera 212 Sexy Men', brand: 'Carolina Herrera' },
    ],
  },
  {
    id: 'noir-extreme-pair',
    title: 'Noir Extreme Duo',
    sub: '2 × 4 ML decants · Sample sizes, not full bottles',
    price: 705,
    oldPrice: 785,
    saveBadge: 'Save 10%',
    soldOut: false,
    items: [
      { name: 'Tom Ford Noir Extreme', brand: 'Tom Ford' },
      { name: 'Tom Ford Noir Extreme Parfum', brand: 'Tom Ford' },
    ],
  },
  {
    id: 'gucci-guilty-pair',
    title: 'Gucci Guilty Duo',
    sub: '2 × 4 ML decants · Sample sizes, not full bottles',
    price: 855,
    oldPrice: 950,
    saveBadge: 'Save 10%',
    soldOut: false,
    items: [
      { name: 'Gucci Guilty Elixir', brand: 'Gucci' },
      { name: 'Gucci Guilty Absolu de Parfum', brand: 'Gucci' },
    ],
  },
  {
    id: 'spicebomb-pair',
    title: 'Spicebomb Duo',
    sub: '2 × 4 ML decants · Sample sizes, not full bottles',
    price: 525,
    oldPrice: 585,
    saveBadge: 'Save 10%',
    soldOut: false,
    items: [
      { name: 'SpiceBomb Extreme', brand: 'Viktor & Rolf' },
      { name: 'SpiceBomb Metallic Musk', brand: 'Viktor & Rolf' },
    ],
  },
  {
    id: 'serge-lutens-pair',
    title: 'Serge Lutens Duo',
    sub: '2 × 4 ML decants · Sample sizes, not full bottles',
    price: 790,
    oldPrice: 880,
    saveBadge: 'Save 10%',
    soldOut: false,
    items: [
      { name: 'Serge Lutens Chergui', brand: 'Serge Lutens' },
      { name: 'Serge Lutens Ambre Sultan', brand: 'Serge Lutens' },
    ],
  },
  {
    id: 'nine-to-five',
    title: 'Nine to Five',
    sub: '5 × 4 ML decants · Sample sizes, not full bottles',
    price: 1220,
    oldPrice: 1360,
    saveBadge: 'Save 10%',
    soldOut: true,
    items: [
      { name: "Terre d'hermes EDT", brand: 'Hermès' },
      { name: 'Prada L’Homme Intense', brand: 'Prada' },
      { name: 'Versace Dylan Blue', brand: 'Versace' },
      { name: 'Bvlgari Man Wood Essence', brand: 'Bvlgari' },
      { name: 'Dior Homme Intense', brand: 'Dior' },
    ],
  },
  {
    id: 'statement',
    title: 'Statement',
    sub: '5 × 4 ML decants · Sample sizes, not full bottles',
    price: 2025,
    oldPrice: 2250,
    saveBadge: 'Save 10%',
    soldOut: true,
    items: [
      { name: 'Roja Amber Aoud', brand: 'Roja Parfums' },
      { name: 'Xerjoff Alexandria II', brand: 'Xerjoff' },
      { name: 'Amouage Outlands 2ML', brand: 'Amouage' },
      { name: 'Matiere Premiere Radical Rose Extrait de parfum', brand: 'Matière Première' },
      { name: 'Initio Can’t Get Enough', brand: 'Initio' },
    ],
  },
  {
    id: 'oman-discovery',
    title: 'Oman Discovery',
    sub: '3 × 4 ML decants · Sample sizes, not full bottles',
    price: 1400,
    oldPrice: 1540,
    saveBadge: 'Save 9%',
    soldOut: true,
    items: [
      { name: 'Oman luxury wanderlust 2ML', brand: 'Omanluxury' },
      { name: 'Amouage Guidance 2ML', brand: 'Amouage' },
      { name: 'Amouage Existence 2ML', brand: 'Amouage' },
    ],
  },
  {
    id: 'best-sellers',
    title: 'Best Sellers',
    sub: '5 × 4 ML decants · Sample sizes, not full bottles',
    price: 1385,
    oldPrice: 1540,
    saveBadge: 'Save 10%',
    soldOut: true,
    items: [
      { name: 'Xerjoff Naxos', brand: 'Xerjoff' },
      { name: 'Dior Homme Intense', brand: 'Dior' },
      { name: 'Versace Dylan Blue', brand: 'Versace' },
      { name: 'Hugo Boss Bottled Absolu Intense', brand: 'Hugo Boss' },
      { name: "Terre d'hermes EDT", brand: 'Hermès' },
    ],
  },
  {
    id: 'fresh-office',
    title: 'Fresh Office',
    sub: '4 × 4 ML decants · Sample sizes, not full bottles',
    price: 820,
    oldPrice: 915,
    saveBadge: 'Save 10%',
    soldOut: true,
    items: [
      { name: "Issey Miyake Le Sel D'Issey EDP", brand: 'Issey Miyake' },
      { name: 'Bentley Silverlake', brand: 'Bentley' },
      { name: 'Carolina Herrera 212 Men NYC', brand: 'Carolina Herrera' },
      { name: 'Versace Eau Fraiche', brand: 'Versace' },
    ],
  },
];

export interface SetBoxOption {
  id: '26ml' | '30ml';
  title: string;
  totalMl: string;
  slots: ('10ML' | '6ML')[];
  description: string;
}

export const SET_BOX_OPTIONS: SetBoxOption[] = [
  {
    id: '26ml',
    title: 'Two 10 ml and one 6 ml',
    totalMl: '26 ml in all',
    slots: ['10ML', '10ML', '6ML'],
    description: 'Two generous 10 ml atomizers for your daily staples, plus a 6 ml atomizer for an evening or discovery scent.',
  },
  {
    id: '30ml',
    title: 'Three 10 ml',
    totalMl: '30 ml in all',
    slots: ['10ML', '10ML', '10ML'],
    description: 'Three full 10 ml glass travel atomizers — enough for months of rotation across any three fragrances.',
  },
];

'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/data/catalog';

export interface CartItem {
  key: string;
  productId: string;
  name: string;
  brand: string;
  size: string;
  price: number;
  qty: number;
}

interface StoreContextType {
  savedIds: string[];
  toggleSaved: (id: string) => void;
  showSavedOnly: boolean;
  setShowSavedOnly: (v: boolean) => void;
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'key'>) => void;
  updateQty: (key: string, delta: number) => void;
  removeFromCart: (key: string) => void;
  clearCart: () => void;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (v: boolean | ((prev: boolean) => boolean)) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  filterOpen: boolean;
  setFilterOpen: (v: boolean) => void;
  selectedSize: string | null;
  setSelectedSize: (s: string | null) => void;
  selectedKind: 'niche' | 'designer' | null;
  setSelectedKind: (k: 'niche' | 'designer' | null) => void;
  selectedHouses: string[];
  toggleHouse: (h: string) => void;
  setSelectedHouses: (houses: string[]) => void;
  priceRange: [number, number];
  setPriceRange: (r: [number, number]) => void;
  clearAllFilters: () => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (p: Product | null) => void;
  lang: 'en' | 'ar';
  toggleLang: () => void;
}

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedKind, setSelectedKind] = useState<'niche' | 'designer' | null>(null);
  const [selectedHouses, setSelectedHouses] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([140, 2240]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [lang, setLang] = useState<'en' | 'ar'>('en');

  useEffect(() => {
    try {
      const s = localStorage.getItem('ln_saved');
      if (s) setSavedIds(JSON.parse(s));
      const c = localStorage.getItem('ln_cart');
      if (c) setCart(JSON.parse(c));
    } catch {
      // ignore storage errors
    }
  }, []);

  const toggleSaved = (id: string) => {
    setSavedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      try {
        localStorage.setItem('ln_saved', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const addToCart = (item: Omit<CartItem, 'key'>) => {
    const key = `${item.productId}::${item.size}`;
    setCart((prev) => {
      const existing = prev.find((x) => x.key === key);
      const next = existing
        ? prev.map((x) => (x.key === key ? { ...x, qty: x.qty + item.qty } : x))
        : [...prev, { ...item, key }];
      try {
        localStorage.setItem('ln_cart', JSON.stringify(next));
      } catch {}
      return next;
    });
    setCartOpen(true);
  };

  const updateQty = (key: string, delta: number) => {
    setCart((prev) => {
      const next = prev
        .map((x) => (x.key === key ? { ...x, qty: x.qty + delta } : x))
        .filter((x) => x.qty > 0);
      try {
        localStorage.setItem('ln_cart', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const removeFromCart = (key: string) => {
    setCart((prev) => {
      const next = prev.filter((x) => x.key !== key);
      try {
        localStorage.setItem('ln_cart', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const clearCart = () => {
    setCart([]);
    try {
      localStorage.removeItem('ln_cart');
    } catch {}
  };

  const toggleHouse = (h: string) => {
    setSelectedHouses((prev) =>
      prev.includes(h) ? prev.filter((x) => x !== h) : [...prev, h]
    );
  };

  const clearAllFilters = () => {
    setSelectedSize(null);
    setSelectedKind(null);
    setSelectedHouses([]);
    setPriceRange([140, 2240]);
    setSearchQuery('');
    setShowSavedOnly(false);
  };

  const toggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  return (
    <StoreContext.Provider
      value={{
        savedIds,
        toggleSaved,
        showSavedOnly,
        setShowSavedOnly,
        cart,
        addToCart,
        updateQty,
        removeFromCart,
        clearCart,
        cartOpen,
        setCartOpen,
        searchOpen,
        setSearchOpen,
        searchQuery,
        setSearchQuery,
        filterOpen,
        setFilterOpen,
        selectedSize,
        setSelectedSize,
        selectedKind,
        setSelectedKind,
        selectedHouses,
        toggleHouse,
        setSelectedHouses,
        priceRange,
        setPriceRange,
        clearAllFilters,
        quickViewProduct,
        setQuickViewProduct,
        lang,
        toggleLang,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}

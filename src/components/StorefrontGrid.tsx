'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { Product, CATALOG_MIN_PRICE, CATALOG_MAX_PRICE } from '@/data/catalog';
import { useStore } from '@/context/StoreContext';
import { ProductCard } from './ProductCard';
import { FilterDrawer } from './FilterDrawer';

interface StorefrontGridProps {
  initialProducts: Product[];
  heading?: string;
  hideToolbarHeading?: boolean;
  hideKindFilter?: boolean;
}

export function StorefrontGrid({
  initialProducts,
  heading = 'Perfume decants in Egypt',
  hideToolbarHeading = false,
  hideKindFilter = false,
}: StorefrontGridProps) {
  const {
    filterOpen,
    setFilterOpen,
    selectedSize,
    setSelectedSize,
    selectedKind,
    setSelectedKind,
    selectedHouses,
    toggleHouse,
    priceRange,
    setPriceRange,
    searchQuery,
    setSearchQuery,
    showSavedOnly,
    setShowSavedOnly,
    savedIds,
    clearAllFilters,
  } = useStore();

  const [sortBy, setSortBy] = useState<'best' | 'price-asc' | 'price-desc' | 'name' | 'name-desc'>('best');

  const filteredProducts = useMemo(() => {
    let list = [...initialProducts];

    if (showSavedOnly) {
      list = list.filter((p) => savedIds.includes(p.id));
    }

    if (selectedSize) {
      list = list.filter((p) =>
        p.sizes.some((s) => s.size.toLowerCase() === selectedSize.toLowerCase())
      );
    }

    if (!hideKindFilter && selectedKind) {
      list = list.filter((p) => p.type === selectedKind);
    }

    if (selectedHouses.length > 0) {
      list = list.filter((p) => selectedHouses.includes(p.brand));
    }

    if (priceRange[0] > CATALOG_MIN_PRICE || priceRange[1] < CATALOG_MAX_PRICE) {
      list = list.filter(
        (p) => p.from >= priceRange[0] && p.from <= priceRange[1]
      );
    }

    const q = searchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'price-asc') {
      list.sort((a, b) => Number(a.soldOut) - Number(b.soldOut) || a.from - b.from);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => Number(a.soldOut) - Number(b.soldOut) || b.from - a.from);
    } else if (sortBy === 'name') {
      list.sort((a, b) => Number(a.soldOut) - Number(b.soldOut) || a.name.localeCompare(b.name));
    } else if (sortBy === 'name-desc') {
      list.sort((a, b) => Number(a.soldOut) - Number(b.soldOut) || b.name.localeCompare(a.name));
    }

    return list;
  }, [
    initialProducts,
    showSavedOnly,
    savedIds,
    selectedSize,
    hideKindFilter,
    selectedKind,
    selectedHouses,
    priceRange,
    searchQuery,
    sortBy,
  ]);

  const activeFilterCount =
    (selectedSize ? 1 : 0) +
    (!hideKindFilter && selectedKind ? 1 : 0) +
    selectedHouses.length +
    (priceRange[0] > CATALOG_MIN_PRICE || priceRange[1] < CATALOG_MAX_PRICE ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0) +
    (showSavedOnly ? 1 : 0);

  return (
    <>
      <div className="tools in">
        <div className="tools-l">
          {!hideToolbarHeading && <h1>{heading}</h1>}
          <span id="shownCount" className="count">
            {filteredProducts.length}{' '}
            {filteredProducts.length === 1 ? 'product' : 'products'}
          </span>
        </div>

        <div className="tools-r">
          <button
            type="button"
            className="tool-btn"
            id="filterBtn"
            aria-controls="filters"
            aria-expanded={filterOpen}
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              aria-hidden="true"
            >
              <path d="M4 6h16M7 12h10M10 18h4"></path>
            </svg>
            <span>Filter</span>
            <span
              className="tool-n num"
              id="filterN"
              hidden={activeFilterCount === 0}
            >
              {activeFilterCount}
            </span>
          </button>

          <label className="sort">
            <span className="sr">Sort by</span>
            <select
              id="sortSel"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            >
              <option value="best">Best selling</option>
              <option value="price-asc">Price, low to high</option>
              <option value="price-desc">Price, high to low</option>
              <option value="name">Name, A to Z</option>
              <option value="name-desc">Name, Z to A</option>
            </select>
          </label>
        </div>
      </div>

      {/* Applied Filter Pills */}
      <div
        className="applied"
        id="applied"
        hidden={activeFilterCount === 0}
      >
        {selectedSize && (
          <button
            type="button"
            className="af-pill"
            onClick={() => setSelectedSize(null)}
          >
            <span>Size: {selectedSize}</span>
            <span>×</span>
          </button>
        )}
        {!hideKindFilter && selectedKind && (
          <button
            type="button"
            className="af-pill"
            onClick={() => setSelectedKind(null)}
          >
            <span>Kind: {selectedKind}</span>
            <span>×</span>
          </button>
        )}
        {selectedHouses.map((h) => (
          <button
            key={h}
            type="button"
            className="af-pill"
            onClick={() => toggleHouse(h)}
          >
            <span>{h}</span>
            <span>×</span>
          </button>
        ))}
        {(priceRange[0] > CATALOG_MIN_PRICE ||
          priceRange[1] < CATALOG_MAX_PRICE) && (
          <button
            type="button"
            className="af-pill"
            onClick={() => setPriceRange([CATALOG_MIN_PRICE, CATALOG_MAX_PRICE])}
          >
            <span>
              {priceRange[0]}–{priceRange[1]} EGP
            </span>
            <span>×</span>
          </button>
        )}
        {searchQuery.trim() && (
          <button
            type="button"
            className="af-pill"
            onClick={() => setSearchQuery('')}
          >
            <span>“{searchQuery}”</span>
            <span>×</span>
          </button>
        )}
        {showSavedOnly && (
          <button
            type="button"
            className="af-pill"
            onClick={() => setShowSavedOnly(false)}
          >
            <span>Saved only</span>
            <span>×</span>
          </button>
        )}
        {activeFilterCount > 1 && (
          <button
            type="button"
            className="af-pill"
            onClick={clearAllFilters}
            style={{ color: 'var(--accent-gold)' }}
          >
            Clear all
          </button>
        )}
      </div>

      <div className="grid regrid" id="grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div
          style={{
            textAlign: 'center',
            padding: '48px 20px',
            borderRadius: '16px',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-card)',
            margin: '24px 0',
          }}
        >
          <p style={{ fontWeight: 600, margin: '0 0 8px' }}>
            No fragrances match this filter.
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px', margin: '0 0 16px' }}>
            Try a shorter word, or clear the filter.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="pill-btn"
              id="noneClear"
              onClick={clearAllFilters}
            >
              Clear all
            </button>
            <Link className="pill-btn" href="/request">
              Can&apos;t find it? Ask us to get it
            </Link>
          </div>
        </div>
      )}

      <FilterDrawer
        shownCount={filteredProducts.length}
        hideKindFilter={hideKindFilter}
      />
    </>
  );
}

'use client';

import React, { useMemo } from 'react';
import { useStore } from '@/context/StoreContext';
import {
  ALL_PRODUCTS,
  HOUSES,
  CATALOG_MIN_PRICE,
  CATALOG_MAX_PRICE,
} from '@/data/catalog';

interface FilterDrawerProps {
  shownCount: number;
  hideKindFilter?: boolean;
}

export function FilterDrawer({ shownCount, hideKindFilter = false }: FilterDrawerProps) {
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
    clearAllFilters,
  } = useStore();

  const houseCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of ALL_PRODUCTS) {
      counts[p.brand] = (counts[p.brand] || 0) + 1;
    }
    return counts;
  }, []);

  const sizes: { label: string; value: string | null }[] = [
    { label: 'All', value: null },
    { label: '4ML', value: '4ML' },
    { label: '6ML', value: '6ML' },
    { label: '10ML', value: '10ML' },
    { label: 'Samples', value: 'Sample' },
  ];

  const kinds: { label: string; value: 'niche' | 'designer' | null }[] = [
    { label: 'All', value: null },
    { label: 'Niche', value: 'niche' },
    { label: 'Designer', value: 'designer' },
  ];

  const minPct =
    ((priceRange[0] - CATALOG_MIN_PRICE) /
      (CATALOG_MAX_PRICE - CATALOG_MIN_PRICE)) *
    100;
  const maxPct =
    ((priceRange[1] - CATALOG_MIN_PRICE) /
      (CATALOG_MAX_PRICE - CATALOG_MIN_PRICE)) *
    100;

  return (
    <>
      <div
        className={`scrim ${filterOpen ? 'open' : ''}`}
        id="fscrim"
        onClick={() => setFilterOpen(false)}
      />
      <aside
        className={`fdrawer ${filterOpen ? 'open' : ''}`}
        id="filters"
        aria-hidden={!filterOpen}
        aria-labelledby="filtersTitle"
      >
        <div className="chead">
          <h2 id="filtersTitle">Filter</h2>
          <button
            className="icon"
            id="filtersClose"
            type="button"
            aria-label="Close"
            onClick={() => setFilterOpen(false)}
          >
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.7"
              fill="none"
            >
              <path d="M6 6l12 12M18 6L6 18"></path>
            </svg>
          </button>
        </div>

        <div className="fbody" id="fbody">
          {filterOpen && (
            <>
              {/* SIZE */}
              <div className="fsec">
                <h3 className="fsec-title">Size</h3>
                <div className="fpills">
                  {sizes.map((s) => (
                    <button
                      key={s.label}
                      type="button"
                      className={`fpill ${selectedSize === s.value ? 'on' : ''}`}
                      onClick={() => setSelectedSize(s.value)}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* KIND */}
              {!hideKindFilter && (
                <div className="fsec">
                  <h3 className="fsec-title">Kind</h3>
                  <div className="fpills">
                    {kinds.map((k) => (
                      <button
                        key={k.label}
                        type="button"
                        className={`fpill ${selectedKind === k.value ? 'on' : ''}`}
                        onClick={() => setSelectedKind(k.value)}
                      >
                        {k.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* PRICE */}
              <div className="fsec">
                <h3 className="fsec-title">Price</h3>
                <div className="fprice-slider">
                  <div className="fprice-rail" />
                  <div
                    className="fprice-fill"
                    style={{ left: `${minPct}%`, right: `${100 - maxPct}%` }}
                  />
                  <span
                    className="fprice-thumb"
                    style={{ left: `calc(${minPct}% - 11px)` }}
                  />
                  <span
                    className="fprice-thumb"
                    style={{ left: `calc(${maxPct}% - 11px)` }}
                  />
                  <input
                    type="range"
                    min={CATALOG_MIN_PRICE}
                    max={CATALOG_MAX_PRICE}
                    step={10}
                    value={priceRange[0]}
                    aria-label="Minimum price"
                    onChange={(e) => {
                      const val = Math.min(Number(e.target.value), priceRange[1] - 10);
                      setPriceRange([val, priceRange[1]]);
                    }}
                  />
                  <input
                    type="range"
                    min={CATALOG_MIN_PRICE}
                    max={CATALOG_MAX_PRICE}
                    step={10}
                    value={priceRange[1]}
                    aria-label="Maximum price"
                    onChange={(e) => {
                      const val = Math.max(Number(e.target.value), priceRange[0] + 10);
                      setPriceRange([priceRange[0], val]);
                    }}
                  />
                </div>
                <div className="fprice-labels">
                  <span>
                    From <b className="num">{priceRange[0].toLocaleString()}</b> EGP
                  </span>
                  <span>
                    To <b className="num">{priceRange[1].toLocaleString()}</b> EGP
                  </span>
                </div>
              </div>

              {/* HOUSE */}
              <div className="fsec" style={{ borderBottom: 0, marginBottom: 0 }}>
                <h3 className="fsec-title">House</h3>
                <div className="fhouse-list">
                  {HOUSES.map((h) => {
                    const checked = selectedHouses.includes(h.name);
                    const count = houseCounts[h.name] || h.count || 1;
                    return (
                      <label key={h.href} className="fhouse-item">
                        <span className="fhouse-left">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleHouse(h.name)}
                          />
                          <span>{h.name}</span>
                        </span>
                        <span className="fhouse-count num">{count}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="ffoot">
          <button
            type="button"
            className="pill-btn"
            id="filtersClear"
            onClick={clearAllFilters}
          >
            Clear all
          </button>
          <button
            type="button"
            className="co"
            id="filtersDone"
            onClick={() => setFilterOpen(false)}
          >
            Show {shownCount} {shownCount === 1 ? 'product' : 'products'}
          </button>
        </div>
      </aside>
    </>
  );
}

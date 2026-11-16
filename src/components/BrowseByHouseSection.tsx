'use client';

import React from 'react';
import { HOUSES } from '@/data/catalog';
import { useStore } from '@/context/StoreContext';

export function BrowseByHouseSection() {
  const { setSelectedHouses } = useStore();

  return (
    <div className="wrap">
      <nav className="houses" aria-labelledby="housesTitle">
        <h2 id="housesTitle">Browse by house</h2>
        <div className="house-row">
          {HOUSES.map((h) => (
            <a
              key={h.href}
              href={h.href}
              className="in"
              onClick={(e) => {
                e.preventDefault();
                setSelectedHouses([h.name]);
                const gridEl = document.getElementById('grid');
                if (gridEl) {
                  gridEl.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              {h.name}
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
}

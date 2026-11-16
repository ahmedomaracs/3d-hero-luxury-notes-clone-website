'use client';

import React from 'react';
import { BUNDLES, Bundle } from '@/data/bundles';
import { useStore } from '@/context/StoreContext';

export default function BundlesPage() {
  const { addToCart } = useStore();

  const handleAddBundle = (b: Bundle) => {
    addToCart({
      productId: `bundle-${b.id}`,
      name: `${b.title} Bundle`,
      brand: 'Curated Set',
      size: `${b.items.length} × 4ML`,
      price: b.price,
      qty: 1,
    });
  };

  return (
    <div className="wrap">
      <header className="bx-head">
        <h1>Pick your bundle.</h1>
        <p>
          Sets of 4 ML decants, chosen to go together. One for the gym, one for
          the office, one for a date, one for the night you want remembered.
        </p>
      </header>

      <div className="bx-grid">
        {BUNDLES.map((b) => (
          <article
            key={b.id}
            className={`bx ${b.soldOut ? 'is-out' : ''}`}
            id={b.id}
          >
            <a
              className="bx-art"
              href={`/bundles/${b.id}`}
              onClick={(e) => {
                e.preventDefault();
                if (!b.soldOut) handleAddBundle(b);
              }}
            >
              <img
                src={`/shop/bundles/${b.id}.webp`}
                alt=""
                width={361}
                height={284}
              />
              {b.soldOut && <span className="bx-sold">Sold out for now</span>}
            </a>

            <div className="bx-body">
              <h2 className="bx-name">
                <a
                  href={`/bundles/${b.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    if (!b.soldOut) handleAddBundle(b);
                  }}
                >
                  {b.title}
                </a>
              </h2>
              <p className="bx-size">
                {b.items.length} × 4 ML decants ·{' '}
                <span>Sample sizes, not full bottles</span>
              </p>
              <div className="bx-price">
                <b className="num">{b.price.toLocaleString()} EGP</b>{' '}
                <s className="num">{b.oldPrice.toLocaleString()}</s>{' '}
                <span className="bx-save">{b.saveBadge}</span>
              </div>
              <button
                type="button"
                className="co bx-add"
                disabled={b.soldOut}
                onClick={() => handleAddBundle(b)}
              >
                {b.soldOut ? 'Sold out for now' : 'Add bundle to bag'}
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

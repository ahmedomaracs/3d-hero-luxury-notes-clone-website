'use client';

import React from 'react';
import { Product } from '@/data/catalog';
import { useStore } from '@/context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { savedIds, toggleSaved, setQuickViewProduct } = useStore();
  const isSaved = savedIds.includes(product.id);

  // Determine low stock or sold out tag exactly as captured
  const badgeText = product.badge || (product.soldOut ? 'Sold out' : null);

  return (
    <article
      className={`card ${product.soldOut ? 'is-out' : ''} in`}
      data-id={product.id}
    >
      <div className="shot">
        <a
          className="shot-a"
          href={`/p/${product.id}`}
          tabIndex={-1}
          aria-hidden="true"
          onClick={(e) => {
            e.preventDefault();
            setQuickViewProduct(product);
          }}
        >
          <img
            src={product.thumb}
            alt={product.name}
            loading="eager"
            width={480}
            height={480}
          />
        </a>

        {badgeText && (
          <span className={`tag ${product.soldOut ? 'tag-out' : ''}`}>
            {badgeText}
          </span>
        )}

        <button
          type="button"
          className="fav"
          data-fav={product.id}
          aria-pressed={isSaved}
          aria-label={
            isSaved ? `Remove from saved: ${product.name}` : `Save: ${product.name}`
          }
          onClick={(e) => {
            e.stopPropagation();
            toggleSaved(product.id);
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 20.5s-7.5-4.6-9.2-9.4C1.6 7.8 3.8 4.5 7.2 4.5c2 0 3.6 1.1 4.8 2.8 1.2-1.7 2.8-2.8 4.8-2.8 3.4 0 5.6 3.3 4.4 6.6-1.7 4.8-9.2 9.4-9.2 9.4z"></path>
          </svg>
        </button>

        <button
          type="button"
          className="qv-btn"
          data-qv={product.id}
          aria-label={`Quick view: ${product.name}`}
          onClick={(e) => {
            e.stopPropagation();
            setQuickViewProduct(product);
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            aria-hidden="true"
          >
            <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          <span>Quick view</span>
        </button>
      </div>

      <a
        className="card-a"
        href={`/p/${product.id}`}
        onClick={(e) => {
          e.preventDefault();
          setQuickViewProduct(product);
        }}
      >
        <span className="chouse">{product.brand}</span>
        <span className="cname">{product.name}</span>
        <span className="cprice">
          from{' '}
          <b>
            <span className="num">{product.from.toLocaleString()}</span> EGP
          </b>
        </span>
      </a>
    </article>
  );
}

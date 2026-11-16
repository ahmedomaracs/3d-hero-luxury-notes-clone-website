'use client';

import React, { useState, useEffect } from 'react';
import { useStore } from '@/context/StoreContext';
import { getFragranceNotes } from '@/data/catalog';
import { PerfumeBottleArt } from './PerfumeBottleArt';

export function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart, savedIds, toggleSaved } =
    useStore();
  const [selectedSizeIdx, setSelectedSizeIdx] = useState(0);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setSelectedSizeIdx(0);
    setQty(1);
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const sizes = quickViewProduct.sizes.length
    ? quickViewProduct.sizes
    : [{ size: '4ML', price: quickViewProduct.from, left: 10, low: false, image: '' }];
  const currentSize = sizes[selectedSizeIdx] || sizes[0];
  const notes = getFragranceNotes(quickViewProduct);
  const isSaved = savedIds.includes(quickViewProduct.id);

  return (
    <div
      className="qv-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={`Quick view: ${quickViewProduct.name}`}
      onClick={() => setQuickViewProduct(null)}
    >
      <div className="qv-card" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="icon"
          aria-label="Close"
          onClick={() => setQuickViewProduct(null)}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 10,
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.7"
            fill="none"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        {/* Left: Bottle Showcase */}
        <div
          className="qv-visual"
          style={{
            minHeight: 'clamp(240px, 42vh, 340px)',
            background: 'var(--bg-secondary)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ flex: 1, minHeight: '300px' }}>
            <PerfumeBottleArt
              id={quickViewProduct.id}
              name={quickViewProduct.name}
              brand={quickViewProduct.brand}
              sizeLabel={currentSize.size}
            />
          </div>
          <div
            style={{
              padding: '12px 20px',
              borderTop: '1px solid var(--border-divider)',
              fontSize: '12px',
              color: 'var(--text-secondary)',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>Shows the {currentSize.size}</span>
            <span style={{ color: 'var(--accent-amber)', fontWeight: 700 }}>
              ★ {notes.rating} ({notes.votes} votes)
            </span>
          </div>
        </div>

        {/* Right: Product Details & Add to Cart */}
        <div
          className="qv-body"
          style={{ padding: '28px 26px', display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          <div>
            <div className="kicker-overline" style={{ marginBottom: '6px' }}>
              {quickViewProduct.brand} {quickViewProduct.type ? `· ${quickViewProduct.type}` : ''}
            </div>
            <h2
              className="heading-editorial"
              style={{ fontSize: '1.65rem', lineHeight: 1.2, margin: '0 0 8px' }}
            >
              {quickViewProduct.name}
            </h2>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
              <span
                className="num"
                style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)' }}
              >
                {currentSize.price.toLocaleString()} EGP
              </span>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  padding: '2px 9px',
                  borderRadius: '9999px',
                  background: quickViewProduct.soldOut
                    ? 'var(--status-danger-bg)'
                    : currentSize.low
                    ? 'var(--status-warning-bg)'
                    : 'var(--status-success-bg)',
                  color: quickViewProduct.soldOut
                    ? 'var(--status-danger)'
                    : currentSize.low
                    ? 'var(--status-warning)'
                    : 'var(--status-success)',
                }}
              >
                {quickViewProduct.soldOut
                  ? 'Sold out'
                  : currentSize.low
                  ? `Only ${currentSize.left} left`
                  : `${currentSize.left} in stock`}
              </span>
            </div>
          </div>

          {/* Size Selector */}
          <div>
            <div className="fsec-title" style={{ marginBottom: '8px' }}>
              Size
            </div>
            <div className="fpills">
              {sizes.map((s, idx) => (
                <button
                  key={s.size}
                  type="button"
                  className={`fpill ${idx === selectedSizeIdx ? 'on' : ''}`}
                  onClick={() => setSelectedSizeIdx(idx)}
                >
                  {s.size} · {s.price.toLocaleString()} EGP
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Actions */}
          <div
            className="qv-actions"
            style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px', flexWrap: 'wrap' }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                border: '1px solid var(--border-card)',
                borderRadius: '9999px',
                background: 'var(--bg-primary)',
              }}
            >
              <button
                type="button"
                aria-label="One fewer"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                style={{
                  width: '36px',
                  height: '40px',
                  border: 0,
                  background: 'transparent',
                  cursor: 'pointer',
                  fontWeight: 700,
                }}
              >
                −
              </button>
              <span className="num" style={{ minWidth: '28px', textAlign: 'center', fontWeight: 600 }}>
                {qty}
              </span>
              <button
                type="button"
                aria-label="One more"
                onClick={() => setQty((q) => q + 1)}
                style={{
                  width: '36px',
                  height: '40px',
                  border: 0,
                  background: 'transparent',
                  cursor: 'pointer',
                  fontWeight: 700,
                }}
              >
                +
              </button>
            </div>

            <button
              type="button"
              className="co"
              disabled={quickViewProduct.soldOut}
              onClick={() => {
                addToCart({
                  productId: quickViewProduct.id,
                  name: quickViewProduct.name,
                  brand: quickViewProduct.brand,
                  size: currentSize.size,
                  price: currentSize.price,
                  qty,
                });
                setQuickViewProduct(null);
              }}
            >
              {quickViewProduct.soldOut ? 'Sold out' : 'Add to cart'}
            </button>

            <button
              type="button"
              className="icon"
              aria-label={isSaved ? 'Remove from saved' : 'Save'}
              onClick={() => toggleSaved(quickViewProduct.id)}
              style={{
                width: '42px',
                height: '42px',
                background: isSaved ? 'var(--accent-gold)' : 'var(--bg-surface)',
                color: isSaved ? '#FFFFFF' : 'var(--text-primary)',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 20.5s-7.5-4.6-9.2-9.4C1.6 7.8 3.8 4.5 7.2 4.5c2 0 3.6 1.1 4.8 2.8 1.2-1.7 2.8-2.8 4.8-2.8 3.4 0 5.6 3.3 4.4 6.6-1.7 4.8-9.2 9.4-9.2 9.4z" />
              </svg>
            </button>
          </div>

          {/* Fragrance Pyramid */}
          <div
            style={{
              paddingTop: '14px',
              borderTop: '1px solid var(--border-divider)',
              fontSize: '13px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <div className="fsec-title" style={{ marginBottom: '2px' }}>
              Fragrance pyramid &amp; what wearers report
            </div>
            <div>
              <strong style={{ color: 'var(--text-primary)' }}>Opens with:</strong>{' '}
              <span style={{ color: 'var(--text-secondary)' }}>{notes.opens}</span>
            </div>
            <div>
              <strong style={{ color: 'var(--text-primary)' }}>Heart:</strong>{' '}
              <span style={{ color: 'var(--text-secondary)' }}>{notes.heart}</span>
            </div>
            <div>
              <strong style={{ color: 'var(--text-primary)' }}>Dries down to:</strong>{' '}
              <span style={{ color: 'var(--text-secondary)' }}>{notes.dries}</span>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '8px',
                marginTop: '6px',
                padding: '10px',
                borderRadius: '12px',
                background: 'var(--bg-primary)',
                border: '1px solid var(--border-card)',
                fontSize: '12px',
              }}
            >
              <div>
                <div style={{ color: 'var(--text-muted)' }}>Lasts</div>
                <strong style={{ color: 'var(--text-primary)' }}>{notes.longevity}</strong>
              </div>
              <div>
                <div style={{ color: 'var(--text-muted)' }}>Carries</div>
                <strong style={{ color: 'var(--text-primary)' }}>{notes.sillage}</strong>
              </div>
              <div>
                <div style={{ color: 'var(--text-muted)' }}>Best in</div>
                <strong style={{ color: 'var(--text-primary)' }}>{notes.season}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

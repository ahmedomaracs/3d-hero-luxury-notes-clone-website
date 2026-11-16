'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';

export function CartDrawer() {
  const { cart, cartOpen, setCartOpen, updateQty, removeFromCart, clearCart } =
    useStore();
  const [checkoutDone, setCheckoutDone] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const delivery = cart.length > 0 ? 120 : 0;
  const total = subtotal + delivery;

  return (
    <>
      <div
        className={`scrim ${cartOpen ? 'open' : ''}`}
        id="scrim"
        onClick={() => setCartOpen(false)}
      />
      <aside
        className={`cart ${cartOpen ? 'open' : ''}`}
        id="cart"
        aria-hidden={!cartOpen}
        aria-label="Your cart"
      >
        <div className="chead">
          <h2>Your cart</h2>
          <button
            className="icon"
            id="cartClose"
            type="button"
            aria-label="Close"
            onClick={() => setCartOpen(false)}
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

        <div className="clines" id="clines">
          {checkoutDone ? (
            <div
              style={{
                padding: '24px 16px',
                borderRadius: '16px',
                background: 'var(--status-success-bg)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  color: 'var(--status-success)',
                  marginBottom: '6px',
                }}
              >
                Order #LN-4829 Confirmed
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '0 0 14px' }}>
                Decants are poured fresh in Cairo after your order is confirmed. Complete your InstaPay transfer to dispatch via J&amp;T Express.
              </p>
              <button
                type="button"
                className="pill-btn"
                onClick={() => setCheckoutDone(false)}
              >
                Back to bag
              </button>
            </div>
          ) : cart.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '48px 16px',
                color: 'var(--text-muted)',
              }}
            >
              <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 6px' }}>
                Your cart is empty
              </p>
              <p style={{ fontSize: '13px', margin: 0 }}>
                Decants are poured after your order is confirmed.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {cart.map((item) => (
                <div
                  key={item.key}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                    padding: '12px',
                    borderRadius: '14px',
                    background: 'var(--bg-primary)',
                    border: '1px solid var(--border-card)',
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: '11px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        color: 'var(--text-muted)',
                        fontWeight: 600,
                      }}
                    >
                      {item.brand} · {item.size}
                    </div>
                    <div
                      style={{
                        fontSize: '14px',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        margin: '2px 0 4px',
                      }}
                    >
                      {item.name}
                    </div>
                    <div className="num" style={{ fontSize: '13px', fontWeight: 700 }}>
                      {(item.price * item.qty).toLocaleString()} EGP
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <button
                      type="button"
                      className="icon"
                      style={{ width: '28px', height: '28px' }}
                      aria-label="One fewer"
                      onClick={() => updateQty(item.key, -1)}
                    >
                      −
                    </button>
                    <span className="num" style={{ minWidth: '20px', textAlign: 'center', fontWeight: 600 }}>
                      {item.qty}
                    </span>
                    <button
                      type="button"
                      className="icon"
                      style={{ width: '28px', height: '28px' }}
                      aria-label="One more"
                      onClick={() => updateQty(item.key, 1)}
                    >
                      +
                    </button>
                    <button
                      type="button"
                      aria-label="Remove item"
                      onClick={() => removeFromCart(item.key)}
                      style={{
                        border: 0,
                        background: 'transparent',
                        color: 'var(--text-muted)',
                        cursor: 'pointer',
                        padding: '4px',
                      }}
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="cfoot" id="cfoot" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
          {cart.length > 0 && !checkoutDone && (
            <>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '13px',
                  color: 'var(--text-secondary)',
                }}
              >
                <span>Subtotal</span>
                <span className="num" style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                  {subtotal.toLocaleString()} EGP
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '13px',
                  color: 'var(--text-secondary)',
                }}
              >
                <span>Delivery (J&amp;T Express)</span>
                <span className="num">{delivery} EGP</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '15px',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  paddingTop: '8px',
                  borderTop: '1px solid var(--border-divider)',
                  marginBottom: '6px',
                }}
              >
                <span>Total</span>
                <span className="num">{total.toLocaleString()} EGP</span>
              </div>
              <button
                type="button"
                className="co"
                onClick={() => {
                  clearCart();
                  setCheckoutDone(true);
                }}
              >
                Checkout · InstaPay
              </button>
            </>
          )}
        </div>
      </aside>
    </>
  );
}

'use client';

import React, { useState } from 'react';

export default function RequestFragrancePage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="wrap" style={{ paddingBottom: '64px' }}>
      <section className="cat-intro">
        <p className="kicker-overline" style={{ marginBottom: '8px' }}>
          CONCIERGE SOURCING
        </p>
        <h1>Request a fragrance</h1>
        <p>
          Tell us which bottle you want us to open next. When enough people ask for
          a scent, we buy the bottle and notify you as soon as 4, 6 and 10 ml
          decants are ready.
        </p>
      </section>

      <div
        style={{
          maxWidth: '580px',
          marginTop: '24px',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-card)',
          borderRadius: '16px',
          padding: '28px',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        {submitted ? (
          <div>
            <h2 className="heading-editorial" style={{ fontSize: '1.4rem', margin: '0 0 8px' }}>
              Request noted
            </h2>
            <p style={{ color: 'var(--text-secondary)', margin: '0 0 16px' }}>
              Thank you — we have added your vote to our next Cairo buying list.
            </p>
            <button
              type="button"
              className="pill-btn"
              onClick={() => setSubmitted(false)}
            >
              Request another fragrance
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '12px',
                  fontWeight: 600,
                  marginBottom: '6px',
                }}
              >
                Fragrance &amp; House
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Parfums de Marly Layton Exclusif"
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-card)',
                  background: 'var(--bg-primary)',
                }}
              />
            </div>
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '12px',
                  fontWeight: 600,
                  marginBottom: '6px',
                }}
              >
                Your WhatsApp or Email (optional)
              </label>
              <input
                type="text"
                placeholder="+20 10..."
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-card)',
                  background: 'var(--bg-primary)',
                }}
              />
            </div>
            <button type="submit" className="co">
              Send request
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

'use client';

import React, { useState, useMemo } from 'react';
import { SET_BOX_OPTIONS, SetBoxOption } from '@/data/bundles';
import { ALL_PRODUCTS, Product } from '@/data/catalog';
import { useStore } from '@/context/StoreContext';

export default function BuildYourSetPage() {
  const { addToCart } = useStore();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedBox, setSelectedBox] = useState<SetBoxOption | null>(null);
  const [pickedProducts, setPickedProducts] = useState<(Product | null)[]>([
    null,
    null,
    null,
  ]);
  const [filterQuery, setFilterQuery] = useState('');

  const decantProducts = useMemo(
    () =>
      ALL_PRODUCTS.filter(
        (p) =>
          !p.soldOut &&
          p.sizes.some((s) => s.size === '10ML' || s.size === '6ML')
      ),
    []
  );

  const visibleProducts = useMemo(() => {
    const q = filterQuery.trim().toLowerCase();
    if (!q) return decantProducts;
    return decantProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
    );
  }, [decantProducts, filterQuery]);

  const handleSelectBox = (box: SetBoxOption) => {
    setSelectedBox(box);
    setStep(2);
  };

  const handlePickProduct = (product: Product) => {
    const emptyIdx = pickedProducts.findIndex((p) => p === null);
    if (emptyIdx === -1) return;
    const next = [...pickedProducts];
    next[emptyIdx] = product;
    setPickedProducts(next);
    if (emptyIdx === 2) {
      setStep(3);
    }
  };

  const handleRemovePick = (idx: number) => {
    const next = [...pickedProducts];
    next[idx] = null;
    setPickedProducts(next);
  };

  const pricing = useMemo(() => {
    if (!selectedBox) return { rawTotal: 0, finalTotal: 0, saved: 0 };
    let rawTotal = 0;
    pickedProducts.forEach((p, idx) => {
      if (!p) return;
      const slotSize = selectedBox.slots[idx];
      const sizeObj =
        p.sizes.find((s) => s.size === slotSize) || p.sizes[0];
      const price = sizeObj ? sizeObj.price : p.from;
      rawTotal += price;
    });
    const discount = Math.round(rawTotal * 0.1);
    return {
      rawTotal,
      finalTotal: Math.max(0, rawTotal - discount),
      saved: discount,
    };
  }, [selectedBox, pickedProducts]);

  return (
    <div className="wrap">
      <header className="bx-head bs-head">
        <h1>Build your own set.</h1>
        <p>
          Three decants of your choosing, packed in our gift box — with 10% off
          the decants.
        </p>
      </header>

      <ol className="bs-steps">
        <li
          className={`bs-step ${step === 1 ? 'on' : ''}`}
          onClick={() => setStep(1)}
        >
          <span className="bs-num">1</span> <span className="bs-label">Choose the box</span>
        </li>
        <li
          className={`bs-step ${step === 2 ? 'on' : ''}`}
          onClick={() => selectedBox && setStep(2)}
        >
          <span className="bs-num">2</span> <span className="bs-label">Pick your three</span>
        </li>
        <li
          className={`bs-step ${step === 3 ? 'on' : ''}`}
          onClick={() => pickedProducts.every(Boolean) && setStep(3)}
        >
          <span className="bs-num">3</span> <span className="bs-label">Review</span>
        </li>
      </ol>

      <section className="bs-pane">
        {step === 1 && (
          <div className="bs-boxes">
            <button
              type="button"
              className="bs-box"
              onClick={() => handleSelectBox(SET_BOX_OPTIONS[0])}
            >
              <span className="bs-vials" aria-hidden="true">
                <img
                  className="v10"
                  src="/build/vial-10.webp"
                  alt=""
                  width={17}
                  height={96}
                />
                <img
                  className="v10"
                  src="/build/vial-10.webp"
                  alt=""
                  width={17}
                  height={96}
                />
                <img
                  className="v6"
                  src="/build/vial-6.webp"
                  alt=""
                  width={18}
                  height={64}
                />
              </span>
              <strong className="bs-btitle">Two 10 ml and one 6 ml</strong>
              <span className="bs-bsub">26 ml in all</span>
            </button>

            <button
              type="button"
              className="bs-box"
              onClick={() => handleSelectBox(SET_BOX_OPTIONS[1])}
            >
              <span className="bs-vials" aria-hidden="true">
                <img
                  className="v10"
                  src="/build/vial-10.webp"
                  alt=""
                  width={17}
                  height={96}
                />
                <img
                  className="v10"
                  src="/build/vial-10.webp"
                  alt=""
                  width={17}
                  height={96}
                />
                <img
                  className="v10"
                  src="/build/vial-10.webp"
                  alt=""
                  width={17}
                  height={96}
                />
              </span>
              <strong className="bs-btitle">Three 10 ml</strong>
              <span className="bs-bsub">30 ml in all</span>
            </button>
          </div>
        )}

        {step === 2 && selectedBox && (
          <div>
            <div className="bs-slots">
              {selectedBox.slots.map((slotSize, idx) => {
                const picked = pickedProducts[idx];
                return (
                  <div
                    key={idx}
                    style={{
                      padding: '14px',
                      borderRadius: '10px',
                      background: '#fffefc',
                      border: '1px solid #e7e5df',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '8px',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '12px', color: '#6d757b' }}>
                        Slot {idx + 1} · {slotSize}
                      </div>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: '#23282c', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {picked ? picked.name : 'Select a fragrance'}
                      </div>
                    </div>
                    {picked && (
                      <button
                        type="button"
                        className="icon"
                        onClick={() => handleRemovePick(idx)}
                      >
                        ×
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            <div style={{ marginBottom: '18px' }}>
              <input
                type="search"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                placeholder="Filter fragrances by name or house..."
                style={{
                  width: '100%',
                  maxWidth: '400px',
                  padding: '10px 16px',
                  borderRadius: '100px',
                  border: '1px solid #e7e5df',
                  background: '#fffefc',
                  fontSize: '14px',
                }}
              />
            </div>

            <div className="grid">
              {visibleProducts.map((p) => (
                <article key={p.id} className="card">
                  <div className="shot">
                    <span className="shot-a">
                      <img src={p.thumb} alt={p.name} width={480} height={480} />
                    </span>
                  </div>
                  <div className="card-a">
                    <span className="chouse">{p.brand}</span>
                    <span className="cname">{p.name}</span>
                    <button
                      type="button"
                      className="co"
                      style={{ marginTop: '6px', height: '36px', fontSize: '13px' }}
                      onClick={() => handlePickProduct(p)}
                    >
                      Add to set
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {step === 3 && selectedBox && (
          <div
            style={{
              maxWidth: '560px',
              background: '#fffefc',
              border: '1px solid #e7e5df',
              borderRadius: '18px',
              padding: '24px',
            }}
          >
            <strong style={{ display: 'block', fontSize: '18px', marginBottom: '12px' }}>
              {selectedBox.title} ({selectedBox.totalMl})
            </strong>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 18px' }}>
              {pickedProducts.map((p, idx) =>
                p ? (
                  <li
                    key={idx}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '8px 0',
                      borderBottom: '1px solid #efeeea',
                      fontSize: '14px',
                    }}
                  >
                    <span>
                      {p.name} ({selectedBox.slots[idx]})
                    </span>
                    <span style={{ color: '#6d757b' }}>{p.brand}</span>
                  </li>
                ) : null
              )}
            </ul>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '18px' }}>
              <b style={{ fontSize: '20px' }}>{pricing.finalTotal.toLocaleString()} EGP</b>
              <s style={{ color: '#9aa0a4', fontSize: '14px' }}>
                {pricing.rawTotal.toLocaleString()} EGP
              </s>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="button" className="pill-btn" onClick={() => setStep(2)}>
                Change
              </button>
              <button
                type="button"
                className="co"
                style={{ flex: 1, height: '46px', borderRadius: '10px' }}
                onClick={() =>
                  addToCart({
                    productId: `custom-set-${selectedBox.id}`,
                    name: `Custom Set (${selectedBox.title})`,
                    brand: pickedProducts
                      .filter(Boolean)
                      .map((p) => p!.name)
                      .join(' + '),
                    size: selectedBox.totalMl,
                    price: pricing.finalTotal,
                    qty: 1,
                  })
                }
              >
                Add set to bag
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

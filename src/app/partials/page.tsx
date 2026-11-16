import React from 'react';
import { ALL_PRODUCTS } from '@/data/catalog';
import { StorefrontGrid } from '@/components/StorefrontGrid';
import { BrowseByHouseSection } from '@/components/BrowseByHouseSection';

export default function PartialsPage() {
  const partialProducts = ALL_PRODUCTS.slice(0, 12);

  return (
    <>
      <div className="wrap">
        <section className="cat-intro">
          <h1>Partial bottles</h1>
          <p>
            When one of our decanting bottles reaches 60% or less, we offer the
            original bottle with its remaining juice and box at 20% less than the
            same millilitres as decants.
          </p>
        </section>

        <StorefrontGrid
          initialProducts={partialProducts}
          heading="Partial bottles"
          hideToolbarHeading={true}
        />
      </div>

      <BrowseByHouseSection />
    </>
  );
}

import React from 'react';
import { ALL_PRODUCTS } from '@/data/catalog';
import { StorefrontGrid } from '@/components/StorefrontGrid';
import { BrowseByHouseSection } from '@/components/BrowseByHouseSection';

export default function FullBottlesPage() {
  const fullBottleProducts = ALL_PRODUCTS.filter((p) =>
    p.sizes.some((s) => s.size.toLowerCase().includes('full'))
  );

  return (
    <>
      <div className="wrap">
        <section className="cat-intro">
          <h1>Full bottles</h1>
          <p>
            Sealed retail and tester bottles sourced from authorised distributors,
            available for immediate delivery across Egypt via J&amp;T Express.
          </p>
        </section>

        <StorefrontGrid
          initialProducts={fullBottleProducts}
          heading="Full bottles"
          hideToolbarHeading={true}
        />
      </div>

      <BrowseByHouseSection />
    </>
  );
}

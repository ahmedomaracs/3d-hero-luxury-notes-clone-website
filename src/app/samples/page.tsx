import React from 'react';
import { ALL_PRODUCTS } from '@/data/catalog';
import { StorefrontGrid } from '@/components/StorefrontGrid';
import { BrowseByHouseSection } from '@/components/BrowseByHouseSection';

export default function SamplesPage() {
  const sampleProducts = ALL_PRODUCTS.filter((p) =>
    p.sizes.some((s) => s.size === 'Sample')
  );

  return (
    <>
      <div className="wrap">
        <section className="cat-intro">
          <h1>Official carded samples</h1>
          <p>
            Factory-sealed 1.2 ml to 8 ml sample vials and travel sprays straight
            from the houses — Amouage, Creed, Maison Crivelli, Matière Première,
            Louis Vuitton, Dior Privée and more.
          </p>
        </section>

        <StorefrontGrid
          initialProducts={sampleProducts}
          heading="Samples"
          hideToolbarHeading={true}
        />
      </div>

      <BrowseByHouseSection />
    </>
  );
}

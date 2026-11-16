import React from 'react';
import type { Metadata } from 'next';
import { NICHE_PRODUCTS } from '@/data/catalog';
import { StorefrontGrid } from '@/components/StorefrontGrid';
import { BrowseByHouseSection } from '@/components/BrowseByHouseSection';

export const metadata: Metadata = {
  title: 'Niche Perfume Samples & Decants in Egypt | Luxury Notes',
  description:
    'Original niche perfumes in Egypt — Amouage, Xerjoff, Maison Crivelli, Matière Première and more, as house samples and decants, delivered across Egypt.',
};

export default function NichePage() {
  return (
    <>
      <div className="wrap">
        <p className="intro">
          Fragrances from independent perfume houses — made in smaller runs, built
          around rarer materials, and rarely stocked in Egypt. Try one as the
          house&apos;s own sample or as a decant before you commit to a bottle.
        </p>

        <StorefrontGrid
          initialProducts={NICHE_PRODUCTS}
          heading="Niche perfumes"
          hideToolbarHeading={false}
          hideKindFilter={true}
        />
      </div>

      <BrowseByHouseSection />
    </>
  );
}

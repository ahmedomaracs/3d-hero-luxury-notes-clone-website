import React from 'react';
import type { Metadata } from 'next';
import { DESIGNER_PRODUCTS } from '@/data/catalog';
import { StorefrontGrid } from '@/components/StorefrontGrid';
import { BrowseByHouseSection } from '@/components/BrowseByHouseSection';

export const metadata: Metadata = {
  title: 'Designer Perfume Decants in Egypt — Dior, Tom Ford, Versace',
  description:
    'Original designer perfumes in Egypt — Dior, Tom Ford, Versace, Guerlain, Jean Paul Gaultier and more, decanted from original bottles and delivered across Egypt.',
};

export default function DesignerPage() {
  return (
    <>
      <div className="wrap">
        <p className="intro">
          Fragrances from the great fashion and beauty houses — the bottles everyone
          knows, decanted in Cairo from originals so you can own several instead of
          one.
        </p>

        <StorefrontGrid
          initialProducts={DESIGNER_PRODUCTS}
          heading="Designer perfumes"
          hideToolbarHeading={false}
          hideKindFilter={true}
        />
      </div>

      <BrowseByHouseSection />
    </>
  );
}

import React from 'react';
import Link from 'next/link';
import { ALL_PRODUCTS } from '@/data/catalog';
import { HeroSection } from '@/components/HeroSection';
import { StorefrontGrid } from '@/components/StorefrontGrid';
import { BrowseByHouseSection } from '@/components/BrowseByHouseSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <div className="wrap">
        <StorefrontGrid
          initialProducts={ALL_PRODUCTS}
          heading="Perfume decants in Egypt"
        />
      </div>

      <div className="wrap">
        <section className="home-about" aria-labelledby="homeAboutTitle" lang="en">
          <h2 id="homeAboutTitle">Original perfume decants in Egypt</h2>
          <p>
            Luxury Notes sells original perfume in the size you actually need. Every
            decant is poured in Cairo, when you order, from a full bottle we bought
            and opened ourselves: 4, 6 or 10 ml in a glass atomiser. No clones, no
            “inspired by”, nothing diluted.
          </p>
          <p>
            Choose from 80 fragrances by 36 houses:{' '}
            <Link href="/niche">niche perfumes</Link> such as Amouage, Xerjoff and
            Maison Crivelli, many as the house’s own sample vial, and{' '}
            <Link href="/designer">designer perfumes</Link> such as Dior, Tom Ford
            and Guerlain as decants. When an open bottle is down to 60% or less it
            moves to <Link href="/partials">partial bottles</Link>, sold whole for
            20% less than the same millilitres as decants.
          </p>
          <h3>Delivery and payment</h3>
          <p>
            J&amp;T Express delivers to every governorate, usually in two to four
            days; the fee depends on where you are and is shown at checkout. Pay by
            InstaPay or mobile wallet: you get your order number straight away, and
            we confirm as soon as the transfer arrives.
          </p>
          <h3>Why a decant</h3>
          <p>
            A 10 ml decant is around a hundred sprays, weeks of wear, for a fraction
            of the bottle’s price. Live with a fragrance before you buy the bottle,
            or own five instead of one. New to decants? Read{' '}
            <Link href="/articles">
              what a perfume decant is and how to buy one safely
            </Link>
            , or the <Link href="/faq">questions people ask us</Link>.
          </p>
        </section>
      </div>

      <BrowseByHouseSection />
    </>
  );
}

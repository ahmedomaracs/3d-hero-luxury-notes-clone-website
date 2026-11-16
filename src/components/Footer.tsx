import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer>
      <div className="wrap fgrid">
        <div>
          <b>Luxury Notes</b>
          <span>Perfume decants, poured by hand in Cairo.</span>
        </div>
        <div>
          <b>Payment</b>
          <span>InstaPay transfer on every order.</span>
        </div>
        <div>
          <b>Delivery</b>
          <span>J&amp;T Express, everywhere in Egypt.</span>
        </div>
        <div>
          <b>Track your order</b>
          <Link className="foot-link" href="/orders">
            Track an order
          </Link>
          <br />
          <Link className="foot-link" href="/account">
            Your account
          </Link>
          <br />
          <Link className="foot-link" href="/request">
            Request a fragrance
          </Link>
          <br />
          <Link className="foot-link" href="/giveaway">
            Giveaway
          </Link>
          <br />
          <Link className="foot-link" href="/faq">
            Questions
          </Link>
          <br />
          <Link className="foot-link" href="/privacy">
            Privacy
          </Link>
          <br />
          <Link className="foot-link" href="/articles">
            Guides
          </Link>
          <br />
          <Link className="foot-link" href="/about">
            About us
          </Link>
        </div>
      </div>
    </footer>
  );
}

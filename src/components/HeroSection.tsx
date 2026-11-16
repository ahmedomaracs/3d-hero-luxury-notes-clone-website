'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

type CustomVars = React.CSSProperties & Record<`--${string}`, string | number>;

const wordStyle = (index: number): CustomVars => ({ '--w': index });

const layerStyle = (
  depth: number,
  extra: Record<string, string> = {}
): CustomVars => ({ '--d': depth, ...extra });

const PETALS = [
  { img: '/hero/petal-2.webp', x: '8%', y: '18%', s: '60px', t: '28s', dl: '0s', b: '0px', r: '-20deg', d: 1.4 },
  { img: '/hero/petal-1.webp', x: '72%', y: '8%', s: '46px', t: '34s', dl: '2.5s', b: '0px', r: '35deg', d: 0.8 },
  { img: '/hero/petal-3.webp', x: '88%', y: '46%', s: '78px', t: '31s', dl: '1.2s', b: '2.5px', r: '10deg', d: 1.8 },
  { img: '/hero/petal-1.webp', x: '22%', y: '70%', s: '38px', t: '37s', dl: '4s', b: '0px', r: '-45deg', d: 0.6 },
  { img: '/hero/petal-2.webp', x: '58%', y: '84%', s: '104px', t: '40s', dl: '0.6s', b: '4px', r: '25deg', d: 2.2 },
  { img: '/hero/petal-3.webp', x: '40%', y: '4%', s: '34px', t: '33s', dl: '3.2s', b: '0px', r: '-10deg', d: 0.5 },
];

export function HeroSection() {
  const heroRef = useRef<HTMLElement | null>(null);
  const shopRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(pointer: fine)').matches;
    const counters = Array.from(
      hero.querySelectorAll<HTMLElement>('[data-count]')
    );
    const fmt = new Intl.NumberFormat('en-US');

    if (still) {
      counters.forEach((c) => {
        c.textContent = fmt.format(Number(c.dataset.count || 0));
      });
    }

    let countTimer: number | undefined;
    let frameB = 0;

    if (!still) {
      countTimer = window.setTimeout(() => {
        counters.forEach((c) => {
          const end = Number(c.dataset.count || 0);
          const started = performance.now();
          const duration = 1600;
          const step = (now: number) => {
            const k = Math.min(1, (now - started) / duration);
            const eased = 1 - Math.pow(1 - k, 4);
            c.textContent = fmt.format(Math.round(end * eased));
            if (k < 1) frameB = requestAnimationFrame(step);
          };
          frameB = requestAnimationFrame(step);
        });
      }, 1350);
    }

    // ---- one soft follow for the pointer and the scroll ----
    let px = 0.5;
    let py = 0.5;
    let tx = 0.5;
    let ty = 0.5;
    let sp = 0;
    let ts = 0;
    let raf = 0;
    let last = 0;
    const FOLLOW = 2.4;

    const tick = (now: number) => {
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 1 / 60;
      last = now;
      const k = 1 - Math.exp(-FOLLOW * dt);
      tx += (px - tx) * k;
      ty += (py - ty) * k;
      ts += (sp - ts) * (1 - Math.exp(-6 * dt));
      hero.style.setProperty('--mx', ((tx - 0.5) * 2).toFixed(4));
      hero.style.setProperty('--my', ((ty - 0.5) * 2).toFixed(4));
      hero.style.setProperty('--p', ts.toFixed(4));
      const moving =
        Math.abs(px - tx) + Math.abs(py - ty) + Math.abs(sp - ts) > 0.0005;
      raf = moving ? requestAnimationFrame(tick) : 0;
      if (!moving) last = 0;
    };

    const wake = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      px = (e.clientX - rect.left) / rect.width;
      py = (e.clientY - rect.top) / rect.height;
      wake();
    };
    const onPointerLeave = () => {
      px = 0.5;
      py = 0.5;
      wake();
    };
    const onScroll = () => {
      sp = Math.min(1, Math.max(0, window.scrollY / (hero.offsetHeight || 1)));
      wake();
    };
    const onOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma == null) return;
      px = 0.5 + Math.max(-1, Math.min(1, e.gamma / 35)) * 0.5;
      py = 0.5 + Math.max(-1, Math.min(1, ((e.beta ?? 40) - 40) / 35)) * 0.5;
      wake();
    };

    if (!still) {
      if (fine) {
        hero.addEventListener('pointermove', onPointerMove);
        hero.addEventListener('pointerleave', onPointerLeave);
      } else if (
        typeof DeviceOrientationEvent !== 'undefined' &&
        !('requestPermission' in DeviceOrientationEvent)
      ) {
        window.addEventListener('deviceorientation', onOrientation, {
          passive: true,
        });
      }
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    return () => {
      if (countTimer) window.clearTimeout(countTimer);
      cancelAnimationFrame(frameB);
      if (raf) cancelAnimationFrame(raf);
      hero.removeEventListener('pointermove', onPointerMove);
      hero.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('deviceorientation', onOrientation);
    };
  }, []);

  const handleShopClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const grid = document.getElementById('grid');
    if (!grid) return;
    e.preventDefault();
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document
      .querySelector('.tools')
      ?.scrollIntoView({ behavior: still ? 'auto' : 'smooth', block: 'start' });
  };

  const handleShopMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (!shopRef.current) return;
    const r = shopRef.current.getBoundingClientRect();
    shopRef.current.style.setProperty(
      '--bx',
      `${((e.clientX - r.left - r.width / 2) * 0.12).toFixed(1)}px`
    );
    shopRef.current.style.setProperty(
      '--by',
      `${((e.clientY - r.top - r.height / 2) * 0.2).toFixed(1)}px`
    );
  };

  const handleShopLeave = () => {
    shopRef.current?.style.setProperty('--bx', '0px');
    shopRef.current?.style.setProperty('--by', '0px');
  };

  return (
    <section className="hero" id="hero" aria-labelledby="heroTitle" ref={heroRef}>
      <div className="hero-in">
        <div className="hero-copy">
          <p className="hero-kicker">
            <span className="hero-dot"></span>Original fragrance, by the millilitre
          </p>
          <p className="hero-title" id="heroTitle">
            <span className="hw">
              <span style={wordStyle(0)}>Wear</span>
            </span>{' '}
            <span className="hw">
              <span style={wordStyle(1)}>it</span>
            </span>{' '}
            <span className="hw">
              <span style={wordStyle(2)}>before</span>
            </span>{' '}
            <span className="hw">
              <span style={wordStyle(3)}>you</span>
            </span>{' '}
            <span className="hw-strong">
              <span className="hw">
                <span className="strong" style={wordStyle(4)}>
                  own
                </span>
              </span>{' '}
              <span className="hw">
                <span className="strong" style={wordStyle(5)}>
                  it.
                </span>
              </span>
            </span>
          </p>
          <p className="hero-sub">
            Niche and designer fragrances in 4, 6 and 10 ml, decanted from bottles we own,
            and the houses&apos; own sealed samples. Delivered across Egypt.
          </p>
          <div className="hero-cta">
            <a
              className="hero-shop"
              href="#grid"
              data-magnet=""
              ref={shopRef}
              onClick={handleShopClick}
              onPointerMove={handleShopMove}
              onPointerLeave={handleShopLeave}
            >
              <span>Explore the collection</span>
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                aria-hidden="true"
              >
                <path d="M6 8h12l-1 12H7L6 8Z"></path>
                <path d="M9 8V6a3 3 0 0 1 6 0v2"></path>
              </svg>
            </a>
            <Link className="hero-ask" href="/request">
              Request a fragrance
            </Link>
          </div>
          <p className="hero-facts">
            <b className="num" data-count="80">
              80
            </b>{' '}
            fragrances in stock
            <i>·</i>{' '}
            <b className="num" data-count="46">
              46
            </b>{' '}
            houses
          </p>
        </div>

        <div className="hero-scene" id="heroScene" aria-hidden="true">
          <div className="hs-layer hs-back" style={layerStyle(0.25)}>
            <img
              src="/hero/flowers-back.webp"
              alt=""
              width={1100}
              height={1100}
              fetchPriority="high"
            />
          </div>
          <div className="hs-layer hs-bottle" style={layerStyle(0.6)}>
            <span className="hs-shadow"></span>
            <span className="hs-float">
              <img
                src="/hero/bottle.webp"
                alt=""
                width={640}
                height={1200}
                fetchPriority="high"
              />
              <span className="hs-glint"></span>
            </span>
          </div>
          <div className="hs-layer hs-front" style={layerStyle(1)}>
            <img src="/hero/flowers-front.webp" alt="" width={1100} height={1100} />
          </div>
          {PETALS.map((p, i) => (
            <div
              key={i}
              className="hs-layer hs-petal"
              style={layerStyle(p.d, {
                '--x': p.x,
                '--y': p.y,
                '--s': p.s,
                '--t': p.t,
                '--dl': p.dl,
                '--b': p.b,
                '--r': p.r,
              })}
            >
              <img src={p.img} alt="" width={280} height={270} loading="eager" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

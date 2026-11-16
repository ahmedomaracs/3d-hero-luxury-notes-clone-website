'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from '@/context/StoreContext';
import { ALL_PRODUCTS, HOUSES } from '@/data/catalog';

export function Header() {
  const pathname = usePathname() || '/';
  const {
    savedIds,
    showSavedOnly,
    setShowSavedOnly,
    cart,
    setCartOpen,
    searchOpen,
    setSearchOpen,
    searchQuery,
    setSearchQuery,
    selectedSize,
    setSelectedSize,
    setQuickViewProduct,
    lang,
    toggleLang,
  } = useStore();

  const totalCartItems = useMemo(
    () => cart.reduce((acc, item) => acc + item.qty, 0),
    [cart]
  );

  const suggestions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return { houses: [], products: [] };
    const houses = HOUSES.filter((h) => h.name.toLowerCase().includes(q)).slice(0, 4);
    const products = ALL_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
    ).slice(0, 6);
    return { houses, products };
  }, [searchQuery]);

  const isHome = pathname === '/';
  const isNiche = pathname.startsWith('/niche');
  const isDesigner = pathname.startsWith('/designer');
  const isBundles = pathname.startsWith('/bundles');
  const isBuildSet = pathname.startsWith('/build-your-set');
  const isFullBottles = pathname.startsWith('/full-bottles');
  const isPartials = pathname.startsWith('/partials');
  const isSamples = pathname.startsWith('/samples');

  const handleSearchBtnClick = () => {
    setSearchOpen((prev) => !prev);
  };

  const handleSizeChipClick = (e: React.MouseEvent, sizeVal: string | null) => {
    if (isHome || isNiche || isDesigner) {
      e.preventDefault();
      setSelectedSize(sizeVal);
      setShowSavedOnly(false);
    }
  };

  return (
    <>
      <div className="ann">
        {lang === 'ar'
          ? 'يُعبأ طازجاً عند الطلب · توصيل لجميع أنحاء مصر عبر J&T Express'
          : 'Poured fresh when you order · Delivered across Egypt by J&T Express'}
      </div>

      <header className={searchOpen ? 'search-open' : ''}>
        <div className="wrap hbar">
          <button
            className="icon searchbtn"
            id="searchBtn"
            type="button"
            aria-label="Search fragrances and houses"
            aria-expanded={searchOpen}
            aria-controls="searchForm"
            onClick={handleSearchBtnClick}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <circle cx="11" cy="11" r="6.5"></circle>
              <path d="M16 16l4.5 4.5"></path>
            </svg>
          </button>

          <Link className="brand" href="/" aria-label="Luxury Notes">
            <img src="/img/logo.png" alt="Luxury Notes" width={800} height={600} />
          </Link>

          <div className="subbar">
            <nav className="chips" id="sizeChips" aria-label="Size">
              <Link
                className={`chip ${isHome && !selectedSize && !showSavedOnly ? 'on' : ''}`}
                data-size="all"
                href="/?size=all"
                aria-current={isHome && !selectedSize ? 'page' : undefined}
                onClick={(e) => handleSizeChipClick(e, null)}
              >
                All
              </Link>
              <Link
                className={`chip ${isNiche ? 'on' : ''}`}
                href="/niche"
                aria-current={isNiche ? 'page' : undefined}
              >
                Niche
              </Link>
              <Link
                className={`chip ${isDesigner ? 'on' : ''}`}
                href="/designer"
                aria-current={isDesigner ? 'page' : undefined}
              >
                Designer
              </Link>
              <Link
                className={`chip ${isBundles ? 'on' : ''}`}
                href="/bundles"
                aria-current={isBundles ? 'page' : undefined}
              >
                Bundles
              </Link>
              <Link
                className={`chip ${isBuildSet ? 'on' : ''}`}
                href="/build-your-set"
                aria-current={isBuildSet ? 'page' : undefined}
              >
                Build your set
              </Link>
              <Link
                className={`chip ${isFullBottles ? 'on' : ''}`}
                href="/full-bottles"
                aria-current={isFullBottles ? 'page' : undefined}
              >
                Full bottles
              </Link>
              <Link
                className={`chip ${isPartials ? 'on' : ''}`}
                href="/partials"
                aria-current={isPartials ? 'page' : undefined}
              >
                Partials
              </Link>
              <Link
                className={`chip ${selectedSize === '4ML' ? 'on' : ''}`}
                data-size="4ML"
                href="/?size=4ML"
                onClick={(e) => handleSizeChipClick(e, '4ML')}
              >
                4ML
              </Link>
              <Link
                className={`chip ${selectedSize === '6ML' ? 'on' : ''}`}
                data-size="6ML"
                href="/?size=6ML"
                onClick={(e) => handleSizeChipClick(e, '6ML')}
              >
                6ML
              </Link>
              <Link
                className={`chip ${selectedSize === '10ML' ? 'on' : ''}`}
                data-size="10ML"
                href="/?size=10ML"
                onClick={(e) => handleSizeChipClick(e, '10ML')}
              >
                10ML
              </Link>
              <Link
                className={`chip ${isSamples || selectedSize === 'Sample' ? 'on' : ''}`}
                data-size="Sample"
                href="/samples"
                onClick={(e) => handleSizeChipClick(e, 'Sample')}
              >
                Samples
              </Link>
              <button
                type="button"
                className={`chip chip-saved ${showSavedOnly ? 'on' : ''}`}
                id="savedChip"
                hidden={savedIds.length === 0}
                onClick={() => setShowSavedOnly(!showSavedOnly)}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M12 20.5s-7.5-4.6-9.2-9.4C1.6 7.8 3.8 4.5 7.2 4.5c2 0 3.6 1.1 4.8 2.8 1.2-1.7 2.8-2.8 4.8-2.8 3.4 0 5.6 3.3 4.4 6.6-1.7 4.8-9.2 9.4-9.2 9.4z"
                  ></path>
                </svg>
                <span>Saved</span>{' '}
                <span className="num" id="savedCount">
                  {savedIds.length}
                </span>
              </button>
            </nav>
          </div>

          <form
            className="search"
            id="searchForm"
            method="get"
            action="/"
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input
              type="search"
              name="q"
              id="q"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search fragrances and houses"
              aria-label="Search fragrances and houses"
              autoComplete="off"
              role="combobox"
              aria-expanded={
                searchQuery.trim().length > 0 &&
                (suggestions.houses.length > 0 || suggestions.products.length > 0)
              }
              aria-controls="suggest"
              aria-autocomplete="list"
            />
            <div
              className="suggest"
              id="suggest"
              role="listbox"
              hidden={
                searchQuery.trim().length === 0 ||
                (suggestions.houses.length === 0 && suggestions.products.length === 0)
              }
            >
              {suggestions.houses.map((h) => (
                <Link
                  key={h.href}
                  href={h.href}
                  onClick={() => setSearchOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: '10px',
                    fontSize: '13px',
                    fontWeight: 600,
                  }}
                >
                  <span>{h.name}</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    House · {h.count || 1}
                  </span>
                </Link>
              ))}
              {suggestions.products.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    setQuickViewProduct(p);
                    setSearchOpen(false);
                  }}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: '10px',
                    background: 'transparent',
                    border: 0,
                    cursor: 'pointer',
                    fontSize: '13px',
                  }}
                >
                  <span>
                    <strong style={{ fontWeight: 600 }}>{p.name}</strong>{' '}
                    <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
                      · {p.brand}
                    </span>
                  </span>
                  <span className="num" style={{ fontWeight: 700 }}>
                    from {p.from.toLocaleString()} EGP
                  </span>
                </button>
              ))}
            </div>
          </form>

          <div className="hacts">
            <div className="lang">
              <a
                href="?lang=en"
                className={lang === 'en' ? 'on' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  if (lang !== 'en') toggleLang();
                }}
              >
                EN
              </a>
              <a
                href="?lang=ar"
                className={lang === 'ar' ? 'on' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  if (lang !== 'ar') toggleLang();
                }}
              >
                ع
              </a>
            </div>
            <button
              className="icon"
              id="cartBtn"
              type="button"
              aria-label="Your cart"
              onClick={() => setCartOpen(true)}
            >
              <svg
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <path d="M4 7h16l-1.4 12.1a1 1 0 0 1-1 .9H6.4a1 1 0 0 1-1-.9Z"></path>
                <path d="M8.6 7V5.4a3.4 3.4 0 0 1 6.8 0V7"></path>
              </svg>
              <span
                className="count"
                id="cartCount"
                hidden={totalCartItems === 0}
              >
                {totalCartItems}
              </span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

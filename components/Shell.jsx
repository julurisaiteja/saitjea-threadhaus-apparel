'use client';
import Link from 'next/link';
import { useState } from 'react';
import { brand } from '../lib/brand';
import { useCart } from '../lib/cart';
import AIAssistant from './AIAssistant';

export default function Shell({ children }) {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const nav = [
    { href: '/shop', label: brand.nav[0] },
    { href: '/shop?cat=Dresses', label: brand.nav[1] },
    { href: '/shop?cat=Outer', label: brand.nav[2] },
    { href: '/special', label: brand.nav[3] },
  ];

  return (
    <div data-diamond="batch-1" data-style={brand.styleMarker}>
      <a href="#main" className="skip-link">Skip to collection</a>
      <div className="offer-banner fashion-shell-banner">
        {brand.offer.code} · {brand.offer.label} — {brand.offer.detail}
      </div>
      <header className="fashion-shell-header">
        <div className="fashion-shell-inner">
          <nav className="fashion-shell-nav fashion-shell-nav-l" aria-label="Primary left">
            {nav.slice(0, 2).map((item) => (
              <Link key={item.label} href={item.href} className="fashion-shell-link">
                {item.label}
              </Link>
            ))}
          </nav>
          <Link href="/" className="fashion-shell-mark">
            {brand.name}
          </Link>
          <nav className="fashion-shell-nav fashion-shell-nav-r" aria-label="Primary right">
            {nav.slice(2).map((item) => (
              <Link key={item.label} href={item.href} className="fashion-shell-link">
                {item.label}
              </Link>
            ))}
            <Link href="/cart" className="fashion-shell-cart">
              Bag{count > 0 ? ` ${count}` : ''}
            </Link>
          </nav>
          <button
            type="button"
            className="fashion-shell-burger md:hidden"
            aria-expanded={open}
            aria-controls="fashion-mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
        {open && (
          <div id="fashion-mobile-nav" className="fashion-shell-drawer">
            {nav.map((item) => (
              <Link key={item.label} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
            <Link href="/cart" onClick={() => setOpen(false)}>
              Bag{count > 0 ? ` ${count}` : ''}
            </Link>
          </div>
        )}
      </header>
      <main id="main">{children}</main>
      <footer className="fashion-shell-footer">
        <div className="fashion-shell-footer-grid">
          <div>
            <p className="fashion-shell-footer-brand">{brand.name}</p>
            <p className="mt-4 max-w-md text-muted font-light leading-relaxed">{brand.description}</p>
            <form className="mt-6 flex gap-3 max-w-md" onSubmit={(e) => e.preventDefault()}>
              <input
                className="flex-1 px-0 py-2 text-sm outline-none bg-transparent"
                style={{ borderBottom: '1px solid var(--text)', borderRadius: 0 }}
                placeholder="Email for early access"
                aria-label="Email for early access"
              />
              <button type="submit" className="btn-ghost">
                Join
              </button>
            </form>
          </div>
          <div>
            <p className="fashion-meta-label mb-4">Navigate</p>
            <div className="space-y-3 text-sm tracking-[0.14em] uppercase">
              <div><Link href="/shop">New arrivals</Link></div>
              <div><Link href="/special">Lookbook</Link></div>
              <div><Link href="/checkout">Checkout</Link></div>
              <div><Link href="/#reviews">Notes</Link></div>
            </div>
          </div>
          <div>
            <p className="fashion-meta-label mb-4">Atelier</p>
            <div className="space-y-3 text-sm text-muted tracking-[0.08em]">
              <div>Size guide on every PDP</div>
              <div>Free exchanges · 30 days</div>
              <div>Lookbook boards · wishlist</div>
            </div>
          </div>
        </div>
        <p className="fashion-shell-legal">Demo boutique · no real payments · {brand.name}</p>
      </footer>
      <div className="sticky-cta md:hidden">
        <Link href="/shop" className="btn-brand !py-2 !px-4 text-sm">
          Shop
        </Link>
        <Link href="/special" className="btn-ghost !py-2 !px-4 text-sm">
          Lookbook
        </Link>
      </div>
      <AIAssistant />
    </div>
  );
}

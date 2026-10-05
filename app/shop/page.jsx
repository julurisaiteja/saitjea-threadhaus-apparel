'use client';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { brand, products } from '../../lib/brand';
import { useCart } from '../../lib/cart';

export default function ShopPage() {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('All');
  const [sort, setSort] = useState('featured');
  const { toggleWish, wish } = useCart();
  useEffect(() => {
    try {
      const c = new URLSearchParams(window.location.search).get('cat');
      if (c) setCat(c);
    } catch {}
  }, []);
  const cats = ['All', ...Array.from(new Set(products.map((p) => p.cat)))];
  const list = useMemo(() => {
    let out = products.filter((p) => {
      const hay = (p.name + ' ' + p.blurb + ' ' + (p.tags || []).join(' ')).toLowerCase();
      return (cat === 'All' || p.cat === cat) && hay.includes(q.toLowerCase());
    });
    if (sort === 'price-asc') out = [...out].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') out = [...out].sort((a, b) => b.price - a.price);
    if (sort === 'rating') out = [...out].sort((a, b) => b.rating - a.rating);
    return out;
  }, [q, cat, sort]);

  return (
    <div className="fashion-runway-shop">
      <header className="fashion-shop-head reveal">
        <p className="fashion-meta-label">{brand.offer.code} · collection index</p>
        <h1 className="fashion-shop-title">{brand.nav[0]}</h1>
        <p className="mt-4 max-w-lg text-muted font-light">
          Runway lookbook grid — tall crops, whitespace, honest fit notes.
        </p>
      </header>

      <div className="fashion-shop-controls reveal reveal-delay-1">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search the rack…"
          className="fashion-shop-input"
          aria-label="Search apparel"
        />
        <div className="fashion-shop-cats">
          {cats.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              className={`fashion-shop-cat${cat === c ? ' is-on' : ''}`}
            >
              {c}
            </button>
          ))}
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="fashion-shop-input"
          aria-label="Sort"
        >
          <option value="featured">Featured</option>
          <option value="price-asc">Price ↑</option>
          <option value="price-desc">Price ↓</option>
          <option value="rating">Top rated</option>
        </select>
      </div>

      <div className="fashion-lookbook-grid stagger">
        {list.map((p, i) => (
          <article key={p.id} className={`fashion-look-item span-${(i % 5) + 1}`}>
            <Link href={`/product/${p.id}`} className="fashion-look-media">
              <img src={p.img} alt={p.name} />
            </Link>
            <div className="fashion-look-bar">
              <div>
                <Link href={`/product/${p.id}`} className="fashion-look-name">
                  {p.name}
                </Link>
                <p className="fashion-meta-label mt-1">
                  ${p.price} · {p.cat} · ★ {p.rating}
                </p>
              </div>
              <button type="button" onClick={() => toggleWish(p.id)} aria-label="Wishlist" className="fashion-wish">
                {wish.includes(p.id) ? '♥' : '♡'}
              </button>
            </div>
            <p className="fashion-look-blurb">{p.blurb}</p>
          </article>
        ))}
      </div>
      {!list.length && <p className="mt-12 fashion-meta-label text-muted">No looks match — clear filters.</p>}
    </div>
  );
}

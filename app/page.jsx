'use client';
import Link from 'next/link';
import { brand, products } from '../lib/brand';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick((x) => x + 1), 2800);
    return () => clearInterval(t);
  }, []);
  const live =
    typeof brand.stats[0].value === 'number'
      ? brand.stats[0].value + (tick % 7)
      : brand.stats[0].value;

  const steps = [
    { n: '01', t: 'Find the cut', d: 'Size guide on every piece — height, weight, or compare a garment.' },
    { n: '02', t: 'Build a look', d: 'Save hearts to wishlist; open Lookbook for full outfits.' },
    { n: '03', t: 'Wear & return easy', d: 'Free exchanges in 30 days. Final sale marked clearly.' },
  ];

  return (
    <>
      <section className="fashion-hero">
        <video autoPlay muted loop playsInline poster={brand.poster}>
          <source src={brand.video} type="video/mp4" />
        </video>
        <div className="fashion-scrim" />
        <div className="fashion-copy">
          <p className="text-xs tracking-[0.35em] uppercase opacity-80">
            {brand.offer.code} · {brand.offer.label}
          </p>
          <p className="fashion-brand">{brand.name}</p>
          <h1 className="mt-4 max-w-xl text-lg md:text-2xl font-light tracking-wide">{brand.tagline}</h1>
          <div className="mt-8 flex flex-wrap gap-6">
            <Link href="/shop" className="btn-brand">
              Shop new
            </Link>
            <Link href="/special" className="btn-ghost" style={{ color: '#fff', borderColor: '#fff' }}>
              Lookbook
            </Link>
          </div>
        </div>
      </section>

      <section className="fashion-process reveal">
        <p className="fashion-meta-label text-center mb-8">Atelier ritual</p>
        <div className="fashion-process-grid stagger">
          {steps.map((s) => (
            <div key={s.n} className="fashion-process-card">
              <p className="fashion-meta-label">{s.n}</p>
              <p className="fashion-process-title mt-4">{s.t}</p>
              <p className="mt-3 text-muted font-light leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="film-strip fashion-film">
        {products.map((p) => (
          <Link key={p.id} href={`/product/${p.id}`} className="film-cell fashion-film-cell">
            <img src={p.img} alt={p.name} />
            <span>{p.name}</span>
          </Link>
        ))}
      </div>

      <section className="fashion-looks">
        {products.slice(0, 3).map((p) => (
          <Link key={p.id} href={`/product/${p.id}`}>
            <img src={p.img} alt={p.name} />
            <div className="fashion-meta">
              <h3>{p.name}</h3>
              <p className="text-xs tracking-[0.2em] uppercase mt-1">${p.price}</p>
            </div>
          </Link>
        ))}
      </section>

      <section className="loyalty-band fashion-loyalty reveal">
        <div>
          <p className="fashion-meta-label">Members</p>
          <p className="fashion-loyalty-title mt-3">{brand.offer.label}</p>
          <p className="mt-3 text-muted tracking-[0.12em] uppercase text-xs">
            Code {brand.offer.code} · {brand.offer.detail}
          </p>
        </div>
        <Link href="/shop" className="btn-brand">
          Enter the drop
        </Link>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-20 text-center">
        <p className="fashion-meta-label">Collection notes</p>
        <p
          className="mt-6 text-2xl md:text-3xl font-light leading-relaxed"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {brand.description}
        </p>
        <div className="fashion-stats mt-12 stagger">
          {brand.stats.map((s, i) => (
            <div key={s.label}>
              <p className="fashion-stat-value">{i === 0 ? live : s.value}</p>
              <p className="fashion-meta-label mt-2">{s.label}</p>
            </div>
          ))}
        </div>
        <Link href="/special" className="btn-brand mt-12">
          Enter lookbook
        </Link>
      </section>

      <section
        id="reviews"
        className="border-t px-4 py-16"
        style={{ borderColor: 'color-mix(in srgb, var(--muted) 30%, transparent)' }}
      >
        <div className="mx-auto max-w-4xl grid gap-10 md:grid-cols-2 stagger">
          {brand.reviews.map((r) => (
            <blockquote key={r.name} className="fashion-review">
              <p className="text-xl md:text-2xl font-light" style={{ fontFamily: 'var(--font-display)' }}>
                &ldquo;{r.text}&rdquo;
              </p>
              <footer className="mt-4 text-xs tracking-[0.2em] uppercase text-muted">
                {r.name} · {r.stars}/5
              </footer>
            </blockquote>
          ))}
        </div>
      </section>
    </>
  );
}

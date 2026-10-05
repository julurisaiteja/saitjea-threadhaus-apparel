'use client';
import { useState } from 'react';
import Link from 'next/link';
import { products } from '../../lib/brand';
import { useCart } from '../../lib/cart';
const looks=[{title:'Coastal office',ids:['linen-blazer','wide-trouser','tee']},{title:'Evening ease',ids:['silk-slip','scarf','merino']},{title:'Weekend denim',ids:['denim','tee','trench']}];
export default function SpecialPage(){
  const { toggleWish, wish, add }=useCart();
  const [active,setActive]=useState(0);
  const look=looks[active];
  const items=look.ids.map(id=>products.find(p=>p.id===id)).filter(Boolean);
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <header className="special-chrome reveal">
        <p className="fashion-meta-label">Editorial boards</p>
        <h1 className="text-5xl md:text-7xl mt-2">Lookbook</h1>
        <p className="text-muted mt-3 font-light">Outfit boards with wishlist + shop-the-look.</p>
      </header>
      <div className="mt-6 flex flex-wrap gap-2">{looks.map((l,i)=><button key={l.title} onClick={()=>setActive(i)} className="chip" style={{outline:active===i?'2px solid var(--brand)':undefined}}>{l.title}</button>)}</div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">{items.map(p=>(
        <div key={p.id} className="card-soft overflow-hidden">
          <img src={p.img} alt="" className="aspect-[3/4] w-full object-cover" />
          <div className="p-4 flex justify-between items-start gap-2">
            <div><Link href={`/product/${p.id}`} className="font-semibold">{p.name}</Link><p className="text-sm">${p.price}</p></div>
            <button onClick={()=>toggleWish(p.id)}>{wish.includes(p.id)?'♥':'♡'}</button>
          </div>
        </div>))}</div>
      <button className="btn-brand mt-8" onClick={()=>items.forEach(p=>add({id:p.id,name:p.name,price:p.price,img:p.img,qty:1,lineKey:p.id+'-look',meta:'Lookbook '+look.title}))}>Add look to cart</button>
    </div>
  );
}

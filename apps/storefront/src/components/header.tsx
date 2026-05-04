"use client";

import Link from "next/link";
import { useCart } from "./cart-context";

export function Header() {
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight">
          Cat99Sky
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/" className="text-sm text-neutral-600 hover:text-black transition">
            商品
          </Link>
          <Link
            href="/cart"
            className="relative text-sm text-neutral-600 hover:text-black transition flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/>
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
            </svg>
            购物车
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-4 bg-[var(--accent)] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                {itemCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}

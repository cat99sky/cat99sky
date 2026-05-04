"use client";

import { useCart } from "@/components/cart-context";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, loading } = useCart();

  if (!cart || cart.items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="text-6xl mb-6">🛒</p>
        <h1 className="text-2xl font-bold mb-2">购物车是空的</h1>
        <p className="text-neutral-500 mb-8">去看看我们的商品吧</p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-[var(--accent)] text-white rounded-xl font-medium hover:bg-[var(--accent-hover)] transition-colors text-sm"
        >
          浏览商品
        </Link>
      </div>
    );
  }

  const currencyCode = cart.currency_code || "eur";

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-2xl font-bold mb-8">购物车</h1>

      <div className="space-y-4">
        {cart.items.map((item: any) => (
          <div
            key={item.id}
            className="flex gap-4 p-4 border border-[var(--border)] rounded-xl"
          >
            <div className="w-20 h-20 bg-[var(--muted)] rounded-lg overflow-hidden relative flex-shrink-0">
              {item.thumbnail ? (
                <Image src={item.thumbnail} alt={item.title} fill className="object-cover" sizes="80px" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl">🛍</div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm truncate">{item.title}</h3>
              <p className="text-xs text-neutral-500">{item.variant?.title || item.variant_title}</p>
              <p className="text-sm font-semibold mt-1">
                {formatPrice(item.unit_price, currencyCode)}
              </p>
            </div>
            <div className="flex flex-col items-end justify-between">
              <button
                onClick={() => removeFromCart(item.id)}
                disabled={loading}
                className="text-neutral-400 hover:text-red-500 transition text-xs"
              >
                删除
              </button>
              <div className="flex items-center gap-2 border border-[var(--border)] rounded-lg">
                <button
                  onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                  disabled={loading || item.quantity <= 1}
                  className="px-2 py-1 text-sm disabled:opacity-30"
                >
                  −
                </button>
                <span className="text-sm w-6 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  disabled={loading}
                  className="px-2 py-1 text-sm"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t border-[var(--border)] pt-6 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-neutral-500">小计</span>
          <span>{formatPrice(cart.item_total || cart.subtotal, currencyCode)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold">
          <span>总计</span>
          <span>{formatPrice(cart.total, currencyCode)}</span>
        </div>
      </div>

      <button className="w-full mt-6 py-3.5 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-medium rounded-xl transition-colors text-sm">
        去结算
      </button>
    </div>
  );
}

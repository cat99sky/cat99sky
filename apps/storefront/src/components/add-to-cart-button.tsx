"use client";

import { useState } from "react";
import { useCart } from "./cart-context";

export function AddToCartButton({ variantId }: { variantId: string }) {
  const { addToCart, loading } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = async () => {
    await addToCart(variantId);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="w-full py-3.5 px-6 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-medium rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
    >
      {loading ? "处理中..." : added ? "已加入购物车 ✓" : "加入购物车"}
    </button>
  );
}

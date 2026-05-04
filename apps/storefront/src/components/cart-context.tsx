"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { sdk } from "@/lib/medusa";

type CartItem = {
  id: string;
  title: string;
  variant_id: string;
  variant_title: string;
  quantity: number;
  unit_price: number;
  thumbnail: string | null;
};

type Cart = {
  id: string;
  items: CartItem[];
  total: number;
  subtotal: number;
  item_total: number;
  currency_code: string;
};

type CartContextType = {
  cart: Cart | null;
  itemCount: number;
  addToCart: (variantId: string, quantity?: number) => Promise<void>;
  removeFromCart: (lineItemId: string) => Promise<void>;
  updateQuantity: (lineItemId: string, quantity: number) => Promise<void>;
  loading: boolean;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);

  const getOrCreateCart = useCallback(async () => {
    let cartId = localStorage.getItem("cart_id");
    if (cartId) {
      try {
        const { cart } = await sdk.store.cart.retrieve(cartId) as any;
        return cart;
      } catch {
        localStorage.removeItem("cart_id");
      }
    }
    const { cart } = await sdk.store.cart.create({ region_id: await getRegionId() }) as any;
    localStorage.setItem("cart_id", cart.id);
    return cart;
  }, []);

  const getRegionId = async () => {
    const { regions } = await sdk.store.region.list() as any;
    return regions[0]?.id;
  };

  useEffect(() => {
    const id = localStorage.getItem("cart_id");
    if (id) {
      sdk.store.cart.retrieve(id).then((res: any) => setCart(res.cart)).catch(() => {
        localStorage.removeItem("cart_id");
      });
    }
  }, []);

  const addToCart = async (variantId: string, quantity = 1) => {
    setLoading(true);
    try {
      const c = await getOrCreateCart();
      const { cart: updated } = await sdk.store.cart.createLineItem(c.id, {
        variant_id: variantId,
        quantity,
      }) as any;
      setCart(updated);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (lineItemId: string) => {
    if (!cart) return;
    setLoading(true);
    try {
      const { cart: updated } = await sdk.store.cart.deleteLineItem(cart.id, lineItemId) as any;
      setCart(updated);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (lineItemId: string, quantity: number) => {
    if (!cart) return;
    setLoading(true);
    try {
      const { cart: updated } = await sdk.store.cart.updateLineItem(cart.id, lineItemId, { quantity }) as any;
      setCart(updated);
    } finally {
      setLoading(false);
    }
  };

  const itemCount = cart?.items?.reduce((sum: number, i: CartItem) => sum + i.quantity, 0) || 0;

  return (
    <CartContext.Provider value={{ cart, itemCount, addToCart, removeFromCart, updateQuantity, loading }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

import { sdk } from "@/lib/medusa";
import { ProductCard } from "@/components/product-card";

export const dynamic = "force-dynamic";

export default async function Home() {
  let products: any[] = [];
  try {
    const res = await sdk.store.product.list({ limit: 20 }) as any;
    products = res.products || [];
  } catch (e) {
    console.error("Failed to fetch products:", e);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <section className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Cat99Sky Store</h1>
        <p className="text-neutral-500 text-lg">探索我们的精选商品</p>
      </section>

      {products.length === 0 ? (
        <p className="text-neutral-400 text-center py-20">暂无商品</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

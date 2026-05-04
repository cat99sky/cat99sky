import { sdk } from "@/lib/medusa";
import Image from "next/image";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { formatPrice } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  let product: any = null;

  try {
    const res = await sdk.store.product.list({ handle }) as any;
    product = res.products?.[0];
  } catch (e) {
    console.error("Failed to fetch product:", e);
  }

  if (!product) notFound();

  const firstVariant = product.variants?.[0];
  const price = firstVariant?.calculated_price?.calculated_amount;
  const currencyCode = firstVariant?.calculated_price?.currency_code || "eur";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="aspect-square bg-[var(--muted)] rounded-2xl overflow-hidden relative">
          {product.thumbnail ? (
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-neutral-300 text-8xl">
              🛍
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold tracking-tight mb-2">{product.title}</h1>
          {price != null && (
            <p className="text-2xl font-semibold text-[var(--accent)] mb-6">
              {formatPrice(price, currencyCode)}
            </p>
          )}
          {product.description && (
            <p className="text-neutral-600 mb-8 leading-relaxed">{product.description}</p>
          )}

          {product.options?.length > 0 && (
            <div className="mb-6 space-y-3">
              {product.options.map((option: any) => (
                <div key={option.id}>
                  <p className="text-sm font-medium mb-1.5">{option.title}</p>
                  <div className="flex flex-wrap gap-2">
                    {option.values?.map((val: any) => (
                      <span
                        key={val.id}
                        className="px-3 py-1.5 text-sm border border-[var(--border)] rounded-lg"
                      >
                        {val.value}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {firstVariant && <AddToCartButton variantId={firstVariant.id} />}
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";

type Props = {
  product: any;
};

export function ProductCard({ product }: Props) {
  const price = product.variants?.[0]?.calculated_price?.calculated_amount;
  const currencyCode = product.variants?.[0]?.calculated_price?.currency_code || "eur";

  return (
    <Link href={`/products/${product.handle}`} className="group">
      <div className="aspect-square bg-[var(--muted)] rounded-2xl overflow-hidden mb-3 relative">
        {product.thumbnail ? (
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-300 text-6xl">
            🛍
          </div>
        )}
      </div>
      <h3 className="font-medium text-sm group-hover:text-[var(--accent)] transition-colors">
        {product.title}
      </h3>
      {price != null && (
        <p className="text-sm text-neutral-500 mt-0.5">
          {formatPrice(price, currencyCode)}
        </p>
      )}
    </Link>
  );
}

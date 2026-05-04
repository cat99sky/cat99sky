export function formatPrice(amount: number, currencyCode: string): string {
  return new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency: currencyCode.toUpperCase(),
    minimumFractionDigits: 0,
  }).format(amount);
}

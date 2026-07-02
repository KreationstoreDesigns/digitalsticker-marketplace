"use client";

import { useEffect, useState } from "react";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) throw new Error("Failed to load products");
        const data = await response.json();
        setProducts(data.products || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="text-destructive">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight">Shop</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Browse our collection of premium digital stickers
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products available yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product: any) => (
              <div
                key={product._id}
                className="group relative overflow-hidden rounded-lg border border-border bg-card hover:border-primary transition-colors"
              >
                <div className="aspect-square bg-muted rounded-t-lg overflow-hidden">
                  {product.thumbnail && (
                    <img
                      src={product.thumbnail}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold truncate">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                    <div className="flex items-center text-sm text-yellow-500">
                      ★ {product.rating}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

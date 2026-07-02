"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      const response = await fetch("/api/categories");
      if (response.ok) {
        const data = await response.json();
        setCategories(data.categories);
      }
    } catch (error) {
      console.error("Failed to load categories", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Browse Categories</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Explore our collection by category
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No categories available</p>
            <Link href="/shop">
              <Button>View All Products</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link key={category._id} href={`/shop?category=${category._id}`}>
                <div className="group relative overflow-hidden rounded-lg border border-border bg-card p-8 hover:border-primary transition-colors h-full cursor-pointer">
                  <div className="flex flex-col items-center justify-center text-center">
                    <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                    {category.description && (
                      <p className="text-muted-foreground text-sm mb-4">
                        {category.description}
                      </p>
                    )}
                    <Button variant="outline" size="sm" className="mt-auto">
                      Browse
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

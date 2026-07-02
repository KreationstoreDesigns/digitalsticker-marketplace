"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CollectionsPage() {
  const collections = [
    {
      id: "featured",
      name: "Featured Stickers",
      description: "Our handpicked selection of premium stickers",
      icon: "⭐",
    },
    {
      id: "new",
      name: "New Arrivals",
      description: "Fresh designs just added to our collection",
      icon: "✨",
    },
    {
      id: "bestselling",
      name: "Bestsellers",
      description: "Most popular stickers loved by customers",
      icon: "🔥",
    },
    {
      id: "trending",
      name: "Trending Now",
      description: "What's hot right now in the community",
      icon: "📈",
    },
  ];

  return (
    <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Collections</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Curated collections for every mood and style
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {collections.map((collection) => (
            <Link key={collection.id} href={`/shop?collection=${collection.id}`}>
              <div className="group relative overflow-hidden rounded-lg border border-border bg-gradient-to-br from-primary/10 to-transparent p-8 hover:border-primary transition-colors h-full cursor-pointer">
                <div className="text-5xl mb-4">{collection.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{collection.name}</h3>
                <p className="text-muted-foreground mb-6">{collection.description}</p>
                <Button variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  Explore Collection
                </Button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

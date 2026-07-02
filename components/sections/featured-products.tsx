"use client";

export function FeaturedProducts() {
  return (
    <section id="featured" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-muted/40">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Featured Stickers</h2>
          <p className="mt-4 text-lg text-muted-foreground">Handpicked selections from our community</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Placeholder - Products will be loaded from API */}
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="group relative overflow-hidden rounded-lg border border-border bg-card p-4 hover:border-primary transition-colors">
              <div className="aspect-square bg-muted rounded-lg mb-4" />
              <h3 className="font-semibold">Sticker {i}</h3>
              <p className="text-sm text-muted-foreground">$2.99</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

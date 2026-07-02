"use client";

import { motion } from "framer-motion";

export function Categories() {
  const categories = [
    { name: "Nature", icon: "🌿", count: "1,234" },
    { name: "Abstract", icon: "🎨", count: "856" },
    { name: "Animated", icon: "✨", count: "542" },
    { name: "Vintage", icon: "📦", count: "723" },
  ];

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Browse by Category</h2>
          <p className="mt-4 text-lg text-muted-foreground">Find stickers that match your style</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, i) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-lg border border-border p-6 hover:border-primary transition-colors cursor-pointer"
            >
              <div className="text-4xl mb-4">{category.icon}</div>
              <h3 className="text-lg font-semibold">{category.name}</h3>
              <p className="text-sm text-muted-foreground mt-2">{category.count} stickers</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

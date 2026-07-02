"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-b from-primary/5 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Premium Digital
          <span className="block bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Sticker Collection
          </span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground sm:text-xl max-w-2xl mx-auto">
          Discover thousands of premium digital stickers designed by top creators. Perfect for
          digital art, design projects, and creative work.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/shop">
            <Button size="lg" className="w-full sm:w-auto">
              Shop Now
            </Button>
          </Link>
          <Link href="#featured">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Explore Collections
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

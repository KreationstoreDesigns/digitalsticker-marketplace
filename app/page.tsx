"use client";

import { HeroSection } from "@/components/sections/hero";
import { FeaturedProducts } from "@/components/sections/featured-products";
import { Categories } from "@/components/sections/categories";
import { Testimonials } from "@/components/sections/testimonials";
import { CTA } from "@/components/sections/cta";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Categories />
      <FeaturedProducts />
      <Testimonials />
      <CTA />
    </>
  );
}

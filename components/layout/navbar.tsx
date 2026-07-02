"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ShoppingCart, Heart, User, LogOut, Settings } from "lucide-react";
import { ModeToggle } from "@/components/theme-toggle";

export function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 font-bold text-xl">
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Stickers
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link
              href="/shop"
              className={`text-sm font-medium transition-colors ${
                isActive("/shop")
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Shop
            </Link>
            <Link
              href="/categories"
              className={`text-sm font-medium transition-colors ${
                isActive("/categories")
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Categories
            </Link>
            <Link
              href="/collections"
              className={`text-sm font-medium transition-colors ${
                isActive("/collections")
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Collections
            </Link>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <ModeToggle />

            {/* Cart */}
            <Link
              href="/cart"
              className="relative inline-flex items-center justify-center rounded-lg p-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <ShoppingCart className="h-5 w-5" />
            </Link>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative inline-flex items-center justify-center rounded-lg p-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <Heart className="h-5 w-5" />
            </Link>

            {/* Auth */}
            {session ? (
              <div className="hidden md:flex md:items-center md:space-x-4">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center rounded-lg p-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <User className="h-5 w-5" />
                </Link>
                <button
                  onClick={() => signOut()}
                  className="inline-flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="hidden md:flex md:items-center md:space-x-2">
                <Link
                  href="/auth/login"
                  className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex md:hidden items-center justify-center rounded-lg p-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="border-t border-border md:hidden">
            <div className="space-y-1 px-2 py-4">
              <Link
                href="/shop"
                className="block rounded-lg px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground"
              >
                Shop
              </Link>
              <Link
                href="/categories"
                className="block rounded-lg px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground"
              >
                Categories
              </Link>
              <Link
                href="/collections"
                className="block rounded-lg px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground"
              >
                Collections
              </Link>
              {session ? (
                <>
                  <Link
                    href="/dashboard"
                    className="flex items-center space-x-2 rounded-lg px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground"
                  >
                    <User className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="w-full flex items-center space-x-2 rounded-lg px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="block rounded-lg px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground"
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/register"
                    className="block rounded-lg bg-primary px-3 py-2 text-base font-medium text-primary-foreground hover:bg-primary/90"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

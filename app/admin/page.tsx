"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
      return;
    }

    if (session?.user?.role !== "admin") {
      router.push("/");
      return;
    }
  }, [status, session, router]);

  useEffect(() => {
    if (session?.user?.role === "admin") {
      loadStats();
    }
  }, [session]);

  async function loadStats() {
    try {
      const response = await fetch("/api/admin/stats");
      if (response.ok) {
        const data = await response.json();
        setStats(data.stats);
      }
    } catch (error) {
      console.error("Failed to load admin stats", error);
    } finally {
      setLoading(false);
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="mt-2 text-muted-foreground">Manage your marketplace</p>
        </div>

        {/* Statistics */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="rounded-lg border border-border bg-card p-6">
              <p className="text-sm text-muted-foreground mb-2">Total Revenue</p>
              <p className="text-3xl font-bold">${stats.totalRevenue.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground mt-2">from {stats.totalOrders} orders</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <p className="text-sm text-muted-foreground mb-2">Total Products</p>
              <p className="text-3xl font-bold">{stats.totalProducts}</p>
              <p className="text-xs text-muted-foreground mt-2">across {stats.totalCategories} categories</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <p className="text-sm text-muted-foreground mb-2">Total Users</p>
              <p className="text-3xl font-bold">{stats.totalUsers}</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <p className="text-sm text-muted-foreground mb-2">Pending Orders</p>
              <p className="text-3xl font-bold">{stats.pendingOrders}</p>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/admin/products/new">
            <Button className="w-full">Add Product</Button>
          </Link>
          <Link href="/admin/categories">
            <Button variant="outline" className="w-full">Manage Categories</Button>
          </Link>
          <Link href="/admin/coupons">
            <Button variant="outline" className="w-full">Manage Coupons</Button>
          </Link>
          <Link href="/admin/orders">
            <Button variant="outline" className="w-full">View Orders</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

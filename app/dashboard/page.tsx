"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="mt-2 text-muted-foreground">Welcome back, {session.user?.name}!</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="rounded-lg border border-border bg-card p-6">
            <p className="text-sm text-muted-foreground mb-2">Total Orders</p>
            <p className="text-2xl font-bold">0</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6">
            <p className="text-sm text-muted-foreground mb-2">Total Spent</p>
            <p className="text-2xl font-bold">$0.00</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6">
            <p className="text-sm text-muted-foreground mb-2">Wishlisted Items</p>
            <p className="text-2xl font-bold">0</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6">
            <p className="text-sm text-muted-foreground mb-2">Account Created</p>
            <p className="text-sm font-semibold">Today</p>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-xl font-bold mb-4">Account Settings</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{session.user?.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium">{session.user?.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Role</p>
              <p className="font-medium capitalize">{session.user?.role || "customer"}</p>
            </div>
            <button
              onClick={() => signOut()}
              className="mt-4 rounded-lg bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

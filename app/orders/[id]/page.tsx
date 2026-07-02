"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function OrderPage({ params }: { params: { id: string } }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);
  const [downloads, setDownloads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      loadOrder();
    }
  }, [session]);

  async function loadOrder() {
    try {
      const response = await fetch(`/api/orders/${params.id}`);
      if (!response.ok) throw new Error("Failed to load order");
      const data = await response.json();
      setOrder(data.order);

      if (data.order.paymentStatus === "completed") {
        const downloadsResponse = await fetch(
          `/api/orders/${params.id}/downloads`
        );
        if (downloadsResponse.ok) {
          const downloadData = await downloadsResponse.json();
          setDownloads(downloadData.downloads);
        }
      }
    } catch (err: any) {
      setError(err.message);
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

  if (error || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-destructive mb-4">Error: {error || "Order not found"}</p>
          <Button onClick={() => router.push("/dashboard")}>Back to Dashboard</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Order Details</h1>

        {/* Order Status */}
        <div className="rounded-lg border border-border bg-card p-6 mb-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Order ID</p>
              <p className="font-mono text-sm">{order._id}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Date</p>
              <p className="text-sm">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Status</p>
              <p
                className={`text-sm font-semibold ${
                  order.paymentStatus === "completed"
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              >
                {order.paymentStatus}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total</p>
              <p className="font-semibold">${order.totalAmount.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="rounded-lg border border-border bg-card p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Items</h2>
          <div className="space-y-3">
            {order.items.map((item: any, i: number) => (
              <div key={i} className="flex justify-between text-sm border-b border-border pb-3 last:border-0">
                <span>Product {i + 1}</span>
                <span>${item.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Downloads */}
        {order.paymentStatus === "completed" && downloads.length > 0 && (
          <div className="rounded-lg border border-border bg-card p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Downloads</h2>
            <div className="space-y-3">
              {downloads.map((download: any) => (
                <div
                  key={download.productId}
                  className="flex items-center justify-between border-b border-border pb-3 last:border-0"
                >
                  <div>
                    <p className="font-medium text-sm">{download.productName}</p>
                    <p className="text-xs text-muted-foreground">
                      Expires: {new Date(download.expiresAt).toLocaleDateString()}
                    </p>
                  </div>
                  <a
                    href={download.downloadUrl}
                    className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                  >
                    Download
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        <Button
          variant="outline"
          className="w-full"
          onClick={() => router.push("/dashboard")}
        >
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
}

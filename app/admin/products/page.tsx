"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function ProductsAdmin() {
  const { data: session } = useSession();
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (session?.user?.role !== "admin") {
      router.push("/");
      return;
    }
    loadProducts();
  }, [session, router]);

  async function loadProducts() {
    try {
      const response = await fetch("/api/admin/products");
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products);
      }
    } catch (error) {
      console.error("Failed to load products", error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteProduct(id: string) {
    if (!confirm("Are you sure?")) return;
    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setProducts(products.filter((p) => p._id !== id));
      }
    } catch (error) {
      console.error("Failed to delete product", error);
    }
  }

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <Link href="/admin/products/new">
            <Button>Add Product</Button>
          </Link>
        </div>

        <div className="mb-6">
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products found</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left px-6 py-3 text-sm font-semibold">Name</th>
                  <th className="text-left px-6 py-3 text-sm font-semibold">Price</th>
                  <th className="text-left px-6 py-3 text-sm font-semibold">Category</th>
                  <th className="text-left px-6 py-3 text-sm font-semibold">Status</th>
                  <th className="text-left px-6 py-3 text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product._id} className="border-b border-border hover:bg-muted/50">
                    <td className="px-6 py-3 text-sm font-medium">{product.name}</td>
                    <td className="px-6 py-3 text-sm">${product.price.toFixed(2)}</td>
                    <td className="px-6 py-3 text-sm text-muted-foreground">
                      {product.category?.name || "N/A"}
                    </td>
                    <td className="px-6 py-3 text-sm">
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                          product.isActive
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                        }`}
                      >
                        {product.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-sm space-x-2">
                      <Link href={`/admin/products/${product._id}/edit`}>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </Link>
                      <button
                        onClick={() => deleteProduct(product._id)}
                        className="rounded px-3 py-1.5 text-sm font-medium text-destructive hover:bg-destructive/10"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

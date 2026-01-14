"use client";
import { ClockIcon, SearchIcon, TrendingUpIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import ProductCard from "./product-card";
import { ProductType } from "@/types";
import { useMemo, useState } from "react";

export default function ProductExplorer({
  products,
}: {
  products: ProductType[];
}) {
  const [sortBy, setSortBy] = useState<"trending" | "recent" | "newest">(
    "trending"
  );
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    const filtered = [...products];
    if (searchQuery.length > 0) {
      return filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    0;
    switch (sortBy) {
      case "trending":
        return filtered.sort((a, b) => b.voteCount - a.voteCount);

      case "recent":
        return filtered.sort(
          (a, b) =>
            new Date(b.createdAt || "").getTime() -
            new Date(a.createdAt || "").getTime()
        );
      case "newest":
        return filtered.sort(
          (a, b) =>
            new Date(b.createdAt || "").getTime() -
            new Date(a.createdAt || "").getTime()
        );
      default:
        return filtered;
    }
  }, [searchQuery, products, sortBy]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 mb-8 ">
        <div className="flex-1 relative ">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground "></SearchIcon>
          <Input
            type="text"
            placeholder="search products..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setSortBy("trending")}>
            <TrendingUpIcon className="size-4"></TrendingUpIcon>
            Trending
          </Button>
          <Button onClick={() => setSortBy("recent")}>
            <ClockIcon></ClockIcon>
            Recent
          </Button>
        </div>
      </div>
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">
          Showing {filteredProducts.length} products
        </p>
      </div>
      <div className="grid-wrapper">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

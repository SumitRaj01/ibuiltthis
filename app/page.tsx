import FeaturedProducts from "@/components/landing-page/featured-products";
import HeroSection from "@/components/landing-page/hero-section";
import RecentlyLaunchedProducts from "@/components/landing-page/recently-launched-products";
import ProductSkeleton from "@/components/products/product-skeleton";
import { LoaderIcon } from "lucide-react";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <HeroSection></HeroSection>
      <FeaturedProducts />
      <Suspense
        fallback={
          // <div className="wrapper flex items-center gap-2">
          //   Loading...Recently Launched Products
          //   <LoaderIcon className="size-4 animate-spin"></LoaderIcon>
          // </div>
          <ProductSkeleton />
        }
      >
        <RecentlyLaunchedProducts />
      </Suspense>
    </div>
  );
}

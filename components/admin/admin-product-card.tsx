import { ProductType } from "@/types";
import { Card, CardDescription, CardFooter, CardTitle } from "../ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import { Trash2Icon } from "lucide-react";

export default function AdminProductCard({
  product,
}: {
  product: ProductType;
}) {
  return (
    <Card className="border rounded-lg p-6 bg-background hover:shadow-md transition-shadow ">
      <div className="flex-1 min-w-0 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-betweeen gap-6">
          <CardTitle className="text-xl font-semibold">
            {product.name}
          </CardTitle>
          <CardDescription className="flex flex-col gap-4">
            {product.tagline}
            <div className="flex items-center gap-2">
              {product.tags?.map((tag) => (
                <Badge variant="secondary" key={tag}>
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex gap-x-4 gap-y-2 text-sm text-muted-foreground ">
              <p>
                <span className="font-bold ">By:</span> {product.submittedBy}
              </p>
              <p>
                {product.createdAt
                  ? new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    }).format(new Date(product.createdAt?.toISOString() ?? ""))
                  : ""}
              </p>

              <p>
                <a
                  href={product.websiteUrl ?? ""}
                  target="_blank"
                  rel="noopener noreferrer"
                ></a>
                Visit Website:
              </p>
            </div>
          </CardDescription>
          <CardFooter>
            <Button variant={"outline"}>
              <Trash2Icon className="size-4"></Trash2Icon>
              Delete
            </Button>
          </CardFooter>
        </div>
      </div>
      <div className="lg:shrink-0">{/* <AdminActions/> */}</div>
    </Card>
  );
}

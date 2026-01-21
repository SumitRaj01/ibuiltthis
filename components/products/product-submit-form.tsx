"use client";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import { FormField } from "../forms/form-field";
import { Button } from "../ui/button";
import { Loader2Icon, LoaderIcon, SparklesIcon } from "lucide-react";
import { addProductAction } from "@/lib/products/product-actions";
import { useActionState } from "react";
import { FormState } from "@/types";
import { cn } from "@/lib/utils";

export default function ProductSubmitForm() {
  const initialState: FormState = {
    success: false,
    errors: {},
    message: "",
  };
  const [state, formAction, isPending] = useActionState(
    addProductAction,
    initialState,
  );

  const { errors, message, success } = state;
  const getFieldErrors = (fieldName: string): string[] => {
    if (!errors) return [];
    return (errors as Record<string, string[]>)[fieldName] ?? [];
  };

  return (
    <form className="space-y-6" action={formAction}>
      {message && (
        <div
          className={cn(
            "p-4 rounded-lg-border",
            success
              ? "bg-primary/10 border-primary text-primary"
              : "bg-destructive/10 border-destructive text-destructive",
          )}
          role="alert"
          aria-live="polite"
        >
          {message}
        </div>
      )}
      <div className="space-y-2">
        <FormField
          label="Product Name"
          name="name"
          id="name"
          placeholder="My Awesome Product"
          required
          onChange={() => {}}
          error={getFieldErrors("name")}
        ></FormField>
      </div>

      <FormField
        label="slug"
        id="slug"
        name="slug"
        placeholder="My Awesome Product"
        required
        onChange={() => {}}
        error={getFieldErrors("slug")}
        helperText="URL-friendly version of your product name"
      ></FormField>

      <FormField
        label="tagline"
        id="tagline"
        name="tagline"
        placeholder="A short, catchy tagline for your product"
        required
        onChange={() => {}}
        error={getFieldErrors("tagline")}
        helperText="URL-friendly version of your product name"
      ></FormField>

      <FormField
        label="Description"
        id="description"
        name="description"
        placeholder="Tell us more about your product..."
        required
        onChange={() => {}}
        error={getFieldErrors("description")}
        textarea
      ></FormField>

      <FormField
        label="Website URL"
        id="websiteUrl"
        name="websiteUrl"
        placeholder="https://www.youtube.com"
        required
        onChange={() => {}}
        error={getFieldErrors("websiteUrl")}
        helperText="Enter your product's website or landing page"
      ></FormField>

      <FormField
        label="Tags"
        id="tags"
        name="tags"
        placeholder="AI, Productivity , SaaS"
        required
        onChange={() => {}}
        error={getFieldErrors("tags")}
        helperText="Comma-separated tags (eg: AI, SaaS, Productivity)"
      ></FormField>

      <Button type="submit" size="lg" className="w-full">
        {isPending ? (
          <Loader2Icon className="size-4 animate-spin"></Loader2Icon>
        ) : (
          <>
            <SparklesIcon className="size-4">Submit Product</SparklesIcon>
          </>
        )}
        {/* <SparklesIcon className="size-4"> </SparklesIcon> */}
        Submit Product
      </Button>
    </form>
  );
}

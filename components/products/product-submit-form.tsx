"use client";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import { FormField } from "../forms/form-field";
import { Button } from "../ui/button";
import { Loader2Icon, LoaderIcon, SparklesIcon } from "lucide-react";
import { addProductAction } from "@/lib/products/product-actions";
import { useActionState } from "react";

export default function ProductSubmitForm() {
  const initialState = {
    success: false,
    error: {},
    message: "",
  };
  const [state, formAction, isPending] = useActionState(
    addProductAction,
    initialState
  );

  const { errors, message, succeq } = state;

  return (
    <form className="space-y-6" action={formAction}>
      <div className="space-y-2">
        <FormField
          label="Product Name"
          name="name"
          id="name"
          placeholder="My Awesome Product"
          required
          onChange={() => {}}
          error={errors?.name}
        ></FormField>
      </div>

      <FormField
        label="slug"
        id="slug"
        name="slug"
        placeholder="My Awesome Product"
        required
        onChange={() => {}}
        error={errors?.slug}
        helperText="URL-friendly version of your product name"
      ></FormField>

      <FormField
        label="tagline"
        id="tagline"
        name="tagline"
        placeholder="A short, catchy tagline for your product"
        required
        onChange={() => {}}
        error={errors?.tagline}
        helperText="URL-friendly version of your product name"
      ></FormField>

      <FormField
        label="Description"
        id="description"
        name="description"
        placeholder="Tell us more about your product..."
        required
        onChange={() => {}}
        error={errors?.description}
        textarea
      ></FormField>

      <FormField
        label="Website URL"
        id="websiteUrl"
        name="websiteUrl"
        placeholder="https://www.youtube.com"
        required
        onChange={() => {}}
        error={errors?.websiteUrl}
        helperText="Enter your product's website or landing page"
      ></FormField>

      <FormField
        label="Tags"
        id="tags"
        name="tags"
        placeholder="AI, Productivity , SaaS"
        required
        onChange={() => {}}
        error={errors?.tags}
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

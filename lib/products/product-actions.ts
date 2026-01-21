"use server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { productSchema } from "./product-validation";
import { products } from "@/db/schema";
import { db } from "@/db";
import z from "zod";
import { FormState } from "@/types";
import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const addProductAction = async (
  prevState: FormState,
  formData: FormData,
) => {
  console.log(formData);
  //auth
  try {
    const { userId, orgId } = await auth();
    if (!userId) {
      return {
        success: false,
        message: "you must be signed in to submit a product",
        errors: undefined,
      };
    }

    if (!orgId) {
      return {
        success: false,
        message: "you must be a member of an organizationh to submit a product",
        errors: undefined,
      };
    }
    //data
    const user = await currentUser();
    const userEmail = user?.emailAddresses?.[0]?.emailAddress || "anonymous";
    const rawFormData = Object.fromEntries(formData.entries());

    //validate the data
    const validatedData = productSchema.safeParse(rawFormData);
    if (!validatedData.success) {
      return {
        success: false,
        errors: validatedData.error.flatten().fieldErrors,
        message: "Invalid data",
      };
    }
    const { name, slug, tagline, description, websiteUrl, tags } =
      validatedData.data;

    const tagsArray = tags ? tags.filter((tag) => typeof tag === "string") : [];

    //transform the data
    await db.insert(products).values({
      name,
      slug,
      tagline,
      description,
      websiteUrl,
      tags: tagsArray,
      status: "pending",
      submittedBy: userEmail,
      organizationId: orgId,
      userId,
    });
    return {
      success: true,
      message: "Product submitted successfully! It will be reviewed shortly",
      errors: undefined,
    };
  } catch (error) {
    console.error(error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.flatten().fieldErrors,
        message: "Validation failed, please check the form",
      };
    }
    return {
      success: false,
      error: error,
      message: "Failed to Submit product",
    };
  }
};

export const upvoteProductAction = async (productId: number) => {
  try {
    const { userId, orgId } = await auth();
    if (!userId) {
      return {
        success: false,
        message: "you must be signed in to submit a product",
        errors: undefined,
      };
    }

    if (!orgId) {
      return {
        success: false,
        message: "you must be a member of an organizationh to submit a product",
        errors: undefined,
      };
    }
    await db
      .update(products)
      .set({ voteCount: sql`GREATEST(0,vote_count + 1)` })
      .where(eq(products.id, productId));
    revalidatePath("/");
    return {
      success: true,
      message: "Product upvoted successfully!",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to upvote product",
      voteCount: 0,
    };
  }
};

export const downvoteProductAction = async (productId: number) => {
  try {
    const { userId, orgId } = await auth();
    if (!userId) {
      return {
        success: false,
        message: "you must be signed in to submit a product",
      };
    }

    if (!orgId) {
      return {
        success: false,
        message: "you must be a member of an organizationh to submit a product",
      };
    }
    await db
      .update(products)
      .set({ voteCount: sql`GREATEST(0,vote_count - 1)` })
      .where(eq(products.id, productId));
    revalidatePath("/");

    return {
      success: true,
      message: "Product downvoted successfully!",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to downvote product",
      voteCount: 0,
    };
  }
};

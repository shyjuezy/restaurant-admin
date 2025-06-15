"use server";

import {
  MenuCategory,
  ActionResult,
  menuCategoriesArraySchema,
} from "@/lib/types";
import { authorizedFetch } from "@/lib/auth-backend";

/**
 * Fetch menu categories by brand name, location slug, and menu slug
 */
export async function getMenuCategories(
  brandName: string,
  locationSlug: string,
  menuSlug: string
): Promise<ActionResult<MenuCategory[]>> {
  try {
    const params = new URLSearchParams({
      brandName,
      locationSlug,
      menuSlug,
    });

    const baseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";
    const response = await authorizedFetch(
      `${baseUrl}/api/menu/categories?${params.toString()}`
    );

    const data = await response.json();

    // Validate the response with Zod
    const validatedData = menuCategoriesArraySchema.parse(data);

    return { success: true, data: validatedData };
  } catch (error) {
    console.error("Error fetching menu categories:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

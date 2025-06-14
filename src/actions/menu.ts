"use server";

import {
  MenuCategory,
  ActionResult,
  menuCategoriesArraySchema,
} from "@/lib/types";
import { fetchWithAuth, ApiError } from "@/lib/api-client";

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

    const data = await fetchWithAuth(
      `/api/menu/categories?${params.toString()}`
    );

    // Validate the response with Zod
    const validatedData = menuCategoriesArraySchema.parse(data);

    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        error: error.message,
        code: error.code,
        status: error.status,
      };
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

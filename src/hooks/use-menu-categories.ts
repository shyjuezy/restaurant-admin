"use client";

import { useQuery } from "@tanstack/react-query";
import { getMenuCategories } from "@/lib/api";
import { MenuCategory } from "@/lib/types";
import { ZodError } from "zod";

export interface UseMenuCategoriesParams {
  brandName: string;
  locationSlug: string;
  menuSlug: string;
}

/**
 * Hook for fetching menu categories with authentication and validation handling
 */
export function useMenuCategories({
  brandName,
  locationSlug,
  menuSlug,
}: UseMenuCategoriesParams) {
  return useQuery({
    queryKey: ["menu-categories", brandName, locationSlug, menuSlug],
    queryFn: async () => {
      const result = await getMenuCategories(brandName, locationSlug, menuSlug);

      if (!result.success) {
        // Handle different types of errors
        if (result.status === 401) {
          throw new Error("Authentication required. Please log in again.");
        }
        if (result.status === 403) {
          throw new Error(
            "Access denied. You do not have permission to view menu categories."
          );
        }
        if (result.status === 404) {
          throw new Error(
            "Menu categories not found for the specified location."
          );
        }
        throw new Error(result.error || "Failed to fetch menu categories");
      }

      return result.data;
    },
    enabled: !!(brandName && locationSlug && menuSlug),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error) => {
      // Don't retry on authentication or validation errors
      if (
        error.message.includes("Authentication required") ||
        error.message.includes("validation") ||
        error.message.includes("Access denied")
      ) {
        return false;
      }
      // Retry up to 2 times for other errors
      return failureCount < 2;
    },
  });
}

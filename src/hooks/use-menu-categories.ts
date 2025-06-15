"use client";

import { useQuery } from "@tanstack/react-query";
import { getMenuCategories } from "@/actions/menu";
import { MenuCategory } from "@/lib/types";

export interface UseMenuCategoriesParams {
  brandName: string;
  locationSlug: string;
  menuSlug: string;
}

/**
 * Hook for fetching menu categories using server actions with client credentials authentication
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
        throw new Error(result.error || "Failed to fetch menu categories");
      }

      return result.data;
    },
    enabled: !!(brandName && locationSlug && menuSlug),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error) => {
      // Don't retry on authentication errors
      if (
        error.message.includes("Authentication") ||
        error.message.includes("JWT authentication failed")
      ) {
        return false;
      }
      // Retry up to 2 times for other errors
      return failureCount < 2;
    },
  });
}

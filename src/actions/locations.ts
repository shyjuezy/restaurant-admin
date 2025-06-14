"use server";

import { Location, ActionResult } from "@/lib/types";
import { fetchWithAuth, ApiError } from "@/lib/api-client";

/**
 * Fetch locations by brand name from the backend API
 */
export async function getLocationsByBrandName(
  brandName: string
): Promise<ActionResult<Location[]>> {
  try {
    const data = await fetchWithAuth<Location[]>(
      `/api/locations/brand/${encodeURIComponent(brandName)}`
    );
    return { success: true, data };
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

/**
 * Fetch a specific location by slug
 */
export async function getLocationBySlug(
  slug: string
): Promise<ActionResult<Location>> {
  try {
    const data = await fetchWithAuth<Location>(
      `/api/locations/${encodeURIComponent(slug)}`
    );
    return { success: true, data };
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

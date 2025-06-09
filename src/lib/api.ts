"use server";

import { Location, ActionResult } from "./types";

/**
 * Fetch locations by brand name from the backend API
 */
export async function getLocationsByBrandName(
  brandName: string
): Promise<ActionResult<Location[]>> {
  try {
    const apiUrl = process.env.API_URL || "http://localhost:8080";
    const response = await fetch(
      `${apiUrl}/api/locations/brand/${encodeURIComponent(brandName)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return {
        success: false,
        error: `Failed to fetch locations: ${response.status} ${response.statusText}`,
        status: response.status,
      };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("Error fetching locations:", error);
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
    const apiUrl = process.env.API_URL || "http://localhost:8080";
    const response = await fetch(
      `${apiUrl}/api/locations/${encodeURIComponent(slug)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return {
        success: false,
        error: `Failed to fetch location: ${response.status} ${response.statusText}`,
        status: response.status,
      };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("Error fetching location:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

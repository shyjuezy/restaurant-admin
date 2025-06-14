"use server";

import {
  Location,
  MenuCategory,
  ActionResult,
  menuCategoriesArraySchema,
} from "./types";

export class ApiError extends Error {
  code?: string;
  status: number;
  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}

export async function fetchWithAuth<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const baseUrl = process.env.BACKEND_API_URL || "http://localhost:8080";
  const url = `${baseUrl}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    credentials: "include",
  });

  if (!response.ok) {
    let errorMessage = `API error: ${response.status}`;
    let errorCode = undefined;
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
      errorCode = errorData.code;
    } catch (e) {
      // If we can't parse error response, use default message
    }
    throw new ApiError(errorMessage, response.status, errorCode);
  }

  return response.json();
}

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

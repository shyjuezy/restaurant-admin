import { z } from "zod";

export interface Location {
  locationId: number;
  name: string;
  slug: string;
  address: string;
  phoneNumber: string;
  email: string;
  openingHours: string;
  cuisineType: string;
  latitude: number;
  longitude: number;
  active: boolean;
}

export interface MenuCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  displayOrder: number;
  altText: string;
  imageUrl: string;
  isActive: boolean;
}

// Zod schemas for runtime validation
export const menuCategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  displayOrder: z.number(),
  altText: z.string(),
  imageUrl: z.string(),
  isActive: z.boolean(),
});

export const menuCategoriesArraySchema = z.array(menuCategorySchema);

export type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string; code?: string; status?: number };

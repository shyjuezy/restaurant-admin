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

export type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string; code?: string; status?: number };

// This file is deprecated - functions have been moved to specific action files
// - Location functions moved to src/actions/locations.ts
// - Menu functions moved to src/actions/menu.ts
// - Shared API utilities moved to src/lib/api-client.ts

// Re-export for backward compatibility (can be removed after updating all imports)
export {
  getLocationsByBrandName,
  getLocationBySlug,
} from "@/actions/locations";
export { getMenuCategories } from "@/actions/menu";
export { ApiError, fetchWithAuth } from "@/lib/api-client";

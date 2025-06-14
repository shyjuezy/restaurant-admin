import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Location } from "@/lib/types";

interface LocationState {
  // State
  brandName: string;
  locations: Location[];
  selectedLocation: Location | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setBrandName: (brandName: string) => void;
  setLocations: (locations: Location[]) => void;
  setSelectedLocation: (location: Location) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;

  // Selectors
  getSelectedLocationSlug: () => string | null;
  getLocationBySlug: (slug: string) => Location | undefined;
  hasLocations: () => boolean;
}

export const useLocationStore = create<LocationState>()(
  persist(
    (set, get) => ({
      // Initial state
      brandName: "",
      locations: [],
      selectedLocation: null,
      isLoading: false,
      error: null,

      // Actions (simplified)
      setBrandName: (brandName) => set({ brandName }),
      setLocations: (locations) => set({ locations }),
      setSelectedLocation: (selectedLocation) => set({ selectedLocation }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),

      // Selectors
      getSelectedLocationSlug: () => get().selectedLocation?.slug || null,
      getLocationBySlug: (slug) =>
        get().locations.find((location) => location.slug === slug),
      hasLocations: () => get().locations.length > 0,
    }),
    {
      name: "location-store",
      // Only persist user preferences, not dynamic data
      partialize: (state) => ({
        brandName: state.brandName,
        selectedLocation: state.selectedLocation,
        // locations array will be fetched fresh each time
      }),
    }
  )
);

"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocationStore } from "@/stores/location-store";
import { getLocationsByBrandName } from "@/lib/api";
import { Location } from "@/lib/types";

interface LocationInitializerProps {
  brandName: string;
  defaultLocationSlug: string;
}

export function LocationInitializer({
  brandName,
  defaultLocationSlug,
}: LocationInitializerProps) {
  const {
    selectedLocation,
    setBrandName,
    setLocations,
    setSelectedLocation,
    setLoading,
    setError,
  } = useLocationStore();

  // Fetch locations on the client side using React Query
  const {
    data: locationsResult,
    isLoading: queryLoading,
    error: queryError,
  } = useQuery({
    queryKey: ["locations", brandName],
    queryFn: () => getLocationsByBrandName(brandName),
    enabled: !!brandName,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  useEffect(() => {
    // Always set brand name immediately
    setBrandName(brandName);

    // Handle locations data when it becomes available
    if (locationsResult?.success && locationsResult.data.length > 0) {
      setLocations(locationsResult.data);

      // Set default location
      const defaultLocation = locationsResult.data.find(
        (location: Location) => location.slug === defaultLocationSlug
      );

      if (defaultLocation) {
        setSelectedLocation(defaultLocation);
      } else {
        // If default location not found, use the first location
        setSelectedLocation(locationsResult.data[0]);
      }
    } else if (!queryLoading && (queryError || !locationsResult?.success)) {
      // If there's an error or no data, create a fallback location
      console.warn(
        "Failed to fetch locations, using fallback",
        queryError ||
          (!locationsResult?.success ? locationsResult?.error : "Unknown error")
      );

      const fallbackLocation: Location = {
        locationId: 1,
        name: brandName,
        slug: defaultLocationSlug,
        address: "Unknown",
        phoneNumber: "Unknown",
        email: "Unknown",
        openingHours: "Unknown",
        cuisineType: "Unknown",
        latitude: 0,
        longitude: 0,
        active: true,
      };

      setLocations([fallbackLocation]);
      setSelectedLocation(fallbackLocation);
    }
  }, [
    brandName,
    defaultLocationSlug,
    locationsResult,
    queryLoading,
    queryError,
    setBrandName,
    setLocations,
    setSelectedLocation,
  ]);

  // Fetch locations on app load
  useEffect(() => {
    const fetchLocationsData = async () => {
      setLoading(true);
      try {
        const result = await getLocationsByBrandName(brandName);
        if (result.success) {
          setLocations(result.data);
          // If user had a selected location, validate it still exists
          if (selectedLocation) {
            const stillExists = result.data.find(
              (loc: Location) => loc.slug === selectedLocation.slug
            );
            if (!stillExists) {
              // setSelectedLocation(null); // Only set to null if your setter allows null
            }
          }
        } else {
          setError(result.error || "Failed to fetch locations");
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchLocationsData();
  }, [brandName, selectedLocation, setError, setLoading, setLocations]);

  // This component doesn't render anything, it just initializes the store
  return null;
}

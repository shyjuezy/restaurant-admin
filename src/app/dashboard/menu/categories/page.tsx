"use client";

import { DashboardLayout } from "@/components/dashboard/layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FolderOpen, Plus, Edit, Trash2, Eye, Loader2 } from "lucide-react";
import { useLocationStore } from "@/stores/location-store";
import { useMenuCategories } from "@/hooks/use-menu-categories";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

export default function CategoriesPage() {
  const { brandName, selectedLocation } = useLocationStore();
  const { toast } = useToast();

  // For now, using a default menu slug - this could be made configurable later
  const menuSlug = "main-menu";

  const {
    data: categories,
    isLoading,
    error,
    refetch,
  } = useMenuCategories({
    brandName,
    locationSlug: selectedLocation?.slug || "",
    menuSlug,
  });

  // Show error toast if there's an error (using useEffect to prevent infinite re-renders)
  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to load menu categories",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
            <p className="text-muted-foreground">
              Organize your menu items into categories for better navigation.
            </p>
            {selectedLocation && (
              <p className="text-sm text-muted-foreground mt-1">
                Location: {selectedLocation.name}
              </p>
            )}
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Button>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">Loading categories...</span>
          </div>
        )}

        {error && !isLoading && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2 text-destructive">
                  Failed to load categories
                </h3>
                <p className="text-muted-foreground mb-4">
                  {error.message ||
                    "An error occurred while loading menu categories"}
                </p>
                <Button onClick={() => refetch()} variant="outline">
                  Try Again
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {categories && categories.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Card
                key={category.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FolderOpen className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                    </div>
                    <Badge
                      variant={category.isActive ? "default" : "secondary"}
                    >
                      {category.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Display Order
                      </span>
                      <span className="text-sm font-medium">
                        {category.displayOrder}
                      </span>
                    </div>
                    {category.imageUrl && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          Image
                        </span>
                        <span className="text-sm font-medium text-green-600">
                          Available
                        </span>
                      </div>
                    )}
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="mr-2 h-4 w-4" />
                        View Items
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {categories && categories.length === 0 && !isLoading && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FolderOpen className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                No categories found
              </h3>
              <p className="text-muted-foreground text-center mb-4">
                You haven&apos;t created any menu categories yet. Add your first
                category to organize your menu items.
              </p>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Category
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}

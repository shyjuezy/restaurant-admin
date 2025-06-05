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
import { FolderOpen, Plus, Edit, Trash2, Eye } from "lucide-react";

export default function CategoriesPage() {
  const categories = [
    {
      id: 1,
      name: "Appetizers",
      description: "Start your meal with our delicious appetizers",
      itemCount: 8,
      status: "Active",
    },
    {
      id: 2,
      name: "Main Courses",
      description: "Hearty and satisfying main dishes",
      itemCount: 15,
      status: "Active",
    },
    {
      id: 3,
      name: "Pasta",
      description: "Fresh pasta dishes made daily",
      itemCount: 12,
      status: "Active",
    },
    {
      id: 4,
      name: "Desserts",
      description: "Sweet endings to your meal",
      itemCount: 6,
      status: "Active",
    },
    {
      id: 5,
      name: "Beverages",
      description: "Refreshing drinks and specialty cocktails",
      itemCount: 10,
      status: "Active",
    },
    {
      id: 6,
      name: "Seasonal Specials",
      description: "Limited time seasonal offerings",
      itemCount: 3,
      status: "Inactive",
    },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
            <p className="text-muted-foreground">
              Organize your menu items into categories for better navigation.
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Button>
        </div>

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
                    variant={
                      category.status === "Active" ? "default" : "secondary"
                    }
                  >
                    {category.status}
                  </Badge>
                </div>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Items</span>
                    <span className="text-sm font-medium">
                      {category.itemCount}
                    </span>
                  </div>
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

        {categories.length === 0 && (
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

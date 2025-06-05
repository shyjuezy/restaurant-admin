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
import {
  FolderOpen,
  Tag,
  Beef,
  Menu as MenuIcon,
  Plus,
  TrendingUp,
  Eye,
} from "lucide-react";
import Link from "next/link";

export default function MenuManagementPage() {
  const menuStats = [
    {
      title: "Total Menu Items",
      value: "47",
      change: "+3 this week",
      icon: MenuIcon,
    },
    {
      title: "Categories",
      value: "8",
      change: "No changes",
      icon: FolderOpen,
    },
    {
      title: "Active Tags",
      value: "15",
      change: "+2 this month",
      icon: Tag,
    },
    {
      title: "Protein Options",
      value: "12",
      change: "+1 this week",
      icon: Beef,
    },
  ];

  const quickActions = [
    {
      title: "Categories",
      description: "Organize your menu into categories",
      href: "/dashboard/menu/categories",
      icon: FolderOpen,
      count: "8 categories",
    },
    {
      title: "Tags",
      description: "Manage dietary and preference tags",
      href: "/dashboard/menu/tags",
      icon: Tag,
      count: "15 tags",
    },
    {
      title: "Proteins",
      description: "Manage protein options for dishes",
      href: "/dashboard/menu/proteins",
      icon: Beef,
      count: "12 proteins",
    },
    {
      title: "Menu Items",
      description: "Add and edit your menu items",
      href: "/dashboard/menu/items",
      icon: MenuIcon,
      count: "47 items",
    },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Menu Management
            </h1>
            <p className="text-muted-foreground">
              Manage your restaurant&apos;s menu, categories, and items.
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Menu Item
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {menuStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.change}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Card
                  key={action.title}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">
                            {action.title}
                          </CardTitle>
                          <CardDescription>
                            {action.description}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          {action.count}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Link href={action.href} className="flex-1">
                        <Button variant="outline" className="w-full">
                          <Eye className="mr-2 h-4 w-4" />
                          View & Manage
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Recent Menu Changes
            </CardTitle>
            <CardDescription>Latest updates to your menu</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div className="space-y-1">
                  <p className="text-sm font-medium">
                    Added &quot;Truffle Pasta&quot; to Pasta category
                  </p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
                <div className="text-sm text-green-600 font-medium">Added</div>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="space-y-1">
                  <p className="text-sm font-medium">
                    Updated price for &quot;Caesar Salad&quot;
                  </p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
                <div className="text-sm text-blue-600 font-medium">Updated</div>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="space-y-1">
                  <p className="text-sm font-medium">
                    Added &quot;Gluten-Free&quot; tag to 5 items
                  </p>
                  <p className="text-xs text-muted-foreground">3 days ago</p>
                </div>
                <div className="text-sm text-purple-600 font-medium">
                  Tagged
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

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
import { MapPin, Plus, Edit, Trash2, Phone, Clock } from "lucide-react";

export default function LocationsPage() {
  const locations = [
    {
      id: 1,
      name: "Downtown Location",
      address: "123 Main Street, New York, NY 10001",
      phone: "+1 (555) 123-4567",
      status: "Active",
      hours: "9:00 AM - 10:00 PM",
    },
    {
      id: 2,
      name: "Uptown Branch",
      address: "456 Broadway, New York, NY 10025",
      phone: "+1 (555) 987-6543",
      status: "Active",
      hours: "10:00 AM - 11:00 PM",
    },
    {
      id: 3,
      name: "Brooklyn Outlet",
      address: "789 Atlantic Ave, Brooklyn, NY 11238",
      phone: "+1 (555) 456-7890",
      status: "Temporarily Closed",
      hours: "Closed for renovation",
    },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Locations</h1>
            <p className="text-muted-foreground">
              Manage your restaurant locations and their details.
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Location
          </Button>
        </div>

        <div className="grid gap-6">
          {locations.map((location) => (
            <Card key={location.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <CardTitle>{location.name}</CardTitle>
                      <CardDescription>{location.address}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        location.status === "Active" ? "default" : "secondary"
                      }
                    >
                      {location.status}
                    </Badge>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{location.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{location.hours}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {locations.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No locations found</h3>
              <p className="text-muted-foreground text-center mb-4">
                You haven&apos;t added any restaurant locations yet. Add your
                first location to get started.
              </p>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Location
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}

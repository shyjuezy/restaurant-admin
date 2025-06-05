"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  LayoutDashboard,
  Store,
  MapPin,
  Menu as MenuIcon,
  FolderOpen,
  Tag,
  Beef,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Restaurant Details",
    href: "/dashboard/restaurant",
    icon: Store,
    children: [
      {
        title: "Locations",
        href: "/dashboard/restaurant/locations",
        icon: MapPin,
      },
    ],
  },
  {
    title: "Menu Management",
    href: "/dashboard/menu",
    icon: MenuIcon,
    children: [
      {
        title: "Categories",
        href: "/dashboard/menu/categories",
        icon: FolderOpen,
      },
      {
        title: "Tags",
        href: "/dashboard/menu/tags",
        icon: Tag,
      },
      {
        title: "Proteins",
        href: "/dashboard/menu/proteins",
        icon: Beef,
      },
      {
        title: "Menu Items",
        href: "/dashboard/menu/items",
        icon: MenuIcon,
      },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [openItems, setOpenItems] = useState<string[]>(["Menu Management"]);

  const toggleItem = (title: string) => {
    setOpenItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="w-64 bg-background border-r border-border h-full">
      <div className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const hasChildren = item.children && item.children.length > 0;
          const isItemOpen = openItems.includes(item.title);

          if (hasChildren) {
            return (
              <Collapsible
                key={item.title}
                open={isItemOpen}
                onOpenChange={() => toggleItem(item.title)}
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant={isActive(item.href) ? "secondary" : "ghost"}
                    className="w-full justify-start"
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {item.title}
                    {isItemOpen ? (
                      <ChevronDown className="ml-auto h-4 w-4" />
                    ) : (
                      <ChevronRight className="ml-auto h-4 w-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1 ml-6 mt-1">
                  {item.children.map((child) => {
                    const ChildIcon = child.icon;
                    return (
                      <Link key={child.href} href={child.href}>
                        <Button
                          variant={isActive(child.href) ? "secondary" : "ghost"}
                          size="sm"
                          className="w-full justify-start"
                        >
                          <ChildIcon className="mr-2 h-4 w-4" />
                          {child.title}
                        </Button>
                      </Link>
                    );
                  })}
                </CollapsibleContent>
              </Collapsible>
            );
          }

          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive(item.href) ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <Icon className="mr-2 h-4 w-4" />
                {item.title}
              </Button>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/hooks/use-auth";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { LocationInitializer } from "@/components/location-initializer";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Restaurant Admin - Management Dashboard",
  description: "A modern restaurant management dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const brandName = process.env.RESTAURANT_BRAND || "Burger Palace";
  const defaultLocationSlug =
    process.env.MAIN_LOCATION_SLUG || "burger-palace-downtown";

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <AuthProvider>
              <LocationInitializer
                brandName={brandName}
                defaultLocationSlug={defaultLocationSlug}
              />
              {children}
              <Toaster />
            </AuthProvider>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}

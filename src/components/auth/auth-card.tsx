import { ReactNode } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { ThemeToggle } from '@/components/ui/theme-toggle';

interface AuthCardProps {
  children: ReactNode;
  title: string;
  description?: string;
  footer?: ReactNode;
  showLogo?: boolean;
}

export function AuthCard({
  children,
  title,
  description,
  footer,
  showLogo = true,
}: AuthCardProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-linear-to-br from-background to-muted/30">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md">
        {showLogo && (
          <div className="flex justify-center mb-8">
            <Link href="/\" className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-xl">
                A
              </div>
              <span className="text-xl font-bold">AuthApp</span>
            </Link>
          </div>
        )}
        <Card className="border-none shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </CardHeader>
          <CardContent>{children}</CardContent>
          {footer && <CardFooter className="flex justify-center border-t p-6">
            {footer}
          </CardFooter>}
        </Card>
      </div>
    </div>
  );
}
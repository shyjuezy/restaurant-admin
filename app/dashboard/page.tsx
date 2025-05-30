'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Settings, User } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { user } = useAuth();
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Good morning');
    } else if (hour < 18) {
      setGreeting('Good afternoon');
    } else {
      setGreeting('Good evening');
    }
  }, []);

  const name = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'there';

  return (
    <div className="container max-w-7xl py-8">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {greeting}, {name}!
          </h1>
          <p className="text-muted-foreground">
            Welcome to your dashboard. Here's an overview of your account.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Account Status
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Active</div>
              <p className="text-xs text-muted-foreground">
                Your account is in good standing
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/dashboard/profile" className="w-full">
                <Button variant="outline" className="w-full">
                  <User className="mr-2 h-4 w-4" />
                  View Profile
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Security Settings
              </CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Standard</div>
              <p className="text-xs text-muted-foreground">
                Enable two-factor authentication for extra security
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/dashboard/settings" className="w-full">
                <Button variant="outline" className="w-full">
                  <Settings className="mr-2 h-4 w-4" />
                  Manage Settings
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Your recent account activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Login Successful
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date().toLocaleDateString()} at{' '}
                      {new Date().toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-1">
          <Card>
            <CardHeader>
              <CardTitle>Welcome to AuthApp</CardTitle>
              <CardDescription>
                Your secure authentication solution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>
                  This is a demo dashboard for the AuthApp authentication system. In a real application, you would see your personalized content and features here.
                </p>
                <p>
                  The authentication system provides secure login, registration, password reset, and account management using Supabase.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
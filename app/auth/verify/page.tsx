'use client';

import Link from 'next/link';
import { AuthCard } from '@/components/auth/auth-card';
import { Button } from '@/components/ui/button';
import { MailCheckIcon } from 'lucide-react';

export default function VerifyPage() {
  return (
    <AuthCard
      title="Check your email"
      showLogo={false}
    >
      <div className="flex flex-col items-center justify-center space-y-6 py-8">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <MailCheckIcon className="h-10 w-10 text-primary" />
        </div>
        <div className="space-y-2 text-center">
          <h2 className="text-xl font-semibold">Verification email sent</h2>
          <p className="text-muted-foreground">
            We've sent a verification email to your inbox. Please check your email and click on the link to verify your account.
          </p>
        </div>
        <div className="flex flex-col space-y-3 w-full">
          <Link href="/auth/login">
            <Button variant="outline" className="w-full">
              Back to login
            </Button>
          </Link>
        </div>
      </div>
    </AuthCard>
  );
}
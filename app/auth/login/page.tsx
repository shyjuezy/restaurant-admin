'use client';

import Link from 'next/link';
import { AuthCard } from '@/components/auth/auth-card';
import { LoginForm } from '@/components/auth/login-form';
import { useAuth } from '@/hooks/use-auth';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);
  
  return (
    <AuthCard
      title="Welcome back"
      description="Enter your credentials to sign in to your account"
      footer={
        <p className="text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link href="/auth/register\" className="font-medium text-primary hover:underline">
            Sign up
          </Link>
        </p>
      }
    >
      <LoginForm />
    </AuthCard>
  );
}
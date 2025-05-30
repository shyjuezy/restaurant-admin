'use client';

import { AuthCard } from '@/components/auth/auth-card';
import { ResetPasswordForm } from '@/components/auth/reset-password-form';

export default function ResetPasswordPage() {
  return (
    <AuthCard
      title="Reset password"
      description="Enter your new password"
    >
      <ResetPasswordForm />
    </AuthCard>
  );
}
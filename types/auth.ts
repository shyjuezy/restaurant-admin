export interface UserSession {
  user: User | null;
  session: Session | null;
}

export interface User {
  id: string;
  email: string;
  user_metadata: {
    full_name?: string;
  };
}

export interface Session {
  access_token: string;
  refresh_token: string;
  expires_at: number;
}

export interface AuthFormData {
  email: string;
  password: string;
  remember?: boolean;
}

export interface RegisterFormData extends AuthFormData {
  fullName: string;
}
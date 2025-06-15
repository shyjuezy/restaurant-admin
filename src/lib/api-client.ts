import { supabase } from "./supabase";

export class ApiError extends Error {
  code?: string;
  status: number;
  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}

/**
 * Client-side fetch with Supabase JWT authentication
 * Use this in client components and hooks
 */
export async function fetchWithSupabaseAuth<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
  const url = `${baseUrl}${endpoint}`;

  // Get the current session and access token from Supabase
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const accessToken = session?.access_token;

  if (!accessToken) {
    throw new ApiError("Authentication required. Please log in.", 401);
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      ...options.headers,
    },
  });

  if (!response.ok) {
    let errorMessage = `API error: ${response.status}`;
    let errorCode = undefined;
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
      errorCode = errorData.code;
    } catch (e) {
      // If we can't parse error response, use default message
    }
    throw new ApiError(errorMessage, response.status, errorCode);
  }

  return response.json();
}

/**
 * Server-side fetch with client credentials authentication
 * Use this in server actions
 */
export async function fetchWithAuth<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
  const url = `${baseUrl}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    credentials: "include",
    cache: "no-store",
  });

  if (!response.ok) {
    let errorMessage = `API error: ${response.status}`;
    let errorCode = undefined;
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
      errorCode = errorData.code;
    } catch (e) {
      // If we can't parse error response, use default message
    }
    throw new ApiError(errorMessage, response.status, errorCode);
  }

  return response.json();
}

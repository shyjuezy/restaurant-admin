import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

// Create a variable to hold our client
let supabase: any;

// Check if the values are the placeholder values or missing
if (!supabaseUrl || supabaseUrl === 'your-supabase-url' || 
    !supabaseAnonKey || supabaseAnonKey === 'your-supabase-anon-key') {
  console.error(
    'Invalid Supabase credentials. Please update your .env.local file with valid Supabase URL and anon key.\n' +
    'Visit your Supabase project dashboard, go to Settings > API to get your credentials.'
  );
  
  // Provide fallback values that won't cause URL construction errors
  // This allows the app to load with a disabled Supabase client until proper credentials are set
  const dummyClient = {
    auth: {
      signUp: () => Promise.resolve({ error: { message: 'Supabase not configured' } }),
      signIn: () => Promise.resolve({ error: { message: 'Supabase not configured' } }),
      signOut: () => Promise.resolve({ error: { message: 'Supabase not configured' } }),
      onAuthStateChange: () => ({ data: null, error: null, unsubscribe: () => {} }),
    },
    from: () => ({
      select: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      insert: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      update: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      delete: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
    }),
  };
  
  // Assign the dummy client to our supabase variable
  // @ts-ignore - This is a simplified mock to prevent runtime errors
  supabase = dummyClient;
} else {
  // Create the actual Supabase client if valid credentials exist and assign it
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

// Export the supabase variable at the top level
export { supabase };
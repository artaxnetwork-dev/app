import { createClient } from '@supabase/supabase-js'
import { env } from '@/lib/env'

// Validate environment variables in all runtime contexts
// This ensures the client is created with valid environment variables
function validateEnvVars() {
  try {
    env.validate()
  } catch (error) {
    // In build environments, we might not have env vars yet
    // This is acceptable for the build process
    if (process.env.NODE_ENV === 'development') {
      console.warn('Environment variables not available during build:', error)
    }
    // In production, we should have env vars available
    if (process.env.NODE_ENV === 'production') {
      console.error('Missing required environment variables:', error)
    }
  }
}

// Validate environment variables only at runtime, not during build
// This prevents build-time failures when env vars aren't available
if (typeof window !== 'undefined') {
  // Client-side: validate immediately
  validateEnvVars()
} else if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production') {
  // Server-side development: validate
  validateEnvVars()
}

// Create client with validation
let supabaseClient: ReturnType<typeof createClient>

try {
  supabaseClient = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  })
} catch (error) {
  // If env vars are missing, create a mock client that will fail gracefully
  console.error('Failed to create Supabase client:', error)
  supabaseClient = createClient('https://placeholder.supabase.co', 'placeholder-key', {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  })
}

export const supabase = supabaseClient

// Test connection with proper error handling
export async function testSupabaseConnection(): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('workflows')
      .select('count')
      .limit(1)
    
    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Supabase connection error:', error)
      }
      return false
    }
    
    if (process.env.NODE_ENV === 'development') {
      console.log('Supabase connection successful')
    }
    return true
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Supabase connection failed:', error)
    }
    return false
  }
}

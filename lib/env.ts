// Environment variable validation for Next.js 16
const requiredEnvVars = {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
} as const

// Validate required environment variables at runtime, not build time
function validateEnvVars() {
  for (const [key, value] of Object.entries(requiredEnvVars)) {
    if (!value) {
      throw new Error(`Missing required environment variable: ${key}`)
    }
  }
}

// Only validate when the module is actually used, not during import
export const env = {
  SUPABASE_URL: requiredEnvVars.NEXT_PUBLIC_SUPABASE_URL!,
  SUPABASE_ANON_KEY: requiredEnvVars.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  validate: validateEnvVars,
} as const

// Type-safe environment variables
export type Env = typeof env

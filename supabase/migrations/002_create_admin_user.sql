-- Create admin user
-- Note: This creates a user in auth.users table
-- You'll need to run this through Supabase dashboard or CLI

-- First, create the auth user (this needs to be done via Supabase CLI or dashboard)
-- supabase auth admin create-user --email hichamsaddek.stcnet@gmail.com --password password

-- Then insert the user profile
INSERT INTO public.user_profiles (
  id,
  email,
  full_name,
  role,
  created_at,
  updated_at
)
VALUES (
  gen_random_uuid(),
  'hichamsaddek.stcnet@gmail.com',
  'Hicham SADDEK',
  'admin',
  NOW(),
  NOW()
)
ON CONFLICT (email) DO UPDATE
SET 
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  updated_at = NOW();

-- Note: In production, you should:
-- 1. Use Supabase CLI: supabase auth admin create-user
-- 2. Or use the Supabase dashboard to create the auth user
-- 3. Then link it to the user_profiles table
-- 4. Create an organization for this admin user
-- 5. Set them as the organization owner

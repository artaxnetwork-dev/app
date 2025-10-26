# Admin Account Setup

## Creating the Admin User

To create the admin account for **Hicham SADDEK** with the credentials:
- **Email**: hichamsaddek.stcnet@gmail.com
- **Password**: password

### Option 1: Using Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to **Authentication** → **Users**
3. Click **Add User**
4. Enter:
   - Email: `hichamsaddek.stcnet@gmail.com`
   - Password: `password`
   - Check "Auto Confirm User"
5. Click **Create User**
6. Once created, note the user's UUID

### Option 2: Using Supabase CLI

```bash
# Create the auth user
supabase auth admin create-user \
  --email hichamsaddek.stcnet@gmail.com \
  --password password \
  --email-confirm

# Then run the migration to create the user profile
supabase db push
```

## Creating the User Profile

After creating the auth user, you need to create the user profile in the database:

```sql
-- Insert the user profile
INSERT INTO public.user_profiles (
  id,
  email,
  full_name,
  role,
  created_at,
  updated_at
)
VALUES (
  '<uuid-from-auth-users>', -- Replace with actual UUID from auth.users
  'hichamsaddek.stcnet@gmail.com',
  'Hicham SADDEK',
  'admin',
  NOW(),
  NOW()
);
```

## Creating the Organization

The admin user should have an organization:

```sql
-- Create organization
INSERT INTO organizations (name, description)
VALUES ('Artax Network Admin', 'Admin Organization')
RETURNING id;

-- Add admin as organization owner
INSERT INTO organization_members (organization_id, user_id, role)
VALUES ('<org-id>', '<user-id>', 'owner');
```

## Login

After setup, you can login at:
- URL: `http://localhost:3000/login`
- Email: `hichamsaddek.stcnet@gmail.com`
- Password: `password`

## Security Note

⚠️ **Important**: Change the password immediately in production!

The default password `password` should only be used for development/testing.

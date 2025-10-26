/**
 * Minimal Database Types
 * Basic types for Supabase client without complex relationships
 */

export interface Database {
  public: {
    Tables: {
      workflows: {
        Row: {
          id: string
          name: string
          description: string | null
          status: string
          steps: any
          triggers: any
          created_at: string
          updated_at: string
          user_id: string
          organization_id: string | null
          is_public: boolean
          tags: string[]
          version: number
          last_run_at: string | null
          run_count: number
          success_rate: number
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          status?: string
          steps?: any
          triggers?: any
          created_at?: string
          updated_at?: string
          user_id: string
          organization_id?: string | null
          is_public?: boolean
          tags?: string[]
          version?: number
          last_run_at?: string | null
          run_count?: number
          success_rate?: number
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          status?: string
          steps?: any
          triggers?: any
          created_at?: string
          updated_at?: string
          user_id?: string
          organization_id?: string | null
          is_public?: boolean
          tags?: string[]
          version?: number
          last_run_at?: string | null
          run_count?: number
          success_rate?: number
        }
      }
      organizations: {
        Row: {
          id: string
          name: string
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      organization_members: {
        Row: {
          id: string
          organization_id: string
          user_id: string
          role: string
          created_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          user_id: string
          role?: string
          created_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          user_id?: string
          role?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

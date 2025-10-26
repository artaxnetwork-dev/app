import { supabase } from '@/lib/supabase'
import { 
  Organization,
  OrganizationMember,
  CreateOrganizationData
} from '@/lib/types'

export class OrganizationService {
  // Get organizations for a user
  static async getUserOrganizations(userId: string) {
    const { data, error } = await (supabase as any)
      .from('organizations')
      .select(`
        *,
        organization_members!inner(user_id, role)
      `)
      .eq('organization_members.user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error(`Failed to fetch organizations: ${error.message}`)
    }

    return data as (Organization & { organization_members: OrganizationMember[] })[]
  }

  // Create a new organization
  static async createOrganization(organizationData: CreateOrganizationData, userId: string) {
    const { data: org, error: orgError } = await (supabase as any)
      .from('organizations')
      .insert({
        name: organizationData.name,
        description: organizationData.description,
      })
      .select()
      .single()

    if (orgError) {
      throw new Error(`Failed to create organization: ${orgError.message}`)
    }

    // Add the creator as owner
    const { error: memberError } = await (supabase as any)
      .from('organization_members')
      .insert({
        organization_id: org.id,
        user_id: userId,
        role: 'owner',
      })

    if (memberError) {
      throw new Error(`Failed to add organization member: ${memberError.message}`)
    }

    return org as Organization
  }

  // Add member to organization
  static async addMember(organizationId: string, userId: string, role: 'admin' | 'member' = 'member') {
    const { data, error } = await (supabase as any)
      .from('organization_members')
      .insert({
        organization_id: organizationId,
        user_id: userId,
        role,
      })
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to add member: ${error.message}`)
    }

    return data as OrganizationMember
  }

  // Remove member from organization
  static async removeMember(organizationId: string, userId: string) {
    const { error } = await (supabase as any)
      .from('organization_members')
      .delete()
      .eq('organization_id', organizationId)
      .eq('user_id', userId)

    if (error) {
      throw new Error(`Failed to remove member: ${error.message}`)
    }

    return true
  }

  // Get organization members
  static async getOrganizationMembers(organizationId: string) {
    const { data, error } = await (supabase as any)
      .from('organization_members')
      .select('*')
      .eq('organization_id', organizationId)
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error(`Failed to fetch members: ${error.message}`)
    }

    return data as unknown as OrganizationMember[]
  }
}

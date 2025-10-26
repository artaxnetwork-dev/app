import { OrganizationService } from '@/lib/services/organizationService'
import { supabase } from '@/lib/supabase'
import { OrganizationRole } from '@/lib/types'

// Mock the supabase client
jest.mock('@/lib/supabase', () => ({
  supabase: {
    from: jest.fn(),
  },
}))

const mockSupabase = supabase as jest.Mocked<typeof supabase>

describe('OrganizationService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getOrganizations', () => {
    it('should fetch organizations for a user', async () => {
      const mockOrganizations = [
        {
          id: '1',
          name: 'Test Organization',
          description: 'A test organization',
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        },
      ]

      const mockQuery = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        order: jest.fn().mockResolvedValue({ data: mockOrganizations, error: null }),
      }

      mockSupabase.from.mockReturnValue(mockQuery as any)

      const result = await OrganizationService.getOrganizations('user-1')

      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('Test Organization')
      expect(mockSupabase.from).toHaveBeenCalledWith('organizations')
    })

    it('should throw error when fetch fails', async () => {
      const mockQuery = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        order: jest.fn().mockResolvedValue({ data: null, error: { message: 'Database error' } }),
      }

      mockSupabase.from.mockReturnValue(mockQuery as any)

      await expect(OrganizationService.getOrganizations('user-1')).rejects.toThrow('Failed to fetch organizations: Database error')
    })
  })

  describe('getOrganization', () => {
    it('should fetch a single organization by ID', async () => {
      const mockOrganization = {
        id: '1',
        name: 'Test Organization',
        description: 'A test organization',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      }

      const mockQuery = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: mockOrganization, error: null }),
      }

      mockSupabase.from.mockReturnValue(mockQuery as any)

      const result = await OrganizationService.getOrganization('1', 'user-1')

      expect(result.id).toBe('1')
      expect(result.name).toBe('Test Organization')
    })

    it('should throw error when organization not found', async () => {
      const mockQuery = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: null, error: { message: 'Not found' } }),
      }

      mockSupabase.from.mockReturnValue(mockQuery as any)

      await expect(OrganizationService.getOrganization('1', 'user-1')).rejects.toThrow('Failed to fetch organization: Not found')
    })
  })

  describe('createOrganization', () => {
    it('should create a new organization and add creator as owner', async () => {
      const organizationData = {
        name: 'New Organization',
        description: 'A new organization',
      }

      const mockCreatedOrg = {
        id: '1',
        ...organizationData,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      }

      const mockOrgQuery = {
        insert: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: mockCreatedOrg, error: null }),
      }

      const mockMemberQuery = {
        insert: jest.fn().mockResolvedValue({ error: null }),
      }

      mockSupabase.from
        .mockReturnValueOnce(mockOrgQuery as any)
        .mockReturnValueOnce(mockMemberQuery as any)

      const result = await OrganizationService.createOrganization(organizationData, 'user-1')

      expect(result.name).toBe('New Organization')
      expect(mockOrgQuery.insert).toHaveBeenCalledWith({
        name: 'New Organization',
        description: 'A new organization',
      })
      expect(mockMemberQuery.insert).toHaveBeenCalledWith({
        organization_id: '1',
        user_id: 'user-1',
        role: 'owner',
      })
    })

    it('should throw error when organization creation fails', async () => {
      const organizationData = {
        name: 'New Organization',
        description: 'A new organization',
      }

      const mockQuery = {
        insert: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: null, error: { message: 'Creation failed' } }),
      }

      mockSupabase.from.mockReturnValue(mockQuery as any)

      await expect(OrganizationService.createOrganization(organizationData, 'user-1')).rejects.toThrow('Failed to create organization: Creation failed')
    })

    it('should throw error when member creation fails', async () => {
      const organizationData = {
        name: 'New Organization',
        description: 'A new organization',
      }

      const mockCreatedOrg = {
        id: '1',
        ...organizationData,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      }

      const mockOrgQuery = {
        insert: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: mockCreatedOrg, error: null }),
      }

      const mockMemberQuery = {
        insert: jest.fn().mockResolvedValue({ error: { message: 'Member creation failed' } }),
      }

      mockSupabase.from
        .mockReturnValueOnce(mockOrgQuery as any)
        .mockReturnValueOnce(mockMemberQuery as any)

      await expect(OrganizationService.createOrganization(organizationData, 'user-1')).rejects.toThrow('Failed to add creator as owner: Member creation failed')
    })
  })

  describe('updateOrganization', () => {
    it('should update an existing organization', async () => {
      const updates = {
        name: 'Updated Organization',
        description: 'An updated organization',
      }

      const mockUpdatedOrganization = {
        id: '1',
        ...updates,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      }

      const mockQuery = {
        update: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: mockUpdatedOrganization, error: null }),
      }

      mockSupabase.from.mockReturnValue(mockQuery as any)

      const result = await OrganizationService.updateOrganization('1', updates, 'user-1')

      expect(result.name).toBe('Updated Organization')
      expect(mockQuery.update).toHaveBeenCalledWith({
        ...updates,
        updated_at: expect.any(String),
      })
    })

    it('should throw error when update fails', async () => {
      const updates = { name: 'Updated Organization' }

      const mockQuery = {
        update: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: null, error: { message: 'Update failed' } }),
      }

      mockSupabase.from.mockReturnValue(mockQuery as any)

      await expect(OrganizationService.updateOrganization('1', updates, 'user-1')).rejects.toThrow('Failed to update organization: Update failed')
    })
  })

  describe('deleteOrganization', () => {
    it('should delete an organization', async () => {
      const mockQuery = {
        delete: jest.fn().mockReturnThis(),
        eq: jest.fn().mockResolvedValue({ error: null }),
      }

      mockSupabase.from.mockReturnValue(mockQuery as any)

      const result = await OrganizationService.deleteOrganization('1', 'user-1')

      expect(result).toBe(true)
      expect(mockQuery.delete).toHaveBeenCalled()
      expect(mockQuery.eq).toHaveBeenCalledWith('id', '1')
    })

    it('should throw error when deletion fails', async () => {
      const mockQuery = {
        delete: jest.fn().mockReturnThis(),
        eq: jest.fn().mockResolvedValue({ error: { message: 'Delete failed' } }),
      }

      mockSupabase.from.mockReturnValue(mockQuery as any)

      await expect(OrganizationService.deleteOrganization('1', 'user-1')).rejects.toThrow('Failed to delete organization: Delete failed')
    })
  })

  describe('getOrganizationMembers', () => {
    it('should fetch organization members', async () => {
      const mockMembers = [
        {
          id: '1',
          organization_id: 'org-1',
          user_id: 'user-1',
          role: 'owner',
          created_at: '2024-01-01T00:00:00Z',
        },
        {
          id: '2',
          organization_id: 'org-1',
          user_id: 'user-2',
          role: 'member',
          created_at: '2024-01-01T00:00:00Z',
        },
      ]

      const mockQuery = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        order: jest.fn().mockResolvedValue({ data: mockMembers, error: null }),
      }

      mockSupabase.from.mockReturnValue(mockQuery as any)

      const result = await OrganizationService.getOrganizationMembers('org-1')

      expect(result).toHaveLength(2)
      expect(result[0].role).toBe('owner')
      expect(result[1].role).toBe('member')
    })

    it('should throw error when fetch fails', async () => {
      const mockQuery = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        order: jest.fn().mockResolvedValue({ data: null, error: { message: 'Fetch failed' } }),
      }

      mockSupabase.from.mockReturnValue(mockQuery as any)

      await expect(OrganizationService.getOrganizationMembers('org-1')).rejects.toThrow('Failed to fetch organization members: Fetch failed')
    })
  })

  describe('addMember', () => {
    it('should add a member to organization', async () => {
      const mockMember = {
        id: '1',
        organization_id: 'org-1',
        user_id: 'user-2',
        role: 'member',
        created_at: '2024-01-01T00:00:00Z',
      }

      const mockQuery = {
        insert: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: mockMember, error: null }),
      }

      mockSupabase.from.mockReturnValue(mockQuery as any)

      const result = await OrganizationService.addMember('org-1', 'user-2', OrganizationRole.MEMBER)

      expect(result.role).toBe('member')
      expect(mockQuery.insert).toHaveBeenCalledWith({
        organization_id: 'org-1',
        user_id: 'user-2',
        role: 'member',
      })
    })

    it('should throw error when member addition fails', async () => {
      const mockQuery = {
        insert: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: null, error: { message: 'Addition failed' } }),
      }

      mockSupabase.from.mockReturnValue(mockQuery as any)

      await expect(OrganizationService.addMember('org-1', 'user-2', OrganizationRole.MEMBER)).rejects.toThrow('Failed to add member: Addition failed')
    })
  })

  describe('updateMemberRole', () => {
    it('should update member role', async () => {
      const mockUpdatedMember = {
        id: '1',
        organization_id: 'org-1',
        user_id: 'user-2',
        role: 'admin',
        created_at: '2024-01-01T00:00:00Z',
      }

      const mockQuery = {
        update: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: mockUpdatedMember, error: null }),
      }

      mockSupabase.from.mockReturnValue(mockQuery as any)

      const result = await OrganizationService.updateMemberRole('org-1', 'user-2', OrganizationRole.ADMIN)

      expect(result.role).toBe('admin')
      expect(mockQuery.update).toHaveBeenCalledWith({
        role: 'admin',
      })
    })

    it('should throw error when role update fails', async () => {
      const mockQuery = {
        update: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: null, error: { message: 'Update failed' } }),
      }

      mockSupabase.from.mockReturnValue(mockQuery as any)

      await expect(OrganizationService.updateMemberRole('org-1', 'user-2', OrganizationRole.ADMIN)).rejects.toThrow('Failed to update member role: Update failed')
    })
  })

  describe('removeMember', () => {
    it('should remove a member from organization', async () => {
      const mockQuery = {
        delete: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
      }

      mockSupabase.from.mockReturnValue(mockQuery as any)

      mockQuery.eq.mockResolvedValue({ error: null })

      const result = await OrganizationService.removeMember('org-1', 'user-2')

      expect(result).toBe(true)
      expect(mockQuery.delete).toHaveBeenCalled()
      expect(mockQuery.eq).toHaveBeenCalledWith('organization_id', 'org-1')
      expect(mockQuery.eq).toHaveBeenCalledWith('user_id', 'user-2')
    })

    it('should throw error when member removal fails', async () => {
      const mockQuery = {
        delete: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
      }

      mockSupabase.from.mockReturnValue(mockQuery as any)

      mockQuery.eq.mockResolvedValue({ error: { message: 'Removal failed' } })

      await expect(OrganizationService.removeMember('org-1', 'user-2')).rejects.toThrow('Failed to remove member: Removal failed')
    })
  })
})

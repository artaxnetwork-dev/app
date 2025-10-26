import { WorkflowService } from '@/lib/services/workflowService'
import { supabase } from '@/lib/supabase'
import { WorkflowStatus, WorkflowStepType, WorkflowTriggerType } from '@/lib/types'

// Mock the supabase client
jest.mock('@/lib/supabase', () => ({
  supabase: {
    from: jest.fn(),
  },
}))

const mockSupabase = supabase as jest.Mocked<typeof supabase>

describe('WorkflowService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getWorkflows', () => {
    it('should fetch workflows for a user', async () => {
      const mockWorkflows = [
        {
          id: '1',
          name: 'Test Workflow',
          description: 'A test workflow',
          status: 'draft',
          steps: [],
          triggers: [],
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
          user_id: 'user-1',
          organization_id: null,
          is_public: false,
          tags: [],
          version: 1,
          last_run_at: null,
          run_count: 0,
          success_rate: 0,
        },
      ]

      const mockQuery = {
        eq: jest.fn().mockReturnThis(),
        order: jest.fn().mockResolvedValue({ data: mockWorkflows, error: null }),
      }

      mockSupabase.from.mockReturnValue({
        select: jest.fn().mockReturnValue(mockQuery),
      } as any)

      const result = await WorkflowService.getWorkflows('user-1')

      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('Test Workflow')
      expect(mockSupabase.from).toHaveBeenCalledWith('workflows')
    })

    it('should fetch workflows for a user with organization filter', async () => {
      const mockQuery = {
        eq: jest.fn().mockReturnThis(),
        order: jest.fn().mockResolvedValue({ data: [], error: null }),
      }

      mockSupabase.from.mockReturnValue({
        select: jest.fn().mockReturnValue(mockQuery),
      } as any)

      await WorkflowService.getWorkflows('user-1', 'org-1')

      expect(mockQuery.eq).toHaveBeenCalledWith('user_id', 'user-1')
      expect(mockQuery.eq).toHaveBeenCalledWith('organization_id', 'org-1')
    })

    it('should throw error when fetch fails', async () => {
      const mockQuery = {
        eq: jest.fn().mockReturnThis(),
        order: jest.fn().mockResolvedValue({ data: null, error: { message: 'Database error' } }),
      }

      mockSupabase.from.mockReturnValue({
        select: jest.fn().mockReturnValue(mockQuery),
      } as any)

      await expect(WorkflowService.getWorkflows('user-1')).rejects.toThrow('Failed to fetch workflows: Database error')
    })
  })

  describe('getWorkflow', () => {
    it('should fetch a single workflow by ID', async () => {
      const mockWorkflow = {
        id: '1',
        name: 'Test Workflow',
        description: 'A test workflow',
        status: 'draft',
        steps: [],
        triggers: [],
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
        user_id: 'user-1',
        organization_id: null,
        is_public: false,
        tags: [],
        version: 1,
        last_run_at: null,
        run_count: 0,
        success_rate: 0,
      }

      const mockQuery = {
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: mockWorkflow, error: null }),
      }

      mockSupabase.from.mockReturnValue({
        select: jest.fn().mockReturnValue(mockQuery),
      } as any)

      const result = await WorkflowService.getWorkflow('1', 'user-1')

      expect(result.id).toBe('1')
      expect(result.name).toBe('Test Workflow')
      expect(mockQuery.eq).toHaveBeenCalledWith('id', '1')
      expect(mockQuery.eq).toHaveBeenCalledWith('user_id', 'user-1')
    })

    it('should throw error when workflow not found', async () => {
      const mockQuery = {
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: null, error: { message: 'Not found' } }),
      }

      mockSupabase.from.mockReturnValue({
        select: jest.fn().mockReturnValue(mockQuery),
      } as any)

      await expect(WorkflowService.getWorkflow('1', 'user-1')).rejects.toThrow('Failed to fetch workflow: Not found')
    })
  })

  describe('createWorkflow', () => {
    it('should create a new workflow', async () => {
      const workflowData = {
        name: 'New Workflow',
        description: 'A new workflow',
        steps: [
          {
            id: 'step-1',
            type: WorkflowStepType.ACTION,
            name: 'Test Step',
            config: {},
            order: 1,
            is_required: true,
          },
        ],
        triggers: [
          {
            id: 'trigger-1',
            type: WorkflowTriggerType.WEBHOOK,
            name: 'Test Trigger',
            config: {},
            is_active: true,
          },
        ],
        is_public: false,
        tags: ['test'],
      }

      const mockCreatedWorkflow = {
        id: '1',
        ...workflowData,
        status: 'draft',
        version: 1,
        run_count: 0,
        success_rate: 0,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
        user_id: 'user-1',
        organization_id: null,
        last_run_at: null,
      }

      const mockQuery = {
        insert: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: mockCreatedWorkflow, error: null }),
      }

      mockSupabase.from.mockReturnValue({
        select: jest.fn().mockReturnValue(mockQuery),
      } as any)

      const result = await WorkflowService.createWorkflow(workflowData, 'user-1')

      expect(result.name).toBe('New Workflow')
      expect(result.status).toBe('draft')
      expect(result.user_id).toBe('user-1')
      expect(mockQuery.insert).toHaveBeenCalled()
    })

    it('should throw error when creation fails', async () => {
      const workflowData = {
        name: 'New Workflow',
        description: 'A new workflow',
        steps: [],
        triggers: [],
      }

      const mockQuery = {
        insert: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: null, error: { message: 'Creation failed' } }),
      }

      mockSupabase.from.mockReturnValue({
        select: jest.fn().mockReturnValue(mockQuery),
      } as any)

      await expect(WorkflowService.createWorkflow(workflowData, 'user-1')).rejects.toThrow('Failed to create workflow: Creation failed')
    })
  })

  describe('updateWorkflow', () => {
    it('should update an existing workflow', async () => {
      const updates = {
        name: 'Updated Workflow',
        status: WorkflowStatus.ACTIVE,
      }

      const mockUpdatedWorkflow = {
        id: '1',
        name: 'Updated Workflow',
        description: 'A test workflow',
        status: 'active',
        steps: [],
        triggers: [],
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
        user_id: 'user-1',
        organization_id: null,
        is_public: false,
        tags: [],
        version: 1,
        last_run_at: null,
        run_count: 0,
        success_rate: 0,
      }

      const mockQuery = {
        update: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: mockUpdatedWorkflow, error: null }),
      }

      mockSupabase.from.mockReturnValue({
        select: jest.fn().mockReturnValue(mockQuery),
      } as any)

      const result = await WorkflowService.updateWorkflow('1', updates, 'user-1')

      expect(result.name).toBe('Updated Workflow')
      expect(result.status).toBe('active')
      expect(mockQuery.update).toHaveBeenCalled()
    })

    it('should throw error when update fails', async () => {
      const updates = { name: 'Updated Workflow' }

      const mockQuery = {
        update: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: null, error: { message: 'Update failed' } }),
      }

      mockSupabase.from.mockReturnValue({
        select: jest.fn().mockReturnValue(mockQuery),
      } as any)

      await expect(WorkflowService.updateWorkflow('1', updates, 'user-1')).rejects.toThrow('Failed to update workflow: Update failed')
    })
  })

  describe('deleteWorkflow', () => {
    it('should delete a workflow', async () => {
      const mockQuery = {
        delete: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
      }

      mockSupabase.from.mockReturnValue({
        select: jest.fn().mockReturnValue(mockQuery),
      } as any)

      mockQuery.eq.mockResolvedValue({ error: null })

      const result = await WorkflowService.deleteWorkflow('1', 'user-1')

      expect(result).toBe(true)
      expect(mockQuery.delete).toHaveBeenCalled()
      expect(mockQuery.eq).toHaveBeenCalledWith('id', '1')
      expect(mockQuery.eq).toHaveBeenCalledWith('user_id', 'user-1')
    })

    it('should throw error when deletion fails', async () => {
      const mockQuery = {
        delete: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
      }

      mockSupabase.from.mockReturnValue({
        select: jest.fn().mockReturnValue(mockQuery),
      } as any)

      mockQuery.eq.mockResolvedValue({ error: { message: 'Delete failed' } })

      await expect(WorkflowService.deleteWorkflow('1', 'user-1')).rejects.toThrow('Failed to delete workflow: Delete failed')
    })
  })

  describe('getPublicWorkflows', () => {
    it('should fetch public workflows', async () => {
      const mockPublicWorkflows = [
        {
          id: '1',
          name: 'Public Workflow',
          description: 'A public workflow',
          status: 'active',
          steps: [],
          triggers: [],
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
          user_id: 'user-1',
          organization_id: null,
          is_public: true,
          tags: [],
          version: 1,
          last_run_at: null,
          run_count: 0,
          success_rate: 0,
        },
      ]

      const mockQuery = {
        eq: jest.fn().mockReturnThis(),
        order: jest.fn().mockReturnThis(),
        range: jest.fn().mockResolvedValue({ data: mockPublicWorkflows, error: null }),
      }

      mockSupabase.from.mockReturnValue({
        select: jest.fn().mockReturnValue(mockQuery),
      } as any)

      const result = await WorkflowService.getPublicWorkflows(20, 0)

      expect(result).toHaveLength(1)
      expect(result[0].is_public).toBe(true)
      expect(result[0].status).toBe('active')
      expect(mockQuery.eq).toHaveBeenCalledWith('is_public', true)
      expect(mockQuery.eq).toHaveBeenCalledWith('status', 'active')
    })

    it('should throw error when fetch fails', async () => {
      const mockQuery = {
        eq: jest.fn().mockReturnThis(),
        order: jest.fn().mockReturnThis(),
        range: jest.fn().mockResolvedValue({ data: null, error: { message: 'Fetch failed' } }),
      }

      mockSupabase.from.mockReturnValue({
        select: jest.fn().mockReturnValue(mockQuery),
      } as any)

      await expect(WorkflowService.getPublicWorkflows()).rejects.toThrow('Failed to fetch public workflows: Fetch failed')
    })
  })

  describe('searchWorkflows', () => {
    it('should search workflows by name, description, and tags', async () => {
      const mockWorkflows = [
        {
          id: '1',
          name: 'Email Automation',
          description: 'Automates email sending',
          status: 'active',
          steps: [],
          triggers: [],
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
          user_id: 'user-1',
          organization_id: null,
          is_public: false,
          tags: ['email', 'automation'],
          version: 1,
          last_run_at: null,
          run_count: 0,
          success_rate: 0,
        },
        {
          id: '2',
          name: 'Data Processing',
          description: 'Processes data files',
          status: 'draft',
          steps: [],
          triggers: [],
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
          user_id: 'user-1',
          organization_id: null,
          is_public: false,
          tags: ['data'],
          version: 1,
          last_run_at: null,
          run_count: 0,
          success_rate: 0,
        },
      ]

      const mockQuery = {
        eq: jest.fn().mockReturnThis(),
      }

      mockSupabase.from.mockReturnValue({
        select: jest.fn().mockReturnValue(mockQuery),
      } as any)

      mockQuery.eq.mockResolvedValue({ data: mockWorkflows, error: null })

      const result = await WorkflowService.searchWorkflows('email', 'user-1')

      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('Email Automation')
    })

    it('should return empty array when no matches found', async () => {
      const mockQuery = {
        eq: jest.fn().mockReturnThis(),
      }

      mockSupabase.from.mockReturnValue({
        select: jest.fn().mockReturnValue(mockQuery),
      } as any)

      mockQuery.eq.mockResolvedValue({ data: [], error: null })

      const result = await WorkflowService.searchWorkflows('nonexistent', 'user-1')

      expect(result).toHaveLength(0)
    })

    it('should throw error when base query fails', async () => {
      const mockQuery = {
        eq: jest.fn().mockReturnThis(),
      }

      mockSupabase.from.mockReturnValue({
        select: jest.fn().mockReturnValue(mockQuery),
      } as any)

      mockQuery.eq.mockResolvedValue({ data: null, error: { message: 'Base query failed' } })

      await expect(WorkflowService.searchWorkflows('test', 'user-1')).rejects.toThrow('Failed to fetch workflows: Base query failed')
    })
  })

  describe('updateRunStats', () => {
    it('should update workflow run statistics', async () => {
      const mockWorkflow = {
        run_count: 5,
        success_rate: 0.8,
      }

      const mockFetchQuery = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: mockWorkflow, error: null }),
      }

      const mockUpdateQuery = {
        update: jest.fn().mockReturnThis(),
        eq: jest.fn().mockResolvedValue({ error: null }),
      }

      mockSupabase.from
        .mockReturnValueOnce({
          select: jest.fn().mockReturnValue(mockFetchQuery),
        } as any)
        .mockReturnValueOnce({
          update: jest.fn().mockReturnValue(mockUpdateQuery),
        } as any)

      const result = await WorkflowService.updateRunStats('1', true)

      expect(result).toBe(true)
      expect(mockUpdateQuery.update).toHaveBeenCalledWith({
        run_count: 6,
        success_rate: expect.any(Number),
        last_run_at: expect.any(String),
        updated_at: expect.any(String),
      })
    })

    it('should throw error when fetch fails', async () => {
      const mockQuery = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: null, error: { message: 'Fetch failed' } }),
      }

      mockSupabase.from.mockReturnValue({
        select: jest.fn().mockReturnValue(mockQuery),
      } as any)

      await expect(WorkflowService.updateRunStats('1', true)).rejects.toThrow('Failed to fetch workflow stats: Fetch failed')
    })

    it('should throw error when update fails', async () => {
      const mockWorkflow = {
        run_count: 5,
        success_rate: 0.8,
      }

      const mockFetchQuery = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: mockWorkflow, error: null }),
      }

      const mockUpdateQuery = {
        update: jest.fn().mockReturnThis(),
        eq: jest.fn().mockResolvedValue({ error: { message: 'Update failed' } }),
      }

      mockSupabase.from
        .mockReturnValueOnce({
          select: jest.fn().mockReturnValue(mockFetchQuery),
        } as any)
        .mockReturnValueOnce({
          update: jest.fn().mockReturnValue(mockUpdateQuery),
        } as any)

      await expect(WorkflowService.updateRunStats('1', true)).rejects.toThrow('Failed to update workflow stats: Update failed')
    })
  })
})

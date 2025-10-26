import { renderHook, act, waitFor } from '@testing-library/react'
import { useWorkflows, useWorkflow } from '@/lib/hooks/useWorkflows'
import { WorkflowService } from '@/lib/services/workflowService'
import { WorkflowStatus, WorkflowStepType, WorkflowTriggerType } from '@/lib/types'

// Mock the WorkflowService
jest.mock('@/lib/services/workflowService', () => ({
  WorkflowService: {
    getWorkflows: jest.fn(),
    getWorkflow: jest.fn(),
    createWorkflow: jest.fn(),
    updateWorkflow: jest.fn(),
    deleteWorkflow: jest.fn(),
    searchWorkflows: jest.fn(),
  },
}))

const mockWorkflowService = WorkflowService as jest.Mocked<typeof WorkflowService>

describe('useWorkflows', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('initial state', () => {
    it('should have correct initial state', () => {
      mockWorkflowService.getWorkflows.mockResolvedValue([])

      const { result } = renderHook(() => useWorkflows('user-1'))

      expect(result.current.workflows).toEqual([])
      expect(result.current.loading).toBe(true)
      expect(result.current.error).toBe(null)
      expect(result.current.isSearching).toBe(false)
    })
  })

  describe('loadWorkflows', () => {
    it('should load workflows successfully', async () => {
      const mockWorkflows = [
        {
          id: '1',
          name: 'Test Workflow',
          description: 'A test workflow',
          status: WorkflowStatus.DRAFT,
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

      mockWorkflowService.getWorkflows.mockResolvedValue(mockWorkflows)

      const { result } = renderHook(() => useWorkflows('user-1'))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.workflows).toEqual(mockWorkflows)
      expect(result.current.error).toBe(null)
      expect(mockWorkflowService.getWorkflows).toHaveBeenCalledWith('user-1', undefined)
    })

    it('should handle loading error', async () => {
      const errorMessage = 'Failed to load workflows'
      mockWorkflowService.getWorkflows.mockRejectedValue(new Error(errorMessage))

      const { result } = renderHook(() => useWorkflows('user-1'))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.workflows).toEqual([])
      expect(result.current.error).toBe(errorMessage)
    })

    it('should load workflows with organization filter', async () => {
      mockWorkflowService.getWorkflows.mockResolvedValue([])

      renderHook(() => useWorkflows('user-1', 'org-1'))

      await waitFor(() => {
        expect(mockWorkflowService.getWorkflows).toHaveBeenCalledWith('user-1', 'org-1')
      })
    })
  })

  describe('createWorkflow', () => {
    it('should create workflow successfully', async () => {
      const mockWorkflow = {
        id: '1',
        name: 'New Workflow',
        description: 'A new workflow',
        status: WorkflowStatus.DRAFT,
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

      mockWorkflowService.getWorkflows.mockResolvedValue([])
      mockWorkflowService.createWorkflow.mockResolvedValue(mockWorkflow)

      const { result } = renderHook(() => useWorkflows('user-1'))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      const workflowData = {
        name: 'New Workflow',
        description: 'A new workflow',
        steps: [],
        triggers: [],
      }

      await act(async () => {
        await result.current.createWorkflow(workflowData)
      })

      expect(result.current.workflows).toContain(mockWorkflow)
      expect(mockWorkflowService.createWorkflow).toHaveBeenCalledWith(workflowData, 'user-1')
    })

    it('should handle create workflow error', async () => {
      const errorMessage = 'Failed to create workflow'
      mockWorkflowService.getWorkflows.mockResolvedValue([])
      mockWorkflowService.createWorkflow.mockRejectedValue(new Error(errorMessage))

      const { result } = renderHook(() => useWorkflows('user-1'))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      const workflowData = {
        name: 'New Workflow',
        description: 'A new workflow',
        steps: [],
        triggers: [],
      }

      await act(async () => {
        try {
          await result.current.createWorkflow(workflowData)
        } catch (error) {
          // Expected to throw
        }
      })

      expect(result.current.error).toBe(errorMessage)
    })
  })

  describe('updateWorkflow', () => {
    it('should update workflow successfully', async () => {
      const existingWorkflow = {
        id: '1',
        name: 'Old Workflow',
        description: 'An old workflow',
        status: WorkflowStatus.DRAFT,
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

      const updatedWorkflow = {
        ...existingWorkflow,
        name: 'Updated Workflow',
        status: WorkflowStatus.ACTIVE,
      }

      mockWorkflowService.getWorkflows.mockResolvedValue([existingWorkflow])
      mockWorkflowService.updateWorkflow.mockResolvedValue(updatedWorkflow)

      const { result } = renderHook(() => useWorkflows('user-1'))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      const updates = {
        name: 'Updated Workflow',
        status: WorkflowStatus.ACTIVE,
      }

      await act(async () => {
        await result.current.updateWorkflow('1', updates)
      })

      expect(result.current.workflows[0]).toEqual(updatedWorkflow)
      expect(mockWorkflowService.updateWorkflow).toHaveBeenCalledWith('1', updates, 'user-1')
    })

    it('should handle update workflow error', async () => {
      const errorMessage = 'Failed to update workflow'
      mockWorkflowService.getWorkflows.mockResolvedValue([])
      mockWorkflowService.updateWorkflow.mockRejectedValue(new Error(errorMessage))

      const { result } = renderHook(() => useWorkflows('user-1'))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      const updates = { name: 'Updated Workflow' }

      await act(async () => {
        try {
          await result.current.updateWorkflow('1', updates)
        } catch (error) {
          // Expected to throw
        }
      })

      expect(result.current.error).toBe(errorMessage)
    })
  })

  describe('deleteWorkflow', () => {
    it('should delete workflow successfully', async () => {
      const mockWorkflows = [
        {
          id: '1',
          name: 'Test Workflow',
          description: 'A test workflow',
          status: WorkflowStatus.DRAFT,
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

      mockWorkflowService.getWorkflows.mockResolvedValue(mockWorkflows)
      mockWorkflowService.deleteWorkflow.mockResolvedValue(true)

      const { result } = renderHook(() => useWorkflows('user-1'))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      await act(async () => {
        await result.current.deleteWorkflow('1')
      })

      expect(result.current.workflows).toHaveLength(0)
      expect(mockWorkflowService.deleteWorkflow).toHaveBeenCalledWith('1', 'user-1')
    })

    it('should handle delete workflow error', async () => {
      const errorMessage = 'Failed to delete workflow'
      mockWorkflowService.getWorkflows.mockResolvedValue([])
      mockWorkflowService.deleteWorkflow.mockRejectedValue(new Error(errorMessage))

      const { result } = renderHook(() => useWorkflows('user-1'))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      await act(async () => {
        try {
          await result.current.deleteWorkflow('1')
        } catch (error) {
          // Expected to throw
        }
      })

      expect(result.current.error).toBe(errorMessage)
    })
  })

  describe('searchWorkflows', () => {
    it('should search workflows successfully', async () => {
      const mockSearchResults = [
        {
          id: '1',
          name: 'Email Workflow',
          description: 'An email workflow',
          status: WorkflowStatus.ACTIVE,
          steps: [],
          triggers: [],
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
          user_id: 'user-1',
          organization_id: null,
          is_public: false,
          tags: ['email'],
          version: 1,
          last_run_at: null,
          run_count: 0,
          success_rate: 0,
        },
      ]

      mockWorkflowService.getWorkflows.mockResolvedValue([])
      mockWorkflowService.searchWorkflows.mockResolvedValue(mockSearchResults)

      const { result } = renderHook(() => useWorkflows('user-1'))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      await act(async () => {
        await result.current.searchWorkflows('email')
      })

      expect(result.current.workflows).toEqual(mockSearchResults)
      expect(result.current.isSearching).toBe(true)
      expect(mockWorkflowService.searchWorkflows).toHaveBeenCalledWith('email', 'user-1', undefined)
    })

    it('should handle search error', async () => {
      const errorMessage = 'Failed to search workflows'
      mockWorkflowService.getWorkflows.mockResolvedValue([])
      mockWorkflowService.searchWorkflows.mockRejectedValue(new Error(errorMessage))

      const { result } = renderHook(() => useWorkflows('user-1'))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      await act(async () => {
        await result.current.searchWorkflows('email')
      })

      expect(result.current.error).toBe(errorMessage)
    })
  })

  describe('clearSearch', () => {
    it('should clear search and restore all workflows', async () => {
      const allWorkflows = [
        {
          id: '1',
          name: 'Workflow 1',
          description: 'First workflow',
          status: WorkflowStatus.DRAFT,
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
        {
          id: '2',
          name: 'Workflow 2',
          description: 'Second workflow',
          status: WorkflowStatus.ACTIVE,
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

      const searchResults = [allWorkflows[0]]

      mockWorkflowService.getWorkflows.mockResolvedValue(allWorkflows)
      mockWorkflowService.searchWorkflows.mockResolvedValue(searchResults)

      const { result } = renderHook(() => useWorkflows('user-1'))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      // Perform search
      await act(async () => {
        await result.current.searchWorkflows('workflow 1')
      })

      expect(result.current.workflows).toEqual(searchResults)
      expect(result.current.isSearching).toBe(true)

      // Clear search
      act(() => {
        result.current.clearSearch()
      })

      expect(result.current.workflows).toEqual(allWorkflows)
      expect(result.current.isSearching).toBe(false)
    })
  })

  describe('refresh', () => {
    it('should refresh workflows', async () => {
      const mockWorkflows = [
        {
          id: '1',
          name: 'Test Workflow',
          description: 'A test workflow',
          status: WorkflowStatus.DRAFT,
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

      mockWorkflowService.getWorkflows.mockResolvedValue(mockWorkflows)

      const { result } = renderHook(() => useWorkflows('user-1'))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      // Clear the mock to verify it's called again
      mockWorkflowService.getWorkflows.mockClear()
      mockWorkflowService.getWorkflows.mockResolvedValue(mockWorkflows)

      await act(async () => {
        await result.current.refresh()
      })

      expect(mockWorkflowService.getWorkflows).toHaveBeenCalledTimes(1)
    })
  })
})

describe('useWorkflow', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('initial state', () => {
    it('should have correct initial state', () => {
      mockWorkflowService.getWorkflow.mockResolvedValue(null as any)

      const { result } = renderHook(() => useWorkflow('1', 'user-1'))

      expect(result.current.workflow).toBe(null)
      expect(result.current.loading).toBe(true)
      expect(result.current.error).toBe(null)
    })
  })

  describe('loadWorkflow', () => {
    it('should load workflow successfully', async () => {
      const mockWorkflow = {
        id: '1',
        name: 'Test Workflow',
        description: 'A test workflow',
        status: WorkflowStatus.DRAFT,
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

      mockWorkflowService.getWorkflow.mockResolvedValue(mockWorkflow)

      const { result } = renderHook(() => useWorkflow('1', 'user-1'))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.workflow).toEqual(mockWorkflow)
      expect(result.current.error).toBe(null)
      expect(mockWorkflowService.getWorkflow).toHaveBeenCalledWith('1', 'user-1')
    })

    it('should handle loading error', async () => {
      const errorMessage = 'Failed to load workflow'
      mockWorkflowService.getWorkflow.mockRejectedValue(new Error(errorMessage))

      const { result } = renderHook(() => useWorkflow('1', 'user-1'))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.workflow).toBe(null)
      expect(result.current.error).toBe(errorMessage)
    })
  })

  describe('updateWorkflow', () => {
    it('should update workflow successfully', async () => {
      const existingWorkflow = {
        id: '1',
        name: 'Old Workflow',
        description: 'An old workflow',
        status: WorkflowStatus.DRAFT,
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

      const updatedWorkflow = {
        ...existingWorkflow,
        name: 'Updated Workflow',
        status: WorkflowStatus.ACTIVE,
      }

      mockWorkflowService.getWorkflow.mockResolvedValue(existingWorkflow)
      mockWorkflowService.updateWorkflow.mockResolvedValue(updatedWorkflow)

      const { result } = renderHook(() => useWorkflow('1', 'user-1'))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      const updates = {
        name: 'Updated Workflow',
        status: WorkflowStatus.ACTIVE,
      }

      await act(async () => {
        await result.current.updateWorkflow(updates)
      })

      expect(result.current.workflow).toEqual(updatedWorkflow)
      expect(mockWorkflowService.updateWorkflow).toHaveBeenCalledWith('1', updates, 'user-1')
    })

    it('should handle update error', async () => {
      const errorMessage = 'Failed to update workflow'
      mockWorkflowService.getWorkflow.mockResolvedValue(null as any)
      mockWorkflowService.updateWorkflow.mockRejectedValue(new Error(errorMessage))

      const { result } = renderHook(() => useWorkflow('1', 'user-1'))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      const updates = { name: 'Updated Workflow' }

      await act(async () => {
        try {
          await result.current.updateWorkflow(updates)
        } catch (error) {
          // Expected to throw
        }
      })

      expect(result.current.error).toBe(errorMessage)
    })
  })

  describe('deleteWorkflow', () => {
    it('should delete workflow successfully', async () => {
      const mockWorkflow = {
        id: '1',
        name: 'Test Workflow',
        description: 'A test workflow',
        status: WorkflowStatus.DRAFT,
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

      mockWorkflowService.getWorkflow.mockResolvedValue(mockWorkflow)
      mockWorkflowService.deleteWorkflow.mockResolvedValue(true)

      const { result } = renderHook(() => useWorkflow('1', 'user-1'))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      await act(async () => {
        await result.current.deleteWorkflow()
      })

      expect(result.current.workflow).toBe(null)
      expect(mockWorkflowService.deleteWorkflow).toHaveBeenCalledWith('1', 'user-1')
    })

    it('should handle delete error', async () => {
      const errorMessage = 'Failed to delete workflow'
      mockWorkflowService.getWorkflow.mockResolvedValue(null as any)
      mockWorkflowService.deleteWorkflow.mockRejectedValue(new Error(errorMessage))

      const { result } = renderHook(() => useWorkflow('1', 'user-1'))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      await act(async () => {
        try {
          await result.current.deleteWorkflow()
        } catch (error) {
          // Expected to throw
        }
      })

      expect(result.current.error).toBe(errorMessage)
    })
  })

  describe('refresh', () => {
    it('should refresh workflow', async () => {
      const mockWorkflow = {
        id: '1',
        name: 'Test Workflow',
        description: 'A test workflow',
        status: WorkflowStatus.DRAFT,
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

      mockWorkflowService.getWorkflow.mockResolvedValue(mockWorkflow)

      const { result } = renderHook(() => useWorkflow('1', 'user-1'))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      // Clear the mock to verify it's called again
      mockWorkflowService.getWorkflow.mockClear()
      mockWorkflowService.getWorkflow.mockResolvedValue(mockWorkflow)

      await act(async () => {
        await result.current.refresh()
      })

      expect(mockWorkflowService.getWorkflow).toHaveBeenCalledTimes(1)
    })
  })
})

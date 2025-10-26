'use client'

import { useState, useEffect, useCallback } from 'react'
import { WorkflowService } from '@/lib/services/workflowService'
import { 
  Workflow, 
  CreateWorkflowData, 
  UpdateWorkflowData
} from '@/lib/types'

export function useWorkflows(userId: string, organizationId?: string) {
  const [workflows, setWorkflows] = useState<Workflow[]>([])
  const [allWorkflows, setAllWorkflows] = useState<Workflow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSearching, setIsSearching] = useState(false)

  const loadWorkflows = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await WorkflowService.getWorkflows(userId, organizationId)
      setWorkflows(data)
      setAllWorkflows(data)
      setIsSearching(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load workflows')
    } finally {
      setLoading(false)
    }
  }, [userId, organizationId])

  useEffect(() => {
    loadWorkflows()
  }, [loadWorkflows])

  const createWorkflow = async (workflowData: CreateWorkflowData) => {
    try {
      setError(null)
      const newWorkflow = await WorkflowService.createWorkflow(workflowData, userId)
      setWorkflows(prev => [newWorkflow, ...prev])
      return newWorkflow
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create workflow')
      throw err
    }
  }

  const updateWorkflow = async (id: string, updates: UpdateWorkflowData) => {
    try {
      setError(null)
      const updatedWorkflow = await WorkflowService.updateWorkflow(id, updates, userId)
      setWorkflows(prev => 
        prev.map(workflow => 
          workflow.id === id ? updatedWorkflow : workflow
        )
      )
      return updatedWorkflow
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update workflow')
      throw err
    }
  }

  const deleteWorkflow = async (id: string) => {
    try {
      setError(null)
      await WorkflowService.deleteWorkflow(id, userId)
      setWorkflows(prev => prev.filter(workflow => workflow.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete workflow')
      throw err
    }
  }

  const searchWorkflows = async (query: string) => {
    try {
      setLoading(true)
      setError(null)
      setIsSearching(true)
      const results = await WorkflowService.searchWorkflows(query, userId, organizationId)
      setWorkflows(results)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search workflows')
    } finally {
      setLoading(false)
    }
  }

  const clearSearch = () => {
    setWorkflows(allWorkflows)
    setIsSearching(false)
  }

  return {
    workflows,
    loading,
    error,
    isSearching,
    createWorkflow,
    updateWorkflow,
    deleteWorkflow,
    searchWorkflows,
    clearSearch,
    refresh: loadWorkflows
  }
}

export function useWorkflow(id: string, userId: string) {
  const [workflow, setWorkflow] = useState<Workflow | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadWorkflow = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await WorkflowService.getWorkflow(id, userId)
      setWorkflow(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load workflow')
    } finally {
      setLoading(false)
    }
  }, [id, userId])

  useEffect(() => {
    if (id && userId) {
      loadWorkflow()
    }
  }, [id, userId, loadWorkflow])

  const updateWorkflow = async (updates: UpdateWorkflowData) => {
    try {
      setError(null)
      const updatedWorkflow = await WorkflowService.updateWorkflow(id, updates, userId)
      setWorkflow(updatedWorkflow)
      return updatedWorkflow
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update workflow')
      throw err
    }
  }

  const deleteWorkflow = async () => {
    try {
      setError(null)
      await WorkflowService.deleteWorkflow(id, userId)
      setWorkflow(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete workflow')
      throw err
    }
  }

  return {
    workflow,
    loading,
    error,
    updateWorkflow,
    deleteWorkflow,
    refresh: loadWorkflow
  }
}

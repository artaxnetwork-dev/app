import { supabase } from '@/lib/supabase'
import { 
  Workflow, 
  CreateWorkflowData, 
  UpdateWorkflowData, 
  WorkflowStep, 
  WorkflowTrigger,
} from '@/lib/types'

export class WorkflowService {
  // Helper method to create Workflow from database row
  private static createWorkflowFromDb(dbRow: any): Workflow {
    return {
      id: dbRow.id,
      name: dbRow.name,
      description: dbRow.description,
      status: dbRow.status,
      steps: dbRow.steps as WorkflowStep[],
      triggers: dbRow.triggers as WorkflowTrigger[],
      created_at: dbRow.created_at,
      updated_at: dbRow.updated_at,
      user_id: dbRow.user_id,
      organization_id: dbRow.organization_id,
      is_public: dbRow.is_public,
      tags: dbRow.tags,
      version: dbRow.version,
      last_run_at: dbRow.last_run_at,
      run_count: dbRow.run_count,
      success_rate: dbRow.success_rate
    }
  }

  // Get all workflows for a user
  static async getWorkflows(userId: string, organizationId?: string) {
    let query = supabase
      .from('workflows')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (organizationId) {
      query = query.eq('organization_id', organizationId)
    }

    const { data, error } = await query as any

    if (error) {
      throw new Error(`Failed to fetch workflows: ${error.message}`)
    }

    return data.map((workflow: any) => this.createWorkflowFromDb(workflow))
  }

  // Get a single workflow by ID
  static async getWorkflow(id: string, userId: string) {
    const { data, error } = await (supabase as any)
      .from('workflows')
      .select('*')
      .eq('id', id)
      .eq('user_id', userId)
      .single()

    if (error) {
      throw new Error(`Failed to fetch workflow: ${error.message}`)
    }

    return this.createWorkflowFromDb(data)
  }

  // Create a new workflow
  static async createWorkflow(workflowData: CreateWorkflowData, userId: string) {
    const workflow = {
      ...workflowData,
      user_id: userId,
      status: 'draft' as const,
      version: 1,
      run_count: 0,
      success_rate: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    const { data, error } = await (supabase as any)
      .from('workflows')
      .insert(workflow)
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to create workflow: ${error.message}`)
    }

    return this.createWorkflowFromDb(data)
  }

  // Update an existing workflow
  static async updateWorkflow(id: string, updates: UpdateWorkflowData, userId: string) {
    const updateData = {
      ...updates,
      updated_at: new Date().toISOString(),
      steps: updates.steps,
      triggers: updates.triggers,
    }

    const { data, error } = await (supabase as any)
      .from('workflows')
      .update(updateData)
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to update workflow: ${error.message}`)
    }

    return this.createWorkflowFromDb(data)
  }

  // Delete a workflow
  static async deleteWorkflow(id: string, userId: string) {
    const { error } = await (supabase as any)
      .from('workflows')
      .delete()
      .eq('id', id)
      .eq('user_id', userId)

    if (error) {
      throw new Error(`Failed to delete workflow: ${error.message}`)
    }

    return true
  }

  // Get public workflows
  static async getPublicWorkflows(limit = 20, offset = 0) {
    const { data, error } = await (supabase as any)
      .from('workflows')
      .select('*')
      .eq('is_public', true)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) {
      throw new Error(`Failed to fetch public workflows: ${error.message}`)
    }

    return data.map((workflow: any) => this.createWorkflowFromDb(workflow))
  }

  // Search workflows
  static async searchWorkflows(query: string, userId: string, organizationId?: string) {
    // Escape the query to prevent SQL injection
    const escapedQuery = query.replace(/[%_\\]/g, '\\$&')
    
    // Get all workflows for the user first
    let baseQuery = supabase
      .from('workflows')
      .select('*')
      .eq('user_id', userId)

    if (organizationId) {
      baseQuery = baseQuery.eq('organization_id', organizationId)
    }

    const { data: allWorkflows, error: baseError } = await baseQuery

    if (baseError) {
      throw new Error(`Failed to fetch workflows: ${baseError.message}`)
    }

    if (!allWorkflows) {
      return []
    }

    // Filter workflows that match the search query
    const filteredData = allWorkflows.filter((workflow: any) => {
      const searchLower = query.toLowerCase()
      
      // Check name and description
      const nameMatch = workflow.name?.toLowerCase().includes(searchLower)
      const descriptionMatch = workflow.description?.toLowerCase().includes(searchLower)
      
      // Check tags
      const tagMatch = workflow.tags?.some((tag: string) => 
        tag.toLowerCase().includes(searchLower)
      )
      
      return nameMatch || descriptionMatch || tagMatch
    })

    return filteredData.map((workflow: any) => this.createWorkflowFromDb(workflow))
  }

  // Update workflow run statistics
  static async updateRunStats(id: string, success: boolean) {
    const { data: workflow, error: fetchError } = await (supabase as any)
      .from('workflows')
      .select('run_count, success_rate')
      .eq('id', id)
      .single()

    if (fetchError) {
      throw new Error(`Failed to fetch workflow stats: ${fetchError.message}`)
    }

    const newRunCount = workflow.run_count + 1
    const newSuccessRate = success 
      ? ((workflow.success_rate * workflow.run_count) + 1) / newRunCount
      : (workflow.success_rate * workflow.run_count) / newRunCount

    const { error: updateError } = await (supabase as any)
      .from('workflows')
      .update({
        run_count: newRunCount,
        success_rate: newSuccessRate,
        last_run_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)

    if (updateError) {
      throw new Error(`Failed to update workflow stats: ${updateError.message}`)
    }

    return true
  }
}

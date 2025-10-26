'use client'

import { useState } from 'react'
import { useWorkflows } from '@/lib/hooks/useWorkflows'
import { Workflow, CreateWorkflowData } from '@/lib/types'
import LoadingSpinner from '@/components/LoadingSpinner'

interface WorkflowManagerProps {
  userId: string
  organizationId?: string
}

export default function WorkflowManager({ userId, organizationId }: WorkflowManagerProps) {
  const { workflows, loading, error, createWorkflow, deleteWorkflow } = useWorkflows(userId, organizationId)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newWorkflow, setNewWorkflow] = useState<CreateWorkflowData>({
    name: '',
    description: '',
    steps: [],
    triggers: [],
    is_public: false,
    tags: []
  })

  const handleCreateWorkflow = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createWorkflow(newWorkflow)
      setNewWorkflow({
        name: '',
        description: '',
        steps: [],
        triggers: [],
        is_public: false,
        tags: []
      })
      setShowCreateForm(false)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Failed to create workflow:', err)
      }
    }
  }

  const handleDeleteWorkflow = async (id: string) => {
    if (confirm('Are you sure you want to delete this workflow?')) {
      try {
        await deleteWorkflow(id)
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Failed to delete workflow:', err)
        }
      }
    }
  }

  if (loading) {
    return (
      <div className="p-4">
        <LoadingSpinner text="Loading workflows..." />
      </div>
    )
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Workflows</h2>
        <button
          onClick={() => setShowCreateForm(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Create Workflow
        </button>
      </div>

      {error && (
        <div className="text-red-600 mb-4">
          Error: {error}
        </div>
      )}

      {showCreateForm && (
        <div className="mb-6 p-4 border rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Create New Workflow</h3>
          <form onSubmit={handleCreateWorkflow} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={newWorkflow.name}
                onChange={(e) => setNewWorkflow({ ...newWorkflow, name: e.target.value })}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                value={newWorkflow.description}
                onChange={(e) => setNewWorkflow({ ...newWorkflow, description: e.target.value })}
                className="w-full px-3 py-2 border rounded"
                rows={3}
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_public"
                checked={newWorkflow.is_public}
                onChange={(e) => setNewWorkflow({ ...newWorkflow, is_public: e.target.checked })}
                className="mr-2"
              />
              <label htmlFor="is_public" className="text-sm">Public workflow</label>
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Create
              </button>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {workflows.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No workflows found. Create your first workflow!
          </div>
        ) : (
          workflows.map((workflow) => (
            <div key={workflow.id} className="p-4 border rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{workflow.name}</h3>
                  {workflow.description && (
                    <p className="text-gray-600 mt-1">{workflow.description}</p>
                  )}
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span>Status: {workflow.status}</span>
                    <span>Version: {workflow.version}</span>
                    <span>Runs: {workflow.run_count}</span>
                    <span>Success Rate: {(workflow.success_rate * 100).toFixed(1)}%</span>
                    {workflow.is_public && (
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        Public
                      </span>
                    )}
                  </div>
                  {workflow.tags.length > 0 && (
                    <div className="flex gap-1 mt-2">
                      {workflow.tags.map((tag, index) => (
                        <span key={index} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => handleDeleteWorkflow(workflow.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

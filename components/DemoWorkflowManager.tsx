'use client'

import { useState } from 'react'
import WorkflowManager from './WorkflowManager'
import LoadingSpinner from './LoadingSpinner'

interface DemoWorkflowManagerProps {
  userId: string
  organizationId?: string
}

export default function DemoWorkflowManager({ userId, organizationId }: DemoWorkflowManagerProps) {
  const [showDemo, setShowDemo] = useState(false)

  if (!showDemo) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2 text-blue-900 dark:text-blue-100">
            Demo Mode
          </h2>
          <p className="text-blue-700 dark:text-blue-300 mb-4">
            This is a demo of the Workflow Manager. In a real application, you would be authenticated 
            and your user ID would be retrieved from the authentication system.
          </p>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded p-3 mb-4">
            <p className="text-yellow-800 dark:text-yellow-200 text-sm">
              <strong>Note:</strong> The demo uses a mock user ID that doesn't exist in the database. 
              Workflow operations will show connection errors, but the UI demonstrates the functionality.
            </p>
          </div>
          <button
            onClick={() => setShowDemo(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Start Demo
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded">
        <p className="text-green-800 dark:text-green-200 text-sm">
          <strong>Demo Active:</strong> Using mock user ID: <code className="bg-green-100 dark:bg-green-800 px-1 rounded">{userId}</code>
        </p>
      </div>
      <WorkflowManager userId={userId} organizationId={organizationId} />
    </div>
  )
}

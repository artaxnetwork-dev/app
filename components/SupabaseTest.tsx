'use client'

import { useState, useEffect, useCallback } from 'react'
import { testSupabaseConnection } from '@/lib/supabase'

export default function SupabaseTest() {
  const [connectionStatus, setConnectionStatus] = useState<'testing' | 'connected' | 'error'>('testing')
  const [error, setError] = useState<string | null>(null)

  const testConnection = useCallback(async () => {
    try {
      setConnectionStatus('testing')
      setError(null)
      
      const isConnected = await testSupabaseConnection()
      
      if (isConnected) {
        setConnectionStatus('connected')
      } else {
        setConnectionStatus('error')
        setError('Failed to connect to Supabase')
      }
    } catch (err) {
      setConnectionStatus('error')
      setError(err instanceof Error ? err.message : 'Unknown error')
    }
  }, [])

  useEffect(() => {
    testConnection()
  }, [testConnection])

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Supabase Connection Test</h3>
      
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-3 h-3 rounded-full ${
          connectionStatus === 'connected' ? 'bg-green-500' : 
          connectionStatus === 'error' ? 'bg-red-500' : 
          'bg-yellow-500'
        }`} />
        <span className="text-sm">
          {connectionStatus === 'connected' ? 'Connected' : 
           connectionStatus === 'error' ? 'Error' : 
           'Testing...'}
        </span>
      </div>

      {error && (
        <div className="text-red-600 text-sm mb-2">
          Error: {error}
        </div>
      )}

      <button 
        onClick={testConnection}
        className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
      >
        Test Again
      </button>
    </div>
  )
}

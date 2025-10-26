'use client'

import { Sidebar } from '@/components/Sidebar'
import { DashboardStats } from '@/components/DashboardStats'
import { AIEmployeesList } from '@/components/AIEmployeesList'
import { WorkflowsTable } from '@/components/WorkflowsTable'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <div>
              <h1 className="text-4xl font-light tracking-tight mb-2">Dashboard</h1>
              <p className="text-zinc-400">Welcome back. Here's what's happening today.</p>
            </div>
            <DashboardStats />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <WorkflowsTable />
              <AIEmployeesList />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

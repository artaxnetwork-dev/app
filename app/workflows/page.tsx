'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Plus, Edit, Trash2 } from 'lucide-react'

export default function WorkflowsPage() {
  const workflows = [
    { id: 1, name: 'Data Processing', status: 'active', lastRun: '2 hours ago', success: 98 },
    { id: 2, name: 'API Integration', status: 'active', lastRun: '5 hours ago', success: 96 },
    { id: 3, name: 'Report Generation', status: 'paused', lastRun: '1 day ago', success: 99 },
    { id: 4, name: 'Email Automation', status: 'active', lastRun: '30 mins ago', success: 97 },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-500 border-green-500/50'
      case 'paused':
        return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50'
      default:
        return 'bg-gray-500/20 text-gray-500 border-gray-500/50'
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-light tracking-tight mb-2">Workflows</h1>
            <p className="text-zinc-400">Create and manage your automated workflows</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-white text-black hover:bg-zinc-200">
                <Plus className="w-4 h-4 mr-2" />
                Create Workflow
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
              <DialogHeader>
                <DialogTitle>Create New Workflow</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <label className="text-sm text-zinc-400 mb-2 block">Name</label>
                  <Input className="bg-zinc-800 border-zinc-700 text-white" placeholder="Enter workflow name" />
                </div>
                <div>
                  <label className="text-sm text-zinc-400 mb-2 block">Description</label>
                  <Input className="bg-zinc-800 border-zinc-700 text-white" placeholder="Enter description" />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" className="border-zinc-700 text-white hover:bg-zinc-800">
                    Cancel
                  </Button>
                  <Button className="bg-white text-black hover:bg-zinc-200">
                    Create
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-zinc-800">
                  <TableHead className="text-zinc-400">Name</TableHead>
                  <TableHead className="text-zinc-400">Status</TableHead>
                  <TableHead className="text-zinc-400">Last Run</TableHead>
                  <TableHead className="text-zinc-400">Success Rate</TableHead>
                  <TableHead className="text-zinc-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {workflows.map((workflow) => (
                  <TableRow key={workflow.id} className="border-zinc-800 hover:bg-zinc-800/50">
                    <TableCell className="text-white font-medium">{workflow.name}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(workflow.status)} variant="outline">
                        {workflow.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-zinc-400">{workflow.lastRun}</TableCell>
                    <TableCell className="text-zinc-300">{workflow.success}%</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-red-500">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

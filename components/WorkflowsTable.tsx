'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export function WorkflowsTable() {
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
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-white font-light">Recent Workflows</CardTitle>
        <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
          Create
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-zinc-800">
              <TableHead className="text-zinc-400">Name</TableHead>
              <TableHead className="text-zinc-400">Status</TableHead>
              <TableHead className="text-zinc-400">Last Run</TableHead>
              <TableHead className="text-zinc-400">Success</TableHead>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

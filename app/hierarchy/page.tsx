'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function HierarchyPage() {
  const hierarchy = [
    {
      id: 1,
      name: 'Alex Chen',
      role: 'Product Owner',
      avatar: 'AC',
      reports: [
        { id: 2, name: 'Sam Kim', role: 'AI Developer', avatar: 'SK' },
        { id: 3, name: 'Jordan Lee', role: 'AI Analyst', avatar: 'JL' },
      ]
    },
    {
      id: 4,
      name: 'Taylor Morgan',
      role: 'AI Designer',
      avatar: 'TM',
      reports: [
        { id: 5, name: 'Casey Rodriguez', role: 'AI Engineer', avatar: 'CR' },
        { id: 6, name: 'Riley Johnson', role: 'AI Researcher', avatar: 'RJ' },
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-4xl font-light tracking-tight mb-2">AI Employee Hierarchy</h1>
          <p className="text-zinc-400">View and manage your AI employee structure</p>
        </div>

        <div className="space-y-8">
          {hierarchy.map((manager) => (
            <Card key={manager.id} className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-6 pb-6 border-b border-zinc-800">
                  <Avatar className="w-16 h-16 bg-zinc-700">
                    <AvatarFallback className="text-zinc-300 text-xl">{manager.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-medium text-white">{manager.name}</h3>
                    <p className="text-zinc-400">{manager.role}</p>
                    <Badge variant="outline" className="border-green-500/50 text-green-500 mt-2">Manager</Badge>
                  </div>
                </div>
                
                <div className="pl-4 border-l-2 border-zinc-800">
                  <h4 className="text-sm text-zinc-400 mb-4">Reports to {manager.name}:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {manager.reports.map((report) => (
                      <div key={report.id} className="flex items-center space-x-3 p-3 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors">
                        <Avatar className="bg-zinc-700">
                          <AvatarFallback className="text-zinc-300">{report.avatar}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-white font-medium">{report.name}</p>
                          <p className="text-zinc-400 text-sm">{report.role}</p>
                        </div>
                        <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

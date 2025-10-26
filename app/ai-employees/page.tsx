'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function AIEmployeesPage() {
  const employees = [
    { id: 1, name: 'Alex Chen', role: 'Product Owner', department: 'Product', status: 'online', avatar: 'AC' },
    { id: 2, name: 'Sam Kim', role: 'AI Developer', department: 'Engineering', status: 'online', avatar: 'SK' },
    { id: 3, name: 'Jordan Lee', role: 'AI Analyst', department: 'Data', status: 'busy', avatar: 'JL' },
    { id: 4, name: 'Taylor Morgan', role: 'AI Designer', department: 'Design', status: 'offline', avatar: 'TM' },
    { id: 5, name: 'Casey Rodriguez', role: 'AI Engineer', department: 'Engineering', status: 'online', avatar: 'CR' },
    { id: 6, name: 'Riley Johnson', role: 'AI Researcher', department: 'Research', status: 'online', avatar: 'RJ' },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500'
      case 'busy':
        return 'bg-yellow-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-light tracking-tight mb-2">AI Employees</h1>
            <p className="text-zinc-400">Manage your AI workforce</p>
          </div>
          <Button className="bg-white text-black hover:bg-zinc-200">Add AI Employee</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {employees.map((employee) => (
            <Card key={employee.id} className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-colors">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="w-12 h-12 bg-zinc-700">
                        <AvatarFallback className="text-zinc-300">{employee.avatar}</AvatarFallback>
                      </Avatar>
                      <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-zinc-900 ${getStatusColor(employee.status)}`} />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{employee.name}</h3>
                      <p className="text-zinc-400 text-sm">{employee.role}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                    {employee.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-400 text-sm mb-4">{employee.department}</p>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="border-zinc-700 text-white hover:bg-zinc-800 flex-1">
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="border-zinc-700 text-white hover:bg-zinc-800 flex-1">
                    Chat
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

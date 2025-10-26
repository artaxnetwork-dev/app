import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

export function AIEmployeesList() {
  const employees = [
    { id: 1, name: 'Alex Chen', role: 'Product Owner', status: 'online', avatar: 'AC' },
    { id: 2, name: 'Sam Kim', role: 'AI Developer', status: 'online', avatar: 'SK' },
    { id: 3, name: 'Jordan Lee', role: 'AI Analyst', status: 'busy', avatar: 'JL' },
    { id: 4, name: 'Taylor Morgan', role: 'AI Designer', status: 'offline', avatar: 'TM' },
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
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-white font-light">Active AI Employees</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {employees.map((employee) => (
            <div key={employee.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-zinc-800 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar className="bg-zinc-700">
                    <AvatarFallback className="text-zinc-300">{employee.avatar}</AvatarFallback>
                  </Avatar>
                  <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-zinc-900 ${getStatusColor(employee.status)}`} />
                </div>
                <div>
                  <p className="text-white font-medium">{employee.name}</p>
                  <p className="text-zinc-400 text-sm">{employee.role}</p>
                </div>
              </div>
              <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                {employee.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

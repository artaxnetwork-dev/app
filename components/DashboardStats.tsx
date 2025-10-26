import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-zinc-400">Active AI Employees</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-light text-white">24</div>
          <p className="text-xs text-zinc-500 mt-1">+12 from last month</p>
        </CardContent>
      </Card>
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-zinc-400">Workflows</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-light text-white">156</div>
          <p className="text-xs text-zinc-500 mt-1">+8 new this week</p>
        </CardContent>
      </Card>
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-zinc-400">Conversations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-light text-white">1,234</div>
          <p className="text-xs text-zinc-500 mt-1">+342 today</p>
        </CardContent>
      </Card>
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-zinc-400">Success Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-light text-white">98.2%</div>
          <p className="text-xs text-zinc-500 mt-1">+2.1% from last month</p>
        </CardContent>
      </Card>
    </div>
  )
}

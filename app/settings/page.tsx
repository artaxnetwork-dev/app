'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-4xl font-light tracking-tight mb-2">Settings</h1>
          <p className="text-zinc-400">Manage your application settings</p>
        </div>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white font-light">General Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="orgName" className="text-zinc-300">Organization Name</Label>
              <Input id="orgName" defaultValue="Artax Network" className="bg-zinc-800 border-zinc-700 text-white" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone" className="text-zinc-300">Timezone</Label>
              <Input id="timezone" defaultValue="UTC" className="bg-zinc-800 border-zinc-700 text-white" />
            </div>
            <div className="flex justify-end">
              <Button className="bg-white text-black hover:bg-zinc-200">Save Changes</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white font-light">Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Email Notifications</p>
                <p className="text-zinc-400 text-sm">Receive email updates</p>
              </div>
              <Button variant="outline" className="border-zinc-700 text-white hover:bg-zinc-800">Enable</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Push Notifications</p>
                <p className="text-zinc-400 text-sm">Receive push notifications</p>
              </div>
              <Button variant="outline" className="border-zinc-700 text-white hover:bg-zinc-800">Enable</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white font-light">Danger Zone</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-white font-medium mb-2">Delete Account</p>
              <p className="text-zinc-400 text-sm mb-4">Permanently delete your account and all data</p>
              <Button variant="destructive" className="bg-red-600 hover:bg-red-700">Delete Account</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

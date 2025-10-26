'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-4xl font-light tracking-tight mb-2">Profile</h1>
          <p className="text-zinc-400">Manage your account settings</p>
        </div>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white font-light">Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-6">
              <Avatar className="w-20 h-20 bg-zinc-700">
                <AvatarFallback className="text-2xl text-zinc-300">JD</AvatarFallback>
              </Avatar>
              <div>
                <Button variant="outline" className="border-zinc-700 text-white hover:bg-zinc-800">
                  Change Avatar
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-zinc-300">First Name</Label>
                <Input id="firstName" defaultValue="John" className="bg-zinc-800 border-zinc-700 text-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-zinc-300">Last Name</Label>
                <Input id="lastName" defaultValue="Doe" className="bg-zinc-800 border-zinc-700 text-white" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-300">Email</Label>
              <Input id="email" type="email" defaultValue="john@example.com" className="bg-zinc-800 border-zinc-700 text-white" />
            </div>

            <div className="flex justify-end">
              <Button className="bg-white text-black hover:bg-zinc-200">Save Changes</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white font-light">Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword" className="text-zinc-300">Current Password</Label>
              <Input id="currentPassword" type="password" className="bg-zinc-800 border-zinc-700 text-white" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-zinc-300">New Password</Label>
              <Input id="newPassword" type="password" className="bg-zinc-800 border-zinc-700 text-white" />
            </div>
            <div className="flex justify-end">
              <Button variant="outline" className="border-zinc-700 text-white hover:bg-zinc-800">Update Password</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

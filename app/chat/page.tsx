'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Send } from 'lucide-react'

export default function ChatPage() {
  const conversations = [
    { id: 1, name: 'Alex Chen', role: 'Product Owner', avatar: 'AC', unread: 3 },
    { id: 2, name: 'Sam Kim', role: 'AI Developer', avatar: 'SK', unread: 0 },
    { id: 3, name: 'Jordan Lee', role: 'AI Analyst', avatar: 'JL', unread: 1 },
  ]

  const messages = [
    { id: 1, sender: 'Alex Chen', message: 'Hello! How can I help you today?', time: '10:00 AM', avatar: 'AC' },
    { id: 2, sender: 'You', message: 'I need help with the new feature requirements', time: '10:02 AM', avatar: 'ME' },
    { id: 3, sender: 'Alex Chen', message: 'Sure! Let me review the requirements and get back to you.', time: '10:05 AM', avatar: 'AC' },
  ]

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Conversations List */}
      <div className="w-80 bg-zinc-950 border-r border-zinc-800">
        <div className="p-4 border-b border-zinc-800">
          <h2 className="text-xl font-light">Conversations</h2>
        </div>
        <div className="divide-y divide-zinc-800">
          {conversations.map((conv) => (
            <div key={conv.id} className="p-4 hover:bg-zinc-900 cursor-pointer transition-colors">
              <div className="flex items-center space-x-3">
                <Avatar className="bg-zinc-700">
                  <AvatarFallback className="text-zinc-300">{conv.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-white font-medium truncate">{conv.name}</p>
                    {conv.unread > 0 && (
                      <Badge className="bg-green-500 text-white text-xs">{conv.unread}</Badge>
                    )}
                  </div>
                  <p className="text-zinc-400 text-sm truncate">{conv.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-zinc-800">
          <div className="flex items-center space-x-3">
            <Avatar className="bg-zinc-700">
              <AvatarFallback className="text-zinc-300">AC</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-white font-medium">Alex Chen</p>
              <p className="text-zinc-400 text-sm">Product Owner</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-start space-x-3 max-w-md ${msg.sender === 'You' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <Avatar className="bg-zinc-700">
                  <AvatarFallback className="text-zinc-300">{msg.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-zinc-400 text-sm mb-1">{msg.sender}</p>
                  <div className={`rounded-lg p-3 ${msg.sender === 'You' ? 'bg-white text-black' : 'bg-zinc-900 text-white'}`}>
                    <p>{msg.message}</p>
                  </div>
                  <p className="text-zinc-500 text-xs mt-1">{msg.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-zinc-800">
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Type a message..."
              className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500"
            />
            <Button className="bg-white text-black hover:bg-zinc-200">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

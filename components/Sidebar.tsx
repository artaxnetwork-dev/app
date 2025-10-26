'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  LayoutDashboard,
  Users,
  Workflow,
  MessageSquare,
  Network,
  Settings,
  LogOut,
  Home,
} from 'lucide-react'

const navItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'AI Employees', href: '/ai-employees', icon: Users },
  { name: 'Workflows', href: '/workflows', icon: Workflow },
  { name: 'Chat', href: '/chat', icon: MessageSquare },
  { name: 'Hierarchy', href: '/hierarchy', icon: Network },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-zinc-950 border-r border-zinc-800 min-h-screen flex flex-col">
      <div className="p-6 border-b border-zinc-800">
        <h1 className="text-2xl font-light tracking-tight text-white">Artax Network</h1>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-white text-black'
                  : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-zinc-800 space-y-2">
        <Link
          href="/settings"
          className="flex items-center space-x-3 px-4 py-3 rounded-lg text-zinc-400 hover:bg-zinc-900 hover:text-white transition-colors"
        >
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </Link>
        <Link
          href="/profile"
          className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-zinc-900 transition-colors"
        >
          <Avatar className="w-8 h-8 bg-zinc-700">
            <AvatarFallback className="text-zinc-300 text-sm">JD</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">John Doe</p>
            <p className="text-xs text-zinc-500 truncate">john@example.com</p>
          </div>
        </Link>
        <button className="flex items-center space-x-3 px-4 py-3 rounded-lg text-zinc-400 hover:bg-zinc-900 hover:text-white transition-colors w-full">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  )
}

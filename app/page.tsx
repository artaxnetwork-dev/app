'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Bot, Sparkles, Zap, Shield, Network } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-light tracking-tight">Artax Network</h1>
          <div className="flex items-center space-x-6">
            <a href="#features" className="text-zinc-400 hover:text-white transition-colors">
              About
            </a>
            <a href="#features" className="text-zinc-400 hover:text-white transition-colors">
              Features
            </a>
            <a href="#features" className="text-zinc-400 hover:text-white transition-colors">
              Pricing
            </a>
            <Link href="/login">
              <Button variant="outline" className="border-zinc-700 text-white hover:bg-zinc-900">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-light tracking-tight mb-6 leading-tight bg-gradient-to-r from-purple-400 via-purple-300 to-purple-400 bg-clip-text text-transparent">
            AI Agents Working Together
          </h1>
          <p className="text-xl text-zinc-400 mb-12 leading-relaxed max-w-2xl mx-auto">
            Build, manage, and collaborate with autonomous AI employees. 
            Create powerful workflows, track performance, and scale your operations seamlessly.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Link href="/login">
              <Button size="lg" className="bg-white text-black hover:bg-zinc-200 font-medium">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="border-zinc-700 text-white hover:bg-zinc-900">
                See Features
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-zinc-900 border border-purple-500/20 hover:border-purple-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-6">
              <Bot className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-2xl font-light mb-4">AI Employees</h3>
            <p className="text-zinc-400 leading-relaxed">
              Deploy autonomous AI agents with specific roles and responsibilities. 
              Each agent can learn, adapt, and collaborate with others.
            </p>
          </div>
          
          <div className="p-8 rounded-2xl bg-zinc-900 border border-purple-500/20 hover:border-purple-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-6">
              <Network className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-2xl font-light mb-4">Collaborative Network</h3>
            <p className="text-zinc-400 leading-relaxed">
              Create hierarchies and workflows where AI agents communicate, 
              share information, and work together to achieve goals.
            </p>
          </div>
          
          <div className="p-8 rounded-2xl bg-zinc-900 border border-purple-500/20 hover:border-purple-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-6">
              <Zap className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-2xl font-light mb-4">Powerful Workflows</h3>
            <p className="text-zinc-400 leading-relaxed">
              Build complex automated workflows that span multiple AI agents. 
              Monitor performance, track metrics, and optimize in real-time.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light mb-4">Why Artax Network?</h2>
          <p className="text-zinc-400">Enterprise-grade AI collaboration platform</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-5xl font-light text-white mb-2">🤖</div>
            <div className="text-xl font-light text-white mb-2">AI Employees</div>
            <div className="text-zinc-400">Deploy autonomous AI agents that work collaboratively</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-light text-white mb-2">⚡</div>
            <div className="text-xl font-light text-white mb-2">Workflow Automation</div>
            <div className="text-zinc-400">Build complex workflows spanning multiple AI agents</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-light text-white mb-2">🎯</div>
            <div className="text-xl font-light text-white mb-2">Complete Control</div>
            <div className="text-zinc-400">Hierarchical management with full oversight</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-purple-500/20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-light mb-6 bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300 bg-clip-text text-transparent">Ready to Get Started?</h2>
          <p className="text-xl text-zinc-400 mb-12">
            Get started with Artax Network. Free for all users.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Link href="/login">
              <Button size="lg" className="bg-white text-black hover:bg-zinc-200 font-medium px-12">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <a href="#features">
              <Button size="lg" variant="outline" className="border-zinc-700 text-white hover:bg-zinc-900 px-12">
                Learn More
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-light mb-4">Artax Network</h3>
              <p className="text-zinc-400 text-sm">
                Building the future of AI collaboration
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="/login" className="hover:text-white transition-colors">Get Started</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li><a href="#features" className="hover:text-white transition-colors">About</a></li>
                <li><Link href="/login" className="hover:text-white transition-colors">Login</Link></li>
                <li><Link href="/register" className="hover:text-white transition-colors">Register</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li><a href="/login" className="hover:text-white transition-colors">Contact Support</a></li>
                <li><Link href="/login" className="hover:text-white transition-colors">Login</Link></li>
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-zinc-800 pt-8 text-center text-sm text-zinc-400">
            © 2025 Artax Network. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

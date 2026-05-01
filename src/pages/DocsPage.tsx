import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  BookOpen,
  Play,
  Code,
  Terminal,
  Layers,
  Network,
  Settings,
  Database,
  Shield,
  Zap,
  Search,
  ArrowRight,
  Box,
  ChevronRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Header from '../components/Header'
import { Badge } from '@/components/ui/badge'

const categories = [
  {
    title: 'Getting Started',
    icon: Play,
    color: 'primary',
    docs: [
      { title: 'Introduction to KubeLearn', time: '5 min' },
      { title: 'Starting Your First Cluster', time: '3 min' },
      { title: 'Using the Terminal', time: '4 min' },
    ],
  },
  {
    title: 'Core Concepts',
    icon: Layers,
    color: 'blue',
    docs: [
      { title: 'Pods Explained', time: '8 min' },
      { title: 'Deployments & ReplicaSets', time: '10 min' },
      { title: 'Services & Networking', time: '12 min' },
      { title: 'ConfigMaps & Secrets', time: '7 min' },
    ],
  },
  {
    title: 'kubectl Commands',
    icon: Terminal,
    color: 'green',
    docs: [
      { title: 'Essential Commands', time: '6 min' },
      { title: 'Resource Management', time: '8 min' },
      { title: 'Debugging Pods', time: '10 min' },
    ],
  },
  {
    title: 'YAML Manifests',
    icon: Code,
    color: 'orange',
    docs: [
      { title: 'Writing Pod Manifests', time: '7 min' },
      { title: 'Deployment Configurations', time: '9 min' },
      { title: 'Service Definitions', time: '6 min' },
    ],
  },
  {
    title: 'Networking',
    icon: Network,
    color: 'purple',
    docs: [
      { title: 'Cluster Networking', time: '10 min' },
      { title: 'Ingress Controllers', time: '12 min' },
      { title: 'Network Policies', time: '8 min' },
    ],
  },
  {
    title: 'Storage',
    icon: Database,
    color: 'cyan',
    docs: [
      { title: 'Persistent Volumes', time: '9 min' },
      { title: 'Storage Classes', time: '7 min' },
      { title: 'Volume Claims', time: '6 min' },
    ],
  },
]

const quickLinks = [
  { title: 'Create a Pod', icon: Box, href: '/playground' },
  { title: 'Deploy an App', icon: Zap, href: '/playground' },
  { title: 'Expose a Service', icon: Network, href: '/playground' },
  { title: 'Scale Replicas', icon: Layers, href: '/playground' },
]

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative py-20 px-6 border-b border-border/50">
        <div className="absolute inset-0 gradient-bg" />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge className="mb-4">Documentation</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Learn Kubernetes the <span className="text-primary">Right Way</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Comprehensive guides and tutorials to help you master container orchestration
            </p>
            
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                placeholder="Search documentation..." 
                className="pl-12 py-6 text-lg bg-secondary/50 border-border/50"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 px-6 border-b border-border/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickLinks.map((link, i) => (
              <Link key={i} to={link.href}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-4 rounded-lg border border-border/50 bg-card/50 hover:bg-card hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <link.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-medium">{link.title}</span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation Categories */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, i) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl border border-border/50 bg-card/50 hover:bg-card/80 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <category.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">{category.title}</h3>
                </div>
                
                <ul className="space-y-3">
                  {category.docs.map((doc, j) => (
                    <li key={j}>
                      <a 
                        href="#" 
                        className="flex items-center justify-between group text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <ChevronRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                          {doc.title}
                        </span>
                        <span className="text-xs">{doc.time}</span>
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 pt-4 border-t border-border/50">
                  <a 
                    href="#" 
                    className="text-sm text-primary hover:underline flex items-center gap-1"
                  >
                    View all
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 border-t border-border/50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Ready to put theory into practice?
            </h2>
            <p className="text-muted-foreground mb-8">
              Launch the playground and start experimenting with real Kubernetes commands
            </p>
            <Link to="/playground">
              <Button size="lg" className="glow-primary-sm text-lg px-8 py-6 gap-2">
                <Play className="w-5 h-5" />
                Open Playground
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border/50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Box className="w-6 h-6 text-primary" />
            <span className="font-semibold">KubeLearn</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Built for learning. Open source forever.
          </div>
        </div>
      </footer>
    </div>
  )
}

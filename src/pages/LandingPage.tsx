import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Play, 
  Terminal, 
  Layers, 
  Zap, 
  Shield, 
  BookOpen,
  ArrowRight,
  Github,
  Box,
  Cpu,
  Network,
  Container
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Header from '../components/Header'
import FeatureCard from '../components/FeatureCard'
import ClusterVisual from '../components/ClusterVisual'

const features = [
  {
    icon: Terminal,
    title: 'Interactive Terminal',
    description: 'Full kubectl access with syntax highlighting and auto-completion. Execute commands in real-time.',
  },
  {
    icon: Layers,
    title: 'Real Kubernetes',
    description: 'Run actual Kubernetes clusters in your browser using WebAssembly. No installation required.',
  },
  {
    icon: Zap,
    title: 'Instant Setup',
    description: 'Start a cluster in seconds. No cloud accounts, no configuration, just click and learn.',
  },
  {
    icon: Shield,
    title: 'Safe Sandbox',
    description: 'Experiment freely in an isolated environment. Break things without consequences.',
  },
  {
    icon: BookOpen,
    title: 'Guided Tutorials',
    description: 'Step-by-step lessons covering pods, deployments, services, and more Kubernetes concepts.',
  },
  {
    icon: Network,
    title: 'Visual Cluster Map',
    description: 'See your cluster topology in real-time. Understand how resources connect and interact.',
  },
]

const stats = [
  { value: '100%', label: 'Browser-Based' },
  { value: '<3s', label: 'Cluster Start' },
  { value: 'Free', label: 'Forever' },
  { value: 'WASM', label: 'Powered' },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 gradient-bg" />
        <div className="absolute inset-0 grid-pattern opacity-30" />
        
        {/* Animated orb */}
        <motion.div 
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, oklch(0.65 0.22 270 / 0.2) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-border/50 bg-secondary/50 backdrop-blur-sm">
              <Box className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">
                Browser-based Kubernetes for learning
              </span>
            </div>
          </motion.div>

          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="text-foreground">Learn </span>
            <span className="text-primary">Kubernetes</span>
            <br />
            <span className="text-foreground">in your browser.</span>
          </motion.h1>

          <motion.p 
            className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-10 text-pretty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Start a fully functional Kubernetes cluster instantly. No installation, 
            no cloud accounts, no cost. Just pure learning powered by WebAssembly.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link to="/playground">
              <Button size="lg" className="glow-primary-sm text-lg px-8 py-6 gap-2">
                <Play className="w-5 h-5" />
                Start Cluster Session
              </Button>
            </Link>
            <Link to="/docs">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 gap-2">
                <BookOpen className="w-5 h-5" />
                View Tutorials
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Cluster Visual Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              See Your Cluster Come to Life
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Visualize pods, services, and deployments in real-time as you learn
            </p>
          </motion.div>
          
          <ClusterVisual />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 border-t border-border/50">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Master Kubernetes
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A complete learning environment with tools designed for understanding container orchestration
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <FeatureCard key={i} {...feature} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 px-6 border-t border-border/50">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Get started in three simple steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Start Session', desc: 'Click the button to initialize your Kubernetes cluster', icon: Play },
              { step: '02', title: 'WASM Loads', desc: 'A WebAssembly module downloads and boots your cluster', icon: Cpu },
              { step: '03', title: 'Start Learning', desc: 'Use the terminal and follow tutorials to master K8s', icon: Container },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm">
                  <div className="text-4xl font-bold text-primary/20 mb-4">{item.step}</div>
                  <item.icon className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
                {i < 2 && (
                  <ArrowRight className="hidden md:block absolute top-1/2 -right-4 w-8 h-8 text-muted-foreground/30" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 border-t border-border/50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to start your <span className="text-primary">Kubernetes journey</span>?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              Join thousands of developers learning Kubernetes the hands-on way. 
              No credit card, no installation, just learning.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/playground">
                <Button size="lg" className="glow-primary-sm text-lg px-8 py-6 gap-2">
                  <Play className="w-5 h-5" />
                  Launch Playground
                </Button>
              </Link>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="text-lg px-8 py-6 gap-2">
                  <Github className="w-5 h-5" />
                  Star on GitHub
                </Button>
              </a>
            </div>
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
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Docs</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">GitHub</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Community</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

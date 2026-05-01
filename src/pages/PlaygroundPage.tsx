import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Box,
  Play,
  Square,
  RefreshCw,
  Settings,
  HelpCircle,
  ChevronLeft,
  Cpu,
  HardDrive,
  Network,
  Container,
  Layers,
  Activity,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  Terminal as TerminalIcon,
  FileCode,
  BookOpen,
  Maximize2,
  Minimize2,
  Copy,
  Download,
  MoreVertical,
  Zap,
  Server,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import TerminalComponent from '../components/Terminal'
import ClusterInfoPanel from '../components/ClusterInfoPanel'
import ResourceList from '../components/ResourceList'
import TutorialPanel from '../components/TutorialPanel'

type ClusterStatus = 'idle' | 'starting' | 'running' | 'stopping' | 'error'

export default function PlaygroundPage() {
  const [clusterStatus, setClusterStatus] = useState<ClusterStatus>('idle')
  const [uptime, setUptime] = useState(0)
  const [rightPanelTab, setRightPanelTab] = useState('terminal')
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Simulate cluster startup
  const startCluster = () => {
    setClusterStatus('starting')
    setTimeout(() => {
      setClusterStatus('running')
      setUptime(0)
    }, 3000)
  }

  const stopCluster = () => {
    setClusterStatus('stopping')
    setTimeout(() => {
      setClusterStatus('idle')
      setUptime(0)
    }, 1500)
  }

  const restartCluster = () => {
    stopCluster()
    setTimeout(() => {
      startCluster()
    }, 2000)
  }

  // Uptime counter
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (clusterStatus === 'running') {
      interval = setInterval(() => {
        setUptime((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [clusterStatus])

  const formatUptime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getStatusColor = (status: ClusterStatus) => {
    switch (status) {
      case 'running':
        return 'text-green-500'
      case 'starting':
      case 'stopping':
        return 'text-yellow-500'
      case 'error':
        return 'text-red-500'
      default:
        return 'text-muted-foreground'
    }
  }

  const getStatusBadge = (status: ClusterStatus) => {
    switch (status) {
      case 'running':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Running</Badge>
      case 'starting':
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Starting</Badge>
      case 'stopping':
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Stopping</Badge>
      case 'error':
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Error</Badge>
      default:
        return <Badge variant="secondary">Idle</Badge>
    }
  }

  return (
    <TooltipProvider>
      <div className="h-screen flex flex-col bg-background overflow-hidden">
        {/* Top Bar */}
        <header className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm">Back</span>
            </Link>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-2">
              <Box className="w-5 h-5 text-primary" />
              <span className="font-semibold">KubeLearn</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Cluster Status */}
            <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-secondary/50 border border-border/50">
              <div className="flex items-center gap-2">
                <motion.div
                  className={`w-2 h-2 rounded-full ${getStatusColor(clusterStatus)}`}
                  animate={clusterStatus === 'running' ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{
                    backgroundColor: clusterStatus === 'running' ? '#22c55e' : 
                                    clusterStatus === 'starting' || clusterStatus === 'stopping' ? '#eab308' :
                                    clusterStatus === 'error' ? '#ef4444' : '#6b7280'
                  }}
                />
                {getStatusBadge(clusterStatus)}
              </div>
              {clusterStatus === 'running' && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {formatUptime(uptime)}
                </div>
              )}
            </div>

            {/* Cluster Controls */}
            <div className="flex items-center gap-2">
              {clusterStatus === 'idle' && (
                <Button onClick={startCluster} className="gap-2">
                  <Play className="w-4 h-4" />
                  Start Cluster
                </Button>
              )}
              {clusterStatus === 'starting' && (
                <Button disabled className="gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Starting...
                </Button>
              )}
              {clusterStatus === 'running' && (
                <>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" onClick={restartCluster}>
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Restart Cluster</TooltipContent>
                  </Tooltip>
                  <Button variant="destructive" onClick={stopCluster} className="gap-2">
                    <Square className="w-4 h-4" />
                    Stop
                  </Button>
                </>
              )}
              {clusterStatus === 'stopping' && (
                <Button disabled className="gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Stopping...
                </Button>
              )}
            </div>

            <div className="h-4 w-px bg-border" />

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Settings className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Settings</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <HelpCircle className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Help</TooltipContent>
            </Tooltip>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Cluster Info */}
          <aside className="w-80 border-r border-border/50 flex flex-col bg-card/30">
            <div className="p-4 border-b border-border/50">
              <h2 className="font-semibold flex items-center gap-2">
                <Server className="w-4 h-4 text-primary" />
                Cluster Overview
              </h2>
            </div>
            
            <ScrollArea className="flex-1">
              <div className="p-4 space-y-4">
                <ClusterInfoPanel status={clusterStatus} uptime={uptime} />
                
                {clusterStatus === 'running' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <ResourceList />
                  </motion.div>
                )}

                {clusterStatus === 'idle' && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/50 flex items-center justify-center">
                      <Zap className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Start a cluster session to see resources
                    </p>
                  </div>
                )}

                {clusterStatus === 'starting' && (
                  <div className="text-center py-8">
                    <Loader2 className="w-8 h-8 mx-auto mb-4 text-primary animate-spin" />
                    <p className="text-muted-foreground text-sm">
                      Initializing cluster...
                    </p>
                    <div className="mt-4 space-y-2 text-xs text-muted-foreground">
                      <motion.div 
                        className="flex items-center gap-2 justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <CheckCircle2 className="w-3 h-3 text-green-500" />
                        Loading WASM module
                      </motion.div>
                      <motion.div 
                        className="flex items-center gap-2 justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                      >
                        <CheckCircle2 className="w-3 h-3 text-green-500" />
                        Starting control plane
                      </motion.div>
                      <motion.div 
                        className="flex items-center gap-2 justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                      >
                        <Loader2 className="w-3 h-3 text-yellow-500 animate-spin" />
                        Bootstrapping nodes
                      </motion.div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </aside>

          {/* Right Panel - Terminal & Resources */}
          <main className="flex-1 flex flex-col overflow-hidden">
            <Tabs value={rightPanelTab} onValueChange={setRightPanelTab} className="flex-1 flex flex-col">
              <div className="flex items-center justify-between px-4 py-2 border-b border-border/50 bg-card/30">
                <TabsList className="bg-secondary/50">
                  <TabsTrigger value="terminal" className="gap-2">
                    <TerminalIcon className="w-4 h-4" />
                    Terminal
                  </TabsTrigger>
                  <TabsTrigger value="yaml" className="gap-2">
                    <FileCode className="w-4 h-4" />
                    YAML Editor
                  </TabsTrigger>
                  <TabsTrigger value="tutorial" className="gap-2">
                    <BookOpen className="w-4 h-4" />
                    Tutorial
                  </TabsTrigger>
                </TabsList>

                <div className="flex items-center gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={() => setIsFullscreen(!isFullscreen)}>
                        {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</TooltipContent>
                  </Tooltip>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Output
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="w-4 h-4 mr-2" />
                        Export Session
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <TabsContent value="terminal" className="flex-1 m-0 data-[state=active]:flex data-[state=active]:flex-col">
                <TerminalComponent isActive={clusterStatus === 'running'} />
              </TabsContent>

              <TabsContent value="yaml" className="flex-1 m-0 p-4 data-[state=active]:flex data-[state=active]:flex-col">
                <div className="flex-1 rounded-lg border border-border/50 bg-[#0d0d12] p-4 font-mono text-sm">
                  <pre className="text-muted-foreground">
{`# Example Pod Definition
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
  labels:
    app: nginx
spec:
  containers:
  - name: nginx
    image: nginx:latest
    ports:
    - containerPort: 80`}
                  </pre>
                </div>
              </TabsContent>

              <TabsContent value="tutorial" className="flex-1 m-0 overflow-auto data-[state=active]:block">
                <TutorialPanel />
              </TabsContent>
            </Tabs>
          </main>
        </div>

        {/* Status Bar */}
        <footer className="flex items-center justify-between px-4 py-2 border-t border-border/50 bg-card/30 text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>KubeLearn v1.0.0</span>
            <span className="text-border">|</span>
            <span>Kubernetes v1.28</span>
          </div>
          <div className="flex items-center gap-4">
            {clusterStatus === 'running' && (
              <>
                <div className="flex items-center gap-1">
                  <Cpu className="w-3 h-3" />
                  <span>CPU: 12%</span>
                </div>
                <div className="flex items-center gap-1">
                  <HardDrive className="w-3 h-3" />
                  <span>Memory: 256MB</span>
                </div>
              </>
            )}
            <span className="text-green-500 flex items-center gap-1">
              <Activity className="w-3 h-3" />
              Connected
            </span>
          </div>
        </footer>
      </div>
    </TooltipProvider>
  )
}

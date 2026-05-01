import { motion } from 'framer-motion'
import { 
  Server, 
  Cpu, 
  HardDrive, 
  Network, 
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'
import { Progress } from '@/components/ui/progress'

interface ClusterInfoPanelProps {
  status: 'idle' | 'starting' | 'running' | 'stopping' | 'error'
  uptime: number
}

export default function ClusterInfoPanel({ status, uptime }: ClusterInfoPanelProps) {
  const formatUptime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}m ${secs}s`
  }

  if (status !== 'running') {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Cluster Health */}
      <div className="p-4 rounded-lg border border-border/50 bg-secondary/30">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium flex items-center gap-2">
            <Server className="w-4 h-4 text-primary" />
            Cluster Health
          </h3>
          <div className="flex items-center gap-1 text-green-500 text-xs">
            <CheckCircle2 className="w-3 h-3" />
            Healthy
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="p-2 rounded bg-background/50">
            <div className="text-xs text-muted-foreground mb-1">Uptime</div>
            <div className="text-sm font-mono flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatUptime(uptime)}
            </div>
          </div>
          <div className="p-2 rounded bg-background/50">
            <div className="text-xs text-muted-foreground mb-1">Version</div>
            <div className="text-sm font-mono">v1.28.0</div>
          </div>
        </div>
      </div>

      {/* Resources */}
      <div className="p-4 rounded-lg border border-border/50 bg-secondary/30">
        <h3 className="text-sm font-medium flex items-center gap-2 mb-3">
          <Cpu className="w-4 h-4 text-primary" />
          Resources
        </h3>
        
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-muted-foreground">CPU Usage</span>
              <span>12%</span>
            </div>
            <Progress value={12} className="h-1.5" />
          </div>
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-muted-foreground">Memory</span>
              <span>256 MB / 2 GB</span>
            </div>
            <Progress value={12.5} className="h-1.5" />
          </div>
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-muted-foreground">Storage</span>
              <span>1.2 GB / 10 GB</span>
            </div>
            <Progress value={12} className="h-1.5" />
          </div>
        </div>
      </div>

      {/* Network */}
      <div className="p-4 rounded-lg border border-border/50 bg-secondary/30">
        <h3 className="text-sm font-medium flex items-center gap-2 mb-3">
          <Network className="w-4 h-4 text-primary" />
          Network
        </h3>
        
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Cluster IP</span>
            <span className="font-mono">10.96.0.0/12</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Service CIDR</span>
            <span className="font-mono">10.96.0.0/16</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Pod CIDR</span>
            <span className="font-mono">10.244.0.0/16</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

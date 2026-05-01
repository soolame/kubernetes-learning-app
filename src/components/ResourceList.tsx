import { motion } from 'framer-motion'
import { 
  Box, 
  Server, 
  Globe, 
  Layers, 
  ChevronDown,
  CheckCircle2,
  Clock,
  XCircle
} from 'lucide-react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'

const resources = {
  nodes: [
    { name: 'control-plane', status: 'Ready', role: 'control-plane' },
    { name: 'worker-node-1', status: 'Ready', role: 'worker' },
    { name: 'worker-node-2', status: 'Ready', role: 'worker' },
    { name: 'worker-node-3', status: 'Ready', role: 'worker' },
  ],
  pods: [
    { name: 'nginx-deployment-abc123', status: 'Running', namespace: 'default' },
    { name: 'redis-master-xyz789', status: 'Running', namespace: 'default' },
    { name: 'api-server-def456', status: 'Running', namespace: 'default' },
    { name: 'worker-pod-ghi012', status: 'Pending', namespace: 'default' },
  ],
  services: [
    { name: 'kubernetes', type: 'ClusterIP', port: '443' },
    { name: 'nginx', type: 'ClusterIP', port: '80' },
    { name: 'redis', type: 'ClusterIP', port: '6379' },
  ],
  deployments: [
    { name: 'nginx-deployment', replicas: '3/3', status: 'Available' },
    { name: 'api-deployment', replicas: '2/2', status: 'Available' },
  ],
}

interface ResourceSectionProps {
  title: string
  icon: React.ElementType
  items: Array<{ name: string; [key: string]: string }>
  renderItem: (item: { name: string; [key: string]: string }) => React.ReactNode
}

function ResourceSection({ title, icon: Icon, items, renderItem }: ResourceSectionProps) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-secondary/50 transition-colors">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">{title}</span>
          <Badge variant="secondary" className="text-xs">
            {items.length}
          </Badge>
        </div>
        <ChevronDown 
          className={`w-4 h-4 text-muted-foreground transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="pl-6 pr-2 py-1 space-y-1">
          {items.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              {renderItem(item)}
            </motion.div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

const StatusIcon = ({ status }: { status: string }) => {
  switch (status.toLowerCase()) {
    case 'running':
    case 'ready':
    case 'available':
      return <CheckCircle2 className="w-3 h-3 text-green-500" />
    case 'pending':
      return <Clock className="w-3 h-3 text-yellow-500" />
    case 'failed':
    case 'error':
      return <XCircle className="w-3 h-3 text-red-500" />
    default:
      return <div className="w-3 h-3 rounded-full bg-muted" />
  }
}

export default function ResourceList() {
  return (
    <div className="space-y-2">
      <h3 className="text-xs text-muted-foreground uppercase tracking-wider px-2 mb-2">
        Resources
      </h3>

      <ResourceSection
        title="Nodes"
        icon={Server}
        items={resources.nodes}
        renderItem={(item) => (
          <div className="flex items-center justify-between p-2 rounded hover:bg-secondary/30 text-xs">
            <div className="flex items-center gap-2">
              <StatusIcon status={item.status} />
              <span className="truncate max-w-[120px]">{item.name}</span>
            </div>
            <Badge variant="outline" className="text-[10px]">
              {item.role}
            </Badge>
          </div>
        )}
      />

      <ResourceSection
        title="Pods"
        icon={Box}
        items={resources.pods}
        renderItem={(item) => (
          <div className="flex items-center justify-between p-2 rounded hover:bg-secondary/30 text-xs">
            <div className="flex items-center gap-2">
              <StatusIcon status={item.status} />
              <span className="truncate max-w-[120px]">{item.name}</span>
            </div>
            <span className="text-muted-foreground">{item.namespace}</span>
          </div>
        )}
      />

      <ResourceSection
        title="Services"
        icon={Globe}
        items={resources.services}
        renderItem={(item) => (
          <div className="flex items-center justify-between p-2 rounded hover:bg-secondary/30 text-xs">
            <div className="flex items-center gap-2">
              <StatusIcon status="ready" />
              <span className="truncate max-w-[120px]">{item.name}</span>
            </div>
            <span className="text-muted-foreground font-mono">:{item.port}</span>
          </div>
        )}
      />

      <ResourceSection
        title="Deployments"
        icon={Layers}
        items={resources.deployments}
        renderItem={(item) => (
          <div className="flex items-center justify-between p-2 rounded hover:bg-secondary/30 text-xs">
            <div className="flex items-center gap-2">
              <StatusIcon status={item.status} />
              <span className="truncate max-w-[120px]">{item.name}</span>
            </div>
            <span className="text-muted-foreground font-mono">{item.replicas}</span>
          </div>
        )}
      />
    </div>
  )
}

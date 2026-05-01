import { motion } from 'framer-motion'
import { Box, Database, Globe, Server, Container } from 'lucide-react'

const nodes = [
  { id: 'master', label: 'Control Plane', icon: Server, x: 50, y: 20, color: 'primary' },
  { id: 'node1', label: 'Node 1', icon: Container, x: 20, y: 60, color: 'green' },
  { id: 'node2', label: 'Node 2', icon: Container, x: 50, y: 60, color: 'green' },
  { id: 'node3', label: 'Node 3', icon: Container, x: 80, y: 60, color: 'green' },
]

const pods = [
  { id: 'pod1', node: 'node1', label: 'nginx', status: 'running' },
  { id: 'pod2', node: 'node1', label: 'redis', status: 'running' },
  { id: 'pod3', node: 'node2', label: 'api', status: 'running' },
  { id: 'pod4', node: 'node2', label: 'worker', status: 'pending' },
  { id: 'pod5', node: 'node3', label: 'db', status: 'running' },
]

export default function ClusterVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative w-full aspect-[16/9] rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm overflow-hidden"
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="oklch(0.65 0.22 270)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="oklch(0.72 0.19 145)" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        {/* Master to nodes */}
        <motion.line
          x1="50%" y1="30%"
          x2="20%" y2="55%"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          strokeDasharray="5,5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        <motion.line
          x1="50%" y1="30%"
          x2="50%" y2="55%"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          strokeDasharray="5,5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
        />
        <motion.line
          x1="50%" y1="30%"
          x2="80%" y2="55%"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          strokeDasharray="5,5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.7 }}
        />
      </svg>

      {/* Nodes */}
      {nodes.map((node, i) => (
        <motion.div
          key={node.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
        >
          <div className={`relative p-4 rounded-xl border ${
            node.color === 'primary' 
              ? 'border-primary/50 bg-primary/10' 
              : 'border-green-500/50 bg-green-500/10'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <node.icon className={`w-5 h-5 ${
                node.color === 'primary' ? 'text-primary' : 'text-green-500'
              }`} />
              <span className="text-sm font-medium">{node.label}</span>
            </div>

            {/* Pods inside nodes */}
            {node.id !== 'master' && (
              <div className="flex gap-1">
                {pods
                  .filter((pod) => pod.node === node.id)
                  .map((pod) => (
                    <motion.div
                      key={pod.id}
                      className={`w-8 h-8 rounded flex items-center justify-center text-xs ${
                        pod.status === 'running'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8 + Math.random() * 0.3 }}
                      title={pod.label}
                    >
                      <Box className="w-4 h-4" />
                    </motion.div>
                  ))}
              </div>
            )}

            {/* Pulse effect for master */}
            {node.id === 'master' && (
              <motion.div
                className="absolute -inset-1 rounded-xl border border-primary/30"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.5, 0.2, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            )}
          </div>
        </motion.div>
      ))}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 flex items-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-primary/50" />
          <span>Control Plane</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-green-500/50" />
          <span>Worker Node</span>
        </div>
        <div className="flex items-center gap-1">
          <Box className="w-3 h-3 text-green-400" />
          <span>Running Pod</span>
        </div>
      </div>

      {/* Live indicator */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <motion.div
          className="w-2 h-2 rounded-full bg-green-500"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <span className="text-xs text-muted-foreground">Live Preview</span>
      </div>
    </motion.div>
  )
}

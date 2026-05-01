import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface TerminalProps {
  isActive: boolean
}

const initialOutput = [
  { type: 'system', text: 'KubeLearn Terminal v1.0.0' },
  { type: 'system', text: 'Type "help" for available commands' },
  { type: 'system', text: '' },
]

const helpOutput = [
  { type: 'info', text: 'Available commands:' },
  { type: 'info', text: '' },
  { type: 'command', text: '  kubectl get pods         - List all pods' },
  { type: 'command', text: '  kubectl get nodes        - List all nodes' },
  { type: 'command', text: '  kubectl get services     - List all services' },
  { type: 'command', text: '  kubectl get deployments  - List deployments' },
  { type: 'command', text: '  kubectl apply -f <file>  - Apply a configuration' },
  { type: 'command', text: '  kubectl describe <type>  - Show details' },
  { type: 'command', text: '  clear                    - Clear terminal' },
  { type: 'command', text: '  help                     - Show this help' },
  { type: 'info', text: '' },
]

const mockPods = `NAME                      READY   STATUS    RESTARTS   AGE
nginx-deployment-abc123   1/1     Running   0          2m
redis-master-xyz789       1/1     Running   0          5m
api-server-def456         1/1     Running   0          3m
worker-pod-ghi012         0/1     Pending   0          1m`

const mockNodes = `NAME           STATUS   ROLES           AGE   VERSION
control-plane  Ready    control-plane   10m   v1.28.0
worker-node-1  Ready    <none>          10m   v1.28.0
worker-node-2  Ready    <none>          10m   v1.28.0
worker-node-3  Ready    <none>          10m   v1.28.0`

const mockServices = `NAME         TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)   AGE
kubernetes   ClusterIP   10.96.0.1      <none>        443/TCP   10m
nginx        ClusterIP   10.96.45.123   <none>        80/TCP    2m
redis        ClusterIP   10.96.78.234   <none>        6379/TCP  5m`

const mockDeployments = `NAME               READY   UP-TO-DATE   AVAILABLE   AGE
nginx-deployment   3/3     3            3           2m
api-deployment     2/2     2            2           3m`

interface OutputLine {
  type: 'system' | 'info' | 'command' | 'input' | 'output' | 'error' | 'success'
  text: string
}

export default function Terminal({ isActive }: TerminalProps) {
  const [output, setOutput] = useState<OutputLine[]>(initialOutput)
  const [input, setInput] = useState('')
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [output])

  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isActive])

  const processCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase()
    
    // Add to history
    if (trimmedCmd) {
      setCommandHistory(prev => [...prev, cmd])
      setHistoryIndex(-1)
    }

    // Add input to output
    setOutput(prev => [...prev, { type: 'input', text: `$ ${cmd}` }])

    // Process command
    if (trimmedCmd === 'help') {
      setOutput(prev => [...prev, ...helpOutput])
    } else if (trimmedCmd === 'clear') {
      setOutput(initialOutput)
    } else if (trimmedCmd === 'kubectl get pods' || trimmedCmd === 'kubectl get pod') {
      setOutput(prev => [...prev, { type: 'output', text: mockPods }])
    } else if (trimmedCmd === 'kubectl get nodes' || trimmedCmd === 'kubectl get node') {
      setOutput(prev => [...prev, { type: 'output', text: mockNodes }])
    } else if (trimmedCmd === 'kubectl get services' || trimmedCmd === 'kubectl get svc') {
      setOutput(prev => [...prev, { type: 'output', text: mockServices }])
    } else if (trimmedCmd === 'kubectl get deployments' || trimmedCmd === 'kubectl get deploy') {
      setOutput(prev => [...prev, { type: 'output', text: mockDeployments }])
    } else if (trimmedCmd.startsWith('kubectl apply')) {
      setOutput(prev => [...prev, 
        { type: 'success', text: 'deployment.apps/nginx-deployment created' },
        { type: 'success', text: 'service/nginx created' }
      ])
    } else if (trimmedCmd.startsWith('kubectl describe')) {
      setOutput(prev => [...prev, { type: 'output', text: `Name:         nginx-deployment
Namespace:    default
Labels:       app=nginx
Annotations:  <none>
Selector:     app=nginx
Replicas:     3 desired | 3 updated | 3 total | 3 available
...` }])
    } else if (trimmedCmd === '') {
      // Empty command, do nothing
    } else {
      setOutput(prev => [...prev, { type: 'error', text: `bash: ${cmd.split(' ')[0]}: command not found` }])
    }

    setOutput(prev => [...prev, { type: 'system', text: '' }])
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      processCommand(input)
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '')
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '')
      } else {
        setHistoryIndex(-1)
        setInput('')
      }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      // Basic autocomplete
      if (input.startsWith('kubectl get ')) {
        const suggestions = ['pods', 'nodes', 'services', 'deployments']
        const partial = input.replace('kubectl get ', '')
        const match = suggestions.find(s => s.startsWith(partial))
        if (match) {
          setInput(`kubectl get ${match}`)
        }
      }
    }
  }

  const getTextColor = (type: string) => {
    switch (type) {
      case 'system':
        return 'text-muted-foreground'
      case 'info':
        return 'text-blue-400'
      case 'command':
        return 'text-green-400'
      case 'input':
        return 'text-primary'
      case 'output':
        return 'text-foreground'
      case 'error':
        return 'text-red-400'
      case 'success':
        return 'text-green-400'
      default:
        return 'text-foreground'
    }
  }

  if (!isActive) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#0d0d12]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
            <span className="text-2xl text-muted-foreground">$</span>
          </div>
          <p className="text-muted-foreground">
            Start a cluster to enable the terminal
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <div 
      className="flex-1 flex flex-col bg-[#0d0d12] font-mono text-sm cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      <div 
        ref={terminalRef}
        className="flex-1 overflow-auto p-4 space-y-1"
      >
        {output.map((line, i) => (
          <div key={i} className={`${getTextColor(line.type)} whitespace-pre-wrap`}>
            {line.text}
          </div>
        ))}
        
        {/* Input line */}
        <div className="flex items-center gap-2">
          <span className="text-green-400">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-foreground caret-primary"
            spellCheck={false}
            autoComplete="off"
          />
          <motion.span
            className="w-2 h-5 bg-primary"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </div>
      </div>
    </div>
  )
}

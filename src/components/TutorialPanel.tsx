import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  BookOpen, 
  CheckCircle2, 
  Circle, 
  ChevronRight,
  Play,
  Code,
  Terminal,
  Layers,
  Network,
  Settings,
  ArrowRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'

const tutorials = [
  {
    id: 'basics',
    title: 'Kubernetes Basics',
    description: 'Learn the fundamental concepts of Kubernetes',
    icon: BookOpen,
    progress: 100,
    lessons: [
      { id: 1, title: 'What is Kubernetes?', completed: true },
      { id: 2, title: 'Core Concepts', completed: true },
      { id: 3, title: 'Architecture Overview', completed: true },
    ],
  },
  {
    id: 'pods',
    title: 'Working with Pods',
    description: 'Create, manage, and troubleshoot pods',
    icon: Layers,
    progress: 66,
    lessons: [
      { id: 1, title: 'Creating Your First Pod', completed: true },
      { id: 2, title: 'Pod Lifecycle', completed: true },
      { id: 3, title: 'Multi-container Pods', completed: false },
    ],
  },
  {
    id: 'deployments',
    title: 'Deployments & Scaling',
    description: 'Deploy applications and manage replicas',
    icon: Network,
    progress: 33,
    lessons: [
      { id: 1, title: 'Creating Deployments', completed: true },
      { id: 2, title: 'Rolling Updates', completed: false },
      { id: 3, title: 'Scaling Applications', completed: false },
    ],
  },
  {
    id: 'services',
    title: 'Services & Networking',
    description: 'Expose applications and configure networking',
    icon: Network,
    progress: 0,
    lessons: [
      { id: 1, title: 'ClusterIP Services', completed: false },
      { id: 2, title: 'NodePort & LoadBalancer', completed: false },
      { id: 3, title: 'Ingress Controllers', completed: false },
    ],
  },
  {
    id: 'config',
    title: 'Configuration',
    description: 'ConfigMaps, Secrets, and environment variables',
    icon: Settings,
    progress: 0,
    lessons: [
      { id: 1, title: 'ConfigMaps', completed: false },
      { id: 2, title: 'Secrets Management', completed: false },
      { id: 3, title: 'Environment Variables', completed: false },
    ],
  },
]

interface LessonContentProps {
  tutorial: typeof tutorials[0]
  onBack: () => void
}

function LessonContent({ tutorial, onBack }: LessonContentProps) {
  const [currentLesson, setCurrentLesson] = useState(0)
  const lesson = tutorial.lessons[currentLesson]

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border/50">
        <button 
          onClick={onBack}
          className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-2"
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
          Back to tutorials
        </button>
        <h2 className="text-lg font-semibold">{tutorial.title}</h2>
        <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
          <span>Lesson {currentLesson + 1} of {tutorial.lessons.length}</span>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-4">{lesson.title}</h3>
          
          <div className="prose prose-invert prose-sm max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              In this lesson, you&apos;ll learn about {lesson.title.toLowerCase()}. 
              This is a fundamental concept in Kubernetes that every developer should understand.
            </p>

            <div className="my-6 p-4 rounded-lg bg-secondary/30 border border-border/50">
              <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-primary" />
                Try it yourself
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                Run this command in the terminal to see it in action:
              </p>
              <code className="block p-3 rounded bg-[#0d0d12] text-sm font-mono text-green-400">
                kubectl get pods --all-namespaces
              </code>
            </div>

            <div className="my-6 p-4 rounded-lg bg-primary/10 border border-primary/30">
              <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-primary" />
                Key Takeaways
              </h4>
              <ul className="text-sm text-muted-foreground space-y-2 mt-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  Kubernetes organizes workloads using a hierarchical resource model
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  Pods are the smallest deployable units in Kubernetes
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  kubectl is the primary CLI tool for interacting with clusters
                </li>
              </ul>
            </div>
          </div>
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-border/50 flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentLesson(Math.max(0, currentLesson - 1))}
          disabled={currentLesson === 0}
        >
          Previous
        </Button>
        <div className="flex gap-1">
          {tutorial.lessons.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentLesson(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === currentLesson ? 'bg-primary' : 'bg-secondary'
              }`}
            />
          ))}
        </div>
        <Button
          onClick={() => setCurrentLesson(Math.min(tutorial.lessons.length - 1, currentLesson + 1))}
          disabled={currentLesson === tutorial.lessons.length - 1}
          className="gap-2"
        >
          Next
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}

export default function TutorialPanel() {
  const [selectedTutorial, setSelectedTutorial] = useState<typeof tutorials[0] | null>(null)

  if (selectedTutorial) {
    return <LessonContent tutorial={selectedTutorial} onBack={() => setSelectedTutorial(null)} />
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border/50">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          Learning Path
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Master Kubernetes step by step
        </p>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
          {tutorials.map((tutorial, index) => (
            <motion.div
              key={tutorial.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <button
                onClick={() => setSelectedTutorial(tutorial)}
                className="w-full p-4 rounded-lg border border-border/50 bg-card/50 hover:bg-card hover:border-primary/30 transition-all text-left"
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    tutorial.progress === 100 
                      ? 'bg-green-500/20' 
                      : tutorial.progress > 0 
                        ? 'bg-primary/20' 
                        : 'bg-secondary'
                  }`}>
                    <tutorial.icon className={`w-5 h-5 ${
                      tutorial.progress === 100 
                        ? 'text-green-500' 
                        : tutorial.progress > 0 
                          ? 'text-primary' 
                          : 'text-muted-foreground'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-medium truncate">{tutorial.title}</h3>
                      {tutorial.progress === 100 && (
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30 shrink-0">
                          Complete
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                      {tutorial.description}
                    </p>
                    <div className="mt-3 flex items-center gap-3">
                      <Progress value={tutorial.progress} className="h-1.5 flex-1" />
                      <span className="text-xs text-muted-foreground shrink-0">
                        {tutorial.progress}%
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-green-500" />
                        {tutorial.lessons.filter(l => l.completed).length} completed
                      </span>
                      <span className="flex items-center gap-1">
                        <Circle className="w-3 h-3" />
                        {tutorial.lessons.filter(l => !l.completed).length} remaining
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

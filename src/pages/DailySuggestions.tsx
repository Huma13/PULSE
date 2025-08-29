import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { MoodType } from "@/App";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  CheckCircle2, 
  Circle, 
  Droplets, 
  Coffee, 
  Move, 
  Brain, 
  Clock,
  Star,
  Zap,
  RefreshCw
} from "lucide-react";

interface DailySuggestionsProps {
  currentMood: MoodType;
}

const getMoodTasks = (mood: MoodType) => {
  const baseTasks = [
    { id: '1', title: 'Review morning emails', priority: 'medium', estimated: '15 min' },
    { id: '2', title: 'Update project dashboard', priority: 'high', estimated: '30 min' },
    { id: '3', title: 'Team standup meeting', priority: 'high', estimated: '15 min' },
  ];

  const moodSpecificTasks = {
    happy: [
      { id: '4', title: 'Tackle that challenging project', priority: 'high', estimated: '2 hours' },
      { id: '5', title: 'Reach out to colleagues for collaboration', priority: 'medium', estimated: '20 min' },
    ],
    focused: [
      { id: '4', title: 'Deep work session - complex analysis', priority: 'high', estimated: '3 hours' },
      { id: '5', title: 'Documentation writing', priority: 'medium', estimated: '1 hour' },
    ],
    stressed: [
      { id: '4', title: 'Break down large task into smaller steps', priority: 'medium', estimated: '20 min' },
      { id: '5', title: 'Quick wins - easy tasks first', priority: 'low', estimated: '30 min' },
    ],
    tired: [
      { id: '4', title: 'Light administrative tasks', priority: 'low', estimated: '45 min' },
      { id: '5', title: 'Organize workspace and files', priority: 'low', estimated: '25 min' },
    ],
    energetic: [
      { id: '4', title: 'Brainstorm new project ideas', priority: 'high', estimated: '1 hour' },
      { id: '5', title: 'Exercise or take energetic walk', priority: 'medium', estimated: '30 min' },
    ],
    creative: [
      { id: '4', title: 'Creative brainstorming session', priority: 'high', estimated: '90 min' },
      { id: '5', title: 'Explore new tools or approaches', priority: 'medium', estimated: '45 min' },
    ],
    calm: [
      { id: '4', title: 'Mindful task planning', priority: 'medium', estimated: '20 min' },
      { id: '5', title: 'Gentle progress on ongoing projects', priority: 'medium', estimated: '1 hour' },
    ],
    motivated: [
      { id: '4', title: 'Start that important project', priority: 'high', estimated: '2 hours' },
      { id: '5', title: 'Set and review personal goals', priority: 'high', estimated: '30 min' },
    ],
    neutral: [
      { id: '4', title: 'Regular task maintenance', priority: 'medium', estimated: '1 hour' },
      { id: '5', title: 'Catch up on industry reading', priority: 'low', estimated: '30 min' },
    ],
    sad: [
      { id: '4', title: 'Self-care and gentle activities', priority: 'low', estimated: '30 min' },
      { id: '5', title: 'Connect with supportive colleagues', priority: 'medium', estimated: '15 min' },
    ],
  };

  return [...baseTasks, ...(moodSpecificTasks[mood] || moodSpecificTasks.neutral)];
};

const wellnessNudges = [
  { icon: Droplets, text: 'Drink a glass of water', action: 'Hydrate now' },
  { icon: Move, text: 'Take a 5-minute stretch break', action: 'Stretch' },
  { icon: Coffee, text: 'Mindful 10-minute coffee break', action: 'Take break' },
  { icon: Brain, text: 'Practice 2-minute breathing exercise', action: 'Breathe' },
];

const DailySuggestions = ({ currentMood }: DailySuggestionsProps) => {
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [completedNudges, setCompletedNudges] = useState<Set<number>>(new Set());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();
  
  const tasks = getMoodTasks(currentMood);

  const toggleTask = (taskId: string) => {
    const newCompleted = new Set(completedTasks);
    if (newCompleted.has(taskId)) {
      newCompleted.delete(taskId);
    } else {
      newCompleted.add(taskId);
    }
    setCompletedTasks(newCompleted);
  };

  const toggleNudge = (nudgeIndex: number) => {
    const newCompleted = new Set(completedNudges);
    if (newCompleted.has(nudgeIndex)) {
      newCompleted.delete(nudgeIndex);
    } else {
      newCompleted.add(nudgeIndex);
    }
    setCompletedNudges(newCompleted);
  };

  const handleRefreshPlan = async () => {
    setIsRefreshing(true);
    
    // Simulate API call to get updated suggestions
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Reset completed tasks to show fresh plan
    setCompletedTasks(new Set());
    setCompletedNudges(new Set());
    
    toast({
      title: "Plan refreshed!",
      description: "Your productivity plan has been updated based on your current mood.",
    });
    
    setIsRefreshing(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-warning';
      case 'medium': return 'text-primary';
      case 'low': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen px-6 py-8 pb-32">
      <div className="max-w-md mx-auto space-y-6">
        {/* Current Mood Card */}
        <div 
          className="pulse-card animate-fade-in"
          style={{ 
            backgroundColor: `hsl(var(--mood-${currentMood}))`,
            color: 'white'
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold capitalize mb-1">
                Feeling {currentMood}
              </h2>
              <p className="text-white/80 text-sm">
                Tasks adapted to your current mood
              </p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Task Suggestions */}
        <div className="animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Today's Suggestions</h3>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefreshPlan}
              disabled={isRefreshing}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
          
          <div className="space-y-3">
            {tasks.map((task, index) => {
              const isCompleted = completedTasks.has(task.id);
              return (
                <div 
                  key={task.id} 
                  className={`task-item ${isCompleted ? 'opacity-60' : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Checkbox 
                    checked={isCompleted}
                    onCheckedChange={() => toggleTask(task.id)}
                    className="mt-0.5"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <h4 className={`font-medium ${isCompleted ? 'line-through' : ''}`}>
                        {task.title}
                      </h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{task.estimated}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Wellness Nudges */}
        <div className="animate-slide-up">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Wellness Breaks</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {wellnessNudges.map((nudge, index) => {
              const isCompleted = completedNudges.has(index);
              const Icon = nudge.icon;
              return (
                <Button
                  key={index}
                  variant={isCompleted ? "secondary" : "outline"}
                  onClick={() => toggleNudge(index)}
                  className={`h-auto p-4 flex flex-col items-center text-center gap-2 ${
                    isCompleted ? 'bg-success/10 border-success text-success' : ''
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : (
                    <Icon className="w-6 h-6" />
                  )}
                  <div>
                    <div className="text-xs font-medium">{nudge.text}</div>
                    <div className="text-xs opacity-70 mt-1">{nudge.action}</div>
                  </div>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Progress Summary */}
        <div className="pulse-card animate-fade-in">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              {completedTasks.size}/{tasks.length}
            </div>
            <div className="text-sm text-muted-foreground mb-2">Tasks completed</div>
            <div className="w-full bg-surface-muted rounded-full h-2">
              <div 
                className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(completedTasks.size / tasks.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailySuggestions;
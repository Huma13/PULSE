import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { MoodType } from "@/App";
import { 
  Plus, 
  Star, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  Trash2, 
  Calendar,
  Target,
  Brain,
  Zap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Task {
  id: string;
  title: string;
  description: string;
  importance: 1 | 2 | 3 | 4 | 5;
  estimatedTime: string;
  deadline?: string;
  category: string;
  completed: boolean;
  createdAt: Date;
  moodRequirement?: MoodType;
}

interface TaskManagerProps {
  currentMood: MoodType;
}

const TaskManager = ({ currentMood }: TaskManagerProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<{
    title: string;
    description: string;
    importance: 1 | 2 | 3 | 4 | 5;
    estimatedTime: string;
    deadline: string;
    category: string;
  }>({
    title: "",
    description: "",
    importance: 3,
    estimatedTime: "30min",
    deadline: "",
    category: "personal"
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const { toast } = useToast();

  const getMoodTaskSuggestions = (mood: MoodType, task: Task) => {
    const suggestions = {
      happy: "Great time for collaborative tasks! Your positive energy will boost team morale.",
      energetic: "Perfect for tackling challenging or physical tasks. Channel that energy!",
      focused: "Ideal for deep work and complex problem-solving. Minimize distractions.",
      calm: "Excellent for detailed work that requires patience and precision.",
      stressed: "Break this into smaller chunks. Consider doing it when you feel calmer.",
      tired: "Save for when you're more energized, or break into very small steps.",
      creative: "Add a creative twist to this task! Think outside the box.",
      motivated: "Strike while the iron is hot! Your drive will carry you through.",
      neutral: "A steady approach works best. Focus on consistent progress.",
      sad: "Be gentle with yourself. Consider postponing or asking for support."
    };

    return suggestions[mood] || suggestions.neutral;
  };

  const getOptimalTaskOrder = (tasks: Task[], mood: MoodType) => {
    const moodOptimalness = {
      happy: (task: Task) => task.category === 'social' ? 5 : task.importance,
      energetic: (task: Task) => task.importance + (task.category === 'physical' ? 2 : 0),
      focused: (task: Task) => task.category === 'work' ? task.importance + 1 : task.importance,
      calm: (task: Task) => task.category === 'creative' ? task.importance + 1 : task.importance,
      stressed: (task: Task) => 6 - task.importance, // Easier tasks first
      tired: (task: Task) => 6 - task.importance,
      creative: (task: Task) => task.category === 'creative' ? 5 : task.importance,
      motivated: (task: Task) => task.importance + 1,
      neutral: (task: Task) => task.importance,
      sad: (task: Task) => task.category === 'self-care' ? 5 : Math.max(1, task.importance - 1)
    };

    return tasks
      .filter(task => !task.completed)
      .sort((a, b) => moodOptimalness[mood](b) - moodOptimalness[mood](a));
  };

  const addTask = () => {
    if (!newTask.title.trim()) return;

    const task: Task = {
      id: crypto.randomUUID(),
      title: newTask.title,
      description: newTask.description,
      importance: newTask.importance,
      estimatedTime: newTask.estimatedTime,
      deadline: newTask.deadline || undefined,
      category: newTask.category,
      completed: false,
      createdAt: new Date()
    };

    setTasks(prev => [...prev, task]);
    setNewTask({
      title: "",
      description: "",
      importance: 3,
      estimatedTime: "30min",
      deadline: "",
      category: "personal"
    });
    setShowAddForm(false);

    toast({
      title: "Task added!",
      description: `PULSE will help optimize when to tackle "${task.title}" based on your mood.`,
    });
  };

  const toggleTask = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed }
        : task
    ));
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const getImportanceColor = (importance: number) => {
    const colors = {
      1: 'text-muted-foreground',
      2: 'text-warning',
      3: 'text-primary',
      4: 'text-destructive',
      5: 'text-destructive font-bold'
    };
    return colors[importance as keyof typeof colors];
  };

  const getImportanceLabel = (importance: number) => {
    const labels = {
      1: 'Low',
      2: 'Medium-Low', 
      3: 'Medium',
      4: 'High',
      5: 'Critical'
    };
    return labels[importance as keyof typeof labels];
  };

  const optimizedTasks = getOptimalTaskOrder(tasks, currentMood);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="min-h-screen px-6 py-8 pb-24">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-3">Task Manager</h1>
          <p className="text-muted-foreground">
            Organize your tasks and let PULSE optimize them for your mood
          </p>
        </div>

        {/* Current Mood Context */}
        <div 
          className="p-4 rounded-xl mb-6 animate-slide-up"
          style={{ backgroundColor: `hsl(var(--mood-${currentMood}) / 0.1)` }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Brain className="w-5 h-5" style={{ color: `hsl(var(--mood-${currentMood}))` }} />
            <span className="font-medium capitalize">Currently feeling {currentMood}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            PULSE has optimized your task order based on your current mood
          </p>
        </div>

        {/* Add Task Button */}
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="w-full mb-6 flex items-center gap-2"
          variant={showAddForm ? "outline" : "default"}
        >
          <Plus className="w-4 h-4" />
          {showAddForm ? "Cancel" : "Add New Task"}
        </Button>

        {/* Add Task Form */}
        {showAddForm && (
          <div className="pulse-card mb-6 animate-fade-in">
            <h3 className="font-semibold mb-4">Create New Task</h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="taskTitle">Task Title</Label>
                <Input
                  id="taskTitle"
                  value={newTask.title}
                  onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="What needs to be done?"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="taskDescription">Description (optional)</Label>
                <Textarea
                  id="taskDescription"
                  value={newTask.description}
                  onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Add details about this task..."
                  className="mt-1"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Importance</Label>
                  <Select 
                    value={newTask.importance.toString()}
                    onValueChange={(value) => setNewTask(prev => ({ ...prev, importance: parseInt(value) as 1|2|3|4|5 }))}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">⭐ Low</SelectItem>
                      <SelectItem value="2">⭐⭐ Medium-Low</SelectItem>
                      <SelectItem value="3">⭐⭐⭐ Medium</SelectItem>
                      <SelectItem value="4">⭐⭐⭐⭐ High</SelectItem>
                      <SelectItem value="5">⭐⭐⭐⭐⭐ Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Estimated Time</Label>
                  <Select 
                    value={newTask.estimatedTime}
                    onValueChange={(value) => setNewTask(prev => ({ ...prev, estimatedTime: value }))}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15min">15 minutes</SelectItem>
                      <SelectItem value="30min">30 minutes</SelectItem>
                      <SelectItem value="1hr">1 hour</SelectItem>
                      <SelectItem value="2hr">2 hours</SelectItem>
                      <SelectItem value="4hr">4+ hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Category</Label>
                  <Select 
                    value={newTask.category}
                    onValueChange={(value) => setNewTask(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="work">💼 Work</SelectItem>
                      <SelectItem value="personal">👤 Personal</SelectItem>
                      <SelectItem value="health">🏥 Health</SelectItem>
                      <SelectItem value="social">👥 Social</SelectItem>
                      <SelectItem value="creative">🎨 Creative</SelectItem>
                      <SelectItem value="physical">💪 Physical</SelectItem>
                      <SelectItem value="self-care">🧘 Self-care</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="deadline">Deadline (optional)</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={newTask.deadline}
                    onChange={(e) => setNewTask(prev => ({ ...prev, deadline: e.target.value }))}
                    className="mt-1"
                  />
                </div>
              </div>

              <Button onClick={addTask} className="w-full">
                Add Task
              </Button>
            </div>
          </div>
        )}

        {/* Optimized Task List */}
        {optimizedTasks.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold">Optimized for your mood</h2>
            </div>
            
            <div className="space-y-3">
              {optimizedTasks.map((task, index) => (
                <div key={task.id} className="task-item animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => toggleTask(task.id)}
                    className="mt-1"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{task.title}</h3>
                      <div className="flex items-center gap-1">
                        {[...Array(task.importance)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${getImportanceColor(task.importance)}`} fill="currentColor" />
                        ))}
                      </div>
                    </div>
                    
                    {task.description && (
                      <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                    )}
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {task.estimatedTime}
                      </span>
                      <span>📁 {task.category}</span>
                      {task.deadline && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(task.deadline).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    
                    {/* Mood-based suggestion */}
                    <div 
                      className="mt-2 p-2 rounded text-xs"
                      style={{ backgroundColor: `hsl(var(--mood-${currentMood}) / 0.1)` }}
                    >
                      <Zap className="w-3 h-3 inline mr-1" style={{ color: `hsl(var(--mood-${currentMood}))` }} />
                      {getMoodTaskSuggestions(currentMood, task)}
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteTask(task.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Completed Tasks */}
        {completedTasks.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-5 h-5 text-success" />
              <h2 className="text-lg font-semibold">Completed ({completedTasks.length})</h2>
            </div>
            
            <div className="space-y-2">
              {completedTasks.map((task) => (
                <div key={task.id} className="task-item opacity-60">
                  <Checkbox checked={true} onCheckedChange={() => toggleTask(task.id)} />
                  <div className="flex-1">
                    <h3 className="font-medium line-through">{task.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      Completed on {task.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteTask(task.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {tasks.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <Target className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No tasks yet</h3>
            <p className="text-muted-foreground mb-4">
              Add your first task and let PULSE help optimize your productivity!
            </p>
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Task
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskManager;
import { BarChart3, TrendingUp, Brain, Calendar, Target, Zap } from "lucide-react";

const Insights = () => {
  const mockInsights = [
    {
      title: "Peak Productivity Time",
      description: "You're most productive between 9-11 AM when feeling focused",
      icon: TrendingUp,
      color: "mood-focused"
    },
    {
      title: "Mood Patterns",
      description: "You tend to feel most energetic on Tuesdays and Wednesdays",
      icon: Brain,
      color: "mood-energetic"
    },
    {
      title: "Task Completion Rate",
      description: "85% completion rate when starting with easier tasks",
      icon: Target,
      color: "mood-motivated"
    }
  ];

  return (
    <div className="min-h-screen px-6 py-8 pb-32">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center animate-fade-in">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-2xl flex items-center justify-center">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Your Insights
          </h1>
          <p className="text-muted-foreground">
            AI-generated patterns from your productivity data
          </p>
        </div>

        {/* Placeholder Chart Area */}
        <div className="pulse-card animate-slide-up">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Productivity Patterns
          </h3>
          
          {/* Mock chart visualization */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">This Week</span>
              <span className="font-medium text-primary">+23% vs last week</span>
            </div>
            
            {/* Mock bar chart */}
            <div className="space-y-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                const heights = [60, 85, 75, 90, 65, 40, 30];
                return (
                  <div key={day} className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground w-8">{day}</span>
                    <div className="flex-1 bg-surface-muted rounded-full h-2">
                      <div 
                        className="bg-gradient-primary h-2 rounded-full transition-all duration-500"
                        style={{ 
                          width: `${heights[index]}%`,
                          animationDelay: `${index * 0.1}s`
                        }}
                      />
                    </div>
                    <span className="text-xs font-medium w-8">{heights[index]}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* AI-Generated Insights */}
        <div className="animate-slide-up">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            Smart Insights
          </h3>
          
          <div className="space-y-4">
            {mockInsights.map((insight, index) => {
              const Icon = insight.icon;
              return (
                <div 
                  key={index}
                  className="pulse-card hover:shadow-medium transition-all duration-200"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex gap-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `hsl(var(--${insight.color}) / 0.1)` }}
                    >
                      <Icon 
                        className="w-6 h-6" 
                        style={{ color: `hsl(var(--${insight.color}))` }}
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-1">
                        {insight.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {insight.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Weekly Summary */}
        <div className="pulse-card animate-fade-in">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            This Week's Summary
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">47</div>
              <div className="text-xs text-muted-foreground">Tasks Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success mb-1">8.2h</div>
              <div className="text-xs text-muted-foreground">Focus Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-mood-energetic mb-1">12</div>
              <div className="text-xs text-muted-foreground">Wellness Breaks</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-mood-happy mb-1">4.8</div>
              <div className="text-xs text-muted-foreground">Avg Mood Score</div>
            </div>
          </div>
        </div>

        {/* Coming Soon Features */}
        <div className="pulse-card bg-surface-muted border-dashed animate-bounce-in">
          <div className="text-center">
            <Zap className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
            <h3 className="font-semibold text-foreground mb-2">More Insights Coming Soon</h3>
            <p className="text-sm text-muted-foreground">
              Advanced AI analytics, mood correlations, and predictive suggestions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
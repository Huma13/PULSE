import { useState } from "react";
import { MoodType } from "@/App";
import { Brain, X, MessageCircle, Sparkles, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface FloatingCompanionProps {
  currentMood: MoodType;
  onMoodUpdate?: (mood: MoodType) => void;
}

const getMoodMessage = (mood: MoodType) => {
  const messages = {
    happy: "You're radiating positivity today! Perfect time for collaborative tasks.",
    calm: "Your peaceful energy is perfect for focused, mindful work.",
    focused: "Your concentration is sharp! Great time for deep work.",
    energetic: "Channel that amazing energy into your biggest challenges!",
    stressed: "Let's break things down into smaller, manageable steps.",
    tired: "Easy tasks first - be gentle with yourself today.",
    creative: "Your creative mind is active! Time to innovate and explore.",
    neutral: "A steady day ahead. Let's build consistent progress.",
    motivated: "Your drive is inspiring! Perfect time to tackle ambitious goals.",
    sad: "It's okay to feel this way. Let's start with gentle, self-care focused tasks.",
  };
  return messages[mood] || messages.neutral;
};

const getMoodEmoji = (mood: MoodType) => {
  const emojis = {
    happy: "😊",
    calm: "😌", 
    focused: "🎯",
    energetic: "⚡",
    stressed: "😰",
    tired: "😴",
    creative: "🎨",
    neutral: "😐",
    motivated: "🚀",
    sad: "😢",
  };
  return emojis[mood] || emojis.neutral;
};

const FloatingCompanion = ({ currentMood, onMoodUpdate }: FloatingCompanionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showQuickMood, setShowQuickMood] = useState(false);
  const { toast } = useToast();

  const quickMoods: MoodType[] = ['happy', 'sad', 'stressed', 'energetic', 'tired'];

  const handleQuickMoodSelect = (mood: MoodType) => {
    if (onMoodUpdate) {
      onMoodUpdate(mood);
      toast({
        title: "Mood updated!",
        description: `Your mood has been updated to ${mood}. PULSE is adapting your suggestions.`,
      });
    }
    setShowQuickMood(false);
    setIsExpanded(false);
  };

  return (
    <>
      {/* Main floating button */}
      <div 
        className={`floating-companion ${isExpanded ? 'scale-110' : ''}`}
        style={{ backgroundColor: `hsl(var(--mood-${currentMood}))` }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-center w-full h-full">
          {isExpanded ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <div className="relative">
              <Brain className="w-6 h-6 text-white" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full flex items-center justify-center text-xs">
                {getMoodEmoji(currentMood)}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Expanded content */}
      {isExpanded && (
        <div className="fixed bottom-24 right-6 w-80 max-w-[calc(100vw-3rem)] animate-slide-up">
          <div 
            className="pulse-card shadow-strong border-2"
            style={{ borderColor: `hsl(var(--mood-${currentMood}))` }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `hsl(var(--mood-${currentMood}))` }}
              >
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground flex items-center gap-1">
                  PULSE Companion
                  <Sparkles className="w-4 h-4 text-primary" />
                </h3>
                <p className="text-xs text-muted-foreground capitalize">
                  Mood: {currentMood}
                </p>
              </div>
            </div>

            {/* Mood-based message */}
            <div 
              className="p-3 rounded-xl mb-4 text-sm"
              style={{ backgroundColor: `hsl(var(--mood-${currentMood}) / 0.1)` }}
            >
              <MessageCircle className="w-4 h-4 inline mr-2" style={{ color: `hsl(var(--mood-${currentMood}))` }} />
              {getMoodMessage(currentMood)}
            </div>

            {/* Quick actions */}
            <div className="flex gap-2 mb-4">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 text-xs"
                onClick={() => setIsExpanded(false)}
              >
                Got it!
              </Button>
              <Button 
                variant="secondary" 
                size="sm" 
                className="flex-1 text-xs"
                onClick={() => setShowQuickMood(!showQuickMood)}
                style={{ 
                  backgroundColor: `hsl(var(--mood-${currentMood}) / 0.1)`,
                  color: `hsl(var(--mood-${currentMood}))`
                }}
              >
                Update mood
              </Button>
            </div>

            {/* Quick mood selector */}
            {showQuickMood && (
              <div className="animate-fade-in">
                <p className="text-sm font-medium text-foreground mb-3">How are you feeling now?</p>
                <div className="grid grid-cols-2 gap-2">
                  {quickMoods.map((mood) => (
                    <Button
                      key={mood}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickMoodSelect(mood)}
                      className="text-xs capitalize"
                    >
                      <Heart className="w-3 h-3 mr-1" />
                      {mood}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Mood indicator dots */}
            <div className="flex justify-center gap-1 mt-4 pt-3 border-t border-border/50">
              {['happy', 'calm', 'focused', 'energetic', 'stressed', 'tired', 'creative', 'neutral', 'motivated', 'sad'].map((mood) => (
                <div
                  key={mood}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    mood === currentMood ? 'scale-125' : 'opacity-30'
                  }`}
                  style={{ backgroundColor: `hsl(var(--mood-${mood}))` }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingCompanion;
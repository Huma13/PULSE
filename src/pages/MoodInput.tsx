import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoodType } from "@/App";
import { 
  Sun, 
  Cloud, 
  Zap, 
  Target, 
  AlertCircle, 
  Coffee, 
  Palette, 
  Minus, 
  TrendingUp 
} from "lucide-react";

interface MoodInputProps {
  onMoodSelect: (mood: MoodType) => void;
}

const moodOptions = [
  { 
    type: 'happy' as MoodType, 
    label: 'Happy', 
    icon: Sun, 
    description: 'Feeling great!' 
  },
  { 
    type: 'calm' as MoodType, 
    label: 'Calm', 
    icon: Cloud, 
    description: 'Peaceful & serene' 
  },
  { 
    type: 'focused' as MoodType, 
    label: 'Focused', 
    icon: Target, 
    description: 'Ready to concentrate' 
  },
  { 
    type: 'energetic' as MoodType, 
    label: 'Energetic', 
    icon: Zap, 
    description: 'Full of energy!' 
  },
  { 
    type: 'stressed' as MoodType, 
    label: 'Stressed', 
    icon: AlertCircle, 
    description: 'Feeling overwhelmed' 
  },
  { 
    type: 'tired' as MoodType, 
    label: 'Tired', 
    icon: Coffee, 
    description: 'Need some rest' 
  },
  { 
    type: 'creative' as MoodType, 
    label: 'Creative', 
    icon: Palette, 
    description: 'Feeling artistic!' 
  },
  { 
    type: 'neutral' as MoodType, 
    label: 'Neutral', 
    icon: Minus, 
    description: 'Just okay' 
  },
  { 
    type: 'motivated' as MoodType, 
    label: 'Motivated', 
    icon: TrendingUp, 
    description: 'Ready to achieve!' 
  },
];

const MoodInput = ({ onMoodSelect }: MoodInputProps) => {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const navigate = useNavigate();

  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood);
  };

  const handleSubmit = () => {
    if (selectedMood) {
      onMoodSelect(selectedMood);
      navigate('/tasks');
    }
  };

  return (
    <div className="min-h-screen px-6 py-8 pb-24">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-3">
            How are you feeling today?
          </h1>
          <p className="text-muted-foreground">
            Your mood helps PULSE personalize your experience
          </p>
        </div>

        {/* Mood Grid */}
        <div className="grid grid-cols-3 gap-4 mb-8 animate-slide-up">
          {moodOptions.map((mood, index) => {
            const Icon = mood.icon;
            const isSelected = selectedMood === mood.type;
            
            return (
              <div
                key={mood.type}
                onClick={() => handleMoodSelect(mood.type)}
                className={`mood-card ${isSelected ? 'selected' : ''}`}
                style={{ 
                  backgroundColor: isSelected ? `hsl(var(--mood-${mood.type}))` : 'hsl(var(--card))',
                  color: isSelected ? 'white' : 'hsl(var(--foreground))',
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className="flex flex-col items-center text-center">
                  <Icon className="w-8 h-8 mb-2" />
                  <span className="text-sm font-medium">{mood.label}</span>
                  <span className={`text-xs mt-1 ${isSelected ? 'text-white/80' : 'text-muted-foreground'}`}>
                    {mood.description}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Submit Button */}
        <div className="animate-bounce-in">
          <Button 
            onClick={handleSubmit}
            disabled={!selectedMood}
            className="w-full py-4 text-lg font-medium rounded-2xl bg-gradient-primary disabled:opacity-50 disabled:cursor-not-allowed"
            size="lg"
          >
            {selectedMood ? `Continue with ${selectedMood}` : 'Select your mood'}
          </Button>
        </div>

        {/* Mood preview */}
        {selectedMood && (
          <div className="mt-6 p-4 rounded-xl animate-fade-in" style={{ backgroundColor: `hsl(var(--mood-${selectedMood}) / 0.1)` }}>
            <p className="text-sm text-center text-muted-foreground">
              Perfect! PULSE will adapt to your <span className="font-medium" style={{ color: `hsl(var(--mood-${selectedMood}))` }}>{selectedMood}</span> mood.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodInput;
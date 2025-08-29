import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MoodType } from "@/App";
import ColorSpectrum from "@/components/ColorSpectrum";
import { 
  Sun, 
  Cloud, 
  Zap, 
  Target, 
  AlertCircle, 
  Coffee, 
  Palette, 
  Minus, 
  TrendingUp,
  Camera,
  Upload
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
  { 
    type: 'sad' as MoodType, 
    label: 'Sad', 
    icon: Cloud, 
    description: 'Feeling down' 
  },
];

const MoodInput = ({ onMoodSelect }: MoodInputProps) => {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [spectrumPosition, setSpectrumPosition] = useState(50);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        // Simulate AI mood detection - placeholder for future API integration
        const detectedMood = 'happy' as MoodType; // This will be replaced by AI model
        setSelectedMood(detectedMood);
      };
      reader.readAsDataURL(file);
    }
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
            Select from the grid below or upload a photo for AI detection
          </p>
        </div>

        {/* Photo Upload Section */}
        <div className="mb-8 animate-slide-up">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
          
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 h-20 flex flex-col items-center gap-2"
            >
              <Camera className="w-6 h-6" />
              <span className="text-sm">Take Photo</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 h-20 flex flex-col items-center gap-2"
            >
              <Upload className="w-6 h-6" />
              <span className="text-sm">Upload Image</span>
            </Button>
          </div>

          {uploadedImage && (
            <div className="mt-4 p-4 bg-surface-muted rounded-xl animate-fade-in">
              <div className="flex items-center gap-3">
                <img
                  src={uploadedImage}
                  alt="Uploaded mood"
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">AI detected mood:</p>
                  <p className="text-lg font-semibold capitalize" style={{ color: `hsl(var(--mood-${selectedMood}))` }}>
                    {selectedMood}
                  </p>
                </div>
              </div>
            </div>
          )}
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

        {/* Color Spectrum Visualization */}
        {selectedMood && (
          <div className="mb-8 animate-fade-in">
            <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
              Your mood on the spectrum
            </h3>
            <ColorSpectrum 
              currentMood={selectedMood}
              selectedPosition={spectrumPosition}
              onPositionChange={setSpectrumPosition}
              className="mb-4"
            />
          </div>
        )}

        {/* Submit Button */}
        <div className="animate-bounce-in">
          <Button 
            onClick={handleSubmit}
            disabled={!selectedMood}
            className="w-full py-4 text-lg font-medium rounded-2xl bg-gradient-primary disabled:opacity-50 disabled:cursor-not-allowed"
            size="lg"
          >
            {selectedMood ? 'Confirm Mood' : 'Select your mood'}
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
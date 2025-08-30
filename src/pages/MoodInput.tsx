import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MoodType } from "@/App";
import ColorSpectrum from "@/components/ColorSpectrum";
import { analyzeImageEmotion, getEmotionColorMapping } from "@/utils/emotionDetection";
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
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [detectedColor, setDetectedColor] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood);
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsAnalyzing(true);
      const reader = new FileReader();
      reader.onload = async (e) => {
        setUploadedImage(e.target?.result as string);
        
        try {
          // Analyze emotion using EmoSet integration
          const result = await analyzeImageEmotion(file);
          setSelectedMood(result.emotion as MoodType);
          setDetectedColor(result.color);
          
          const colorMapping = getEmotionColorMapping(result.emotion);
          // Update spectrum position based on emotion intensity
          setSpectrumPosition(result.intensity * 100);
        } catch (error) {
          console.error('Error analyzing image:', error);
          // Fallback to happy mood
          setSelectedMood('happy');
          setDetectedColor('#FFD700');
        } finally {
          setIsAnalyzing(false);
        }
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
              {isAnalyzing ? (
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-lg bg-muted animate-pulse" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Analyzing your mood...</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-4 h-4 rounded-full bg-primary animate-bounce" />
                      <div className="w-4 h-4 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-4 h-4 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <img
                    src={uploadedImage}
                    alt="Uploaded mood"
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">EmoSet AI detected:</p>
                    <p className="text-lg font-semibold capitalize" style={{ color: detectedColor || `hsl(var(--mood-${selectedMood}))` }}>
                      {selectedMood}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <div 
                        className="w-4 h-4 rounded-full border"
                        style={{ backgroundColor: detectedColor || `hsl(var(--mood-${selectedMood}))` }}
                      />
                      <span className="text-xs text-muted-foreground">Color-Pedia mapping</span>
                    </div>
                  </div>
                </div>
              )}
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
import { MoodType } from "@/App";

interface ColorSpectrumProps {
  currentMood?: MoodType;
  selectedPosition?: number;
  onPositionChange?: (position: number) => void;
  className?: string;
}

const moodColors = {
  happy: '#FFD700',
  calm: '#87CEEB', 
  focused: '#9370DB',
  energetic: '#FF6347',
  stressed: '#DC143C',
  tired: '#708090',
  creative: '#DA70D6',
  neutral: '#A9A9A9',
  motivated: '#32CD32'
};

const ColorSpectrum = ({ 
  currentMood, 
  selectedPosition = 50, 
  onPositionChange,
  className = "" 
}: ColorSpectrumProps) => {
  
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!onPositionChange) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    onPositionChange(Math.max(0, Math.min(100, percentage)));
  };

  const getMoodPosition = (mood: MoodType) => {
    const positions = {
      happy: 85,
      motivated: 75,
      energetic: 65,
      creative: 55,
      focused: 45,
      calm: 35,
      neutral: 25,
      tired: 15,
      stressed: 5
    };
    return positions[mood] || 50;
  };

  const currentPosition = currentMood ? getMoodPosition(currentMood) : selectedPosition;

  return (
    <div className={`relative w-full ${className}`}>
      {/* Spectrum bar */}
      <div 
        className="h-8 rounded-full cursor-pointer relative overflow-hidden"
        style={{
          background: 'linear-gradient(90deg, #DC143C 0%, #FF6347 20%, #A9A9A9 40%, #87CEEB 60%, #9370DB 80%, #FFD700 100%)'
        }}
        onClick={handleClick}
      >
        {/* Current mood indicator */}
        <div
          className="absolute top-0 w-1 h-full bg-white shadow-lg transition-all duration-300"
          style={{ left: `${currentPosition}%`, transform: 'translateX(-50%)' }}
        />
        
        {/* Mood label */}
        <div
          className="absolute -top-8 transform -translate-x-1/2 text-xs font-medium text-foreground"
          style={{ left: `${currentPosition}%` }}
        >
          {currentMood && (
            <div className="bg-card px-2 py-1 rounded shadow-soft border border-border/50">
              {currentMood}
            </div>
          )}
        </div>
      </div>

      {/* Spectrum labels */}
      <div className="flex justify-between mt-2 text-xs text-muted-foreground">
        <span>Low Energy</span>
        <span>Balanced</span>
        <span>High Energy</span>
      </div>
    </div>
  );
};

export default ColorSpectrum;
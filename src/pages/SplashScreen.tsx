import { Button } from "@/components/ui/button";
import { Brain, Zap, Heart } from "lucide-react";

interface SplashScreenProps {
  onGetStarted: () => void;
}

const SplashScreen = ({ onGetStarted }: SplashScreenProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-primary opacity-5" />
      
      {/* Logo area */}
      <div className="text-center mb-12 animate-fade-in">
        <div className="relative mb-6">
          <div className="w-24 h-24 mx-auto bg-gradient-primary rounded-3xl flex items-center justify-center shadow-strong animate-pulse-glow">
            <Brain className="w-12 h-12 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-mood-energetic rounded-full flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-mood-happy rounded-full flex items-center justify-center">
            <Heart className="w-4 h-4 text-white" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-foreground mb-3 tracking-tight">
          PULSE
        </h1>
        
        <p className="text-lg text-muted-foreground max-w-sm leading-relaxed">
          <span className="font-medium text-primary">Personal Understanding</span> for Life, 
          <span className="font-medium text-primary"> Scheduling</span> & 
          <span className="font-medium text-primary"> Efficiency</span>
        </p>
      </div>

      {/* Tagline */}
      <div className="text-center mb-12 animate-slide-up">
        <p className="text-muted-foreground max-w-lg leading-relaxed px-4">
          An AI-powered productivity companion that adapts to your mood and schedule 
          to make your workflow <span className="text-primary font-medium">smarter</span>, 
          <span className="text-primary font-medium"> smoother</span>, and 
          <span className="text-primary font-medium"> stress-free</span>.
        </p>
      </div>

      {/* Call to action */}
      <div className="animate-bounce-in">
        <Button 
          onClick={onGetStarted}
          size="lg"
          className="px-12 py-4 text-lg font-medium rounded-2xl bg-gradient-primary hover:scale-105 transition-transform shadow-medium hover:shadow-strong"
        >
          Get Started
        </Button>
      </div>

      {/* Feature hints */}
      <div className="absolute bottom-8 left-0 right-0">
        <div className="flex justify-center items-center gap-8 text-muted-foreground text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-mood-calm rounded-full" />
            <span>Mood-Aware</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-mood-focused rounded-full" />
            <span>AI-Powered</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-mood-energetic rounded-full" />
            <span>Personalized</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
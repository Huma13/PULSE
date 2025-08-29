import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, User, Palette, CheckCircle } from "lucide-react";

interface RegistrationData {
  name: string;
  age: string;
  gender: string;
  cycleTracking?: boolean;
  emotions: {
    happy: { color: string; intensity: number };
    sad: { color: string; intensity: number };
    angry: { color: string; intensity: number };
  };
}

interface RegistrationProps {
  onComplete: (data: RegistrationData) => void;
}

const Registration = ({ onComplete }: RegistrationProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<RegistrationData>({
    name: "",
    age: "",
    gender: "",
    cycleTracking: false,
    emotions: {
      happy: { color: "#FFD700", intensity: 7 },
      sad: { color: "#4169E1", intensity: 5 },
      angry: { color: "#DC143C", intensity: 6 }
    }
  });

  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    onComplete(formData);
    navigate('/mood');
  };

  const updateFormData = (updates: Partial<RegistrationData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const updateEmotionColor = (emotion: keyof typeof formData.emotions, color: string) => {
    setFormData(prev => ({
      ...prev,
      emotions: {
        ...prev.emotions,
        [emotion]: { ...prev.emotions[emotion], color }
      }
    }));
  };

  const updateEmotionIntensity = (emotion: keyof typeof formData.emotions, intensity: number) => {
    setFormData(prev => ({
      ...prev,
      emotions: {
        ...prev.emotions,
        [emotion]: { ...prev.emotions[emotion], intensity }
      }
    }));
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name.trim() && formData.age.trim() && formData.gender;
      case 2:
        return true; // Emotions have defaults
      case 3:
        return true; // Summary step
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-surface px-6 py-8">
      <div className="max-w-md mx-auto">
        {/* Progress indicator */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                  step === currentStep
                    ? 'bg-primary text-primary-foreground'
                    : step < currentStep
                    ? 'bg-success text-success-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {step < currentStep ? <CheckCircle className="w-4 h-4" /> : step}
              </div>
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            Step {currentStep} of 3
          </span>
        </div>

        {/* Step 1: Basic Info */}
        {currentStep === 1 && (
          <div className="pulse-card animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Tell us about yourself</h2>
                <p className="text-sm text-muted-foreground">Help PULSE personalize your experience</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => updateFormData({ name: e.target.value })}
                  placeholder="Enter your name"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => updateFormData({ age: e.target.value })}
                  placeholder="Enter your age"
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Gender</Label>
                <RadioGroup
                  value={formData.gender}
                  onValueChange={(value) => updateFormData({ gender: value })}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Other</Label>
                  </div>
                </RadioGroup>
              </div>

              {formData.gender === 'female' && (
                <div className="p-4 bg-surface-muted rounded-lg animate-fade-in">
                  <Label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.cycleTracking}
                      onChange={(e) => updateFormData({ cycleTracking: e.target.checked })}
                      className="rounded border-border"
                    />
                    <span className="text-sm">
                      Enable cycle tracking for better mood predictions
                    </span>
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Optional: Helps provide more accurate productivity insights
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 2: Baseline Emotions */}
        {currentStep === 2 && (
          <div className="pulse-card animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Palette className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Your emotion palette</h2>
                <p className="text-sm text-muted-foreground">Associate colors and intensities with core emotions</p>
              </div>
            </div>

            <div className="space-y-6">
              {Object.entries(formData.emotions).map(([emotion, data]) => (
                <div key={emotion} className="space-y-3">
                  <h3 className="font-medium capitalize text-foreground">{emotion}</h3>
                  
                  {/* Color picker */}
                  <div className="flex items-center gap-3">
                    <Label className="text-sm">Color:</Label>
                    <input
                      type="color"
                      value={data.color}
                      onChange={(e) => updateEmotionColor(emotion as keyof typeof formData.emotions, e.target.value)}
                      className="w-12 h-8 rounded border-border cursor-pointer"
                    />
                    <div
                      className="flex-1 h-8 rounded"
                      style={{ backgroundColor: data.color }}
                    />
                  </div>

                  {/* Intensity slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label className="text-sm">Intensity:</Label>
                      <span className="text-sm text-muted-foreground">{data.intensity}/10</span>
                    </div>
                    <Slider
                      value={[data.intensity]}
                      onValueChange={([value]) => updateEmotionIntensity(emotion as keyof typeof formData.emotions, value)}
                      max={10}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {currentStep === 3 && (
          <div className="pulse-card animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-success" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Setup complete!</h2>
                <p className="text-sm text-muted-foreground">Review your preferences</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-surface-muted rounded-lg">
                <h3 className="font-medium mb-2">Personal Info</h3>
                <div className="text-sm space-y-1">
                  <p><span className="text-muted-foreground">Name:</span> {formData.name}</p>
                  <p><span className="text-muted-foreground">Age:</span> {formData.age}</p>
                  <p><span className="text-muted-foreground">Gender:</span> {formData.gender}</p>
                  {formData.gender === 'female' && formData.cycleTracking && (
                    <p className="text-success text-xs">✓ Cycle tracking enabled</p>
                  )}
                </div>
              </div>

              <div className="p-4 bg-surface-muted rounded-lg">
                <h3 className="font-medium mb-2">Emotion Palette</h3>
                <div className="space-y-2">
                  {Object.entries(formData.emotions).map(([emotion, data]) => (
                    <div key={emotion} className="flex items-center justify-between">
                      <span className="text-sm capitalize">{emotion}</span>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-6 h-6 rounded"
                          style={{ backgroundColor: data.color }}
                        />
                        <span className="text-xs text-muted-foreground">{data.intensity}/10</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>

          {currentStep < 3 ? (
            <Button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="flex items-center gap-2"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={handleComplete}
              className="flex items-center gap-2 bg-gradient-primary"
            >
              Finish Setup
              <CheckCircle className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Registration;
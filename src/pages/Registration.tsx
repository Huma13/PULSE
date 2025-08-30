import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, User, Palette, CheckCircle } from "lucide-react";

interface RegistrationData {
  nickname: string;
  name: string;
  age: string;
  gender: string;
  occupation: string;
  workSchedule: string;
  sleepSchedule: string;
  healthConditions: string[];
  cycleTracking?: boolean;
  cycleLength?: number;
  lastCycleDate?: string;
  stressLevel: number;
  productivityGoals: string[];
  workStyle: string;
  personalityType: string;
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
    nickname: "",
    name: "",
    age: "",
    gender: "",
    occupation: "",
    workSchedule: "9-5",
    sleepSchedule: "11pm-7am",
    healthConditions: [],
    cycleTracking: false,
    cycleLength: 28,
    lastCycleDate: "",
    stressLevel: 5,
    productivityGoals: [],
    workStyle: "focused",
    personalityType: "balanced",
    emotions: {
      happy: { color: "#FFD700", intensity: 7 },
      sad: { color: "#4169E1", intensity: 5 },
      angry: { color: "#DC143C", intensity: 6 }
    }
  });

  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < 5) {
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
        return formData.nickname.trim() && formData.name.trim() && formData.age.trim() && formData.gender;
      case 2:
        return formData.occupation.trim() && formData.workSchedule.trim();
      case 3:
        return true; // Health conditions are optional
      case 4:
        return true; // Emotions have defaults
      case 5:
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
            {[1, 2, 3, 4, 5].map((step) => (
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
            Step {currentStep} of 5
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
                <Label htmlFor="nickname">Nickname (What should PULSE call you?)</Label>
                <Input
                  id="nickname"
                  value={formData.nickname}
                  onChange={(e) => updateFormData({ nickname: e.target.value })}
                  placeholder="Choose a friendly nickname"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => updateFormData({ name: e.target.value })}
                  placeholder="Enter your full name"
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
                <div className="p-4 bg-surface-muted rounded-lg animate-fade-in space-y-3">
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
                  
                  {formData.cycleTracking && (
                    <div className="space-y-3 animate-fade-in">
                      <div>
                        <Label htmlFor="cycleLength" className="text-sm">Average cycle length (days)</Label>
                        <Input
                          id="cycleLength"
                          type="number"
                          value={formData.cycleLength}
                          onChange={(e) => updateFormData({ cycleLength: parseInt(e.target.value) || 28 })}
                          min="21"
                          max="35"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastCycle" className="text-sm">Last period start date</Label>
                        <Input
                          id="lastCycle"
                          type="date"
                          value={formData.lastCycleDate}
                          onChange={(e) => updateFormData({ lastCycleDate: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  )}
                  
                  <p className="text-xs text-muted-foreground">
                    Optional: Helps provide more accurate productivity insights
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 2: Work & Lifestyle */}
        {currentStep === 2 && (
          <div className="pulse-card animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Work & Lifestyle</h2>
                <p className="text-sm text-muted-foreground">Help PULSE understand your daily routine</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="occupation">Occupation/Role</Label>
                <Input
                  id="occupation"
                  value={formData.occupation}
                  onChange={(e) => updateFormData({ occupation: e.target.value })}
                  placeholder="e.g., Software Engineer, Student, Manager"
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Work Schedule</Label>
                <Select 
                  value={formData.workSchedule}
                  onValueChange={(value) => updateFormData({ workSchedule: value })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9-5">9 AM - 5 PM</SelectItem>
                    <SelectItem value="flexible">Flexible hours</SelectItem>
                    <SelectItem value="night-shift">Night shift</SelectItem>
                    <SelectItem value="rotating">Rotating shifts</SelectItem>
                    <SelectItem value="freelance">Freelance/Project-based</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Sleep Schedule</Label>
                <Select 
                  value={formData.sleepSchedule}
                  onValueChange={(value) => updateFormData({ sleepSchedule: value })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10pm-6am">10 PM - 6 AM</SelectItem>
                    <SelectItem value="11pm-7am">11 PM - 7 AM</SelectItem>
                    <SelectItem value="12am-8am">12 AM - 8 AM</SelectItem>
                    <SelectItem value="1am-9am">1 AM - 9 AM</SelectItem>
                    <SelectItem value="irregular">Irregular schedule</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Work Style Preference</Label>
                <Select 
                  value={formData.workStyle}
                  onValueChange={(value) => updateFormData({ workStyle: value })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="focused">Deep focus sessions</SelectItem>
                    <SelectItem value="collaborative">Collaborative work</SelectItem>
                    <SelectItem value="mixed">Mixed approach</SelectItem>
                    <SelectItem value="multitasking">Multitasking</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Current Stress Level</Label>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Low</span>
                  <span className="text-sm text-muted-foreground">High</span>
                </div>
                <Slider
                  value={[formData.stressLevel]}
                  onValueChange={([value]) => updateFormData({ stressLevel: value })}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <p className="text-center text-sm text-muted-foreground">{formData.stressLevel}/10</p>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Health & Wellness */}
        {currentStep === 3 && (
          <div className="pulse-card animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Health & Wellness</h2>
                <p className="text-sm text-muted-foreground">Optional details for better personalization</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Health Conditions (Select all that apply)</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {['Anxiety', 'Depression', 'ADHD', 'Insomnia', 'Chronic fatigue', 'Migraines', 'None'].map((condition) => (
                    <Label key={condition} className="flex items-center gap-2 p-2 rounded border cursor-pointer hover:bg-surface-muted">
                      <input
                        type="checkbox"
                        checked={formData.healthConditions.includes(condition)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            updateFormData({ healthConditions: [...formData.healthConditions, condition] });
                          } else {
                            updateFormData({ healthConditions: formData.healthConditions.filter(c => c !== condition) });
                          }
                        }}
                        className="rounded border-border"
                      />
                      <span className="text-sm">{condition}</span>
                    </Label>
                  ))}
                </div>
              </div>

              <div>
                <Label>Productivity Goals (Select up to 3)</Label>
                <div className="grid grid-cols-1 gap-2 mt-2">
                  {[
                    'Better work-life balance',
                    'Reduce procrastination', 
                    'Improve focus and concentration',
                    'Manage stress and anxiety',
                    'Build consistent habits',
                    'Increase energy levels',
                    'Better time management'
                  ].map((goal) => (
                    <Label key={goal} className="flex items-center gap-2 p-2 rounded border cursor-pointer hover:bg-surface-muted">
                      <input
                        type="checkbox"
                        checked={formData.productivityGoals.includes(goal)}
                        onChange={(e) => {
                          if (e.target.checked && formData.productivityGoals.length < 3) {
                            updateFormData({ productivityGoals: [...formData.productivityGoals, goal] });
                          } else if (!e.target.checked) {
                            updateFormData({ productivityGoals: formData.productivityGoals.filter(g => g !== goal) });
                          }
                        }}
                        className="rounded border-border"
                        disabled={!formData.productivityGoals.includes(goal) && formData.productivityGoals.length >= 3}
                      />
                      <span className="text-sm">{goal}</span>
                    </Label>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Selected: {formData.productivityGoals.length}/3
                </p>
              </div>

              <div>
                <Label>Personality Type</Label>
                <Select 
                  value={formData.personalityType}
                  onValueChange={(value) => updateFormData({ personalityType: value })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="introvert">Introvert - I recharge with alone time</SelectItem>
                    <SelectItem value="extrovert">Extrovert - I thrive around people</SelectItem>
                    <SelectItem value="balanced">Balanced - Depends on the situation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Baseline Emotions */}
        {currentStep === 4 && (
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

        {/* Step 5: Confirmation */}
        {currentStep === 5 && (
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
                  <p><span className="text-muted-foreground">Nickname:</span> {formData.nickname}</p>
                  <p><span className="text-muted-foreground">Name:</span> {formData.name}</p>
                  <p><span className="text-muted-foreground">Age:</span> {formData.age}</p>
                  <p><span className="text-muted-foreground">Occupation:</span> {formData.occupation}</p>
                  <p><span className="text-muted-foreground">Work Schedule:</span> {formData.workSchedule}</p>
                  {formData.gender === 'female' && formData.cycleTracking && (
                    <p className="text-success text-xs">✓ Cycle tracking enabled</p>
                  )}
                  {formData.productivityGoals.length > 0 && (
                    <p><span className="text-muted-foreground">Goals:</span> {formData.productivityGoals.join(', ')}</p>
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

          {currentStep < 5 ? (
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
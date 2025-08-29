import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import SplashScreen from "./pages/SplashScreen";
import Registration from "./pages/Registration";
import MoodInput from "./pages/MoodInput";
import DailySuggestions from "./pages/DailySuggestions";
import Insights from "./pages/Insights";
import BottomNavigation from "./components/BottomNavigation";
import FloatingCompanion from "./components/FloatingCompanion";

const queryClient = new QueryClient();

export type MoodType = 'happy' | 'calm' | 'focused' | 'energetic' | 'stressed' | 'tired' | 'creative' | 'neutral' | 'motivated' | 'sad';

const App = () => {
  const [currentMood, setCurrentMood] = useState<MoodType>('neutral');
  const [hasStarted, setHasStarted] = useState(false);
  const [hasCompletedRegistration, setHasCompletedRegistration] = useState(false);
  const [registrationData, setRegistrationData] = useState(null);

  const handleRegistrationComplete = (data: any) => {
    setRegistrationData(data);
    setHasCompletedRegistration(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-gradient-surface">
            <Routes>
              <Route 
                path="/" 
                element={
                  !hasStarted ? (
                    <SplashScreen onGetStarted={() => setHasStarted(true)} />
                  ) : !hasCompletedRegistration ? (
                    <Registration onComplete={handleRegistrationComplete} />
                  ) : (
                    <MoodInput onMoodSelect={setCurrentMood} />
                  )
                } 
              />
              <Route 
                path="/registration" 
                element={<Registration onComplete={handleRegistrationComplete} />} 
              />
              <Route 
                path="/mood" 
                element={<MoodInput onMoodSelect={setCurrentMood} />} 
              />
              <Route 
                path="/tasks" 
                element={<DailySuggestions currentMood={currentMood} />} 
              />
              <Route 
                path="/insights" 
                element={<Insights currentMood={currentMood} />} 
              />
            </Routes>
            
            {/* Show navigation and companion only after registration */}
            {hasStarted && hasCompletedRegistration && (
              <>
                <BottomNavigation />
                <FloatingCompanion 
                  currentMood={currentMood} 
                  onMoodUpdate={setCurrentMood}
                />
              </>
            )}
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import SplashScreen from "./pages/SplashScreen";
import MoodInput from "./pages/MoodInput";
import DailySuggestions from "./pages/DailySuggestions";
import Insights from "./pages/Insights";
import BottomNavigation from "./components/BottomNavigation";
import FloatingCompanion from "./components/FloatingCompanion";

const queryClient = new QueryClient();

export type MoodType = 'happy' | 'calm' | 'focused' | 'energetic' | 'stressed' | 'tired' | 'creative' | 'neutral' | 'motivated';

const App = () => {
  const [currentMood, setCurrentMood] = useState<MoodType>('neutral');
  const [hasStarted, setHasStarted] = useState(false);

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
                  hasStarted ? (
                    <MoodInput onMoodSelect={setCurrentMood} />
                  ) : (
                    <SplashScreen onGetStarted={() => setHasStarted(true)} />
                  )
                } 
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
                element={<Insights />} 
              />
            </Routes>
            
            {/* Show navigation and companion only after splash */}
            {hasStarted && (
              <>
                <BottomNavigation />
                <FloatingCompanion currentMood={currentMood} />
              </>
            )}
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
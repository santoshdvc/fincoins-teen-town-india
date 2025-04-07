
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useGameContext } from "@/context/GameContext";
import { Coins, TrendingUp, Wallet } from "lucide-react";
import { useState } from "react";

const steps = [
  {
    title: "Welcome to FinTown!",
    description: "A virtual town where you can learn about money without any risk.",
    icon: <Coins className="h-12 w-12 text-finpurple" />,
  },
  {
    title: "Your Virtual Wallet",
    description: "You start with 10,000 FinCoins (FC). Use them wisely for purchases, savings, and investments.",
    icon: <Wallet className="h-12 w-12 text-finpurple" />,
  },
  {
    title: "Learn & Earn",
    description: "Complete challenges to learn financial concepts and earn more FinCoins!",
    icon: <TrendingUp className="h-12 w-12 text-finpurple" />,
  },
];

export function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const { completeOnboarding } = useGameContext();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md animate-scale-in">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">{steps[currentStep].icon}</div>
          <CardTitle className="text-2xl">{steps[currentStep].title}</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground">{steps[currentStep].description}</p>
          
          <div className="flex justify-center gap-1 mt-6">
            {steps.map((_, index) => (
              <div 
                key={index}
                className={`h-2 rounded-full ${
                  index === currentStep ? 'w-8 bg-finpurple' : 'w-2 bg-muted'
                } transition-all duration-300`}
              />
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full bg-finpurple"
            onClick={handleNext}
          >
            {currentStep < steps.length - 1 ? 'Next' : 'Start Learning!'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

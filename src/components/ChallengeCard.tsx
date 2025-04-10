
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useGameContext } from "@/context/GameContext";
import { CheckCircle, Coins, Heart, PiggyBank, TrendingUp, Film } from "lucide-react";
import { SaveMoneyAnimation } from "./animations/SaveMoneyAnimation";
import { InvestAnimation } from "./animations/InvestAnimation";
import { MovieAnimation } from "./animations/MovieAnimation";

type ChallengeCategoryIconProps = {
  category: 'saving' | 'investing' | 'budgeting' | 'emergency';
};

const ChallengeCategoryIcon = ({ category }: ChallengeCategoryIconProps) => {
  switch (category) {
    case 'saving':
      return <PiggyBank className="h-5 w-5" />;
    case 'investing':
      return <TrendingUp className="h-5 w-5" />;
    case 'budgeting':
      return <Coins className="h-5 w-5" />;
    case 'emergency':
      return <Heart className="h-5 w-5" />;
    default:
      return <Coins className="h-5 w-5" />;
  }
};

export function ChallengeCard() {
  const { challenges, completeChallenge } = useGameContext();
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationType, setAnimationType] = useState<'saving' | 'investing' | 'budgeting' | 'emergency' | null>(null);
  
  // Find the first incomplete challenge or use the first one
  const activeChallenge = challenges.find(c => !c.completed) || challenges[0];

  const handleComplete = () => {
    if (activeChallenge && !activeChallenge.completed) {
      setAnimationType(activeChallenge.category);
      setShowAnimation(true);
      
      // After animation plays, complete the challenge
      setTimeout(() => {
        completeChallenge(activeChallenge.id);
        setTimeout(() => setShowAnimation(false), 1500);
      }, 1500);
    }
  };

  return (
    <>
      <Card className="border-2 border-muted hover:border-finpurple/30 transition-all">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Daily Challenge</CardTitle>
            <Badge 
              className={`${activeChallenge.completed ? 'bg-green-500' : 'bg-finpurple'} flex items-center gap-1`}
            >
              {activeChallenge.completed ? (
                <>
                  <CheckCircle className="h-3 w-3" />
                  <span>Completed</span>
                </>
              ) : (
                <>
                  <ChallengeCategoryIcon category={activeChallenge.category} />
                  <span>{activeChallenge.category}</span>
                </>
              )}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <h3 className="font-bold text-lg mb-2">{activeChallenge.title}</h3>
          <p className="text-muted-foreground text-sm mb-4">{activeChallenge.description}</p>
          <div className="flex items-center gap-2">
            <Coins className="h-5 w-5 text-fingold-dark" />
            <span className="font-medium">Reward: {activeChallenge.reward} FC</span>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className={`w-full ${activeChallenge.completed ? 'bg-green-500' : 'bg-finpurple hover:bg-finpurple-dark'}`}
            onClick={handleComplete}
            disabled={activeChallenge.completed || showAnimation}
          >
            {activeChallenge.completed 
              ? 'Challenge Complete!' 
              : showAnimation 
                ? 'Completing...' 
                : 'Complete Challenge'}
          </Button>
        </CardFooter>
      </Card>
      
      {showAnimation && animationType === 'saving' && <SaveMoneyAnimation isVisible={showAnimation} />}
      {showAnimation && animationType === 'investing' && <InvestAnimation isVisible={showAnimation} />}
      {showAnimation && animationType === 'budgeting' && <MovieAnimation isVisible={showAnimation} />}
    </>
  );
}

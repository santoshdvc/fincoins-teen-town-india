
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, Coins, TrendingDown, TrendingUp } from "lucide-react";
import { useGameContext } from "@/context/GameContext";
import { SaveMoneyAnimation } from "../animations/SaveMoneyAnimation";

type EnhancedInvestment = {
  id: string;
  name: string;
  amount: number;
  returnRate: number;
  maturityDate: Date;
  daysLeft: number;
  progress: number;
  expectedReturn: number;
};

export function InvestmentSummary() {
  const { investments, balance } = useGameContext();
  const [showAnimation, setShowAnimation] = useState(false);

  // Calculate days until maturity for each investment
  const investmentsWithDaysLeft = investments.map(investment => {
    const today = new Date();
    const maturityDate = new Date(investment.maturityDate);
    const daysLeft = Math.ceil((maturityDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    const progress = Math.max(0, Math.min(100, (7 - daysLeft) / 7 * 100)); // Assuming all are 7-day investments
    
    return {
      ...investment,
      daysLeft,
      progress,
      expectedReturn: investment.amount * (investment.returnRate / 100),
    };
  });
  
  // Show animation on hover of the total invested card
  const handleShowAnimation = () => {
    setShowAnimation(true);
    setTimeout(() => setShowAnimation(false), 3000);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <h2 className="text-xl font-bold">Investment Summary</h2>
          </CardHeader>
          <CardContent>
            {investments.length === 0 ? (
              <div className="text-center py-8">
                <TrendingUp className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground">You haven't made any investments yet.</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Start investing to grow your FinCoins!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div 
                  className="flex justify-between items-center p-4 border rounded-lg bg-card hover:bg-card/80 transition-colors cursor-pointer"
                  onClick={handleShowAnimation}
                >
                  <div>
                    <p className="text-sm text-muted-foreground">Total Invested</p>
                    <p className="font-bold text-xl">
                      {investments.reduce((total, inv) => total + inv.amount, 0).toLocaleString()} FC
                    </p>
                  </div>
                  <Coins className="h-8 w-8 text-finpurple" />
                </div>
                
                <div className="flex justify-between items-center p-4 border rounded-lg bg-card">
                  <div>
                    <p className="text-sm text-muted-foreground">Expected Returns</p>
                    <p className="font-bold text-xl text-green-600">
                      +{investmentsWithDaysLeft
                        .reduce((total, inv) => total + inv.expectedReturn, 0)
                        .toLocaleString()} FC
                    </p>
                  </div>
                  <ArrowUp className="h-8 w-8 text-green-600" />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          {investmentsWithDaysLeft.map((investment) => (
            <InvestmentCard key={investment.id} investment={investment} />
          ))}
          
          {investments.length === 0 && (
            <InvestmentTip />
          )}
        </div>
      </div>
      
      <SaveMoneyAnimation isVisible={showAnimation} />
    </>
  );
}

function InvestmentCard({ investment }: { investment: EnhancedInvestment }) {
  return (
    <Card className="bg-card">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold">{investment.name}</h3>
          <Badge className={investment.returnRate > 10 ? "bg-amber-500" : "bg-green-500"}>
            {investment.returnRate > 10 ? (
              <TrendingDown className="h-3 w-3 mr-1" />
            ) : (
              <TrendingUp className="h-3 w-3 mr-1" />
            )}
            {investment.returnRate}% Return
          </Badge>
        </div>
        
        <div className="flex justify-between text-sm mb-1">
          <span>Amount: {investment.amount} FC</span>
          <span className="text-green-600">+{investment.expectedReturn} FC</span>
        </div>
        
        <Progress value={investment.progress} className="h-2 mb-1" />
        
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>In progress</span>
          <span>
            {investment.daysLeft <= 0 
              ? "Ready to claim!" 
              : `${investment.daysLeft} days left`}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

function InvestmentTip() {
  return (
    <Card className="bg-finpurple-light/20 border border-finpurple/30">
      <CardContent className="p-4">
        <h3 className="font-bold mb-2">Investment Tip</h3>
        <p className="text-sm">
          Start with lower-risk investments as you learn. Higher returns often mean higher risks!
        </p>
      </CardContent>
    </Card>
  );
}

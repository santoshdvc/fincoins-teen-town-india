
import { InvestmentForm } from "@/components/InvestmentForm";
import { Navbar } from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGameContext } from "@/context/GameContext";
import { ArrowUp, Coins, TrendingDown, TrendingUp } from "lucide-react";

const Invest = () => {
  const { investments, balance } = useGameContext();

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Investments</h1>
            <p className="text-muted-foreground">Grow your wealth over time</p>
          </div>
          
          <Card className="flex items-center gap-2 p-2">
            <Coins className="h-5 w-5 text-finpurple" />
            <span className="font-semibold">{balance.toLocaleString()} FC</span>
          </Card>
        </div>
        
        <Tabs defaultValue="investments" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="investments" className="flex-1">My Investments</TabsTrigger>
            <TabsTrigger value="new" className="flex-1">New Investment</TabsTrigger>
          </TabsList>
          <TabsContent value="investments">
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
                      <div className="flex justify-between items-center p-4 border rounded-lg">
                        <div>
                          <p className="text-sm text-muted-foreground">Total Invested</p>
                          <p className="font-bold text-xl">
                            {investments.reduce((total, inv) => total + inv.amount, 0).toLocaleString()} FC
                          </p>
                        </div>
                        <Coins className="h-8 w-8 text-finpurple" />
                      </div>
                      
                      <div className="flex justify-between items-center p-4 border rounded-lg">
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
                  <Card key={investment.id}>
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
                ))}
                
                {investments.length === 0 && (
                  <Card className="bg-finpurple-light border-none">
                    <CardContent className="p-4">
                      <h3 className="font-bold mb-2">Investment Tip</h3>
                      <p className="text-sm">
                        Start with lower-risk investments as you learn. Higher returns often mean higher risks!
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="new">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InvestmentForm />
              
              <Card className="bg-finpurple-light h-fit">
                <CardHeader className="pb-2">
                  <h3 className="font-bold">Understanding Risk & Return</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">
                    In investing, higher potential returns typically come with higher risks. 
                    It's important to understand this relationship before investing.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="bg-green-100 p-2 rounded-full">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">Low Risk (5%)</p>
                        <p className="text-xs text-muted-foreground">
                          Like fixed deposits - safer but lower returns
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="bg-amber-100 p-2 rounded-full">
                        <TrendingUp className="h-4 w-4 text-amber-600" />
                      </div>
                      <div>
                        <p className="font-medium">Medium Risk (10%)</p>
                        <p className="text-xs text-muted-foreground">
                          Like mutual funds - balanced risk and return
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="bg-red-100 p-2 rounded-full">
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium">High Risk (15%)</p>
                        <p className="text-xs text-muted-foreground">
                          Like stocks - higher potential returns but riskier
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Invest;

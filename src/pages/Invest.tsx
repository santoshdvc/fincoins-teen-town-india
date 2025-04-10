
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGameContext } from "@/context/GameContext";
import { InvestmentForm } from "@/components/InvestmentForm";
import { InvestmentSummary } from "@/components/investments/InvestmentSummary";
import { RiskReturnGuide } from "@/components/investments/RiskReturnGuide";
import { Coins } from "lucide-react";

const Invest = () => {
  const { balance } = useGameContext();

  return (
    <div className="min-h-screen bg-background">
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
            <InvestmentSummary />
          </TabsContent>
          
          <TabsContent value="new">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InvestmentForm />
              <RiskReturnGuide />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Invest;

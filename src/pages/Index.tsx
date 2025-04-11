
import { ChallengeCard } from "@/components/ChallengeCard";
import { Navbar } from "@/components/Navbar";
import { OnboardingWizard } from "@/components/OnboardingWizard";
import { WalletCard } from "@/components/WalletCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useGameContext } from "@/context/GameContext";
import { BadgeIndianRupee, BarChart3, FileText, PiggyBank, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { isNewUser, isRealTimeMode, toggleRealTimeMode } = useGameContext();

  return (
    <div className="min-h-screen bg-background">
      {isNewUser && <OnboardingWizard />}
      
      <Navbar />
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="col-span-1">
            <WalletCard />
          </div>
          
          <div className="col-span-1 md:col-span-2">
            <ChallengeCard />
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <Link to="/marketplace">
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 bg-finpurple/10 rounded-full flex items-center justify-center mb-2">
                  <BadgeIndianRupee className="h-6 w-6 text-finpurple" />
                </div>
                <h3 className="font-bold text-lg">Marketplace</h3>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-muted-foreground">
                  Practice spending wisely on virtual items to understand budgeting.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Visit Marketplace</Button>
              </CardFooter>
            </Card>
          </Link>
          
          <Link to="/invest">
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 bg-finpurple/10 rounded-full flex items-center justify-center mb-2">
                  <TrendingUp className="h-6 w-6 text-finpurple" />
                </div>
                <h3 className="font-bold text-lg">Investments</h3>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-muted-foreground">
                  Learn how to grow your money through different investment options.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Invest Now</Button>
              </CardFooter>
            </Card>
          </Link>
          
          <Link to="/reports">
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 bg-finpurple/10 rounded-full flex items-center justify-center mb-2">
                  <BarChart3 className="h-6 w-6 text-finpurple" />
                </div>
                <h3 className="font-bold text-lg">Financial Reports</h3>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-muted-foreground">
                  Track your real spending and get monthly financial reports.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View Reports</Button>
              </CardFooter>
            </Card>
          </Link>
        </div>
        
        <div className="mt-8 bg-card p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-3">
            <PiggyBank className="h-6 w-6 text-finpurple" />
            <h2 className="text-xl font-bold">Financial Tip of the Day</h2>
          </div>
          <p className="text-muted-foreground">
            Start saving early! Even small amounts add up over time thanks to compound interest. 
            Try to save at least 10% of any money you receive.
          </p>
          {!isRealTimeMode && (
            <div className="mt-4">
              <Button variant="outline" onClick={toggleRealTimeMode}>
                Enable Real-Time Tracking
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                Track your actual income and expenses for a more realistic learning experience
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

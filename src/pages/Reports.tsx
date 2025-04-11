
import React from "react";
import { Navbar } from "@/components/Navbar";
import { MonthlyReport } from "@/components/MonthlyReport";
import { RealTimeTracker } from "@/components/RealTimeTracker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGameContext } from "@/context/GameContext";
import { BarChart3, Clock, Filter, Calendar } from "lucide-react";

const Reports = () => {
  const { isRealTimeMode } = useGameContext();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Financial Reports</h1>
            <p className="text-muted-foreground">Track your spending and saving habits</p>
          </div>
          
          <div className="flex items-center gap-2 bg-card p-2 rounded-lg">
            <div className={`w-3 h-3 rounded-full ${isRealTimeMode ? 'bg-green-500' : 'bg-amber-500'}`}></div>
            <span className="text-sm">
              {isRealTimeMode ? 'Real-Time Mode Active' : 'Game Mode Active'}
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <RealTimeTracker />
          </div>
          
          <div className="lg:col-span-2">
            <Tabs defaultValue="monthly" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="monthly" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Monthly Report</span>
                </TabsTrigger>
                <TabsTrigger value="transactions" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Recent Transactions</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="monthly" className="mt-4">
                <MonthlyReport />
              </TabsContent>
              
              <TabsContent value="transactions" className="mt-4">
                <TransactionsList />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

// Component for displaying recent transactions
const TransactionsList = () => {
  const { transactions, isRealTimeMode } = useGameContext();
  
  if (!isRealTimeMode) {
    return (
      <div className="bg-card rounded-lg p-6">
        <p className="text-center text-muted-foreground py-8">
          Enable real-time mode to track your transactions
        </p>
      </div>
    );
  }
  
  if (transactions.length === 0) {
    return (
      <div className="bg-card rounded-lg p-6">
        <p className="text-center text-muted-foreground py-8">
          No transactions recorded yet
        </p>
      </div>
    );
  }
  
  // Sort transactions by date, newest first
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  return (
    <div className="bg-card rounded-lg overflow-hidden">
      <div className="p-4 border-b border-border flex justify-between items-center">
        <h3 className="font-medium">Recent Transactions</h3>
        <button className="flex items-center gap-1 text-sm text-muted-foreground">
          <Filter className="h-4 w-4" />
          <span>Filter</span>
        </button>
      </div>
      
      <div className="divide-y divide-border">
        {sortedTransactions.map((transaction) => {
          const date = new Date(transaction.date);
          const formattedDate = date.toLocaleDateString();
          const formattedTime = date.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          });
          
          return (
            <div 
              key={transaction.id} 
              className="p-4 flex justify-between hover:bg-muted/50 transition-colors"
            >
              <div>
                <p className="font-medium">{transaction.description}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{transaction.category}</span>
                  <span>•</span>
                  <span>{formattedDate} at {formattedTime}</span>
                </div>
              </div>
              <div className={`font-medium ${transaction.type === 'income' ? 'text-green-500' : ''}`}>
                {transaction.type === 'income' ? '+' : '-'}{transaction.amount} FC
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Reports;

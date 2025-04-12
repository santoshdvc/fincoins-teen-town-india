
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useGameContext } from "@/context/GameContext";
import { PiggyBank, Wallet } from "lucide-react";

export function RealTimeTracker() {
  const { isRealTimeMode, toggleRealTimeMode, addCoins, spendCoins, addTransaction } = useGameContext();
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"income" | "expense">("income");
  const [category, setCategory] = useState("General");
  const [description, setDescription] = useState("");

  // Predefined categories
  const incomeCategories = ["Salary", "Gifts", "Rewards", "Other"];
  const expenseCategories = ["Food", "Entertainment", "Transportation", "Shopping", "Education", "Investment", "Other"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const parsedAmount = parseFloat(amount);
    
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return;
    }
    
    if (type === "income") {
      addCoins(parsedAmount);
    } else {
      spendCoins(parsedAmount);
    }
    
    // Add transaction record
    addTransaction({
      amount: parsedAmount,
      type,
      category,
      description: description || `${type === "income" ? "Income" : "Expense"} - ${category}`,
    });
    
    // Reset form
    setAmount("");
    setDescription("");
  };

  if (!isRealTimeMode) {
    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PiggyBank className="h-5 w-5 text-finpurple" />
            Real-Time Money Tracking
          </CardTitle>
          <CardDescription>
            Track your actual income and expenses for more realistic financial learning
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Enable real-time mode to track your actual income and expenses. This will help you
            get a better understanding of your spending habits and financial health.
          </p>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => {
              if (typeof toggleRealTimeMode === "function") {
                toggleRealTimeMode();
              }
            }}
          >Enable Real-Time Mode</Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-finpurple" />
            Track Your Money
          </CardTitle>
          <Button variant="outline" size="sm" onClick={toggleRealTimeMode}>
            Disable Real-Time Mode
          </Button>
        </div>
        <CardDescription>Record your income and expenses to track your financial health</CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="transaction-type">Transaction Type</Label>
              <Select value={type} onValueChange={(value) => setType(value as "income" | "expense")}>
                <SelectTrigger id="transaction-type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (FC)</Label>
              <Input 
                id="amount" 
                type="number" 
                min="0" 
                step="1"
                value={amount} 
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {type === "income" 
                  ? incomeCategories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))
                  : expenseCategories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))
                }
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea 
              id="description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add notes about this transaction"
            />
          </div>
          
          <Button type="submit" className="w-full">
            Record {type === "income" ? "Income" : "Expense"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

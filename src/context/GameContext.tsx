import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

type Challenge = {
  id: string;
  title: string;
  description: string;
  reward: number;
  completed: boolean;
  category: 'saving' | 'investing' | 'budgeting' | 'emergency';
};

type Investment = {
  id: string;
  name: string;
  amount: number;
  returnRate: number;
  maturityDate: Date;
};

type Item = {
  id: string;
  name: string;
  price: number;
  category: string;
  image?: string;
};

type Transaction = {
  id: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  description: string;
  date: Date;
};

type Goal = {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  deadline?: Date;
  completed: boolean;
  category: string;
};

interface GameContextType {
  balance: number;
  addCoins: (amount: number) => void;
  spendCoins: (amount: number) => void;
  challenges: Challenge[];
  completeChallenge: (id: string) => void;
  investments: Investment[];
  addInvestment: (investment: Omit<Investment, "id">) => void;
  purchasedItems: string[];
  purchaseItem: (itemId: string, price: number) => boolean;
  isNewUser: boolean;
  completeOnboarding: () => void;
  inventory: Item[];
  isRealTimeMode: boolean;
  toggleRealTimeMode: () => void;
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, "id" | "date">) => void;
  getMonthlyReport: () => {
    totalIncome: number;
    totalExpenses: number;
    categories: { [key: string]: number };
  };
  goals: Goal[];
  addGoal: (goal: Omit<Goal, "id" | "completed" | "currentAmount">) => void;
  updateGoalProgress: (id: string, amount: number) => void;
  completeGoal: (id: string) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const initialChallenges: Challenge[] = [
  {
    id: "c1",
    title: "Budget for Diwali",
    description: "Allocate 500 FC for sweets, gifts, and crackers.",
    reward: 200,
    completed: false,
    category: 'budgeting'
  },
  {
    id: "c2",
    title: "Start an Emergency Fund",
    description: "Save 1,000 FC for unexpected expenses.",
    reward: 300,
    completed: false,
    category: 'emergency'
  },
  {
    id: "c3",
    title: "First Investment",
    description: "Invest 2,000 FC in a virtual SIP for 3 weeks.",
    reward: 500,
    completed: false,
    category: 'investing'
  },
];

const marketplaceItems: Item[] = [
  {
    id: "i1",
    name: "Movie Ticket",
    price: 300,
    category: "Entertainment",
  },
  {
    id: "i2",
    name: "Street Food Meal",
    price: 150,
    category: "Food",
  },
  {
    id: "i3",
    name: "Bus Pass (Monthly)",
    price: 500,
    category: "Transportation",
  },
  {
    id: "i4",
    name: "Smartphone",
    price: 8000,
    category: "Electronics",
  },
  {
    id: "i5",
    name: "Cricket Gear",
    price: 3000,
    category: "Sports",
  },
];

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [balance, setBalance] = useState(10000);
  const [challenges, setChallenges] = useState<Challenge[]>(initialChallenges);
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [purchasedItems, setPurchasedItems] = useState<string[]>([]);
  const [isNewUser, setIsNewUser] = useState(true);
  const [inventory, setInventory] = useState<Item[]>(marketplaceItems);
  const [isRealTimeMode, setIsRealTimeMode] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);

  useEffect(() => {
    const userOnboarded = localStorage.getItem("fintown-onboarded");
    if (userOnboarded) {
      setIsNewUser(false);
    }
    
    const savedGameState = localStorage.getItem("fintown-gamestate");
    if (savedGameState) {
      try {
        const { balance, challenges, investments, purchasedItems, isRealTimeMode, transactions, goals } = JSON.parse(savedGameState);
        setBalance(balance);
        setChallenges(challenges);
        setInvestments(investments);
        setPurchasedItems(purchasedItems);
        setIsRealTimeMode(isRealTimeMode || false);
        setTransactions(transactions || []);
        setGoals(goals || []);
      } catch (err) {
        console.error("Error loading game state", err);
      }
    }
  }, []);

  useEffect(() => {
    if (!isNewUser) {
      const gameState = { 
        balance, 
        challenges, 
        investments, 
        purchasedItems,
        isRealTimeMode,
        transactions,
        goals 
      };
      localStorage.setItem("fintown-gamestate", JSON.stringify(gameState));
    }
  }, [balance, challenges, investments, purchasedItems, isNewUser, isRealTimeMode, transactions, goals]);

  const addCoins = (amount: number) => {
    setBalance((prev) => prev + amount);
    
    if (isRealTimeMode) {
      addTransaction({
        amount,
        type: 'income',
        category: 'General',
        description: 'Added coins',
      });
    }
    
    toast({
      title: "Coins Added!",
      description: `+${amount} FinCoins have been added to your wallet.`,
    });
  };

  const spendCoins = (amount: number) => {
    if (balance < amount) {
      toast({
        title: "Not Enough Coins",
        description: `You need ${amount} FC but only have ${balance} FC.`,
        variant: "destructive",
      });
      return false;
    }
    
    setBalance((prev) => prev - amount);
    
    if (isRealTimeMode) {
      addTransaction({
        amount,
        type: 'expense',
        category: 'General',
        description: 'Spent coins',
      });
    }
    
    toast({
      title: "Coins Spent",
      description: `-${amount} FinCoins have been deducted from your wallet.`,
    });
    return true;
  };

  const completeChallenge = (id: string) => {
    setChallenges((prev) => 
      prev.map((challenge) => {
        if (challenge.id === id && !challenge.completed) {
          addCoins(challenge.reward);
          return { ...challenge, completed: true };
        }
        return challenge;
      })
    );
  };

  const addInvestment = (investment: Omit<Investment, "id">) => {
    const newInvestment = {
      ...investment,
      id: `inv-${Date.now()}`,
    };
    
    if (spendCoins(investment.amount)) {
      setInvestments((prev) => [...prev, newInvestment]);
      
      if (isRealTimeMode) {
        addTransaction({
          amount: investment.amount,
          type: 'expense',
          category: 'Investment',
          description: `Investment in ${investment.name}`,
        });
      }
      
      toast({
        title: "Investment Made!",
        description: `You've invested ${investment.amount} FC in ${investment.name}.`,
      });
      return true;
    }
    return false;
  };

  const purchaseItem = (itemId: string, price: number) => {
    if (spendCoins(price)) {
      setPurchasedItems((prev) => [...prev, itemId]);
      
      const item = inventory.find(item => item.id === itemId);
      
      if (isRealTimeMode && item) {
        addTransaction({
          amount: price,
          type: 'expense',
          category: item.category,
          description: `Purchased ${item.name}`,
        });
      }
      
      toast({
        title: "Item Purchased!",
        description: `You've bought a new item for ${price} FC.`,
      });
      return true;
    }
    return false;
  };

  const completeOnboarding = () => {
    setIsNewUser(false);
    localStorage.setItem("fintown-onboarded", "true");
  };
  
  const toggleRealTimeMode = () => {
    if (!isRealTimeMode) {
      setBalance(0);
      setChallenges([]);
    } else {
      setBalance(10000);
      setChallenges(initialChallenges);
    }
    
    setIsRealTimeMode(prev => !prev);
    toast({
      title: `Real-Time Mode ${!isRealTimeMode ? 'Enabled' : 'Disabled'}`,
      description: !isRealTimeMode 
        ? "Your financial activities will now be tracked for monthly reports."
        : "Game mode enabled. Your balance has been reset to 10,000 FC.",
    });
  };
  
  const addTransaction = (transaction: Omit<Transaction, "id" | "date">) => {
    const newTransaction = {
      ...transaction,
      id: `tr-${Date.now()}`,
      date: new Date(),
    };
    
    setTransactions(prev => [...prev, newTransaction]);
  };
  
  const getMonthlyReport = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    const monthlyTransactions = transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return transactionDate.getMonth() === currentMonth && 
             transactionDate.getFullYear() === currentYear;
    });
    
    const totalIncome = monthlyTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
      
    const totalExpenses = monthlyTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const categories = monthlyTransactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {} as { [key: string]: number });
    
    return {
      totalIncome,
      totalExpenses,
      categories
    };
  };

  const addGoal = (goal: Omit<Goal, "id" | "completed" | "currentAmount">) => {
    const newGoal = {
      ...goal,
      id: `goal-${Date.now()}`,
      completed: false,
      currentAmount: 0
    };
    
    setGoals(prev => [...prev, newGoal]);
    
    toast({
      title: "Goal Created!",
      description: `You've set a new goal: ${goal.title}`,
    });
  };
  
  const updateGoalProgress = (id: string, amount: number) => {
    setGoals(prev => prev.map(goal => {
      if (goal.id === id && !goal.completed) {
        const newCurrentAmount = goal.currentAmount + amount;
        const isCompleted = newCurrentAmount >= goal.targetAmount;
        
        return {
          ...goal, 
          currentAmount: newCurrentAmount,
          completed: isCompleted
        };
      }
      return goal;
    }));
  };
  
  const completeGoal = (id: string) => {
    setGoals(prev => prev.map(goal => {
      if (goal.id === id && !goal.completed) {
        toast({
          title: "Goal Achieved! 🎉",
          description: `Congratulations! You've achieved your goal: ${goal.title}`,
        });
        return { ...goal, completed: true };
      }
      return goal;
    }));
  };

  const value = {
    balance,
    addCoins,
    spendCoins,
    challenges,
    completeChallenge,
    investments,
    addInvestment,
    purchasedItems,
    purchaseItem,
    isNewUser,
    completeOnboarding,
    inventory,
    isRealTimeMode,
    toggleRealTimeMode,
    transactions,
    addTransaction,
    getMonthlyReport,
    goals,
    addGoal,
    updateGoalProgress,
    completeGoal,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};

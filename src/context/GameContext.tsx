
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
}

const GameContext = createContext<GameContextType | undefined>(undefined);

// Sample challenges and marketplace items
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

  // Check if the user is new when component mounts
  useEffect(() => {
    const userOnboarded = localStorage.getItem("fintown-onboarded");
    if (userOnboarded) {
      setIsNewUser(false);
    }
    
    // Try to load saved game state
    const savedGameState = localStorage.getItem("fintown-gamestate");
    if (savedGameState) {
      try {
        const { balance, challenges, investments, purchasedItems } = JSON.parse(savedGameState);
        setBalance(balance);
        setChallenges(challenges);
        setInvestments(investments);
        setPurchasedItems(purchasedItems);
      } catch (err) {
        console.error("Error loading game state", err);
      }
    }
  }, []);

  // Save game state when it changes
  useEffect(() => {
    if (!isNewUser) {
      const gameState = { balance, challenges, investments, purchasedItems };
      localStorage.setItem("fintown-gamestate", JSON.stringify(gameState));
    }
  }, [balance, challenges, investments, purchasedItems, isNewUser]);

  const addCoins = (amount: number) => {
    setBalance((prev) => prev + amount);
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

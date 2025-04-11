
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useGameContext } from "@/context/GameContext";

interface AddTransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultType: 'income' | 'expense';
}

export function AddTransactionDialog({ open, onOpenChange, defaultType }: AddTransactionDialogProps) {
  const { addCoins, spendCoins, addTransaction } = useGameContext();
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"income" | "expense">(defaultType);
  const [category, setCategory] = useState("General");
  const [description, setDescription] = useState("");

  const incomeCategories = ["Salary", "Gifts", "Rewards", "Other"];
  const expenseCategories = ["Food", "Entertainment", "Transportation", "Shopping", "Education", "Investment", "Other"];

  const handleSubmit = () => {
    const parsedAmount = parseFloat(amount);
    
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return;
    }
    
    if (type === "income") {
      addCoins(parsedAmount);
    } else {
      spendCoins(parsedAmount);
    }
    
    addTransaction({
      amount: parsedAmount,
      type,
      category,
      description: description || `${type === "income" ? "Income" : "Expense"} - ${category}`,
    });
    
    resetForm();
    onOpenChange(false);
  };

  const resetForm = () => {
    setAmount("");
    setDescription("");
    setCategory("General");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{type === 'income' ? 'Add Income' : 'Add Expense'}</DialogTitle>
          <DialogDescription>
            Record your {type === 'income' ? 'income' : 'expense'} to track your financial activities.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
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
            
            <div className="col-span-2">
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
          
          <div>
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
          
          <div>
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea 
              id="description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add notes about this transaction"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>
            Save {type === "income" ? "Income" : "Expense"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

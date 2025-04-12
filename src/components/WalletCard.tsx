
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useGameContext } from "@/context/GameContext";
import { Coins, TrendingUp } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export function WalletCard() {
  const { balance, isRealTimeMode, toggleRealTimeMode } = useGameContext();
  const [open, setOpen] = useState(false);

  const handleModeToggle = () => {
    toggleRealTimeMode();
    setOpen(false);
  };

  return (
    <Card className="flex flex-col p-5 bg-gradient-to-br from-finpurple to-finpurple-dark text-white overflow-hidden relative">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">My Wallet</h3>
        <Badge className="bg-white/20 hover:bg-white/30 text-white">Active</Badge>
      </div>

      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center gap-3 mb-2 cursor-pointer hover:bg-white/10 p-2 rounded-lg transition-colors">
            <div className="bg-white/20 p-2 rounded-full">
              <Coins className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm opacity-80">Current Balance</p>
              <h2 className="text-2xl font-bold">{balance.toLocaleString()} FC</h2>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <div className="px-3 py-2 text-sm font-medium">
            {isRealTimeMode ? 'Switch to Game Mode' : 'Enable Real-Time Tracking'}
          </div>
          <DropdownMenuItem className="flex justify-between cursor-pointer" onClick={handleModeToggle}>
            <span>{isRealTimeMode ? 'Game Mode' : 'Real-Time Mode'}</span>
            <Switch checked={isRealTimeMode} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex items-center mt-2 text-xs">
        <TrendingUp className="h-3 w-3 mr-1" />
        <span>Learn to grow your savings!</span>
      </div>
      
      {/* Background decoration */}
      <div className="absolute -right-4 -bottom-4 h-24 w-24 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute -right-2 -bottom-2 h-12 w-12 bg-white/10 rounded-full blur-sm"></div>
    </Card>
  );
}

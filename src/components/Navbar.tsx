import { Button } from "@/components/ui/button";
import { useGameContext } from "@/context/GameContext";
import { Coins, Menu, LogIn } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { WalletCard } from "@/components/WalletCard";

export function Navbar() {
  const { balance } = useGameContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <nav className="bg-card border-b border-border sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Coins className="h-8 w-8 text-finpurple animate-coin-bounce" />
              <span className="ml-2 text-xl font-bold text-foreground">FinTown</span>
            </Link>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="flex space-x-4">
              <Link to="/">
                <Button variant="ghost">Home</Button>
              </Link>
              <Link to="/marketplace">
                <Button variant="ghost">Marketplace</Button>
              </Link>
              <Link to="/invest">
                <Button variant="ghost">Invest</Button>
              </Link>
            </div>
          </div>
          
          <div className="flex items-center">
            <Popover>
              <PopoverTrigger asChild>
                <div className="hidden md:flex items-center bg-muted px-4 py-1 rounded-full cursor-pointer hover:bg-muted/80 transition-colors">
                  <Coins className="h-4 w-4 mr-1 text-fingold-dark" />
                  <span className="text-sm font-medium">{balance.toLocaleString()} FC</span>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0 border-none shadow-lg">
                <WalletCard />
              </PopoverContent>
            </Popover>
            
            <Link to="/auth" className="ml-4 hidden sm:block">
              <Button variant="outline" size="sm" className="flex items-center">
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Button>
            </Link>
            
            <div className="sm:hidden flex ml-3">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:bg-muted focus:outline-none"
                aria-expanded="false"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1 px-4 bg-card shadow-lg">
            <Link to="/">
              <Button variant="ghost" className="w-full justify-start">Home</Button>
            </Link>
            <Link to="/marketplace">
              <Button variant="ghost" className="w-full justify-start">Marketplace</Button>
            </Link>
            <Link to="/invest">
              <Button variant="ghost" className="w-full justify-start">Invest</Button>
            </Link>
            <Link to="/auth">
              <Button variant="ghost" className="w-full justify-start">
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}


import { Button } from "@/components/ui/button";
import { useGameContext } from "@/context/GameContext";
import { Coins, Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function Navbar() {
  const { balance } = useGameContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Coins className="h-8 w-8 text-finpurple animate-coin-bounce" />
              <span className="ml-2 text-xl font-bold">FinTown</span>
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
            <div className="hidden md:flex items-center bg-muted px-4 py-1 rounded-full">
              <Coins className="h-4 w-4 mr-1 text-fingold-dark" />
              <span className="text-sm font-medium">{balance.toLocaleString()} FC</span>
            </div>
            
            <div className="sm:hidden flex ml-3">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
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
          <div className="pt-2 pb-3 space-y-1 px-4 bg-white shadow-lg">
            <Link to="/">
              <Button variant="ghost" className="w-full justify-start">Home</Button>
            </Link>
            <Link to="/marketplace">
              <Button variant="ghost" className="w-full justify-start">Marketplace</Button>
            </Link>
            <Link to="/invest">
              <Button variant="ghost" className="w-full justify-start">Invest</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

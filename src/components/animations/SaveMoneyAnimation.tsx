
import { useState, useEffect } from 'react';
import { Coins, PiggyBank } from 'lucide-react';

export function SaveMoneyAnimation({ isVisible = false }: { isVisible?: boolean }) {
  const [coins, setCoins] = useState<{id: number, left: number, top: number}[]>([]);
  
  useEffect(() => {
    if (isVisible) {
      // Create 5 coins with random positions
      const newCoins = Array.from({ length: 5 }, (_, i) => ({
        id: i,
        left: Math.random() * 60 + 20, // 20-80% of container width
        top: -20 - Math.random() * 30, // Start above the container
      }));
      
      setCoins(newCoins);
      
      // Clean up animation when component unmounts
      return () => setCoins([]);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="relative h-64 w-64">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-finpurple">
          <PiggyBank className="h-24 w-24" />
        </div>
        
        {coins.map((coin, index) => (
          <div 
            key={coin.id}
            className="absolute text-fingold-dark animate-bounce"
            style={{
              left: `${coin.left}%`,
              top: `${coin.top}%`,
              animationDelay: `${index * 0.2}s`,
              animationDuration: '1s',
              animation: 'coin-fall 1.5s forwards ease-in'
            }}
          >
            <Coins className="h-6 w-6" />
          </div>
        ))}
      </div>
    </div>
  );
}

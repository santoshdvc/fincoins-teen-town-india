
import { useState, useEffect } from 'react';
import { TrendingUp, Coins } from 'lucide-react';

export function InvestAnimation({ isVisible = false }: { isVisible?: boolean }) {
  const [active, setActive] = useState(false);
  
  useEffect(() => {
    if (isVisible) {
      setActive(true);
      const timer = setTimeout(() => {
        setActive(false);
      }, 2000);
      
      return () => {
        clearTimeout(timer);
        setActive(false);
      };
    }
  }, [isVisible]);
  
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="relative h-64 w-64">
        <div className={`absolute left-1/2 -translate-x-1/2 text-finpurple transition-all duration-1000 ${active ? 'bottom-0' : 'bottom-1/2'}`}>
          <TrendingUp className="h-24 w-24" />
        </div>
        
        <div className={`absolute left-1/4 bottom-0 text-fingold-dark transition-all duration-1000 ${active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{transitionDelay: '0.5s'}}>
          <Coins className="h-8 w-8" />
        </div>
        
        <div className={`absolute left-2/4 bottom-1/4 text-fingold-dark transition-all duration-1000 ${active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{transitionDelay: '0.7s'}}>
          <Coins className="h-8 w-8" />
        </div>
        
        <div className={`absolute left-3/4 bottom-1/2 text-fingold-dark transition-all duration-1000 ${active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{transitionDelay: '0.9s'}}>
          <Coins className="h-8 w-8" />
        </div>
      </div>
    </div>
  );
}

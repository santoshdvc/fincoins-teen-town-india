
import { useState, useEffect } from 'react';
import { Film, Ticket } from 'lucide-react';

export function MovieAnimation({ isVisible = false }: { isVisible?: boolean }) {
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
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-finpurple">
          <Film className="h-24 w-24" />
        </div>
        
        <div className={`absolute bottom-1/2 left-1/2 -translate-x-1/2 text-white transition-all duration-1000 ${active ? 'opacity-100 -translate-y-10' : 'opacity-0 translate-y-0'}`}>
          <Ticket className="h-12 w-12" />
        </div>
      </div>
    </div>
  );
}

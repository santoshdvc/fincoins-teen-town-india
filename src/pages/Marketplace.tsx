
import { MarketplaceItem } from "@/components/MarketplaceItem";
import { Navbar } from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useGameContext } from "@/context/GameContext";
import { BadgeIndianRupee } from "lucide-react";

const Marketplace = () => {
  const { inventory, balance } = useGameContext();

  // Group items by category
  const categories = [...new Set(inventory.map(item => item.category))];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Marketplace</h1>
            <p className="text-muted-foreground">Practice spending wisely!</p>
          </div>
          
          <Card className="flex items-center gap-2 p-2">
            <BadgeIndianRupee className="h-5 w-5 text-finpurple" />
            <span className="font-semibold">{balance.toLocaleString()} FC</span>
          </Card>
        </div>
        
        <div className="flex gap-3 overflow-x-auto pb-2 mb-6">
          <Button variant="outline" className="rounded-full bg-finpurple text-white">
            All Items
          </Button>
          {categories.map(category => (
            <Button key={category} variant="outline" className="rounded-full whitespace-nowrap">
              {category}
            </Button>
          ))}
        </div>
        
        {categories.map(category => (
          <div key={category} className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-xl font-bold">{category}</h2>
              <Badge className="bg-muted text-muted-foreground">
                {inventory.filter(item => item.category === category).length} items
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {inventory
                .filter(item => item.category === category)
                .map(item => (
                  <MarketplaceItem 
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    category={item.category}
                  />
                ))
              }
            </div>
          </div>
        ))}
        
        <Card className="mt-8 bg-finpurple-light/20 border border-finpurple/30">
          <CardHeader className="pb-2">
            <h3 className="font-bold">Budgeting Tip</h3>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Before making a purchase, ask yourself if you really need it or just want it. 
              This simple question can help you make smarter spending decisions!
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Marketplace;

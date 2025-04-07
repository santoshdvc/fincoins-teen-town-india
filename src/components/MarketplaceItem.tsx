
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useGameContext } from "@/context/GameContext";
import { Coins } from "lucide-react";

interface MarketplaceItemProps {
  id: string;
  name: string;
  price: number;
  category: string;
}

export function MarketplaceItem({ id, name, price, category }: MarketplaceItemProps) {
  const { purchaseItem, purchasedItems } = useGameContext();
  
  const isPurchased = purchasedItems.includes(id);
  
  const handlePurchase = () => {
    purchaseItem(id, price);
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="w-full h-32 rounded-md bg-muted flex items-center justify-center">
          <span className="text-4xl">{category === "Food" ? "🍔" : category === "Entertainment" ? "🎬" : category === "Transportation" ? "🚌" : category === "Electronics" ? "📱" : category === "Sports" ? "🏏" : "🛍️"}</span>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <h3 className="font-bold">{name}</h3>
        <div className="flex items-center mt-2 text-sm">
          <Coins className="h-4 w-4 mr-1 text-fingold-dark" />
          <span className="font-medium">{price} FC</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">{category}</p>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full"
          variant={isPurchased ? "outline" : "default"}
          onClick={handlePurchase} 
          disabled={isPurchased}
        >
          {isPurchased ? "Purchased" : "Buy Now"}
        </Button>
      </CardFooter>
    </Card>
  );
}

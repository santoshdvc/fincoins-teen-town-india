
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";

export function RiskReturnGuide() {
  return (
    <Card className="bg-finpurple-light/20 border border-finpurple/30 h-fit">
      <CardHeader className="pb-2">
        <h3 className="font-bold">Understanding Risk & Return</h3>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-4">
          In investing, higher potential returns typically come with higher risks. 
          It's important to understand this relationship before investing.
        </p>
        
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="bg-green-100/20 p-2 rounded-full">
              <TrendingUp className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <p className="font-medium">Low Risk (5%)</p>
              <p className="text-xs text-muted-foreground">
                Like fixed deposits - safer but lower returns
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="bg-amber-100/20 p-2 rounded-full">
              <TrendingUp className="h-4 w-4 text-amber-600" />
            </div>
            <div>
              <p className="font-medium">Medium Risk (10%)</p>
              <p className="text-xs text-muted-foreground">
                Like mutual funds - balanced risk and return
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="bg-red-100/20 p-2 rounded-full">
              <TrendingDown className="h-4 w-4 text-red-600" />
            </div>
            <div>
              <p className="font-medium">High Risk (15%)</p>
              <p className="text-xs text-muted-foreground">
                Like stocks - higher potential returns but riskier
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

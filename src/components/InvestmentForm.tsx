
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGameContext } from "@/context/GameContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { TrendingUp } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { InvestAnimation } from "./animations/InvestAnimation";

const formSchema = z.object({
  name: z.string().min(1, "Investment name is required"),
  amount: z.coerce.number().min(100, "Minimum investment is 100 FC"),
  returnRate: z.coerce.number(),
  duration: z.string(),
});

export function InvestmentForm() {
  const { addInvestment, balance } = useGameContext();
  const [showAnimation, setShowAnimation] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      amount: 100,
      returnRate: 5,
      duration: "1w",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Show animation first
    setShowAnimation(true);
    
    // Calculate maturity date based on duration
    const maturityDate = new Date();
    if (values.duration === "1w") {
      maturityDate.setDate(maturityDate.getDate() + 7);
    } else if (values.duration === "2w") {
      maturityDate.setDate(maturityDate.getDate() + 14);
    } else if (values.duration === "3w") {
      maturityDate.setDate(maturityDate.getDate() + 21);
    }

    // Wait for animation to play before adding investment
    setTimeout(() => {
      addInvestment({
        name: values.name,
        amount: values.amount,
        returnRate: values.returnRate,
        maturityDate,
      });
      
      form.reset();
      setTimeout(() => setShowAnimation(false), 1500); // Hide animation after it completes
    }, 1500);
  };

  return (
    <>
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" /> Make an Investment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Investment Name</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={showAnimation}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select investment type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Fixed Deposit">Fixed Deposit</SelectItem>
                          <SelectItem value="Mutual Fund">Mutual Fund</SelectItem>
                          <SelectItem value="Stock Market">Stock Market</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount (FC)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field} 
                        max={balance}
                        disabled={showAnimation}
                      />
                    </FormControl>
                    <FormDescription>
                      Available: {balance} FC
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="returnRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expected Return (%)</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(parseFloat(value))}
                      defaultValue={field.value.toString()}
                      disabled={showAnimation}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select expected return" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5% (Low Risk)</SelectItem>
                        <SelectItem value="10">10% (Medium Risk)</SelectItem>
                        <SelectItem value="15">15% (High Risk)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Investment Duration</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={showAnimation}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1w">1 Week</SelectItem>
                        <SelectItem value="2w">2 Weeks</SelectItem>
                        <SelectItem value="3w">3 Weeks</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <CardFooter className="px-0 pt-4">
                <Button 
                  type="submit" 
                  className="w-full bg-finpurple hover:bg-finpurple-dark"
                  disabled={showAnimation}
                >
                  {showAnimation ? "Investing..." : "Invest Now"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <InvestAnimation isVisible={showAnimation} />
    </>
  );
}

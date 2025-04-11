
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { useGameContext } from "@/context/GameContext";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { BarChartIcon, CurrencyIcon, ArrowDownIcon, ArrowUpIcon } from "lucide-react";

export function MonthlyReport() {
  const { getMonthlyReport, isRealTimeMode, transactions } = useGameContext();
  
  if (!isRealTimeMode) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Monthly Financial Report</CardTitle>
          <CardDescription>
            Enable real-time mode to see your monthly financial report
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-8">
            No data available. Enable real-time mode to track your income and expenses.
          </p>
        </CardContent>
      </Card>
    );
  }
  
  if (transactions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Monthly Financial Report</CardTitle>
          <CardDescription>
            Your financial summary for this month
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-8">
            No transactions recorded yet. Add some income or expenses to see your report.
          </p>
        </CardContent>
      </Card>
    );
  }
  
  const report = getMonthlyReport();
  const { totalIncome, totalExpenses, categories } = report;
  
  // Prepare data for pie chart
  const chartData = Object.entries(categories).map(([name, value]) => ({
    name,
    value
  }));
  
  // Colors for pie chart
  const COLORS = ['#9b87f5', '#7E69AB', '#6E59A5', '#33C3F0', '#E5DEFF', '#FFDEE2', '#D3E4FD'];
  
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  const currentYear = new Date().getFullYear();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Financial Report</CardTitle>
        <CardDescription>
          Your financial summary for {currentMonth} {currentYear}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center p-4 rounded-lg bg-muted">
              <div className="flex items-center">
                <div className="mr-3 p-2 rounded-full bg-finpurple/20">
                  <ArrowUpIcon className="h-5 w-5 text-finpurple" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Income</p>
                  <p className="font-bold">{totalIncome} FC</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-4 rounded-lg bg-muted">
              <div className="flex items-center">
                <div className="mr-3 p-2 rounded-full bg-finpurple/20">
                  <ArrowDownIcon className="h-5 w-5 text-finpurple" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Expenses</p>
                  <p className="font-bold">{totalExpenses} FC</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-4 rounded-lg bg-muted">
              <div className="flex items-center">
                <div className="mr-3 p-2 rounded-full bg-finpurple/20">
                  <CurrencyIcon className="h-5 w-5 text-finpurple" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Balance</p>
                  <p className="font-bold">{totalIncome - totalExpenses} FC</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Expenses by Category</h3>
            {chartData.length > 0 ? (
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value} FC`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-10">No expense data available</p>
            )}
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-2">Expense Breakdown</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Amount (FC)</TableHead>
                <TableHead className="text-right">% of Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(categories).map(([category, amount]) => (
                <TableRow key={category}>
                  <TableCell>{category}</TableCell>
                  <TableCell className="text-right">{amount}</TableCell>
                  <TableCell className="text-right">
                    {totalExpenses > 0 ? ((amount / totalExpenses) * 100).toFixed(1) : 0}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

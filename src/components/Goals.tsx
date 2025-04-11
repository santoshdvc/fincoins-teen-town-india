
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useGameContext } from "@/context/GameContext";
import { CalendarIcon, CheckCircle, Target } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { format } from "date-fns";

export function Goals() {
  const { goals, completeGoal } = useGameContext();
  
  if (goals.length === 0) {
    return (
      <Card className="h-full flex items-center justify-center p-8">
        <div className="text-center">
          <Target className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="font-bold text-lg mb-2">No Goals Yet</h3>
          <p className="text-muted-foreground mb-6">
            Create your first financial goal to start tracking your progress.
          </p>
        </div>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-lg flex items-center gap-2">
            <Target className="h-5 w-5 text-finpurple" />
            My Financial Goals
          </h2>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {goals.map(goal => (
            <div 
              key={goal.id} 
              className={`p-4 rounded-lg border ${
                goal.completed ? 'bg-muted border-green-200' : 'bg-card border-muted'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{goal.title}</h3>
                    {goal.completed && (
                      <Badge className="bg-green-500">Completed</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{goal.description}</p>
                </div>
                <Badge variant="outline">{goal.category}</Badge>
              </div>
              
              {goal.deadline && (
                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <CalendarIcon className="h-3 w-3 mr-1" />
                  <span>Deadline: {format(new Date(goal.deadline), 'PP')}</span>
                </div>
              )}
              
              <div className="mt-2 mb-2">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>
                    {goal.currentAmount} / {goal.targetAmount} FC ({Math.round((goal.currentAmount / goal.targetAmount) * 100)}%)
                  </span>
                </div>
                <Progress 
                  value={(goal.currentAmount / goal.targetAmount) * 100} 
                  className={goal.completed ? "bg-muted-foreground/20" : ""} 
                />
              </div>
              
              {!goal.completed && goal.currentAmount >= goal.targetAmount && (
                <Button 
                  onClick={() => completeGoal(goal.id)} 
                  className="w-full mt-3 gap-2"
                  size="sm"
                >
                  <CheckCircle className="h-4 w-4" />
                  <span>Mark as Completed</span>
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

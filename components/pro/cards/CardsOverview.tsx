import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard,
  DollarSign,
  Users,
  TrendingUp,
  Plus,
  CreditCard as VirtualCardIcon,
  CreditCard as PhysicalCardIcon,
  AlertCircle,
} from "lucide-react";

interface CardsOverviewProps {
  onIssueNewCard: () => void;
  onViewAllCards: () => void;
}

const CardsOverview: React.FC<CardsOverviewProps> = ({
  onIssueNewCard,
  onViewAllCards,
}) => {
  // Mock data - replace with real data from API
  const metrics = {
    totalSpend: 45620,
    totalCards: 23,
    interchangeRevenue: 456.2,
    activeCards: 21,
    frozenCards: 2,
    virtualCards: 18,
    physicalCards: 5,
  };

  const recentTransactions = [
    {
      id: "1",
      cardholder: "Sarah Johnson",
      amount: 125.5,
      merchant: "Local Restaurant",
      date: "2024-01-15",
      status: "completed",
    },
    {
      id: "2",
      cardholder: "Mike Chen",
      amount: 89.99,
      merchant: "Transportation Co.",
      date: "2024-01-15",
      status: "completed",
    },
    {
      id: "3",
      cardholder: "Emma Davis",
      amount: 234.0,
      merchant: "Equipment Rental",
      date: "2024-01-14",
      status: "pending",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cards Overview</h1>
          <p className="text-gray-600">
            Manage your virtual and physical cards for staff expenses
          </p>
        </div>
        <Button
          onClick={onIssueNewCard}
          className="bg-culturin-indigo hover:bg-culturin-indigo/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Issue New Card
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Spend (This Month)
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${metrics.totalSpend.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12.5%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cards Issued</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalCards}</div>
            <p className="text-xs text-muted-foreground">
              {metrics.activeCards} active, {metrics.frozenCards} frozen
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Interchange Revenue
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${metrics.interchangeRevenue}
            </div>
            <p className="text-xs text-muted-foreground">
              This month's earnings
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Card Types</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <VirtualCardIcon className="h-4 w-4 text-blue-500" />
                <span className="text-sm">{metrics.virtualCards}</span>
              </div>
              <div className="flex items-center space-x-1">
                <PhysicalCardIcon className="h-4 w-4 text-green-500" />
                <span className="text-sm">{metrics.physicalCards}</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Virtual / Physical
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={onIssueNewCard}
            >
              <Plus className="h-4 w-4 mr-2" />
              Issue Virtual Card
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={onIssueNewCard}
            >
              <Plus className="h-4 w-4 mr-2" />
              Order Physical Card
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={onViewAllCards}
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Manage All Cards
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="font-medium text-sm">
                      {transaction.cardholder}
                    </div>
                    <div className="text-xs text-gray-600">
                      {transaction.merchant}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-sm">
                      ${transaction.amount}
                    </div>
                    <Badge
                      variant={
                        transaction.status === "completed"
                          ? "default"
                          : "secondary"
                      }
                      className="text-xs"
                    >
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CardsOverview;

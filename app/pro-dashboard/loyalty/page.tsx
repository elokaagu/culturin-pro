"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/src/components/auth/AuthProvider";
import { useUserData } from "@/src/contexts/UserDataContext";
import { loyaltyUtils } from "@/lib/supabase-utils";
import ProDashboardLayout from "@/components/pro/ProDashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  CreditCard,
  Wallet,
  Shield,
  CheckCircle,
  AlertCircle,
  Clock,
  TrendingUp,
  Gift,
  Crown,
  Star,
  Zap,
  Users,
  History,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Calendar,
  MapPin,
} from "lucide-react";
import { toast } from "sonner";

interface Transaction {
  id: string;
  amount: number;
  type: 'purchase' | 'reward' | 'refund' | 'transfer';
  created_at: string;
  bookings?: {
    guest_name: string;
    tour_id: string;
    total_price: number;
  };
}

const LoyaltyDashboard: React.FC = () => {
  const { user } = useAuth();
  const { userData } = useUserData();
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isConnectingWallet, setIsConnectingWallet] = useState(false);

  // Create a default loyalty card since the new UserData type doesn't include it
  const loyaltyCard = {
    cardId: user?.id || 'default-card',
    tier: 'bronze' as const,
    balance: 0,
    rewardsBalance: 0,
    walletAddress: '',
    status: 'active' as const,
    memberSince: new Date(),
    kycStatus: 'pending' as const,
    amlCheck: 'pending' as const,
    annualFee: 0,
    rewardsRate: 0.1,
    benefits: ['Free coffee', 'Priority booking'],
  };

  useEffect(() => {
    loadTransactions();
  }, [user]);

  const loadTransactions = async () => {
    if (!user || !loyaltyCard.cardId) return;

    try {
      const { data, error } = await loyaltyUtils.getLoyaltyTransactions(loyaltyCard.cardId);
      
      if (error) {
        console.error("Error loading transactions:", error);
        return;
      }

      setTransactions(data || []);
    } catch (error) {
      console.error("Error loading transactions:", error);
    }
  };

  const connectWallet = async () => {
    if (typeof window !== 'undefined' && !(window as any).ethereum) {
      toast.error("MetaMask not found. Please install MetaMask to connect your wallet.");
      return;
    }

    setIsConnectingWallet(true);

    try {
      const accounts = await (window as any).ethereum.request({
        method: "eth_requestAccounts",
      });

      const walletAddress = accounts[0];
      
      // Update loyalty card with wallet address
      if (loyaltyCard.cardId) {
        const { error } = await loyaltyUtils.updateLoyaltyCard(loyaltyCard.cardId, {
          wallet_address: walletAddress,
        });

        if (error) throw error;
      }

      toast.success("Wallet connected successfully!");
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast.error("Failed to connect wallet. Please try again.");
    } finally {
      setIsConnectingWallet(false);
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case "platinum":
        return <Crown className="h-5 w-5 text-purple-500" />;
      case "gold":
        return <Star className="h-5 w-5 text-yellow-500" />;
      case "silver":
        return <Zap className="h-5 w-5 text-gray-400" />;
      default:
        return <CreditCard className="h-5 w-5 text-orange-500" />;
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "purchase":
        return <ArrowDownRight className="h-4 w-4 text-red-500" />;
      case "reward":
        return <Gift className="h-4 w-4 text-green-500" />;
      case "refund":
        return <ArrowUpRight className="h-4 w-4 text-blue-500" />;
      case "transfer":
        return <ArrowUpRight className="h-4 w-4 text-purple-500" />;
      default:
        return <DollarSign className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTransactionBadge = (type: string) => {
    switch (type) {
      case "purchase":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            Purchase
          </Badge>
        );
      case "reward":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            Reward
          </Badge>
        );
      case "refund":
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
            Refund
          </Badge>
        );
      case "transfer":
        return (
          <Badge className="bg-purple-100 text-purple-800 border-purple-200">
            Transfer
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            {type}
          </Badge>
        );
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <ProDashboardLayout>
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Loyalty Card Dashboard</h1>
            <p className="text-gray-600">
              Manage your stablecoin loyalty card, rewards, and transactions
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Card Balance */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Card Balance</CardTitle>
                <Wallet className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${loyaltyCard.balance.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">USDC</p>
              </CardContent>
            </Card>

            {/* Rewards Balance */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Rewards Balance</CardTitle>
                <Gift className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${loyaltyCard.rewardsBalance.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">CLT Tokens</p>
              </CardContent>
            </Card>

            {/* Rewards Rate */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cashback Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{(loyaltyCard.rewardsRate * 100).toFixed(1)}%</div>
                <p className="text-xs text-muted-foreground">On all purchases</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            {/* Card Overview */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {getTierIcon(loyaltyCard.tier)}
                      {loyaltyCard.tier.charAt(0).toUpperCase() + loyaltyCard.tier.slice(1)} Tier
                    </CardTitle>
                    <CardDescription>
                      Card ID: {loyaltyCard.cardId}
                    </CardDescription>
                  </div>
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {loyaltyCard.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Member Since</Label>
                    <p className="text-sm text-gray-600">
                      {loyaltyCard.memberSince 
                        ? (loyaltyCard.memberSince instanceof Date 
                            ? loyaltyCard.memberSince.toLocaleDateString()
                            : new Date(loyaltyCard.memberSince).toLocaleDateString())
                        : "N/A"
                      }
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Annual Fee</Label>
                    <p className="text-sm text-gray-600">
                      ${loyaltyCard.annualFee}
                    </p>
                  </div>
                </div>

                {loyaltyCard.walletAddress ? (
                  <div>
                    <Label className="text-sm font-medium">Connected Wallet</Label>
                    <p className="text-sm text-gray-600 font-mono">
                      {loyaltyCard.walletAddress.slice(0, 6)}...{loyaltyCard.walletAddress.slice(-4)}
                    </p>
                  </div>
                ) : (
                  <Button
                    onClick={connectWallet}
                    disabled={isConnectingWallet}
                    className="w-full"
                  >
                    {isConnectingWallet ? (
                      <>
                        <Clock className="mr-2 h-4 w-4 animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      <>
                        <Wallet className="mr-2 h-4 w-4" />
                        Connect Wallet
                      </>
                    )}
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* KYC Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Verification
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">KYC Status</Label>
                  <Badge className="bg-green-100 text-green-800 border-green-200 mt-1">
                    <Shield className="h-3 w-3 mr-1" />
                    {loyaltyCard.kycStatus}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium">AML Check</Label>
                  <Badge className="bg-green-100 text-green-800 border-green-200 mt-1">
                    <Shield className="h-3 w-3 mr-1" />
                    {loyaltyCard.amlCheck}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Gift className="mr-2 h-4 w-4" />
                  Redeem Rewards
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <ArrowUpRight className="mr-2 h-4 w-4" />
                  Transfer Funds
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <History className="mr-2 h-4 w-4" />
                  View History
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Transactions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                Recent Transactions
              </CardTitle>
              <CardDescription>
                Your recent loyalty card activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              {transactions.length === 0 ? (
                <div className="text-center py-8">
                  <History className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No transactions yet</p>
                  <p className="text-sm text-gray-400">
                    Your transaction history will appear here
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        {getTransactionIcon(transaction.type)}
                        <div>
                          <p className="font-medium">
                            {transaction.bookings?.guest_name || "Transaction"}
                          </p>
                          <p className="text-sm text-gray-500">
                            {formatDate(transaction.created_at)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {getTransactionBadge(transaction.type)}
                        <p className="font-medium">
                          ${Math.abs(transaction.amount).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </ProDashboardLayout>
  );
};

export default LoyaltyDashboard; 
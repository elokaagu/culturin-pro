"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/src/components/auth/AuthProvider";
import { useUserData } from "@/src/contexts/UserDataContext";
import { loyaltyUtils } from "@/lib/supabase-utils";
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
} from "lucide-react";
import { toast } from "sonner";

const LoyaltyCardSettings: React.FC = () => {
  const { user } = useAuth();
  const { userData, updateUserData } = useUserData();
  const [isLoading, setIsLoading] = useState(false);
  const [isConnectingWallet, setIsConnectingWallet] = useState(false);

  const [loyaltyCard, setLoyaltyCard] = useState(userData?.loyaltyCard);

  useEffect(() => {
    loadLoyaltyCard();
  }, [user]);

  const loadLoyaltyCard = async () => {
    if (!user) return;

    try {
      const { data, error } = await loyaltyUtils.getLoyaltyCardByUser(user.id);

      if (error && error.code !== "PGRST116") {
        console.error("Error loading loyalty card:", error);
        return;
      }

      if (data) {
        const cardData = {
          cardId: data.card_id,
          tier: data.tier,
          balance: parseFloat(data.balance),
          rewardsBalance: parseFloat(data.rewards_balance),
          walletAddress: data.wallet_address,
          status: data.status,
          memberSince: new Date(data.member_since),
          kycStatus: data.kyc_status,
          amlCheck: data.aml_check,
          annualFee: loyaltyUtils.getTierPricing(data.tier).annualFee,
          rewardsRate: loyaltyUtils.calculateRewards(100, data.tier) / 100,
          benefits: loyaltyUtils.getTierBenefits(data.tier),
        };

        setLoyaltyCard(cardData);
        updateUserData({ loyaltyCard: cardData });
      }
    } catch (error) {
      console.error("Error loading loyalty card:", error);
    }
  };

  const connectWallet = async () => {
    if (typeof window !== "undefined" && !(window as any).ethereum) {
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
        const { error } = await loyaltyUtils.updateLoyaltyCard(
          loyaltyCard.cardId,
          {
            wallet_address: walletAddress,
          }
        );

        if (error) throw error;
      }

      setLoyaltyCard((prev) => ({ ...prev, walletAddress }));
      updateUserData({
        loyaltyCard: { ...loyaltyCard, walletAddress },
      });

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Active
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case "suspended":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <AlertCircle className="h-3 w-3 mr-1" />
            Suspended
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getKycStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <Shield className="h-3 w-3 mr-1" />
            Verified
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <AlertCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Loyalty Card</h2>
        <p className="text-gray-600">
          Manage your stablecoin loyalty card and rewards
        </p>
      </div>

      {/* Card Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                {getTierIcon(loyaltyCard.tier)}
                {loyaltyCard.tier.charAt(0).toUpperCase() +
                  loyaltyCard.tier.slice(1)}{" "}
                Tier
              </CardTitle>
              <CardDescription>Card ID: {loyaltyCard.cardId}</CardDescription>
            </div>
            {getStatusBadge(loyaltyCard.status)}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Wallet className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">
                  Balance
                </span>
              </div>
              <p className="text-2xl font-bold text-blue-900">
                ${loyaltyCard.balance.toFixed(2)}
              </p>
              <p className="text-xs text-blue-600">USDC</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Gift className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">
                  Rewards
                </span>
              </div>
              <p className="text-2xl font-bold text-green-900">
                ${loyaltyCard.rewardsBalance.toFixed(2)}
              </p>
              <p className="text-xs text-green-600">CLT Tokens</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-800">
                  Rate
                </span>
              </div>
              <p className="text-2xl font-bold text-purple-900">
                {(loyaltyCard.rewardsRate * 100).toFixed(1)}%
              </p>
              <p className="text-xs text-purple-600">Cashback</p>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium">Member Since</Label>
              <p className="text-sm text-gray-600">
                {loyaltyCard.memberSince.toLocaleDateString()}
              </p>
            </div>
            <div>
              <Label className="text-sm font-medium">Annual Fee</Label>
              <p className="text-sm text-gray-600">${loyaltyCard.annualFee}</p>
            </div>
          </div>

          {loyaltyCard.walletAddress ? (
            <div>
              <Label className="text-sm font-medium">Connected Wallet</Label>
              <p className="text-sm text-gray-600 font-mono">
                {loyaltyCard.walletAddress.slice(0, 6)}...
                {loyaltyCard.walletAddress.slice(-4)}
              </p>
            </div>
          ) : (
            <Button
              onClick={connectWallet}
              disabled={isConnectingWallet}
              className="w-full md:w-auto"
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
            Identity Verification
          </CardTitle>
          <CardDescription>
            KYC/AML verification status for compliance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium">KYC Status</Label>
              <p className="text-sm text-gray-600">
                Know Your Customer verification
              </p>
            </div>
            {getKycStatusBadge(loyaltyCard.kycStatus)}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium">AML Check</Label>
              <p className="text-sm text-gray-600">
                Anti-Money Laundering screening
              </p>
            </div>
            {getKycStatusBadge(loyaltyCard.amlCheck)}
          </div>

          {loyaltyCard.kycStatus === "pending" && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-yellow-800">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-medium">
                  Verification in Progress
                </span>
              </div>
              <p className="text-sm text-yellow-700 mt-1">
                Your identity verification is being processed. This usually
                takes 1-2 business days.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tier Benefits */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5" />
            Tier Benefits
          </CardTitle>
          <CardDescription>
            Exclusive benefits for {loyaltyCard.tier} tier members
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {loyaltyCard.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                <span className="text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoyaltyCardSettings;

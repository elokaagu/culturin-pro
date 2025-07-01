"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import {
  Crown,
  Gift,
  Star,
  Trophy,
  Plus,
  Edit,
  Users,
  TrendingUp,
  Calendar,
  DollarSign,
  Award,
  Heart,
  Zap,
  Target,
  BarChart3,
  Settings,
  Mail,
  Percent,
  Clock,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const loyaltyTiers = [
  {
    id: "explorer",
    name: "Explorer",
    color: "bg-gray-100 text-gray-800",
    icon: <Star className="h-4 w-4" />,
    requirements: { bookings: 0, spent: 0 },
    benefits: [
      "Welcome bonus: 100 points",
      "Birthday discount: 10%",
      "Email updates on new experiences",
    ],
    members: 234,
    pointsMultiplier: 1,
  },
  {
    id: "adventurer",
    name: "Adventurer",
    color: "bg-blue-100 text-blue-800",
    icon: <Trophy className="h-4 w-4" />,
    requirements: { bookings: 3, spent: 500 },
    benefits: [
      "Points multiplier: 1.5x",
      "Early access to new experiences",
      "Free experience after 10 bookings",
      "Priority customer support",
    ],
    members: 89,
    pointsMultiplier: 1.5,
  },
  {
    id: "connoisseur",
    name: "Connoisseur",
    color: "bg-purple-100 text-purple-800",
    icon: <Crown className="h-4 w-4" />,
    requirements: { bookings: 8, spent: 1500 },
    benefits: [
      "Points multiplier: 2x",
      "Exclusive VIP experiences",
      "Complimentary upgrades",
      "Personal concierge service",
      "Annual appreciation gift",
    ],
    members: 34,
    pointsMultiplier: 2,
  },
  {
    id: "ambassador",
    name: "Ambassador",
    color: "bg-gold-100 text-gold-800",
    icon: <Award className="h-4 w-4" />,
    requirements: { bookings: 15, spent: 3000 },
    benefits: [
      "Points multiplier: 3x",
      "Unlimited free guest passes",
      "Behind-the-scenes experiences",
      "Co-creation opportunities",
      "Annual VIP event invitation",
    ],
    members: 12,
    pointsMultiplier: 3,
  },
];

const rewardTypes = [
  {
    id: "discount",
    name: "Percentage Discount",
    icon: <Percent className="h-4 w-4" />,
    description: "Percentage off next booking",
  },
  {
    id: "fixed-discount",
    name: "Fixed Amount Discount",
    icon: <DollarSign className="h-4 w-4" />,
    description: "Fixed dollar amount off",
  },
  {
    id: "free-experience",
    name: "Free Experience",
    icon: <Gift className="h-4 w-4" />,
    description: "Complimentary experience",
  },
  {
    id: "upgrade",
    name: "Experience Upgrade",
    icon: <TrendingUp className="h-4 w-4" />,
    description: "Upgrade to premium experience",
  },
  {
    id: "early-access",
    name: "Early Access",
    icon: <Clock className="h-4 w-4" />,
    description: "Early booking access",
  },
];

const availableRewards = [
  {
    id: "welcome-100",
    name: "Welcome Bonus",
    type: "points",
    value: 100,
    cost: 0,
    description: "New member welcome bonus",
    claimed: 234,
    active: true,
  },
  {
    id: "birthday-10",
    name: "Birthday Special",
    type: "discount",
    value: 10,
    cost: 0,
    description: "10% off birthday month booking",
    claimed: 89,
    active: true,
  },
  {
    id: "free-tour-500",
    name: "Free Walking Tour",
    type: "free-experience",
    value: "Basic Walking Tour",
    cost: 500,
    description: "Complimentary 2-hour walking tour",
    claimed: 45,
    active: true,
  },
  {
    id: "upgrade-750",
    name: "Premium Upgrade",
    type: "upgrade",
    value: "Premium Experience",
    cost: 750,
    description: "Upgrade any experience to premium",
    claimed: 23,
    active: true,
  },
  {
    id: "discount-15-1000",
    name: "15% Off Voucher",
    type: "discount",
    value: 15,
    cost: 1000,
    description: "15% off any experience",
    claimed: 67,
    active: true,
  },
  {
    id: "vip-experience-2000",
    name: "VIP Experience",
    type: "free-experience",
    value: "VIP Cultural Tour",
    cost: 2000,
    description: "Exclusive VIP cultural experience",
    claimed: 12,
    active: true,
  },
];

const LoyaltyProgram = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [rewardDialogOpen, setRewardDialogOpen] = useState(false);
  const [tierDialogOpen, setTierDialogOpen] = useState(false);
  const { toast } = useToast();

  const [newReward, setNewReward] = useState({
    name: "",
    type: "discount",
    value: "",
    cost: "",
    description: "",
    validityDays: 30,
    maxRedemptions: "",
    tierRestriction: "all",
  });

  const handleCreateReward = () => {
    toast({
      title: "Reward created",
      description: "Your loyalty reward has been created successfully.",
    });
    setRewardDialogOpen(false);
    setNewReward({
      name: "",
      type: "discount",
      value: "",
      cost: "",
      description: "",
      validityDays: 30,
      maxRedemptions: "",
      tierRestriction: "all",
    });
  };

  const handleToggleReward = (rewardId: string) => {
    toast({
      title: "Reward updated",
      description: "Reward status has been changed.",
    });
  };

  const getTierColor = (tierId: string) => {
    const tier = loyaltyTiers.find((t) => t.id === tierId);
    return tier ? tier.color : "bg-gray-100 text-gray-800";
  };

  const getTierIcon = (tierId: string) => {
    const tier = loyaltyTiers.find((t) => t.id === tierId);
    return tier ? tier.icon : <Star className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Loyalty Program</h2>
          <p className="text-gray-600">
            Reward your best guests and encourage repeat bookings
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </Button>
          <Dialog open={rewardDialogOpen} onOpenChange={setRewardDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Reward
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create Loyalty Reward</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Reward Name</Label>
                    <Input
                      placeholder="e.g., 20% Off Voucher"
                      value={newReward.name}
                      onChange={(e) =>
                        setNewReward({ ...newReward, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Reward Type</Label>
                    <Select
                      value={newReward.type}
                      onValueChange={(value) =>
                        setNewReward({ ...newReward, type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {rewardTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            <div className="flex items-center gap-2">
                              {type.icon}
                              <span>{type.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>
                      {newReward.type === "discount"
                        ? "Discount Percentage"
                        : newReward.type === "fixed-discount"
                        ? "Discount Amount ($)"
                        : "Reward Value"}
                    </Label>
                    <Input
                      placeholder={
                        newReward.type === "discount"
                          ? "15"
                          : newReward.type === "fixed-discount"
                          ? "25"
                          : "Experience name or value"
                      }
                      value={newReward.value}
                      onChange={(e) =>
                        setNewReward({ ...newReward, value: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Points Cost</Label>
                    <Input
                      type="number"
                      placeholder="500"
                      value={newReward.cost}
                      onChange={(e) =>
                        setNewReward({ ...newReward, cost: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    placeholder="Describe this reward and any terms & conditions"
                    value={newReward.description}
                    onChange={(e) =>
                      setNewReward({
                        ...newReward,
                        description: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Validity (Days)</Label>
                    <Input
                      type="number"
                      placeholder="30"
                      value={newReward.validityDays}
                      onChange={(e) =>
                        setNewReward({
                          ...newReward,
                          validityDays: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Max Redemptions</Label>
                    <Input
                      type="number"
                      placeholder="Leave empty for unlimited"
                      value={newReward.maxRedemptions}
                      onChange={(e) =>
                        setNewReward({
                          ...newReward,
                          maxRedemptions: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Tier Restriction</Label>
                    <Select
                      value={newReward.tierRestriction}
                      onValueChange={(value) =>
                        setNewReward({ ...newReward, tierRestriction: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select tier" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Tiers</SelectItem>
                        {loyaltyTiers.map((tier) => (
                          <SelectItem key={tier.id} value={tier.id}>
                            {tier.name}+
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setRewardDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleCreateReward}>Create Reward</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Program Overview</TabsTrigger>
          <TabsTrigger value="tiers">Membership Tiers</TabsTrigger>
          <TabsTrigger value="rewards">Rewards Catalog</TabsTrigger>
          <TabsTrigger value="members">Member Management</TabsTrigger>
          <TabsTrigger value="analytics">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold">369</div>
                <p className="text-sm text-gray-500">Total Members</p>
                <div className="text-xs text-green-600 mt-1">
                  ↗ +12% this month
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold">15,847</div>
                <p className="text-sm text-gray-500">Points Issued</p>
                <div className="text-xs text-green-600 mt-1">
                  ↗ +8% this month
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold">8,234</div>
                <p className="text-sm text-gray-500">Points Redeemed</p>
                <div className="text-xs text-blue-600 mt-1">
                  52% redemption rate
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold">$12,450</div>
                <p className="text-sm text-gray-500">Revenue from Loyalty</p>
                <div className="text-xs text-green-600 mt-1">
                  ↗ +23% this month
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Membership Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {loyaltyTiers.map((tier) => (
                    <div
                      key={tier.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        {tier.icon}
                        <span className="font-medium">{tier.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${(tier.members / 369) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">
                          {tier.members}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Gift className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium">
                          Sarah M. redeemed 15% Off Voucher
                        </div>
                        <div className="text-sm text-gray-500">2 hours ago</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <TrendingUp className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">
                          James W. upgraded to Adventurer
                        </div>
                        <div className="text-sm text-gray-500">5 hours ago</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <Star className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-medium">
                          Elena P. earned 150 points
                        </div>
                        <div className="text-sm text-gray-500">1 day ago</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tiers" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Membership Tiers</h3>
            <Dialog open={tierDialogOpen} onOpenChange={setTierDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Tier
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Membership Tier</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Tier Name</Label>
                    <Input placeholder="e.g., Elite" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Minimum Bookings</Label>
                      <Input type="number" placeholder="5" />
                    </div>
                    <div className="space-y-2">
                      <Label>Minimum Spent ($)</Label>
                      <Input type="number" placeholder="1000" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Points Multiplier</Label>
                    <Input type="number" step="0.1" placeholder="1.5" />
                  </div>
                  <div className="space-y-2">
                    <Label>Benefits</Label>
                    <Textarea placeholder="List the benefits for this tier..." />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setTierDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={() => setTierDialogOpen(false)}>
                      Create Tier
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-6">
            {loyaltyTiers.map((tier) => (
              <Card key={tier.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        {tier.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-xl">{tier.name}</h3>
                        <Badge className={tier.color}>
                          {tier.members} members
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">Requirements</h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Users className="h-3 w-3" />
                          <span>{tier.requirements.bookings}+ bookings</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-3 w-3" />
                          <span>${tier.requirements.spent}+ spent</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Zap className="h-3 w-3" />
                          <span>
                            {tier.pointsMultiplier}x points multiplier
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Benefits</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        {tier.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rewards" className="space-y-4">
          <div className="grid gap-4">
            {availableRewards.map((reward) => (
              <Card
                key={reward.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium text-lg">{reward.name}</h3>
                        <Badge
                          variant={reward.active ? "default" : "secondary"}
                        >
                          {reward.active ? "Active" : "Inactive"}
                        </Badge>
                        <Badge variant="outline">{reward.cost} points</Badge>
                      </div>
                      <p className="text-gray-600 mb-3">{reward.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Gift className="h-3 w-3" />
                          {reward.claimed} claimed
                        </span>
                        <span className="flex items-center gap-1">
                          <Target className="h-3 w-3" />
                          {reward.type} reward
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Switch
                        checked={reward.active}
                        onCheckedChange={() => handleToggleReward(reward.id)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="members" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Member Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Crown className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-medium">Aisha Patel</div>
                      <div className="text-sm text-gray-500">
                        Connoisseur • 650 points • 5 bookings
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-purple-100 text-purple-800">
                      Connoisseur
                    </Badge>
                    <Button variant="outline" size="sm">
                      <Mail className="h-4 w-4 mr-2" />
                      Contact
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Trophy className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium">Sofia Martinez</div>
                      <div className="text-sm text-gray-500">
                        Adventurer • 350 points • 3 bookings
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-100 text-blue-800">
                      Adventurer
                    </Badge>
                    <Button variant="outline" size="sm">
                      <Mail className="h-4 w-4 mr-2" />
                      Contact
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <Star className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <div className="font-medium">James Wilson</div>
                      <div className="text-sm text-gray-500">
                        Explorer • 100 points • 1 booking
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-gray-100 text-gray-800">
                      Explorer
                    </Badge>
                    <Button variant="outline" size="sm">
                      <Mail className="h-4 w-4 mr-2" />
                      Contact
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold">52%</div>
                <p className="text-sm text-gray-500">Points Redemption Rate</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold">$185</div>
                <p className="text-sm text-gray-500">Avg. Spend per Member</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold">67%</div>
                <p className="text-sm text-gray-500">Member Retention Rate</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Tier Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loyaltyTiers.map((tier) => (
                  <div
                    key={tier.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      {tier.icon}
                      <div>
                        <div className="font-medium">{tier.name}</div>
                        <div className="text-sm text-gray-500">
                          {tier.members} members
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="text-center">
                        <div className="font-medium">
                          ${Math.floor(Math.random() * 300) + 100}
                        </div>
                        <div className="text-gray-500">Avg. Spend</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium">
                          {Math.floor(Math.random() * 30) + 60}%
                        </div>
                        <div className="text-gray-500">Retention</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium">
                          {Math.floor(Math.random() * 20) + 40}%
                        </div>
                        <div className="text-gray-500">Redemption</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LoyaltyProgram;

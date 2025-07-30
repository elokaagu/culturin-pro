import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  CreditCard,
  MoreHorizontal,
  Eye,
  Lock,
  Unlock,
  Settings,
  Trash2,
  Search,
  Filter,
  Download,
} from "lucide-react";
import { toast } from "sonner";

interface CardData {
  id: string;
  cardholder: string;
  type: "virtual" | "physical";
  status: "active" | "frozen" | "cancelled";
  spendThisMonth: number;
  limit: number;
  lastUsed: string;
  cardNumber: string;
  expiryDate: string;
}

const ManageCards: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [isLimitDialogOpen, setIsLimitDialogOpen] = useState(false);
  const [newLimit, setNewLimit] = useState("");

  // Mock data - replace with real data from API
  const cards: CardData[] = [
    {
      id: "1",
      cardholder: "Sarah Johnson",
      type: "virtual",
      status: "active",
      spendThisMonth: 1250.5,
      limit: 2000,
      lastUsed: "2024-01-15",
      cardNumber: "**** **** **** 1234",
      expiryDate: "12/25",
    },
    {
      id: "2",
      cardholder: "Mike Chen",
      type: "physical",
      status: "active",
      spendThisMonth: 890.99,
      limit: 1500,
      lastUsed: "2024-01-14",
      cardNumber: "**** **** **** 5678",
      expiryDate: "12/25",
    },
    {
      id: "3",
      cardholder: "Emma Davis",
      type: "virtual",
      status: "frozen",
      spendThisMonth: 0,
      limit: 1000,
      lastUsed: "2024-01-10",
      cardNumber: "**** **** **** 9012",
      expiryDate: "12/25",
    },
    {
      id: "4",
      cardholder: "Alex Rodriguez",
      type: "physical",
      status: "active",
      spendThisMonth: 2340.0,
      limit: 3000,
      lastUsed: "2024-01-15",
      cardNumber: "**** **** **** 3456",
      expiryDate: "12/25",
    },
  ];

  const filteredCards = cards.filter(
    (card) =>
      card.cardholder.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.cardNumber.includes(searchTerm)
  );

  const handleFreezeCard = async (cardId: string) => {
    try {
      // API call to freeze card
      console.log(`Freezing card ${cardId}`);
      toast.success("Card frozen successfully");
    } catch (error) {
      toast.error("Failed to freeze card");
    }
  };

  const handleUnfreezeCard = async (cardId: string) => {
    try {
      // API call to unfreeze card
      console.log(`Unfreezing card ${cardId}`);
      toast.success("Card unfrozen successfully");
    } catch (error) {
      toast.error("Failed to unfreeze card");
    }
  };

  const handleUpdateLimit = async () => {
    if (!selectedCard || !newLimit) return;

    try {
      // API call to update limit
      console.log(`Updating limit for card ${selectedCard.id} to ${newLimit}`);
      toast.success("Card limit updated successfully");
      setIsLimitDialogOpen(false);
      setNewLimit("");
      setSelectedCard(null);
    } catch (error) {
      toast.error("Failed to update card limit");
    }
  };

  const handleCancelCard = async (cardId: string) => {
    try {
      // API call to cancel card
      console.log(`Cancelling card ${cardId}`);
      toast.success("Card cancelled successfully");
    } catch (error) {
      toast.error("Failed to cancel card");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "frozen":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    return type === "virtual" ? (
      <CreditCard className="h-4 w-4 text-blue-500" />
    ) : (
      <CreditCard className="h-4 w-4 text-green-500" />
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Cards</h1>
          <p className="text-gray-600">View and manage all your issued cards</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by cardholder or card number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Badge variant="outline" className="cursor-pointer">
              All Cards ({filteredCards.length})
            </Badge>
            <Badge variant="outline" className="cursor-pointer">
              Active (
              {filteredCards.filter((c) => c.status === "active").length})
            </Badge>
            <Badge variant="outline" className="cursor-pointer">
              Frozen (
              {filteredCards.filter((c) => c.status === "frozen").length})
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Cards Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Cards</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cardholder</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Spend This Month</TableHead>
                <TableHead>Limit</TableHead>
                <TableHead>Last Used</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCards.map((card) => (
                <TableRow key={card.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{card.cardholder}</div>
                      <div className="text-sm text-gray-500">
                        {card.cardNumber}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getTypeIcon(card.type)}
                      <span className="capitalize">{card.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(card.status)}>
                      {card.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">
                      ${card.spendThisMonth.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      {((card.spendThisMonth / card.limit) * 100).toFixed(1)}%
                      of limit
                    </div>
                  </TableCell>
                  <TableCell>${card.limit.toLocaleString()}</TableCell>
                  <TableCell>
                    {new Date(card.lastUsed).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() =>
                            console.log(`View transactions for ${card.id}`)
                          }
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Transactions
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedCard(card);
                            setNewLimit(card.limit.toString());
                            setIsLimitDialogOpen(true);
                          }}
                        >
                          <Settings className="h-4 w-4 mr-2" />
                          Adjust Limit
                        </DropdownMenuItem>
                        {card.status === "active" ? (
                          <DropdownMenuItem
                            onClick={() => handleFreezeCard(card.id)}
                          >
                            <Lock className="h-4 w-4 mr-2" />
                            Freeze Card
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem
                            onClick={() => handleUnfreezeCard(card.id)}
                          >
                            <Unlock className="h-4 w-4 mr-2" />
                            Unfreeze Card
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          onClick={() => handleCancelCard(card.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Cancel Card
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Adjust Limit Dialog */}
      <Dialog open={isLimitDialogOpen} onOpenChange={setIsLimitDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adjust Card Limit</DialogTitle>
            <DialogDescription>
              Update the spending limit for {selectedCard?.cardholder}'s card.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">New Limit</label>
              <Input
                type="number"
                value={newLimit}
                onChange={(e) => setNewLimit(e.target.value)}
                placeholder="Enter new limit"
                className="mt-1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsLimitDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleUpdateLimit}>Update Limit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageCards;

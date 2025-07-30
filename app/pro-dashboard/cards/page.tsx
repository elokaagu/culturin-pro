"use client";

import React, { useState } from "react";
import ProDashboardLayout from "../../../components/pro/ProDashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CardsOverview from "../../../components/pro/cards/CardsOverview";
import ManageCards from "../../../components/pro/cards/ManageCards";
import IssueNewCard from "../../../components/pro/cards/IssueNewCard";
import CardsSettings from "../../../components/pro/cards/CardsSettings";
import { CreditCard, Settings, Plus, BarChart3 } from "lucide-react";

export default function CardsPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showIssueCard, setShowIssueCard] = useState(false);

  const handleIssueNewCard = () => {
    setShowIssueCard(true);
    setActiveTab("issue");
  };

  const handleBackFromIssue = () => {
    setShowIssueCard(false);
    setActiveTab("overview");
  };

  const handleIssueComplete = () => {
    setShowIssueCard(false);
    setActiveTab("overview");
  };

  const handleViewAllCards = () => {
    setActiveTab("manage");
  };

  return (
    <ProDashboardLayout>
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {showIssueCard ? (
            <IssueNewCard
              onBack={handleBackFromIssue}
              onComplete={handleIssueComplete}
            />
          ) : (
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Cards</h1>
                  <p className="text-gray-600">
                    Manage your virtual and physical cards
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger
                      value="overview"
                      className="flex items-center gap-2"
                    >
                      <BarChart3 className="h-4 w-4" />
                      <span className="hidden sm:inline">Overview</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="manage"
                      className="flex items-center gap-2"
                    >
                      <CreditCard className="h-4 w-4" />
                      <span className="hidden sm:inline">Manage</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="issue"
                      className="flex items-center gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      <span className="hidden sm:inline">Issue</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="settings"
                      className="flex items-center gap-2"
                    >
                      <Settings className="h-4 w-4" />
                      <span className="hidden sm:inline">Settings</span>
                    </TabsTrigger>
                  </TabsList>
                </div>
              </div>

              <TabsContent value="overview" className="space-y-6">
                <CardsOverview
                  onIssueNewCard={handleIssueNewCard}
                  onViewAllCards={handleViewAllCards}
                />
              </TabsContent>

              <TabsContent value="manage" className="space-y-6">
                <ManageCards />
              </TabsContent>

              <TabsContent value="issue" className="space-y-6">
                <IssueNewCard
                  onBack={handleBackFromIssue}
                  onComplete={handleIssueComplete}
                />
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <CardsSettings />
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </ProDashboardLayout>
  );
}

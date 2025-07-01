"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import {
  Mail,
  Send,
  Calendar,
  Users,
  Eye,
  MousePointer,
  TrendingUp,
  Plus,
  Edit,
  Copy,
  Trash2,
  Play,
  Pause,
  BarChart3,
  Target,
  Clock,
  CheckCircle,
} from "lucide-react";

interface EmailCampaign {
  id: string;
  name: string;
  subject: string;
  status: "Draft" | "Scheduled" | "Sent" | "Active";
  recipients: number;
  openRate: number;
  clickRate: number;
  scheduledDate?: string;
  createdDate: string;
  template: string;
  type: "Promotional" | "Newsletter" | "Welcome" | "Follow-up" | "Event";
}

interface EmailTemplate {
  id: string;
  name: string;
  type: string;
  subject: string;
  preview: string;
  category: "Promotional" | "Newsletter" | "Welcome" | "Follow-up" | "Event";
}

const EmailCampaigns: React.FC = () => {
  const [activeTab, setActiveTab] = useState("campaigns");
  const [selectedCampaign, setSelectedCampaign] =
    useState<EmailCampaign | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { toast } = useToast();

  const mockCampaigns: EmailCampaign[] = [
    {
      id: "1",
      name: "Summer Cultural Tours Promotion",
      subject: "Discover Hidden Gems This Summer - 20% Off!",
      status: "Sent",
      recipients: 2847,
      openRate: 24.5,
      clickRate: 4.2,
      createdDate: "2024-05-15",
      template: "promotional",
      type: "Promotional",
    },
    {
      id: "2",
      name: "Monthly Culture Newsletter",
      subject: "Cultural Highlights & Upcoming Events",
      status: "Scheduled",
      recipients: 3521,
      openRate: 0,
      clickRate: 0,
      scheduledDate: "2024-06-01",
      createdDate: "2024-05-20",
      template: "newsletter",
      type: "Newsletter",
    },
    {
      id: "3",
      name: "Welcome Series - Day 1",
      subject: "Welcome to Authentic Cultural Experiences!",
      status: "Active",
      recipients: 156,
      openRate: 42.3,
      clickRate: 8.7,
      createdDate: "2024-05-10",
      template: "welcome",
      type: "Welcome",
    },
    {
      id: "4",
      name: "Post-Experience Follow-up",
      subject: "How was your cultural journey with us?",
      status: "Draft",
      recipients: 0,
      openRate: 0,
      clickRate: 0,
      createdDate: "2024-05-22",
      template: "follow-up",
      type: "Follow-up",
    },
  ];

  const emailTemplates: EmailTemplate[] = [
    {
      id: "1",
      name: "Summer Promotion",
      type: "Promotional",
      subject: "Limited Time: Summer Cultural Adventures",
      preview:
        "Discover authentic cultural experiences with exclusive summer discounts...",
      category: "Promotional",
    },
    {
      id: "2",
      name: "Welcome New Guest",
      type: "Welcome",
      subject: "Welcome to [Business Name]!",
      preview: "Thank you for joining our community of cultural explorers...",
      category: "Welcome",
    },
    {
      id: "3",
      name: "Monthly Newsletter",
      type: "Newsletter",
      subject: "This Month in Culture",
      preview: "Cultural events, new experiences, and community highlights...",
      category: "Newsletter",
    },
    {
      id: "4",
      name: "Experience Follow-up",
      type: "Follow-up",
      subject: "How was your experience?",
      preview:
        "We hope you enjoyed your cultural journey. Share your feedback...",
      category: "Follow-up",
    },
    {
      id: "5",
      name: "Event Announcement",
      type: "Event",
      subject: "Special Cultural Event Coming Up!",
      preview: "Join us for an exclusive cultural celebration...",
      category: "Event",
    },
  ];

  const handleCreateCampaign = () => {
    toast({
      title: "Campaign Created",
      description: "Your email campaign has been created successfully.",
    });
    setIsCreateDialogOpen(false);
  };

  const handleSendCampaign = (campaignId: string) => {
    toast({
      title: "Campaign Sent",
      description: "Your email campaign has been sent to all recipients.",
    });
  };

  const handleScheduleCampaign = (campaignId: string) => {
    toast({
      title: "Campaign Scheduled",
      description: "Your email campaign has been scheduled successfully.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Sent":
        return "bg-green-100 text-green-800";
      case "Scheduled":
        return "bg-blue-100 text-blue-800";
      case "Active":
        return "bg-purple-100 text-purple-800";
      case "Draft":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Promotional":
        return "bg-orange-100 text-orange-800";
      case "Newsletter":
        return "bg-blue-100 text-blue-800";
      case "Welcome":
        return "bg-green-100 text-green-800";
      case "Follow-up":
        return "bg-purple-100 text-purple-800";
      case "Event":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Email Campaigns</h2>
          <p className="text-gray-600">
            Create and manage email marketing campaigns
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Campaign
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Email Campaign</DialogTitle>
              <DialogDescription>
                Set up a new email marketing campaign for your cultural
                experiences
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Campaign Name</label>
                  <Input placeholder="Summer Promotion 2024" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Campaign Type</label>
                  <Select defaultValue="promotional">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="promotional">Promotional</SelectItem>
                      <SelectItem value="newsletter">Newsletter</SelectItem>
                      <SelectItem value="welcome">Welcome</SelectItem>
                      <SelectItem value="follow-up">Follow-up</SelectItem>
                      <SelectItem value="event">Event</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Subject</label>
                <Input placeholder="Discover Amazing Cultural Experiences" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Target Audience</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subscribers</SelectItem>
                    <SelectItem value="past-guests">Past Guests</SelectItem>
                    <SelectItem value="prospects">Prospects</SelectItem>
                    <SelectItem value="vip">VIP Guests</SelectItem>
                    <SelectItem value="inactive">
                      Inactive Subscribers
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Template</label>
                <Select defaultValue="template1">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {emailTemplates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleCreateCampaign}>Create Campaign</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Campaigns</p>
                    <p className="text-2xl font-bold">24</p>
                  </div>
                  <Mail className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-xs text-green-600 mt-1">
                  ↑ 12% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Avg Open Rate</p>
                    <p className="text-2xl font-bold">28.4%</p>
                  </div>
                  <Eye className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-xs text-green-600 mt-1">
                  ↑ 3.2% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Avg Click Rate</p>
                    <p className="text-2xl font-bold">5.7%</p>
                  </div>
                  <MousePointer className="h-8 w-8 text-purple-600" />
                </div>
                <p className="text-xs text-green-600 mt-1">
                  ↑ 0.8% from last month
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            {mockCampaigns.map((campaign) => (
              <Card
                key={campaign.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{campaign.name}</h3>
                        <Badge className={getStatusColor(campaign.status)}>
                          {campaign.status}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={getTypeColor(campaign.type)}
                        >
                          {campaign.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        {campaign.subject}
                      </p>
                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {campaign.recipients.toLocaleString()} recipients
                        </div>
                        {campaign.status === "Sent" && (
                          <>
                            <div className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              {campaign.openRate}% open rate
                            </div>
                            <div className="flex items-center gap-1">
                              <MousePointer className="h-4 w-4" />
                              {campaign.clickRate}% click rate
                            </div>
                          </>
                        )}
                        {campaign.scheduledDate && (
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Scheduled: {campaign.scheduledDate}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Copy className="h-4 w-4" />
                      </Button>
                      {campaign.status === "Draft" && (
                        <Button
                          size="sm"
                          onClick={() => handleSendCampaign(campaign.id)}
                        >
                          <Send className="h-4 w-4 mr-1" />
                          Send
                        </Button>
                      )}
                      {campaign.status === "Scheduled" && (
                        <Button variant="outline" size="sm">
                          <Pause className="h-4 w-4 mr-1" />
                          Pause
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        <BarChart3 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {emailTemplates.map((template) => (
              <Card
                key={template.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge className={getTypeColor(template.category)}>
                      {template.category}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  <h3 className="font-semibold mb-2">{template.name}</h3>
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    {template.subject}
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    {template.preview}
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      Preview
                    </Button>
                    <Button size="sm" className="flex-1">
                      Use Template
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Sent</p>
                    <p className="text-2xl font-bold">15,847</p>
                  </div>
                  <Send className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-xs text-green-600 mt-1">
                  ↑ 18% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Opens</p>
                    <p className="text-2xl font-bold">4,501</p>
                  </div>
                  <Eye className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-xs text-green-600 mt-1">
                  ↑ 22% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Clicks</p>
                    <p className="text-2xl font-bold">903</p>
                  </div>
                  <MousePointer className="h-8 w-8 text-purple-600" />
                </div>
                <p className="text-xs text-green-600 mt-1">
                  ↑ 15% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Conversions</p>
                    <p className="text-2xl font-bold">127</p>
                  </div>
                  <Target className="h-8 w-8 text-orange-600" />
                </div>
                <p className="text-xs text-green-600 mt-1">
                  ↑ 8% from last month
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Campaign Performance</CardTitle>
              <CardDescription>
                Detailed analytics for your email campaigns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockCampaigns
                  .filter((c) => c.status === "Sent")
                  .map((campaign) => (
                    <div key={campaign.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">{campaign.name}</h4>
                        <Badge className={getTypeColor(campaign.type)}>
                          {campaign.type}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Recipients</p>
                          <p className="font-medium">
                            {campaign.recipients.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Open Rate</p>
                          <p className="font-medium">{campaign.openRate}%</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Click Rate</p>
                          <p className="font-medium">{campaign.clickRate}%</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Conversions</p>
                          <p className="font-medium">
                            {Math.round(
                              ((campaign.recipients * campaign.clickRate) /
                                100) *
                                0.14
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Automation Rules</CardTitle>
              <CardDescription>
                Set up automated email sequences for your guests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Welcome Series",
                    trigger: "New subscriber",
                    status: "Active",
                    emails: 3,
                    description:
                      "Introduces new subscribers to your cultural experiences",
                  },
                  {
                    name: "Post-Experience Follow-up",
                    trigger: "Experience completed",
                    status: "Active",
                    emails: 2,
                    description:
                      "Requests feedback and promotes related experiences",
                  },
                  {
                    name: "Abandoned Cart Recovery",
                    trigger: "Cart abandoned for 24h",
                    status: "Draft",
                    emails: 3,
                    description: "Reminds guests to complete their booking",
                  },
                  {
                    name: "Birthday Celebration",
                    trigger: "Guest birthday",
                    status: "Active",
                    emails: 1,
                    description: "Sends birthday wishes with special offer",
                  },
                ].map((automation, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-medium">{automation.name}</h4>
                          <Badge
                            className={
                              automation.status === "Active"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }
                          >
                            {automation.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {automation.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            Trigger: {automation.trigger}
                          </div>
                          <div className="flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            {automation.emails} emails
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          {automation.status === "Active" ? (
                            <Pause className="h-4 w-4" />
                          ) : (
                            <Play className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Create New Automation
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmailCampaigns;

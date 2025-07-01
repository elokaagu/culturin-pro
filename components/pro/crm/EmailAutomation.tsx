"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Mail,
  Plus,
  Play,
  Pause,
  Edit,
  Trash2,
  Calendar,
  Users,
  BarChart3,
  Clock,
  Gift,
  Star,
  Heart,
  MessageSquare,
  Send,
  Eye,
  Copy,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const emailTemplates = [
  {
    id: "welcome",
    name: "Welcome Email",
    subject: "Welcome to {{company_name}} - Your Cultural Journey Begins!",
    trigger: "New guest registration",
    status: "active",
    sent: 156,
    openRate: "68%",
    clickRate: "24%",
    category: "onboarding",
  },
  {
    id: "birthday",
    name: "Birthday Special",
    subject: "Happy Birthday! 🎉 Special Experience Just for You",
    trigger: "7 days before birthday",
    status: "active",
    sent: 89,
    openRate: "82%",
    clickRate: "45%",
    category: "lifecycle",
  },
  {
    id: "post-experience",
    name: "Post-Experience Follow-up",
    subject: "How was your {{experience_name}} experience?",
    trigger: "24 hours after experience",
    status: "active",
    sent: 234,
    openRate: "71%",
    clickRate: "38%",
    category: "feedback",
  },
  {
    id: "loyalty-reward",
    name: "Loyalty Reward",
    subject: "You've earned a special reward! 🏆",
    trigger: "After 3rd booking",
    status: "active",
    sent: 45,
    openRate: "89%",
    clickRate: "67%",
    category: "loyalty",
  },
  {
    id: "inactive-reengagement",
    name: "Win-Back Campaign",
    subject: "We miss you! Come back for 20% off",
    trigger: "90 days since last booking",
    status: "paused",
    sent: 78,
    openRate: "34%",
    clickRate: "12%",
    category: "reengagement",
  },
];

const automationWorkflows = [
  {
    id: "welcome-series",
    name: "Welcome Series",
    description: "Multi-step onboarding sequence for new guests",
    status: "active",
    steps: 3,
    enrolled: 156,
    completed: 89,
  },
  {
    id: "birthday-campaign",
    name: "Birthday Campaign",
    description: "Automated birthday wishes with special offers",
    status: "active",
    steps: 2,
    enrolled: 89,
    completed: 67,
  },
  {
    id: "loyalty-program",
    name: "Loyalty Program",
    description: "Progressive rewards based on booking frequency",
    status: "active",
    steps: 5,
    enrolled: 234,
    completed: 45,
  },
];

const EmailAutomation = () => {
  const [activeTab, setActiveTab] = useState("templates");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [templateDialogOpen, setTemplateDialogOpen] = useState(false);
  const [workflowDialogOpen, setWorkflowDialogOpen] = useState(false);
  const { toast } = useToast();

  const [newTemplate, setNewTemplate] = useState({
    name: "",
    subject: "",
    content: "",
    trigger: "",
    category: "general",
  });

  const handleCreateTemplate = () => {
    toast({
      title: "Template created",
      description: "Your email template has been saved successfully.",
    });
    setTemplateDialogOpen(false);
    setNewTemplate({
      name: "",
      subject: "",
      content: "",
      trigger: "",
      category: "general",
    });
  };

  const handleToggleTemplate = (templateId: string) => {
    toast({
      title: "Template updated",
      description: "Template status has been changed.",
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      onboarding: "bg-blue-100 text-blue-800",
      lifecycle: "bg-purple-100 text-purple-800",
      feedback: "bg-green-100 text-green-800",
      loyalty: "bg-amber-100 text-amber-800",
      reengagement: "bg-red-100 text-red-800",
      general: "bg-gray-100 text-gray-800",
    };
    return colors[category] || colors.general;
  };

  const getStatusColor = (status: string) => {
    return status === "active"
      ? "bg-green-100 text-green-800"
      : "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Email Automation</h2>
          <p className="text-gray-600">
            Automate your guest communication with smart triggers and
            personalized templates
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </Button>
          <Dialog
            open={templateDialogOpen}
            onOpenChange={setTemplateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Template
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create Email Template</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="template-name">Template Name</Label>
                    <Input
                      id="template-name"
                      placeholder="e.g., Welcome Email"
                      value={newTemplate.name}
                      onChange={(e) =>
                        setNewTemplate({ ...newTemplate, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="template-category">Category</Label>
                    <Select
                      value={newTemplate.category}
                      onValueChange={(value) =>
                        setNewTemplate({ ...newTemplate, category: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="onboarding">Onboarding</SelectItem>
                        <SelectItem value="lifecycle">Lifecycle</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                        <SelectItem value="loyalty">Loyalty</SelectItem>
                        <SelectItem value="reengagement">
                          Re-engagement
                        </SelectItem>
                        <SelectItem value="general">General</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="template-subject">Subject Line</Label>
                  <Input
                    id="template-subject"
                    placeholder="Use {{variables}} for personalization"
                    value={newTemplate.subject}
                    onChange={(e) =>
                      setNewTemplate({
                        ...newTemplate,
                        subject: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="template-trigger">Trigger Condition</Label>
                  <Select
                    value={newTemplate.trigger}
                    onValueChange={(value) =>
                      setNewTemplate({ ...newTemplate, trigger: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select trigger" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="signup">New guest signup</SelectItem>
                      <SelectItem value="booking">After booking</SelectItem>
                      <SelectItem value="experience">
                        After experience
                      </SelectItem>
                      <SelectItem value="birthday">Birthday</SelectItem>
                      <SelectItem value="anniversary">Anniversary</SelectItem>
                      <SelectItem value="inactive">Inactive period</SelectItem>
                      <SelectItem value="loyalty">Loyalty milestone</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="template-content">Email Content</Label>
                  <Textarea
                    id="template-content"
                    className="min-h-[200px]"
                    placeholder="Write your email content here. Use {{guest_name}}, {{company_name}}, {{experience_name}} for personalization."
                    value={newTemplate.content}
                    onChange={(e) =>
                      setNewTemplate({
                        ...newTemplate,
                        content: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setTemplateDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleCreateTemplate}>
                    Create Template
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="templates">Email Templates</TabsTrigger>
          <TabsTrigger value="workflows">Automation Workflows</TabsTrigger>
          <TabsTrigger value="campaigns">Active Campaigns</TabsTrigger>
          <TabsTrigger value="analytics">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid gap-4">
            {emailTemplates.map((template) => (
              <Card
                key={template.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium text-lg">{template.name}</h3>
                        <Badge className={getCategoryColor(template.category)}>
                          {template.category}
                        </Badge>
                        <Badge className={getStatusColor(template.status)}>
                          {template.status}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-2">{template.subject}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {template.trigger}
                        </span>
                        <span className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {template.sent} sent
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {template.openRate} open rate
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          {template.clickRate} click rate
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Switch
                        checked={template.status === "active"}
                        onCheckedChange={() =>
                          handleToggleTemplate(template.id)
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="workflows" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Automation Workflows</h3>
            <Dialog
              open={workflowDialogOpen}
              onOpenChange={setWorkflowDialogOpen}
            >
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Workflow
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Automation Workflow</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Workflow Name</Label>
                    <Input placeholder="e.g., Post-Booking Series" />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea placeholder="Describe what this workflow does..." />
                  </div>
                  <div className="space-y-2">
                    <Label>Trigger Event</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select trigger" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="booking">New booking</SelectItem>
                        <SelectItem value="signup">Guest signup</SelectItem>
                        <SelectItem value="experience">
                          Experience completion
                        </SelectItem>
                        <SelectItem value="milestone">
                          Loyalty milestone
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setWorkflowDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={() => setWorkflowDialogOpen(false)}>
                      Create Workflow
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {automationWorkflows.map((workflow) => (
              <Card key={workflow.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium text-lg">{workflow.name}</h3>
                        <Badge className={getStatusColor(workflow.status)}>
                          {workflow.status}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-3">
                        {workflow.description}
                      </p>
                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {workflow.enrolled} enrolled
                        </span>
                        <span className="flex items-center gap-1">
                          <BarChart3 className="h-3 w-3" />
                          {workflow.completed} completed
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {workflow.steps} steps
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        {workflow.status === "active" ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Email Campaigns</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Campaign</TableHead>
                    <TableHead>Recipients</TableHead>
                    <TableHead>Sent</TableHead>
                    <TableHead>Opens</TableHead>
                    <TableHead>Clicks</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div>
                        <div className="font-medium">Summer Special Offers</div>
                        <div className="text-sm text-gray-500">
                          Seasonal promotion campaign
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>234</TableCell>
                    <TableCell>234</TableCell>
                    <TableCell>156 (67%)</TableCell>
                    <TableCell>89 (38%)</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">
                        Completed
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          Birthday Wishes - July
                        </div>
                        <div className="text-sm text-gray-500">
                          Monthly birthday campaign
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>45</TableCell>
                    <TableCell>45</TableCell>
                    <TableCell>38 (84%)</TableCell>
                    <TableCell>23 (51%)</TableCell>
                    <TableCell>
                      <Badge className="bg-blue-100 text-blue-800">
                        Sending
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <Pause className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold">89.2%</div>
                <p className="text-sm text-gray-500">Delivery Rate</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold">68.4%</div>
                <p className="text-sm text-gray-500">Open Rate</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold">34.7%</div>
                <p className="text-sm text-gray-500">Click Rate</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold">2.8%</div>
                <p className="text-sm text-gray-500">Unsubscribe Rate</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Email Performance by Template</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {emailTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <div className="font-medium">{template.name}</div>
                      <div className="text-sm text-gray-500">
                        {template.sent} emails sent
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="text-center">
                        <div className="font-medium">{template.openRate}</div>
                        <div className="text-gray-500">Opens</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium">{template.clickRate}</div>
                        <div className="text-gray-500">Clicks</div>
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

export default EmailAutomation;

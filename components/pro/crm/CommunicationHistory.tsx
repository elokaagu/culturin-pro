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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Mail,
  MessageSquare,
  Phone,
  Calendar,
  Plus,
  Clock,
  User,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Send,
  Eye,
  Filter,
  Search,
  MoreHorizontal,
  Zap,
  Target,
  TrendingUp,
  Users,
  BarChart3,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const communicationHistory = [
  {
    id: "comm-1",
    type: "email",
    subject: "Welcome to Culturin!",
    content: "Thank you for joining our cultural experience community...",
    recipient: "Sofia Martinez",
    recipientEmail: "sofia@example.com",
    status: "delivered",
    sentAt: "2023-07-15T10:30:00Z",
    openedAt: "2023-07-15T11:45:00Z",
    clickedAt: "2023-07-15T11:47:00Z",
    template: "welcome-email",
    campaign: "Onboarding Sequence",
  },
  {
    id: "comm-2",
    type: "sms",
    content:
      "Hi Sofia! Your Cultural Heritage Tour is tomorrow at 2 PM. Meet us at the main entrance. Excited to see you!",
    recipient: "Sofia Martinez",
    recipientPhone: "+1 555-123-4567",
    status: "delivered",
    sentAt: "2023-07-14T16:00:00Z",
    deliveredAt: "2023-07-14T16:01:00Z",
    template: "booking-reminder",
    campaign: "Booking Reminders",
  },
  {
    id: "comm-3",
    type: "email",
    subject: "How was your Cultural Heritage Tour?",
    content:
      "We hope you enjoyed your experience! Please take a moment to share your feedback...",
    recipient: "Sofia Martinez",
    recipientEmail: "sofia@example.com",
    status: "opened",
    sentAt: "2023-07-16T09:00:00Z",
    openedAt: "2023-07-16T14:20:00Z",
    template: "post-experience-feedback",
    campaign: "Experience Follow-up",
  },
  {
    id: "comm-4",
    type: "phone",
    content: "Follow-up call regarding VIP membership upgrade",
    recipient: "Aisha Patel",
    recipientPhone: "+1 555-321-6540",
    status: "completed",
    sentAt: "2023-07-17T14:30:00Z",
    duration: "12 minutes",
    notes:
      "Interested in VIP benefits, will consider upgrade after next booking",
    assignedTo: "Customer Success Team",
  },
  {
    id: "comm-5",
    type: "email",
    subject: "Special Birthday Offer Just for You! 🎉",
    content: "Happy Birthday James! Enjoy 20% off any experience this month...",
    recipient: "James Wilson",
    recipientEmail: "james@example.com",
    status: "clicked",
    sentAt: "2023-06-22T08:00:00Z",
    openedAt: "2023-06-22T09:15:00Z",
    clickedAt: "2023-06-22T09:17:00Z",
    template: "birthday-special",
    campaign: "Birthday Campaign",
  },
];

const automationWorkflows = [
  {
    id: "workflow-1",
    name: "Welcome Series",
    description: "Multi-step onboarding sequence for new guests",
    trigger: "Guest signup",
    status: "active",
    steps: [
      {
        id: 1,
        type: "email",
        template: "welcome-email",
        delay: "0 minutes",
        status: "active",
      },
      {
        id: 2,
        type: "email",
        template: "getting-started",
        delay: "2 days",
        status: "active",
      },
      {
        id: 3,
        type: "email",
        template: "first-booking-incentive",
        delay: "7 days",
        status: "active",
      },
    ],
    enrolled: 156,
    completed: 89,
    conversionRate: "23%",
  },
  {
    id: "workflow-2",
    name: "Booking Confirmation & Reminders",
    description: "Automated sequence after booking confirmation",
    trigger: "Booking confirmed",
    status: "active",
    steps: [
      {
        id: 1,
        type: "email",
        template: "booking-confirmation",
        delay: "0 minutes",
        status: "active",
      },
      {
        id: 2,
        type: "sms",
        template: "booking-reminder-24h",
        delay: "1 day before",
        status: "active",
      },
      {
        id: 3,
        type: "email",
        template: "preparation-guide",
        delay: "2 hours before",
        status: "active",
      },
    ],
    enrolled: 234,
    completed: 221,
    conversionRate: "94%",
  },
  {
    id: "workflow-3",
    name: "Post-Experience Follow-up",
    description: "Gather feedback and encourage repeat bookings",
    trigger: "Experience completed",
    status: "active",
    steps: [
      {
        id: 1,
        type: "email",
        template: "thank-you-feedback",
        delay: "2 hours",
        status: "active",
      },
      {
        id: 2,
        type: "email",
        template: "review-request",
        delay: "1 day",
        status: "active",
      },
      {
        id: 3,
        type: "email",
        template: "next-experience-suggestion",
        delay: "7 days",
        status: "active",
      },
    ],
    enrolled: 187,
    completed: 134,
    conversionRate: "31%",
  },
  {
    id: "workflow-4",
    name: "Win-Back Campaign",
    description: "Re-engage inactive guests",
    trigger: "90 days no activity",
    status: "active",
    steps: [
      {
        id: 1,
        type: "email",
        template: "we-miss-you",
        delay: "0 minutes",
        status: "active",
      },
      {
        id: 2,
        type: "email",
        template: "special-comeback-offer",
        delay: "7 days",
        status: "active",
      },
      {
        id: 3,
        type: "sms",
        template: "final-offer",
        delay: "14 days",
        status: "active",
      },
    ],
    enrolled: 78,
    completed: 23,
    conversionRate: "12%",
  },
];

const CommunicationHistory = () => {
  const [activeTab, setActiveTab] = useState("history");
  const [filterType, setFilterType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [workflowDialogOpen, setWorkflowDialogOpen] = useState(false);
  const [communicationDialogOpen, setCommunicationDialogOpen] = useState(false);
  const { toast } = useToast();

  const [newWorkflow, setNewWorkflow] = useState({
    name: "",
    description: "",
    trigger: "",
    steps: [],
  });

  const [newCommunication, setNewCommunication] = useState({
    type: "email",
    recipient: "",
    subject: "",
    content: "",
    scheduledFor: "",
  });

  const filteredCommunications = communicationHistory.filter((comm) => {
    const matchesType = filterType === "all" || comm.type === filterType;
    const matchesSearch =
      comm.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comm.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comm.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getStatusColor = (status) => {
    const colors = {
      delivered: "bg-green-100 text-green-800",
      opened: "bg-blue-100 text-blue-800",
      clicked: "bg-purple-100 text-purple-800",
      bounced: "bg-red-100 text-red-800",
      pending: "bg-yellow-100 text-yellow-800",
      completed: "bg-green-100 text-green-800",
      failed: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "email":
        return <Mail className="h-4 w-4" />;
      case "sms":
        return <MessageSquare className="h-4 w-4" />;
      case "phone":
        return <Phone className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const handleCreateWorkflow = () => {
    toast({
      title: "Workflow created",
      description: "Your automation workflow has been created successfully.",
    });
    setWorkflowDialogOpen(false);
    setNewWorkflow({ name: "", description: "", trigger: "", steps: [] });
  };

  const handleSendCommunication = () => {
    toast({
      title: "Communication sent",
      description: "Your message has been sent successfully.",
    });
    setCommunicationDialogOpen(false);
    setNewCommunication({
      type: "email",
      recipient: "",
      subject: "",
      content: "",
      scheduledFor: "",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Communication Center</h2>
          <p className="text-gray-600">
            Track all guest interactions and automate follow-up sequences
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog
            open={communicationDialogOpen}
            onOpenChange={setCommunicationDialogOpen}
          >
            <DialogTrigger asChild>
              <Button variant="outline">
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Send Communication</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Communication Type</Label>
                    <Select
                      value={newCommunication.type}
                      onValueChange={(value) =>
                        setNewCommunication({
                          ...newCommunication,
                          type: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="sms">SMS</SelectItem>
                        <SelectItem value="phone">Phone Call</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Recipient</Label>
                    <Select
                      value={newCommunication.recipient}
                      onValueChange={(value) =>
                        setNewCommunication({
                          ...newCommunication,
                          recipient: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select guest" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sofia@example.com">
                          Sofia Martinez
                        </SelectItem>
                        <SelectItem value="james@example.com">
                          James Wilson
                        </SelectItem>
                        <SelectItem value="elena@example.com">
                          Elena Petrova
                        </SelectItem>
                        <SelectItem value="aisha@example.com">
                          Aisha Patel
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {newCommunication.type === "email" && (
                  <div className="space-y-2">
                    <Label>Subject</Label>
                    <Input
                      placeholder="Email subject"
                      value={newCommunication.subject}
                      onChange={(e) =>
                        setNewCommunication({
                          ...newCommunication,
                          subject: e.target.value,
                        })
                      }
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Message Content</Label>
                  <Textarea
                    className="min-h-[120px]"
                    placeholder="Type your message here..."
                    value={newCommunication.content}
                    onChange={(e) =>
                      setNewCommunication({
                        ...newCommunication,
                        content: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Schedule For (Optional)</Label>
                  <Input
                    type="datetime-local"
                    value={newCommunication.scheduledFor}
                    onChange={(e) =>
                      setNewCommunication({
                        ...newCommunication,
                        scheduledFor: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setCommunicationDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleSendCommunication}>
                    {newCommunication.scheduledFor ? "Schedule" : "Send Now"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog
            open={workflowDialogOpen}
            onOpenChange={setWorkflowDialogOpen}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Workflow
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create Automation Workflow</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Workflow Name</Label>
                  <Input
                    placeholder="e.g., VIP Upgrade Sequence"
                    value={newWorkflow.name}
                    onChange={(e) =>
                      setNewWorkflow({ ...newWorkflow, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    placeholder="Describe what this workflow does..."
                    value={newWorkflow.description}
                    onChange={(e) =>
                      setNewWorkflow({
                        ...newWorkflow,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Trigger Event</Label>
                  <Select
                    value={newWorkflow.trigger}
                    onValueChange={(value) =>
                      setNewWorkflow({ ...newWorkflow, trigger: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select trigger" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="guest-signup">Guest signup</SelectItem>
                      <SelectItem value="booking-confirmed">
                        Booking confirmed
                      </SelectItem>
                      <SelectItem value="experience-completed">
                        Experience completed
                      </SelectItem>
                      <SelectItem value="birthday">Guest birthday</SelectItem>
                      <SelectItem value="anniversary">
                        Guest anniversary
                      </SelectItem>
                      <SelectItem value="inactive-period">
                        Inactive period
                      </SelectItem>
                      <SelectItem value="loyalty-milestone">
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
                  <Button onClick={handleCreateWorkflow}>
                    Create Workflow
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="history">Communication History</TabsTrigger>
          <TabsTrigger value="workflows">Automation Workflows</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Messages</TabsTrigger>
          <TabsTrigger value="analytics">Performance Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search communications..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
                <SelectItem value="phone">Phone</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {filteredCommunications.map((comm) => (
              <Card key={comm.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(comm.type)}
                          <span className="font-medium capitalize">
                            {comm.type}
                          </span>
                        </div>
                        <Badge className={getStatusColor(comm.status)}>
                          {comm.status}
                        </Badge>
                        {comm.campaign && (
                          <Badge variant="outline" className="bg-blue-50">
                            {comm.campaign}
                          </Badge>
                        )}
                      </div>

                      <div className="mb-3">
                        <div className="flex items-center gap-2 mb-1">
                          <User className="h-4 w-4 text-gray-500" />
                          <span className="font-medium">{comm.recipient}</span>
                          <span className="text-gray-500">
                            {comm.recipientEmail || comm.recipientPhone}
                          </span>
                        </div>
                        {comm.subject && (
                          <h4 className="font-medium text-lg">
                            {comm.subject}
                          </h4>
                        )}
                      </div>

                      <p className="text-gray-600 mb-3 line-clamp-2">
                        {comm.content}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Sent: {new Date(comm.sentAt).toLocaleString()}
                        </span>
                        {comm.openedAt && (
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            Opened: {new Date(comm.openedAt).toLocaleString()}
                          </span>
                        )}
                        {comm.clickedAt && (
                          <span className="flex items-center gap-1 text-purple-600">
                            <Target className="h-3 w-3" />
                            Clicked: {new Date(comm.clickedAt).toLocaleString()}
                          </span>
                        )}
                        {comm.duration && (
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            Duration: {comm.duration}
                          </span>
                        )}
                      </div>

                      {comm.notes && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <div className="text-sm font-medium text-gray-700 mb-1">
                            Notes:
                          </div>
                          <div className="text-sm text-gray-600">
                            {comm.notes}
                          </div>
                        </div>
                      )}
                    </div>

                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="workflows" className="space-y-4">
          <div className="grid gap-6">
            {automationWorkflows.map((workflow) => (
              <Card
                key={workflow.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-lg">{workflow.name}</h3>
                        <Badge
                          className={
                            workflow.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }
                        >
                          {workflow.status}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-3">
                        {workflow.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Zap className="h-3 w-3" />
                          Trigger: {workflow.trigger}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {workflow.enrolled} enrolled
                        </span>
                        <span className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          {workflow.completed} completed
                        </span>
                        <span className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          {workflow.conversionRate} conversion
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Switch checked={workflow.status === "active"} />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">Workflow Steps:</h4>
                    <div className="flex items-center gap-2 overflow-x-auto pb-2">
                      {workflow.steps.map((step, index) => (
                        <div
                          key={step.id}
                          className="flex items-center gap-2 flex-shrink-0"
                        >
                          <div
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
                              step.status === "active"
                                ? "bg-blue-50 border-blue-200"
                                : "bg-gray-50 border-gray-200"
                            }`}
                          >
                            {getTypeIcon(step.type)}
                            <span className="text-sm font-medium">
                              {step.template}
                            </span>
                            <span className="text-xs text-gray-500">
                              ({step.delay})
                            </span>
                          </div>
                          {index < workflow.steps.length - 1 && (
                            <ArrowRight className="h-4 w-4 text-gray-400" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Communications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Mail className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium">Birthday Special Offer</div>
                      <div className="text-sm text-gray-500">
                        To: Marcus Johnson • Tomorrow at 9:00 AM
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-yellow-100 text-yellow-800">
                      Scheduled
                    </Badge>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <MessageSquare className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium">Experience Reminder</div>
                      <div className="text-sm text-gray-500">
                        To: Elena Petrova • July 25th at 2:00 PM
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-yellow-100 text-yellow-800">
                      Scheduled
                    </Badge>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold">1,247</div>
                <p className="text-sm text-gray-500">Total Communications</p>
                <div className="text-xs text-green-600 mt-1">
                  ↗ +18% this month
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold">68.4%</div>
                <p className="text-sm text-gray-500">Open Rate</p>
                <div className="text-xs text-green-600 mt-1">
                  Above industry avg
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold">24.7%</div>
                <p className="text-sm text-gray-500">Click-through Rate</p>
                <div className="text-xs text-green-600 mt-1">
                  ↗ +5% this month
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold">94.2%</div>
                <p className="text-sm text-gray-500">Delivery Rate</p>
                <div className="text-xs text-green-600 mt-1">
                  Excellent delivery
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Workflow Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {automationWorkflows.map((workflow) => (
                  <div
                    key={workflow.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <div className="font-medium">{workflow.name}</div>
                      <div className="text-sm text-gray-500">
                        {workflow.enrolled} guests enrolled
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="text-center">
                        <div className="font-medium">
                          {workflow.conversionRate}
                        </div>
                        <div className="text-gray-500">Conversion</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium">
                          {Math.round(
                            (workflow.completed / workflow.enrolled) * 100
                          )}
                          %
                        </div>
                        <div className="text-gray-500">Completion</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium">
                          {workflow.status === "active" ? "✓" : "✗"}
                        </div>
                        <div className="text-gray-500">Status</div>
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

export default CommunicationHistory;

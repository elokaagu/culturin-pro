"use client";

import { useState, useEffect } from "react";
import { Link } from "../../../lib/navigation";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Eye,
  Edit,
  Calendar,
  User,
  Briefcase,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import NewFooter from "@/components/sections/NewFooter";
import {
  jobApplications,
  jobPostings,
  JobApplication,
  JobPosting,
} from "@/data/careersData";
import { toast } from "@/hooks/use-toast";

const CareersManagement = () => {
  const [applications, setApplications] =
    useState<JobApplication[]>(jobApplications);
  const [jobs, setJobs] = useState<JobPosting[]>(jobPostings);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [jobFilter, setJobFilter] = useState("all");
  const [selectedApplication, setSelectedApplication] =
    useState<JobApplication | null>(null);
  const [isViewingApplication, setIsViewingApplication] = useState(false);

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    const matchesJob = jobFilter === "all" || app.jobId === jobFilter;
    return matchesSearch && matchesStatus && matchesJob;
  });

  const handleUpdateStatus = (
    applicationId: string,
    newStatus: JobApplication["status"]
  ) => {
    setApplications(
      applications.map((app) =>
        app.id === applicationId
          ? { ...app, status: newStatus, updatedAt: new Date().toISOString() }
          : app
      )
    );

    toast({
      title: "Status Updated",
      description: `Application status changed to ${newStatus}.`,
    });
  };

  const handleAddNotes = (applicationId: string, notes: string) => {
    setApplications(
      applications.map((app) =>
        app.id === applicationId
          ? { ...app, notes, updatedAt: new Date().toISOString() }
          : app
      )
    );

    toast({
      title: "Notes Updated",
      description: "Application notes have been saved.",
    });
  };

  const getStatusColor = (status: JobApplication["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "reviewing":
        return "bg-blue-100 text-blue-800";
      case "interview":
        return "bg-purple-100 text-purple-800";
      case "offer":
        return "bg-green-100 text-green-800";
      case "hired":
        return "bg-emerald-100 text-emerald-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: JobApplication["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "reviewing":
        return <Eye className="h-4 w-4" />;
      case "interview":
        return <Calendar className="h-4 w-4" />;
      case "offer":
        return <CheckCircle className="h-4 w-4" />;
      case "hired":
        return <CheckCircle className="h-4 w-4" />;
      case "rejected":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const stats = [
    {
      title: "Total Applications",
      value: applications.length.toString(),
      color: "bg-blue-100 text-blue-600",
      icon: FileText,
    },
    {
      title: "Pending Review",
      value: applications
        .filter((app) => app.status === "pending" || app.status === "reviewing")
        .length.toString(),
      color: "bg-yellow-100 text-yellow-600",
      icon: Clock,
    },
    {
      title: "In Interview",
      value: applications
        .filter((app) => app.status === "interview")
        .length.toString(),
      color: "bg-purple-100 text-purple-600",
      icon: Calendar,
    },
    {
      title: "Active Job Postings",
      value: jobs.filter((job) => job.isActive).length.toString(),
      color: "bg-green-100 text-green-600",
      icon: Briefcase,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header type="operator" />

      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-start">
              <div className="max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Careers Management
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-8">
                  Manage job applications, postings, and recruitment pipeline.
                </p>
              </div>
              <div className="flex gap-3">
                <Button asChild variant="outline">
                  <Link to="/careers">
                    <Eye className="h-4 w-4 mr-2" />
                    View Live
                  </Link>
                </Button>
                <Button asChild>
                  <Link to="/admin">← Back to Admin</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                      <p className="text-3xl font-bold">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.color}`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Tabs defaultValue="applications" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="applications">Job Applications</TabsTrigger>
                <TabsTrigger value="postings">Job Postings</TabsTrigger>
              </TabsList>

              <TabsContent value="applications" className="space-y-6">
                {/* Applications Management */}
                <Card>
                  <CardHeader>
                    <CardTitle>Job Applications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Filters */}
                    <div className="flex gap-4 mb-6">
                      <div className="flex-1">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            placeholder="Search applications..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <Select
                        value={statusFilter}
                        onValueChange={setStatusFilter}
                      >
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="All Statuses" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Statuses</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="reviewing">Reviewing</SelectItem>
                          <SelectItem value="interview">Interview</SelectItem>
                          <SelectItem value="offer">Offer</SelectItem>
                          <SelectItem value="hired">Hired</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={jobFilter} onValueChange={setJobFilter}>
                        <SelectTrigger className="w-64">
                          <SelectValue placeholder="All Jobs" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Jobs</SelectItem>
                          {jobs.map((job) => (
                            <SelectItem key={job.id} value={job.id}>
                              {job.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Applications Table */}
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Applicant</TableHead>
                          <TableHead>Position</TableHead>
                          <TableHead>Experience</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Applied</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredApplications.map((application) => (
                          <TableRow key={application.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 rounded-full">
                                  <User className="h-4 w-4 text-blue-600" />
                                </div>
                                <div>
                                  <p className="font-medium">
                                    {application.applicantName}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    {application.email}
                                  </p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium">
                                  {application.jobTitle}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {application.location}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>{application.experience}</TableCell>
                            <TableCell>
                              <Badge
                                className={`${getStatusColor(
                                  application.status
                                )} border-0`}
                              >
                                <div className="flex items-center gap-1">
                                  {getStatusIcon(application.status)}
                                  {application.status}
                                </div>
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {new Date(
                                application.appliedAt
                              ).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedApplication(application);
                                    setIsViewingApplication(true);
                                  }}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Select
                                  value={application.status}
                                  onValueChange={(value) =>
                                    handleUpdateStatus(
                                      application.id,
                                      value as JobApplication["status"]
                                    )
                                  }
                                >
                                  <SelectTrigger className="w-32">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="pending">
                                      Pending
                                    </SelectItem>
                                    <SelectItem value="reviewing">
                                      Reviewing
                                    </SelectItem>
                                    <SelectItem value="interview">
                                      Interview
                                    </SelectItem>
                                    <SelectItem value="offer">Offer</SelectItem>
                                    <SelectItem value="hired">Hired</SelectItem>
                                    <SelectItem value="rejected">
                                      Rejected
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    {filteredApplications.length === 0 && (
                      <div className="text-center py-8">
                        <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">
                          No applications found matching your criteria
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="postings" className="space-y-6">
                {/* Job Postings Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle>Job Postings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {jobs.map((job) => (
                        <div key={job.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-lg font-semibold">
                                  {job.title}
                                </h3>
                                <Badge
                                  variant={
                                    job.isActive ? "default" : "secondary"
                                  }
                                >
                                  {job.isActive ? "Active" : "Inactive"}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                                <div className="flex items-center gap-1">
                                  <Briefcase className="h-4 w-4" />
                                  {job.department}
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-4 w-4" />
                                  {job.location}
                                </div>
                                <div className="flex items-center gap-1">
                                  <User className="h-4 w-4" />
                                  {job.applicationCount} applications
                                </div>
                              </div>
                              <p className="text-gray-700 text-sm">
                                {job.description}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm" asChild>
                                <Link to={`/careers/open-positions`}>
                                  <Eye className="h-4 w-4" />
                                </Link>
                              </Button>
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
        </section>

        {/* Application Detail Dialog */}
        {selectedApplication && (
          <Dialog
            open={isViewingApplication}
            onOpenChange={setIsViewingApplication}
          >
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Application Details</DialogTitle>
                <DialogDescription>
                  {selectedApplication.applicantName} -{" "}
                  {selectedApplication.jobTitle}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Applicant Info */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-500">
                        Contact Information
                      </Label>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span>{selectedApplication.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span>{selectedApplication.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span>{selectedApplication.location}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-500">
                        Experience & Availability
                      </Label>
                      <div className="mt-2 space-y-1">
                        <p>
                          <strong>Experience:</strong>{" "}
                          {selectedApplication.experience}
                        </p>
                        <p>
                          <strong>Availability:</strong>{" "}
                          {selectedApplication.availability}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-500">
                        Skills
                      </Label>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {selectedApplication.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-500">
                        Links
                      </Label>
                      <div className="mt-2 space-y-2">
                        {selectedApplication.resumeUrl && (
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-gray-400" />
                            <a
                              href={selectedApplication.resumeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              Resume <ExternalLink className="h-3 w-3 inline" />
                            </a>
                          </div>
                        )}
                        {selectedApplication.portfolioUrl && (
                          <div className="flex items-center gap-2">
                            <ExternalLink className="h-4 w-4 text-gray-400" />
                            <a
                              href={selectedApplication.portfolioUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              Portfolio{" "}
                              <ExternalLink className="h-3 w-3 inline" />
                            </a>
                          </div>
                        )}
                        {selectedApplication.linkedinUrl && (
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-gray-400" />
                            <a
                              href={selectedApplication.linkedinUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              LinkedIn{" "}
                              <ExternalLink className="h-3 w-3 inline" />
                            </a>
                          </div>
                        )}
                        {selectedApplication.githubUrl && (
                          <div className="flex items-center gap-2">
                            <ExternalLink className="h-4 w-4 text-gray-400" />
                            <a
                              href={selectedApplication.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              GitHub <ExternalLink className="h-3 w-3 inline" />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cover Letter */}
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Cover Letter
                  </Label>
                  <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm leading-relaxed">
                      {selectedApplication.coverLetter}
                    </p>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Internal Notes
                  </Label>
                  <Textarea
                    value={selectedApplication.notes || ""}
                    onChange={(e) => {
                      setSelectedApplication({
                        ...selectedApplication,
                        notes: e.target.value,
                      });
                    }}
                    placeholder="Add notes about this candidate..."
                    className="mt-2"
                    rows={3}
                  />
                  <Button
                    onClick={() =>
                      handleAddNotes(
                        selectedApplication.id,
                        selectedApplication.notes || ""
                      )
                    }
                    className="mt-2"
                    size="sm"
                  >
                    Save Notes
                  </Button>
                </div>

                {/* Status & Interview */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Status
                    </Label>
                    <Select
                      value={selectedApplication.status}
                      onValueChange={(value) => {
                        const newStatus = value as JobApplication["status"];
                        setSelectedApplication({
                          ...selectedApplication,
                          status: newStatus,
                        });
                        handleUpdateStatus(selectedApplication.id, newStatus);
                      }}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="reviewing">Reviewing</SelectItem>
                        <SelectItem value="interview">Interview</SelectItem>
                        <SelectItem value="offer">Offer</SelectItem>
                        <SelectItem value="hired">Hired</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedApplication.interviewDate && (
                    <div>
                      <Label className="text-sm font-medium text-gray-500">
                        Interview Date
                      </Label>
                      <div className="mt-2 p-2 bg-blue-50 rounded border">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-blue-600" />
                          <span className="text-sm">
                            {new Date(
                              selectedApplication.interviewDate
                            ).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsViewingApplication(false)}
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    window.open(
                      `mailto:${selectedApplication.email}?subject=Re: ${selectedApplication.jobTitle} Application`,
                      "_blank"
                    );
                  }}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Email Candidate
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </main>

      <NewFooter />
    </div>
  );
};

export default CareersManagement;

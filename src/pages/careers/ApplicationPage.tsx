"use client";

import { useState } from "react";
import { useParams, Link } from "../../../lib/navigation";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Upload, CheckCircle } from "lucide-react";
import NewFooter from "@/components/sections/NewFooter";

const ApplicationPage = () => {
  const { jobId } = useParams();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    coverLetter: "",
    resumeUploaded: false,
    submitted: false,
  });

  // This would be populated from an API in a real application
  const jobDetails = {
    "senior-fullstack-dev": {
      title: "Senior Full Stack Developer",
      department: "Engineering",
      location: "Remote",
    },
    "content-marketing": {
      title: "Content Marketing Specialist",
      department: "Marketing",
      location: "New York",
    },
    "ux-ui-designer": {
      title: "UX/UI Designer",
      department: "Product",
      location: "Remote",
    },
    "customer-success": {
      title: "Customer Success Manager",
      department: "Operations",
      location: "London",
    },
    "growth-marketing": {
      title: "Growth Marketing Manager",
      department: "Marketing",
      location: "Remote",
    },
    "data-analyst": {
      title: "Data Analyst",
      department: "Product",
      location: "Remote",
    },
    "backend-engineer": {
      title: "Backend Engineer",
      department: "Engineering",
      location: "Remote",
    },
    "sales-director": {
      title: "Sales Director",
      department: "Sales",
      location: "New York",
    },
  };

  const job =
    jobId && jobDetails[jobId]
      ? jobDetails[jobId]
      : {
          title: "Job Position",
          department: "Department",
          location: "Location",
        };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleResumeUpload = (e) => {
    // In a real application, this would handle file upload
    if (e.target.files && e.target.files[0]) {
      setFormState((prev) => ({ ...prev, resumeUploaded: true }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, this would send the form data to an API
    // For now, we'll just simulate a submission
    setFormState((prev) => ({ ...prev, submitted: true }));

    // In a real app, you'd send this data to your backend
    console.log("Application submitted:", {
      jobId,
      ...formState,
    });

    // Reset form after "submission"
    setTimeout(() => {
      setFormState({
        name: "",
        email: "",
        phone: "",
        coverLetter: "",
        resumeUploaded: false,
        submitted: false,
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header type="operator" />

      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <Link
            to="/careers/open-positions"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Open Positions
          </Link>

          {formState.submitted ? (
            <Card className="p-8 text-center">
              <div className="flex flex-col items-center space-y-4">
                <CheckCircle className="h-16 w-16 text-green-500" />
                <h2 className="text-2xl font-bold">Application Submitted!</h2>
                <p className="text-gray-600 max-w-md mx-auto">
                  Thank you for applying to join the Culturin team. We'll review
                  your application and be in touch soon.
                </p>
                <Link to="/careers">
                  <Button className="mt-4">Return to Careers Page</Button>
                </Link>
              </div>
            </Card>
          ) : (
            <>
              <h1 className="text-3xl font-bold mb-2">Apply for {job.title}</h1>
              <p className="text-gray-600 mb-8">
                {job.department} · {job.location}
              </p>

              <Card className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formState.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="resume">Resume/CV</Label>
                      <div className="mt-1">
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            {formState.resumeUploaded ? (
                              <>
                                <CheckCircle className="w-8 h-8 mb-2 text-green-500" />
                                <p className="text-sm text-gray-500">
                                  Resume uploaded
                                </p>
                              </>
                            ) : (
                              <>
                                <Upload className="w-8 h-8 mb-2 text-gray-400" />
                                <p className="text-sm text-gray-500">
                                  Upload your resume (PDF or Word)
                                </p>
                              </>
                            )}
                          </div>
                          <input
                            id="resume"
                            type="file"
                            className="hidden"
                            accept=".pdf,.doc,.docx"
                            onChange={handleResumeUpload}
                            required
                          />
                        </label>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="coverLetter">
                        Cover Letter (Optional)
                      </Label>
                      <Textarea
                        id="coverLetter"
                        name="coverLetter"
                        value={formState.coverLetter}
                        onChange={handleInputChange}
                        placeholder="Tell us why you're interested in this position..."
                        className="h-32"
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    Submit Application
                  </Button>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    By submitting this application, you consent to Culturin
                    processing your personal data as outlined in our Privacy
                    Policy.
                  </p>
                </form>
              </Card>
            </>
          )}
        </div>
      </main>

      <NewFooter />
    </div>
  );
};

export default ApplicationPage;

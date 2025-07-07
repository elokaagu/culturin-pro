"use client";

import { useState, useEffect } from "react";
import { Link } from "../../../lib/navigation";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MapPin, ArrowLeft, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import NewFooter from "@/components/sections/NewFooter";

const OpenPositionsPage = () => {
  const [animateItems, setAnimateItems] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setAnimateItems(true);
    document.title = "Open Positions | Culturin Careers";
  }, []);

  const openings = [
    {
      id: "senior-fullstack-dev",
      title: "Senior Full Stack Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description:
        "We're looking for a senior full stack developer with experience in React, Node.js, and PostgreSQL to join our engineering team.",
    },
    {
      id: "content-marketing",
      title: "Content Marketing Specialist",
      department: "Marketing",
      location: "New York",
      type: "Full-time",
      description:
        "Join our marketing team to create compelling content that showcases cultural experiences and drives engagement.",
    },
    {
      id: "ux-ui-designer",
      title: "UX/UI Designer",
      department: "Product",
      location: "Remote",
      type: "Full-time",
      description:
        "Help shape our product experience with user-centered design solutions that make cultural experiences accessible to all.",
    },
    {
      id: "customer-success",
      title: "Customer Success Manager",
      department: "Operations",
      location: "London",
      type: "Full-time",
      description:
        "Support our partners in delivering exceptional cultural experiences by providing world class service and support.",
    },
    {
      id: "growth-marketing",
      title: "Growth Marketing Manager",
      department: "Marketing",
      location: "Remote",
      type: "Full-time",
      description:
        "Drive our growth strategy through data driven marketing campaigns that connect travelers with authentic cultural experiences.",
    },
    {
      id: "data-analyst",
      title: "Data Analyst",
      department: "Product",
      location: "Remote",
      type: "Full-time",
      description:
        "Help us make data driven decisions by analyzing user behavior and market trends in the cultural tourism sector.",
    },
    {
      id: "backend-engineer",
      title: "Backend Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description:
        "Build and optimize our backend infrastructure to support our growing platform of cultural experience offerings.",
    },
    {
      id: "sales-director",
      title: "Sales Director",
      department: "Sales",
      location: "New York",
      type: "Full-time",
      description:
        "Lead our sales team in connecting with cultural experience providers across the globe to expand our marketplace.",
    },
  ];

  const departments = [...new Set(openings.map((job) => job.department))];
  const locations = [...new Set(openings.map((job) => job.location))];

  const filteredJobs = openings.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header type="operator" />

      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <Link
              to="/careers"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Careers
            </Link>

            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Open Positions
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              Join our team and help shape the future of cultural experiences.
              We're looking for passionate people across various departments.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search positions..."
                className="pl-10 py-6"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Job Listings */}
          <div className="grid grid-cols-1 gap-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job, index) => (
                <Card
                  key={job.id}
                  className={`p-6 transition-all duration-500 ${
                    animateItems
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <div className="flex flex-col space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <h3 className="text-xl font-bold">{job.title}</h3>
                      <div className="flex items-center space-x-2 mt-2 md:mt-0">
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          {job.department}
                        </span>
                        <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          {job.type}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-600">{job.description}</p>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-2">
                      <div className="flex items-center text-sm text-gray-500 mb-3 md:mb-0">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{job.location}</span>
                      </div>
                      <Link to={`/careers/apply/${job.id}`}>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                          Apply Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No positions matching your search criteria.
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setSearchTerm("")}
                >
                  Clear Search
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <NewFooter />
    </div>
  );
};

export default OpenPositionsPage;

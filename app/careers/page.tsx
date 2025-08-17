import { careersContent, jobPostings } from "../../data/careersData";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import { MapPin, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const dynamic = 'force-dynamic';

export default function CareersPage() {
  const perks = [
    "Remote-first work environment",
    "Flexible working hours",
    "Annual workations to experience cultural activities",
    "Competitive salary & equity",
    "Health, dental and vision benefits",
    "Learning & development budget",
    "Home office stipend",
    "Generous time off policy",
    "Parental leave",
    "Mental health resources"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="bg-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {careersContent.heroTitle}
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-10">
                {careersContent.heroSubtitle}
              </p>
              <Link href="/careers/open-positions">
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 text-white py-6 px-8 rounded-xl h-auto text-lg"
                >
                  View open positions
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Culture Section */}
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Our Culture
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  {careersContent.workCulture}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {careersContent.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <Image
                  src={careersContent.heroImage}
                  alt="Team collaboration"
                  width={600}
                  height={400}
                  className="rounded-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Open Positions Preview */}
        <section className="bg-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Open Positions
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We're always looking for talented individuals to join our team. Check out our current openings below.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {jobPostings.slice(0, 6).map((job) => (
                <Card key={job.id} className="p-6 hover:shadow-md transition-shadow">
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      {job.location}
                    </div>
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {job.type}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {job.description}
                  </p>
                  <Link href={`/careers/apply/${job.id}`}>
                    <Button variant="outline" className="w-full">
                      Apply Now
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </Card>
              ))}
            </div>
            
            <div className="text-center">
              <Link href="/careers/open-positions">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  View All Positions
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

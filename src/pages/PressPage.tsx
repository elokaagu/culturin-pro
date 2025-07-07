"use client";

import { useState, useEffect } from "react";
import { Link } from "../../lib/navigation";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, ExternalLink } from "lucide-react";
import NewFooter from "@/components/sections/NewFooter";

const PressPage = () => {
  const [animateItems, setAnimateItems] = useState<boolean>(false);

  useEffect(() => {
    setAnimateItems(true);
    document.title = "Press & Media | Culturin";
  }, []);

  const pressReleases = [
    {
      id: "culturin-series-a",
      title: "Culturin Raises $15M Series A to Transform Cultural Tourism",
      date: "May 10, 2025",
      excerpt:
        "Funding will accelerate product development and international expansion to support more cultural experience creators.",
    },
    {
      id: "culturin-pro-launch",
      title: "Culturin Launches Pro Platform for Tour Operators",
      date: "January 15, 2025",
      excerpt:
        "New suite of tools helps cultural tour operators create, manage and grow their businesses with commission free bookings.",
    },
    {
      id: "culturin-unesco-partnership",
      title:
        "Culturin Partners with UNESCO on Cultural Heritage Preservation Initiative",
      date: "November 20, 2024",
      excerpt:
        "Partnership aims to promote sustainable tourism practices that protect cultural heritage sites while supporting local economies.",
    },
  ];

  const pressFeatures = [
    {
      publication: "TechCrunch",
      title: "Culturin's Mission to Digitize the Cultural Tourism Industry",
      date: "April 2025",
      link: "#",
    },
    {
      publication: "Forbes",
      title: "30 Under 30: Culturin Founders Reimagining Travel Experiences",
      date: "March 2025",
      link: "#",
    },
    {
      publication: "Travel + Leisure",
      title: "How Technology is Making Cultural Tourism More Authentic",
      date: "February 2025",
      link: "#",
    },
    {
      publication: "The New York Times",
      title: "The Future of Cultural Tourism in a Post-Pandemic World",
      date: "January 2025",
      link: "#",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header type="operator" />

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="bg-white py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Press & Media
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-10">
                Latest news, press releases, and media resources from Culturin.
                For press inquiries, please contact{" "}
                <a
                  href="mailto:press@culturin.com"
                  className="text-blue-600 hover:underline"
                >
                  press@culturin.com
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        {/* Media Kit Section */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Media Kit</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Brand Assets</h3>
                  <p className="text-gray-600 mb-6">
                    Download our official logos, product images, and brand
                    guidelines.
                  </p>
                  <Button>Download Media Kit</Button>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Company Facts</h3>
                  <p className="text-gray-600 mb-6">
                    Key statistics and information about Culturin for media
                    reference.
                  </p>
                  <Button>View Company Fact Sheet</Button>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Press Releases */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-10">
                Press Releases
              </h2>

              <div className="space-y-8">
                {pressReleases.map((release, index) => (
                  <div
                    key={release.id}
                    className={`transition-all duration-500 ${
                      animateItems
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{release.date}</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold mb-2">
                      {release.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{release.excerpt}</p>
                    <Button
                      variant="link"
                      className="p-0 h-auto font-medium text-blue-600"
                      asChild
                    >
                      <Link to={`/press/${release.id}`}>Read full release</Link>
                    </Button>
                    {index < pressReleases.length - 1 && (
                      <Separator className="mt-8" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Press Features */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-10">
                Culturin in the News
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {pressFeatures.map((feature, index) => (
                  <a
                    key={index}
                    href={feature.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group transition-all duration-500 ${
                      animateItems
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                    }`}
                    style={{ transitionDelay: `${200 + index * 100}ms` }}
                  >
                    <div className="p-6 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-sm transition-all">
                      <div className="text-sm font-medium text-blue-600 mb-2">
                        {feature.publication}
                      </div>
                      <h3 className="text-lg font-bold mb-2 group-hover:text-blue-600 transition-colors">
                        {feature.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {feature.date}
                        </span>
                        <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Media Inquiries
              </h2>
              <p className="text-gray-600 mb-8">
                For press inquiries, interview requests, or other media
                opportunities, please contact our press team.
              </p>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white"
                asChild
              >
                <a href="mailto:press@culturin.com">Contact Press Team</a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <NewFooter />
    </div>
  );
};

export default PressPage;

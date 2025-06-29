"use client";

import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "../../lib/navigation";
import { announcements } from "./WhatsNewPage";
import Header from "@/components/Header";
import NewFooter from "@/components/sections/NewFooter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, ArrowLeft, Share2, Calendar } from "lucide-react";
import Image from "@/components/ui/image";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const AnnouncementDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [announcement, setAnnouncement] = useState<
    (typeof announcements)[0] | null
  >(null);
  const [relatedItems, setRelatedItems] = useState<typeof announcements>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    // Find the announcement with the matching ID
    const currentAnnouncement = announcements.find((a) => a.id === id);

    if (currentAnnouncement) {
      setAnnouncement(currentAnnouncement);

      // Get related items from the same category (excluding the current one)
      const related = announcements
        .filter(
          (a) => a.category === currentAnnouncement.category && a.id !== id
        )
        .slice(0, 3); // Limit to 3 related items

      setRelatedItems(related);
    } else {
      // If no matching announcement is found, navigate back to the main page
      navigate("/whats-new");
      toast({
        title: "Announcement not found",
        description: "The requested announcement could not be found.",
        variant: "destructive",
      });
    }

    setLoading(false);
  }, [id, navigate, toast]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!announcement) {
    return null; // This should not happen due to the navigate in useEffect
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: announcement.title,
          text: announcement.description,
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing", error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Announcement link copied to clipboard",
      });
    }
  };

  // Format content with paragraphs
  const formattedContent = announcement.content
    .split("\n\n")
    .map((paragraph, i) => (
      <p key={i} className="mb-4">
        {paragraph}
      </p>
    ));

  return (
    <div className="min-h-screen flex flex-col">
      <Header type="operator" />

      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate("/whats-new")}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to What's New
            </Button>
          </div>

          {/* Announcement Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                {announcement.category}
              </Badge>
              <div className="flex items-center text-sm text-gray-500">
                <CalendarIcon className="h-3 w-3 mr-1" />
                {announcement.date}
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {announcement.title}
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              {announcement.description}
            </p>

            <Button
              variant="outline"
              onClick={handleShare}
              className="flex items-center"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>

          {/* Featured Image */}
          <div className="mb-10 rounded-xl overflow-hidden shadow-lg">
            <Image
              src={announcement.image}
              alt={announcement.title}
              className="w-full"
              aspectRatio="wide"
            />
          </div>

          {/* Content */}
          <div className="prose max-w-none mb-12">{formattedContent}</div>

          {/* Additional Information */}
          <Card className="p-6 bg-blue-50 border-blue-100 mb-10">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="h-6 w-6 text-blue-700" />
              <h3 className="text-lg font-semibold text-blue-900">
                When does this take effect?
              </h3>
            </div>
            <p>
              This update is available now for all customers. Check out the new
              features by logging into your dashboard.
            </p>
          </Card>

          {/* Related Items */}
          {relatedItems.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Related Updates</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedItems.map((item) => (
                  <Card
                    key={item.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="h-40 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        aspectRatio="video"
                      />
                    </div>
                    <div className="p-4">
                      <Badge className="mb-2">{item.category}</Badge>
                      <h3 className="font-bold mb-2 line-clamp-2">
                        {item.title}
                      </h3>
                      <Link
                        to={`/whats-new/${item.id}`}
                        className="text-blue-600 hover:underline text-sm"
                      >
                        Read more
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-16 text-center">
            <p className="text-lg mb-4">Have questions about these updates?</p>
            <div className="flex justify-center gap-4">
              <Link to="/contact">
                <Button variant="outline">Contact Us</Button>
              </Link>
              <Link to="/help-center">
                <Button>Help Center</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <NewFooter />
    </div>
  );
};

export default AnnouncementDetailPage;

'use client'
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { Link } from "../../../lib/navigation";
import { blogPosts } from "@/data/blogPosts";

interface GuideCardProps {
  title: string;
  image: string;
  link: string;
  hasVideo?: boolean;
}

const GuideCard = ({
  title,
  image,
  link,
  hasVideo = false,
}: GuideCardProps) => {
  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-0">
      <Link to={link} className="block">
        <div className="relative h-60 md:h-72">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 flex flex-col justify-end p-5">
            <h3 className="text-white text-xl font-semibold">{title}</h3>
            <div className="flex items-center mt-3">
              {hasVideo ? (
                <div className="flex items-center">
                  <div className="bg-white rounded-full p-2 mr-2">
                    <Play className="h-4 w-4 text-black" />
                  </div>
                  <span className="text-white text-sm">Watch guide</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <span className="text-white text-sm">Read guide</span>
                  <ArrowRight className="h-4 w-4 text-white ml-1" />
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
};

const FreeGuidesSection = () => {
  const [animateItems, setAnimateItems] = useState<boolean>(false);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      setAnimateItems(true);
    }
  }, [inView]);

  // Get the three most recent blog posts
  const featuredPosts = blogPosts.slice(0, 3);

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              See our free guides on growing your tour business
            </h2>
            <p className="text-gray-600 max-w-2xl">
              Expert advice and actionable strategies to help cultural tour
              operators thrive in today's market
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button
              variant="outline"
              asChild
              className="border-gray-300 text-gray-700 flex items-center gap-1"
            >
              <Link to="/blog">
                Read the blog
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 ease-out ${
            animateItems
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          {featuredPosts.map((post, index) => (
            <GuideCard
              key={post.id}
              title={post.title}
              image={post.image}
              link={`/blog/${post.slug}`}
              hasVideo={index === 0} // Just make the first one a video for variety
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FreeGuidesSection;

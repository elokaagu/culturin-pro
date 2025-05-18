
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
}

const BlogPage = () => {
  const [animateItems, setAnimateItems] = useState<boolean>(false);
  
  useEffect(() => {
    setAnimateItems(true);
  }, []);
  
  // Mock blog posts data
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "5 Strategies to Increase Tour Bookings During Slow Seasons",
      excerpt: "Learn proven methods to maintain revenue streams even during traditional off-peak periods in tourism.",
      date: "May 15, 2025",
      category: "Marketing",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "How Cultural Tour Operators Can Create More Immersive Experiences",
      excerpt: "Discover how storytelling and local connections can transform standard tours into unforgettable experiences.",
      date: "May 7, 2025",
      category: "Experience Design",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      title: "The Rise of Solo Cultural Tourism: What Operators Need to Know",
      excerpt: "Solo travel is booming in the cultural tourism sector. Here's how operators can adapt their offerings.",
      date: "April 29, 2025",
      category: "Industry Trends",
      image: "/placeholder.svg"
    },
    {
      id: 4,
      title: "Using Customer Data to Personalize Cultural Experiences",
      excerpt: "Learn how smart data collection can help you tailor experiences to your guests' preferences.",
      date: "April 22, 2025",
      category: "Technology",
      image: "/placeholder.svg"
    },
    {
      id: 5,
      title: "Sustainable Cultural Tourism: Balancing Growth with Preservation",
      excerpt: "Explore strategies for growing your tour business while protecting cultural heritage and local communities.",
      date: "April 15, 2025",
      category: "Sustainability",
      image: "/placeholder.svg"
    },
    {
      id: 6,
      title: "Tour Operator Success Story: Barcelona Food Tours Increases Bookings by 35%",
      excerpt: "How one cultural tour company transformed their digital presence and saw dramatic growth.",
      date: "April 8, 2025",
      category: "Case Study",
      image: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header type="operator" />

      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="bg-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Tourism & Culture Blog
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl">
                Insights, strategies, and inspiration for cultural experience creators and tour operators.
              </p>
            </div>
          </div>
        </section>
        
        {/* Blog Posts Grid */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <Card 
                  key={post.id}
                  className={`overflow-hidden border-0 shadow-sm transition-all duration-500 ${
                    animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{transitionDelay: `${index * 100}ms`}}
                >
                  <div className="aspect-video bg-gray-200">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                        {post.category}
                      </span>
                      <div className="flex items-center ml-4">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{post.date}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <Button 
                      variant="link" 
                      className="p-0 h-auto font-medium text-blue-600 flex items-center"
                    >
                      Read more <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg"
              >
                Load more articles
              </Button>
            </div>
          </div>
        </section>
        
        {/* Newsletter Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
              <p className="text-gray-600 mb-8">
                Get the latest insights and tips delivered straight to your inbox.
              </p>
              <div className="flex flex-col md:flex-row gap-3 max-w-xl mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default BlogPage;

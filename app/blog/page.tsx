import { blogPosts } from "../../data/blogPosts";
import { Card } from "../../components/ui/card";
import { Calendar, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Blog | Culturin",
  description:
    "Insights, strategies, and inspiration for cultural experience creators and tour operators.",
};

export default function Blog() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="bg-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Tourism & Culture Blog
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl">
                Insights, strategies, and inspiration for cultural experience
                creators and tour operators.
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
                  className="overflow-hidden border-0 shadow-sm transition-all duration-500 hover:shadow-md"
                >
                  <Link href={`/blog/${post.slug}`} className="block">
                    <div className="aspect-video bg-gray-200">
                      {post.image ? (
                        <Image
                          src={post.image}
                          alt={post.title}
                          width={400}
                          height={225}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                          <span className="text-gray-500">No image</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <Calendar className="h-4 w-4 mr-2" />
                        {post.date}
                        <span className="mx-2">•</span>
                        {post.category}
                      </div>
                      <h3 className="text-xl font-semibold mb-3 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center text-blue-600 font-medium">
                        Read More
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </div>
                    </div>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

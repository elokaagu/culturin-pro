import { notFound } from "next/navigation";
import { getBlogPosts, getBlogPostBySlug } from "@/lib/blog-service";
import BlogPostPage from "@/components/BlogPostPage";

interface BlogPostProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = await getBlogPosts({ published: true });
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostProps) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post || !post.published) {
    return {
      title: "Blog Post Not Found | Culturin",
    };
  }

  return {
    title: `${post.title} | Culturin Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.featured_image_url ? [post.featured_image_url] : [],
    },
  };
}

export default async function BlogPost({ params }: BlogPostProps) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post || !post.published) {
    notFound();
  }

  return <BlogPostPage post={post} />;
}

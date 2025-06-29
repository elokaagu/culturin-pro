import { notFound } from "next/navigation";
import EditBlogPost from "../../../../../src/pages/admin/EditBlogPost";
import { blogPosts } from "../../../../../data/blogPosts";

interface EditBlogPostProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: EditBlogPostProps) {
  const post = blogPosts.find((post) => post.slug === params.slug);

  if (!post) {
    return {
      title: "Edit Blog Post | Admin - Culturin",
    };
  }

  return {
    title: `Edit: ${post.title} | Admin - Culturin`,
    description: `Edit the blog post: ${post.title}`,
  };
}

export default function EditBlogPostPage({ params }: EditBlogPostProps) {
  const post = blogPosts.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return <EditBlogPost />;
}

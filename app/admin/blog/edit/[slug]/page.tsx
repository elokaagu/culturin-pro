import { notFound } from "next/navigation";
import EditBlogPost from "../../../../../src/pages/admin/EditBlogPost";
import ProtectedRoute from "../../../../../components/auth/ProtectedRoute";
import { getBlogPostBySlug } from "../../../../../lib/blog-service";

interface EditBlogPostProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  // Return empty array to disable static generation for now
  // This allows the page to be generated at request time
  return [];
}

export async function generateMetadata({ params }: EditBlogPostProps) {
  const post = await getBlogPostBySlug(params.slug);

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

export default async function EditBlogPostPage({ params }: EditBlogPostProps) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <ProtectedRoute requireSuperAdmin>
      <EditBlogPost />
    </ProtectedRoute>
  );
}

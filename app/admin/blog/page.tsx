import BlogManagement from "../../../src/pages/admin/BlogManagement";
import { ProtectedRoute } from "@/src/components/auth/ProtectedRoute";

export const metadata = {
  title: "Blog Management | Admin - Culturin",
  description:
    "Manage blog posts, create new articles, and edit existing content.",
};

export default function BlogAdmin() {
  return (
    <ProtectedRoute requireSuperAdmin>
      <BlogManagement />
    </ProtectedRoute>
  );
}

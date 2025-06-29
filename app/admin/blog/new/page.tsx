import CreateBlogPost from "../../../../src/pages/admin/CreateBlogPost";
import ProtectedRoute from "../../../../components/auth/ProtectedRoute";

export const metadata = {
  title: "Create New Blog Post | Admin - Culturin",
  description: "Create and publish new blog posts for the Culturin blog.",
};

export default function NewBlogPost() {
  return (
    <ProtectedRoute requireSuperAdmin>
      <CreateBlogPost />
    </ProtectedRoute>
  );
}

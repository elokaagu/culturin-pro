import TestimonialsManagement from "../../../src/pages/admin/TestimonialsManagement";
import { ProtectedRoute } from "@/src/components/auth/ProtectedRoute";

export const metadata = {
  title: "Testimonials Management | Admin - Culturin",
  description:
    "Manage customer testimonials, reviews, and feedback across the Culturin platform.",
};

export default function AdminTestimonials() {
  return (
    <ProtectedRoute requireSuperAdmin>
      <TestimonialsManagement />
    </ProtectedRoute>
  );
}

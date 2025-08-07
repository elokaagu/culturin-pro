import CareersManagement from "../../../src/pages/admin/CareersManagement";
import { ProtectedRoute } from "@/src/components/auth/ProtectedRoute";

export const metadata = {
  title: "Careers Management | Admin - Culturin",
  description:
    "Manage job applications, postings, and careers content for the Culturin platform.",
};

export default function AdminCareers() {
  return (
    <ProtectedRoute requireSuperAdmin>
      <CareersManagement />
    </ProtectedRoute>
  );
}

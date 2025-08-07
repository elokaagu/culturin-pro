import CaseStudiesManagement from "../../../src/pages/admin/CaseStudiesManagement";
import { ProtectedRoute } from "@/src/components/auth/ProtectedRoute";

export const metadata = {
  title: "Case Studies Management | Admin - Culturin",
  description:
    "Manage case studies content and success stories for the Culturin platform.",
};

export default function AdminCaseStudies() {
  return (
    <ProtectedRoute requireSuperAdmin>
      <CaseStudiesManagement />
    </ProtectedRoute>
  );
}

import HelpCenterManagement from "../../../src/pages/admin/HelpCenterManagement";
import { ProtectedRoute } from "@/src/components/auth/ProtectedRoute";

export const metadata = {
  title: "Help Center Management | Admin - Culturin",
  description:
    "Manage Help Center content, FAQs, and support information for the Culturin platform.",
};

export default function AdminHelpCenter() {
  return (
    <ProtectedRoute requireSuperAdmin>
      <HelpCenterManagement />
    </ProtectedRoute>
  );
}

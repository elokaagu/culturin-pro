import AdminDashboard from "../../src/pages/admin/AdminDashboard";
import { ProtectedRoute } from "@/src/components/auth/ProtectedRoute";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin Dashboard | Culturin",
  description:
    "Administrative dashboard for managing Culturin content, blog posts, and platform settings.",
};

export default function AdminPage() {
  return <AdminDashboard />;
}

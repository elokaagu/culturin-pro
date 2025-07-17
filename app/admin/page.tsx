import AdminDashboard from "../../src/pages/admin/AdminDashboard";
import ProtectedRoute from "../../components/auth/ProtectedRoute";

export const metadata = {
  title: "Admin Dashboard | Culturin",
  description:
    "Administrative dashboard for managing Culturin content, blog posts, and platform settings.",
};

export default function Admin() {
  return <AdminDashboard />;
}

import dynamic from "next/dynamic";

const ProDashboardPage = dynamic(() => import("../../src/pages/ProDashboardPage"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading Studio...</p>
      </div>
    </div>
  ),
});

export const metadata = {
  title: "Dashboard | Culturin Studio",
  description:
    "Your creative workspace for managing cultural experiences and growing your business.",
};

export default function ProDashboard() {
  return <ProDashboardPage />;
}

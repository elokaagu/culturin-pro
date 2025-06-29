import ProDashboardLayout from "../../../components/pro/ProDashboardLayout";

export const metadata = {
  title: "Settings | Culturin Pro",
  description:
    "Configure your account settings, billing, team management, and platform preferences.",
};

export default function Settings() {
  return (
    <ProDashboardLayout>
      <div className="p-6">
        <div className="max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-gray-600">
              Manage your account and platform preferences
            </p>
          </div>

          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
            <p className="text-gray-600">
              Settings management features are being developed. This will
              include account preferences, billing management, team settings,
              and platform configuration options.
            </p>
          </div>
        </div>
      </div>
    </ProDashboardLayout>
  );
}

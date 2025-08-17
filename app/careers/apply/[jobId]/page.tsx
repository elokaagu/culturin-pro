import ApplicationPage from "../../../../src/pages/careers/ApplicationPage";

export const dynamic = "force-dynamic";

export default function CareerApplication({
  params,
}: {
  params: { jobId: string };
}) {
  return <ApplicationPage />;
}

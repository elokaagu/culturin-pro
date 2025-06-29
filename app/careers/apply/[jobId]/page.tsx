import { notFound } from "next/navigation";
import ApplicationPage from "../../../../src/pages/careers/ApplicationPage";

interface ApplicationProps {
  params: {
    jobId: string;
  };
}

// Define the available job IDs for static generation
const jobIds = [
  "senior-fullstack-dev",
  "content-marketing",
  "ux-ui-designer",
  "customer-success",
  "growth-marketing",
  "data-analyst",
  "backend-engineer",
  "sales-director",
];

// Job details for metadata
const jobDetails = {
  "senior-fullstack-dev": {
    title: "Senior Full Stack Developer",
    department: "Engineering",
    location: "Remote",
    description:
      "Join our engineering team to build the future of cultural tourism technology.",
  },
  "content-marketing": {
    title: "Content Marketing Specialist",
    department: "Marketing",
    location: "New York",
    description:
      "Create compelling content that showcases cultural experiences.",
  },
  "ux-ui-designer": {
    title: "UX/UI Designer",
    department: "Product",
    location: "Remote",
    description:
      "Shape our product experience with user-centered design solutions.",
  },
  "customer-success": {
    title: "Customer Success Manager",
    department: "Operations",
    location: "London",
    description:
      "Support our partners in delivering exceptional cultural experiences.",
  },
  "growth-marketing": {
    title: "Growth Marketing Manager",
    department: "Marketing",
    location: "Remote",
    description:
      "Drive our growth strategy through data-driven marketing campaigns.",
  },
  "data-analyst": {
    title: "Data Analyst",
    department: "Product",
    location: "Remote",
    description:
      "Help us make data-driven decisions by analyzing user behavior.",
  },
  "backend-engineer": {
    title: "Backend Engineer",
    department: "Engineering",
    location: "Remote",
    description: "Build and optimize our backend infrastructure.",
  },
  "sales-director": {
    title: "Sales Director",
    department: "Sales",
    location: "New York",
    description:
      "Lead our sales team in connecting with cultural experience providers.",
  },
};

export async function generateStaticParams() {
  return jobIds.map((jobId) => ({
    jobId,
  }));
}

export async function generateMetadata({ params }: ApplicationProps) {
  const job = jobDetails[params.jobId as keyof typeof jobDetails];

  if (!job) {
    return {
      title: "Job Application | Culturin Careers",
    };
  }

  return {
    title: `Apply for ${job.title} | Culturin Careers`,
    description: `${job.description} Join our ${job.department} team in ${job.location}.`,
    openGraph: {
      title: `Apply for ${job.title} | Culturin Careers`,
      description: `${job.description} Join our ${job.department} team in ${job.location}.`,
    },
  };
}

export default function Application({ params }: ApplicationProps) {
  // Validate that the jobId exists
  if (!jobIds.includes(params.jobId)) {
    notFound();
  }

  return <ApplicationPage />;
}

import { notFound } from "next/navigation";
import PressArticlePage from "../../../src/pages/PressArticlePage";

interface PressArticleProps {
  params: {
    articleId: string;
  };
}

// Define the available article IDs for static generation
const articleIds = [
  "culturin-series-a",
  "culturin-pro-launch",
  "culturin-unesco-partnership",
];

// Article details for metadata
const articleDetails = {
  "culturin-series-a": {
    title: "Culturin Raises $15M Series A to Transform Cultural Tourism",
    date: "May 10, 2025",
    excerpt:
      "Funding will accelerate product development and international expansion to support more cultural experience creators.",
  },
  "culturin-pro-launch": {
    title: "Culturin Launches Pro Platform for Tour Operators",
    date: "January 15, 2025",
    excerpt:
      "New suite of tools helps cultural tour operators create, manage and grow their businesses with commission-free bookings.",
  },
  "culturin-unesco-partnership": {
    title:
      "Culturin Partners with UNESCO on Cultural Heritage Preservation Initiative",
    date: "November 20, 2024",
    excerpt:
      "Partnership aims to promote sustainable tourism practices that protect cultural heritage sites while supporting local economies.",
  },
};

export async function generateStaticParams() {
  return articleIds.map((articleId) => ({
    articleId,
  }));
}

export async function generateMetadata({ params }: PressArticleProps) {
  const article =
    articleDetails[params.articleId as keyof typeof articleDetails];

  if (!article) {
    return {
      title: "Press Article | Culturin",
    };
  }

  return {
    title: `${article.title} | Culturin Press`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
    },
  };
}

export default function PressArticle({ params }: PressArticleProps) {
  // Validate that the articleId exists
  if (!articleIds.includes(params.articleId)) {
    notFound();
  }

  return <PressArticlePage />;
}

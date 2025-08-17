import PressArticlePage from "../../../src/pages/PressArticlePage";

export const dynamic = "force-dynamic";

export default function PressArticle({
  params,
}: {
  params: { articleId: string };
}) {
  return <PressArticlePage />;
}

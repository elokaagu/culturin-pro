import Press from "../../src/pages/Press";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Press & Media | Culturin",
  description:
    "Latest news, press releases, and media resources from Culturin. For press inquiries, please contact press@culturin.com.",
  openGraph: {
    title: "Press & Media | Culturin",
    description:
      "Latest news, press releases, and media resources from Culturin. For press inquiries, please contact press@culturin.com.",
  },
};

export default function PressPage() {
  return <Press />;
}

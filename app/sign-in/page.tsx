import SignIn from "../../src/pages/SignIn";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Sign In | Culturin",
  description:
    "Sign in to your Culturin account to access exclusive features and manage your cultural experiences.",
};

export default function SignInPage() {
  return <SignIn />;
}

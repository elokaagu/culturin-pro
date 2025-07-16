import { Suspense } from "react";
import SignUp from "@/src/pages/SignUp";

export const metadata = {
  title: "Sign Up | Culturin",
  description:
    "Create your Culturin account to access exclusive features and start creating amazing cultural experiences.",
};

function SignUpContent() {
  return <SignUp />;
}

export default function SignUpPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      }
    >
      <SignUpContent />
    </Suspense>
  );
}

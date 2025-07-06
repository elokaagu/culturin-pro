import React from "react";
import TranslatableText from "../../components/TranslatableText";

const Press = () => {
  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">
          <TranslatableText text="Press" />
        </h1>
        <p>
          <TranslatableText text="Press page content will be available soon." />
        </p>
      </div>
    </div>
  );
};

export default Press;

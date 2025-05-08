
import React from 'react';
import Header from "@/components/Header";
import CulturinPro from "@/components/CulturinPro";

const CulturinProPage = () => {
  return (
    <div className="min-h-screen">
      <Header type="operator" />
      <div className="pt-28 pb-12 container mx-auto px-4 md:px-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Culturin Pro Platform</h1>
        <p className="text-lg text-gray-700 mb-10 max-w-3xl">
          Welcome to Culturin Pro - your professional toolkit for growing and managing your cultural experience business.
        </p>
        <CulturinPro />
      </div>
    </div>
  );
};

export default CulturinProPage;

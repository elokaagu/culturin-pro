
import React from 'react';
import Header from "@/components/Header";
import CulturinPro from "@/components/CulturinPro";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Crown } from "lucide-react";

const CulturinProPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-white">
      <Header type="operator" />
      <div className="pt-28 pb-12 container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Culturin Pro Platform</h1>
            <p className="text-lg text-gray-700 max-w-3xl">
              Welcome to Culturin Pro - your professional toolkit for growing and managing your cultural experience business.
            </p>
          </div>
          
          <Button 
            onClick={() => navigate('/pro-dashboard')} 
            className="bg-[#1E1E1E] hover:bg-[#000000] text-white flex items-center"
            size="lg"
          >
            <Crown className="mr-2 h-5 w-5" /> 
            Go to Pro Dashboard
          </Button>
        </div>
        
        <CulturinPro />
      </div>
    </div>
  );
};

export default CulturinProPage;

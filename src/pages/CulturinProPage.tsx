'use client'

import React from 'react';
import Header from "@/components/Header";
import CulturinPro from "@/components/CulturinPro";
import { Button } from "@/components/ui/button";
import { useNavigate } from '../../lib/navigation';
import { Crown } from "lucide-react";

const CulturinProPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-white">
      <Header type="operator" />
      <div className="pt-24 pb-12 container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-medium mb-2">Culturin Pro Platform</h1>
            <p className="text-base text-gray-700 max-w-2xl">
              Professional toolkit for cultural experience businesses
            </p>
          </div>
          
          <Button 
            onClick={() => navigate('/pro-dashboard')} 
            className="bg-black hover:bg-gray-800 text-white flex items-center py-2 px-4"
          >
            <Crown className="mr-2 h-4 w-4" /> 
            Go to Dashboard
          </Button>
        </div>
        
        <CulturinPro />
      </div>
    </div>
  );
};

export default CulturinProPage;


import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileText, Map, ImageIcon } from 'lucide-react';
import { ResourceType } from '@/data/experienceData';

interface ResourceCardProps {
  title: string;
  description: string;
  icon: string;
  onClick: () => void;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ title, description, icon, onClick }) => {
  // Render the appropriate icon based on the icon name
  const renderIcon = () => {
    switch (icon) {
      case 'FileText':
        return <FileText className="h-5 w-5" />;
      case 'Map':
        return <Map className="h-5 w-5" />;
      case 'ImageIcon':
        return <ImageIcon className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  return (
    <Card className="hover:shadow-md transition-all duration-200 cursor-pointer" onClick={onClick}>
      <CardHeader className="pb-2 flex flex-row items-center gap-2">
        <div className="bg-gray-100 p-2 rounded-full">
          {renderIcon()}
        </div>
        <div>
          <CardTitle className="text-sm">{title}</CardTitle>
          <CardDescription className="text-xs">{description}</CardDescription>
        </div>
      </CardHeader>
    </Card>
  );
};

export default ResourceCard;


import React from 'react';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from '@/components/ui/image';
import { TemplateType } from '@/data/experienceData';

interface TemplateCardProps {
  id: string;
  title: string;
  description: string;
  theme: string;
  image: string;
  onUse: () => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ 
  title, description, theme, image, onUse 
}) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-200">
      <div className="h-40 overflow-hidden">
        <Image src={image} alt={title} aspectRatio="wide" />
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{title}</CardTitle>
          <Badge variant="outline" className="bg-gray-50">{theme}</Badge>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={onUse}>Use Template</Button>
      </CardFooter>
    </Card>
  );
};

export default TemplateCard;

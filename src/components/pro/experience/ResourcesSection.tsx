
import React from 'react';
import ResourceCard from './ResourceCard';
import { ResourceType } from '@/data/experienceData';

interface ResourcesSectionProps {
  resources: ResourceType[];
  onResourceClick: (resource: ResourceType) => void;
}

const ResourcesSection: React.FC<ResourcesSectionProps> = ({ resources, onResourceClick }) => {
  return (
    <div className="bg-gray-50 border rounded-lg p-6">
      <h2 className="text-lg font-medium">Experience Building Resources</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {resources.map(resource => (
          <ResourceCard 
            key={resource.id}
            title={resource.title}
            description={resource.description}
            icon={resource.icon}
            onClick={() => onResourceClick(resource)}
          />
        ))}
      </div>
    </div>
  );
};

export default ResourcesSection;

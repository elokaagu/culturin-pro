
import React from 'react';

interface AboutSectionProps {
  description: string;
  showReadMore?: boolean;
  onReadMore?: () => void;
}

const AboutSection: React.FC<AboutSectionProps> = ({ description, showReadMore = false, onReadMore }) => {
  return (
    <section id="about" className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6">About Us</h2>
          <p className="text-lg text-gray-600 text-center mb-6">{description}</p>
          
          {showReadMore && onReadMore && (
            <div className="text-center">
              <button 
                onClick={onReadMore}
                className="text-blue-600 hover:underline font-medium"
              >
                Read More
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

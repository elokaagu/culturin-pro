
import { Card, CardContent } from "@/components/ui/card";
import Image from "@/components/ui/image";
import { Users } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  company: string;
  quote: string;
  image: string;
  achievement: string;
  revenue?: string;
}

const TestimonialCard = ({ name, company, quote, image, achievement, revenue }: TestimonialCardProps) => {
  return (
    <Card className="h-full overflow-hidden border-0 shadow-soft hover:shadow-card transition-all duration-300">
      <div className="relative h-64">
        <Image 
          src={image} 
          alt={`${name}, ${company}`} 
          fill={true}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 flex flex-col justify-end p-4">
          <h3 className="text-white font-medium text-lg">{name}</h3>
          <p className="text-white/80 text-sm">Owner of {company}</p>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="min-h-24">
          <p className="text-sm text-gray-700 mb-3">{quote}</p>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {achievement}
          </div>
          {revenue && (
            <div className="text-lg font-bold">
              {revenue}
              <span className="text-xs text-gray-500 font-normal">/year</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const TrustedOperators = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-3">
            <Users className="h-6 w-6 text-black mr-2" />
            <h2 className="text-3xl font-medium">Trusted by thousands of tour operators</h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join cultural experience hosts worldwide who are transforming their businesses with our platform
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <TestimonialCard 
            name="Maria Sanchez"
            company="Barcelona Tapas Tours"
            quote="Since using Culturin, our bookings have increased by 65% and the itinerary builder saved me countless hours of work."
            image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop"
            achievement="Increased direct bookings"
            revenue="+$180,000"
          />
          
          <TestimonialCard 
            name="Kenji Yamamoto"
            company="Tokyo Cultural Walks"
            quote="The analytics dashboard helped us identify our most profitable experiences and optimize our pricing strategy."
            image="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=1000&auto=format&fit=crop"
            achievement="Optimized pricing strategy"
            revenue="+$230,000"
          />
          
          <TestimonialCard 
            name="Aisha Okafor"
            company="Lagos Food Journeys"
            quote="The storytelling tools helped us communicate our cultural heritage in ways that truly resonated with travelers."
            image="https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=1000&auto=format&fit=crop"
            achievement="Enhanced cultural storytelling"
            revenue="+$145,000"
          />
          
          <TestimonialCard 
            name="Carlos Rivera"
            company="Peruvian Heritage Tours"
            quote="Culturin's CRM tools helped us turn one-time guests into loyal customers who keep coming back year after year."
            image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop"
            achievement="Increased customer retention"
            revenue="+$210,000"
          />
        </div>
      </div>
    </section>
  );
};

export default TrustedOperators;

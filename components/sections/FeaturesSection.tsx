import { Globe, Shield, Users } from "lucide-react";
import { CardContent } from "@/components/ui/card";
import TranslatableText from "../TranslatableText";
import { MotionCard, StaggerReveal, RevealOnScroll } from "@/components/motion";

const FeaturesSection = () => {
  return (
    <section className="py-24 lg:py-30 bg-muted">
      <div className="container-custom">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">
              <TranslatableText text="What Makes Culturin Different" />
            </h2>
            <div className="section-divider"></div>
          </div>
        </RevealOnScroll>

        <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerDelay={0.15}>
          {/* Tile 1 */}
          <MotionCard className="border-0 overflow-hidden bg-card smooth-shadow hover:shadow-card">
            <CardContent className="p-8 flex flex-col h-full">
              <div className="h-16 w-16 rounded-full bg-culturin-mustard/20 flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-culturin-clay" />
              </div>
              <h3 className="text-xl font-medium mb-4">
                <TranslatableText text="Community-Driven" />
              </h3>
              <p className="text-muted-foreground mb-2">
                <TranslatableText text="Real reviews from real travelers." />
              </p>
              <p className="text-muted-foreground">
                <TranslatableText text="Genuine connections, not marketing." />
              </p>
            </CardContent>
          </MotionCard>

          {/* Tile 2 */}
          <MotionCard className="border-0 overflow-hidden bg-card smooth-shadow hover:shadow-card">
            <CardContent className="p-8 flex flex-col h-full">
              <div className="h-16 w-16 rounded-full bg-culturin-clay/20 flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-culturin-mustard" />
              </div>
              <h3 className="text-xl font-medium mb-4">Designed for Trust</h3>
              <p className="text-muted-foreground mb-2">Verified operators.</p>
              <p className="text-muted-foreground">
                Human-led safety layers, not algorithms.
              </p>
            </CardContent>
          </MotionCard>

          {/* Tile 3 */}
          <MotionCard className="border-0 overflow-hidden bg-card smooth-shadow hover:shadow-card">
            <CardContent className="p-8 flex flex-col h-full">
              <div className="h-16 w-16 rounded-full bg-culturin-indigo/20 flex items-center justify-center mb-6">
                <Globe className="w-8 h-8 text-culturin-indigo" />
              </div>
              <h3 className="text-xl font-medium mb-4">
                <TranslatableText text="Culture at the Center" />
              </h3>
              <p className="text-muted-foreground mb-2">
                <TranslatableText text="Every trip celebrates local wisdom, art, and connection." />
              </p>
            </CardContent>
          </MotionCard>
        </StaggerReveal>
      </div>
    </section>
  );
};

export default FeaturesSection;
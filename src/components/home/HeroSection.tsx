import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Shield, Users } from "lucide-react";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  onInvestorSignup?: () => void;
  onBusinessSignup?: () => void;
}

const HeroSection = ({
  title = "Connect with Investment Opportunities That Matter",
  subtitle = "Join our platform to discover curated investment projects or showcase your business to potential investors worldwide.",
  backgroundImage = "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  onInvestorSignup = () => {},
  onBusinessSignup = () => {},
}: HeroSectionProps) => {
  return (
    <div className="relative w-full h-[600px] bg-white overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {title}
          </h1>
          <p className="text-xl text-gray-200 mb-8">{subtitle}</p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button
              size="lg"
              onClick={onInvestorSignup}
              className="bg-primary hover:bg-primary/90 text-white font-semibold px-8"
            >
              Start Investing
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={onBusinessSignup}
              className="bg-transparent border-white text-white hover:bg-white/10 font-semibold px-8"
            >
              List Your Business
            </Button>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center">
              <div className="bg-primary/20 p-3 rounded-full mr-4">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-white font-medium">Growth Potential</h3>
                <p className="text-gray-300 text-sm">
                  Access vetted opportunities
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="bg-primary/20 p-3 rounded-full mr-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-white font-medium">Secure Platform</h3>
                <p className="text-gray-300 text-sm">
                  Verified users and businesses
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="bg-primary/20 p-3 rounded-full mr-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-white font-medium">Global Network</h3>
                <p className="text-gray-300 text-sm">
                  Connect with partners worldwide
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

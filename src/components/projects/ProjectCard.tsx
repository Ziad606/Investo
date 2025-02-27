import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface ProjectCardProps {
  title?: string;
  businessName?: string;
  description?: string;
  fundingProgress?: number;
  fundingGoal?: number;
  categories?: string[];
  thumbnailUrl?: string;
}

const ProjectCard = ({
  title = "Eco-Friendly Urban Farm Initiative",
  businessName = "Green City Ventures",
  description = "A sustainable urban farming project that aims to provide fresh produce to local communities while reducing carbon footprint.",
  fundingProgress = 125000,
  fundingGoal = 250000,
  categories = ["Agriculture", "Sustainability", "Urban Development"],
  thumbnailUrl = "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
}: ProjectCardProps) => {
  const progressPercentage = Math.min(
    Math.round((fundingProgress / fundingGoal) * 100),
    100,
  );

  return (
    <Card className="w-[350px] h-[450px] overflow-hidden flex flex-col bg-white hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden">
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded-md text-xs font-medium">
          {progressPercentage}% Funded
        </div>
      </div>

      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold line-clamp-2">
            {title}
          </CardTitle>
        </div>
        <p className="text-sm text-gray-600">{businessName}</p>
      </CardHeader>

      <CardContent className="flex-grow">
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>${(fundingProgress / 1000).toFixed(1)}K raised</span>
            <span>${(fundingGoal / 1000).toFixed(1)}K goal</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        <p className="text-sm text-gray-700 line-clamp-3 mb-3">{description}</p>

        <div className="flex flex-wrap gap-1">
          {categories.map((category, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {category}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="border-t pt-3">
        <button className="w-full bg-primary hover:bg-primary/90 text-white py-2 rounded-md text-sm font-medium transition-colors">
          View Project
        </button>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;

import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, ArrowUpDown } from "lucide-react";
import ProjectCard from "./ProjectCard";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

interface Project {
  id: string;
  title: string;
  businessName: string;
  description: string;
  fundingProgress: number;
  fundingGoal: number;
  categories: string[];
  thumbnailUrl: string;
}

const ProjectsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState<"default" | "funding" | "recent">(
    "default",
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Sample projects data
  const projects: Project[] = [
    {
      id: "1",
      title: "Eco-Friendly Urban Farm Initiative",
      businessName: "Green City Ventures",
      description:
        "A sustainable urban farming project that aims to provide fresh produce to local communities while reducing carbon footprint.",
      fundingProgress: 125000,
      fundingGoal: 250000,
      categories: ["Agriculture", "Sustainability", "Urban Development"],
      thumbnailUrl:
        "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
      id: "2",
      title: "Smart Home Energy Management System",
      businessName: "EcoTech Solutions",
      description:
        "An AI-powered system that optimizes home energy usage, reducing bills and environmental impact through smart monitoring and control.",
      fundingProgress: 320000,
      fundingGoal: 400000,
      categories: ["Technology", "Clean Energy", "Smart Home"],
      thumbnailUrl:
        "https://images.unsplash.com/photo-1558002038-1055e2dae2d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
      id: "3",
      title: "Biodegradable Packaging Solutions",
      businessName: "GreenWrap Innovations",
      description:
        "Developing fully biodegradable packaging materials made from agricultural waste to replace single-use plastics in consumer goods.",
      fundingProgress: 89000,
      fundingGoal: 150000,
      categories: ["Manufacturing", "Sustainability", "Retail"],
      thumbnailUrl:
        "https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
      id: "4",
      title: "Telemedicine Platform for Rural Communities",
      businessName: "HealthConnect",
      description:
        "A comprehensive telemedicine solution designed to provide quality healthcare access to underserved rural communities worldwide.",
      fundingProgress: 210000,
      fundingGoal: 350000,
      categories: ["Healthcare", "Technology", "Social Impact"],
      thumbnailUrl:
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
      id: "5",
      title: "Microfinance for Women Entrepreneurs",
      businessName: "EmpowerFund",
      description:
        "A microfinance initiative focused on providing capital, mentorship, and resources to women entrepreneurs in developing economies.",
      fundingProgress: 175000,
      fundingGoal: 200000,
      categories: ["Finance", "Social Impact", "Women Empowerment"],
      thumbnailUrl:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
      id: "6",
      title: "Ocean Plastic Recycling Initiative",
      businessName: "Blue Planet Recovery",
      description:
        "Innovative technology to collect, process, and upcycle ocean plastic waste into valuable consumer and industrial products.",
      fundingProgress: 420000,
      fundingGoal: 500000,
      categories: ["Environment", "Recycling", "Manufacturing"],
      thumbnailUrl:
        "https://images.unsplash.com/photo-1621451537084-482c73073a0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
      id: "7",
      title: "Affordable 3D-Printed Housing",
      businessName: "BuildTech Innovations",
      description:
        "Revolutionary 3D-printing technology that can construct affordable, sustainable housing in under 48 hours at a fraction of traditional building costs.",
      fundingProgress: 580000,
      fundingGoal: 750000,
      categories: ["Construction", "Technology", "Social Impact"],
      thumbnailUrl:
        "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2065&q=80",
    },
    {
      id: "8",
      title: "AI-Powered Crop Disease Detection",
      businessName: "AgriTech Solutions",
      description:
        "Mobile application using artificial intelligence to identify crop diseases from photos, providing immediate treatment recommendations to farmers in developing regions.",
      fundingProgress: 145000,
      fundingGoal: 300000,
      categories: ["Agriculture", "Technology", "AI"],
      thumbnailUrl:
        "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
      id: "9",
      title: "Renewable Energy Microgrid System",
      businessName: "SolarGrid Innovations",
      description:
        "Modular, scalable microgrid system combining solar, wind, and battery storage to provide reliable renewable energy to off-grid communities and disaster areas.",
      fundingProgress: 290000,
      fundingGoal: 400000,
      categories: ["Clean Energy", "Infrastructure", "Social Impact"],
      thumbnailUrl:
        "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
    },
  ];

  // Extract unique categories from projects
  const allCategories = Array.from(
    new Set(projects.flatMap((project) => project.categories)),
  );

  // Filter projects based on search term and active category
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      searchTerm === "" ||
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.businessName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      activeCategory === "all" || project.categories.includes(activeCategory);

    return matchesSearch && matchesCategory;
  });

  // Sort projects based on selected order
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortOrder === "funding") {
      // Sort by funding progress percentage (descending)
      const aPercentage = (a.fundingProgress / a.fundingGoal) * 100;
      const bPercentage = (b.fundingProgress / b.fundingGoal) * 100;
      return bPercentage - aPercentage;
    } else if (sortOrder === "recent") {
      // For demo purposes, we'll sort by ID (assuming higher ID = more recent)
      return parseInt(b.id) - parseInt(a.id);
    }
    // Default sorting (as provided in the original array)
    return 0;
  });

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header
        isLoggedIn={isLoggedIn}
        onLoginClick={() => {}}
        onRegisterClick={() => {}}
      />

      <main className="flex-grow pt-20">
        {/* Page Header */}
        <div className="bg-gray-50 py-12 border-b">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Browse Investment Opportunities
            </h1>
            <p className="text-gray-600 max-w-3xl">
              Discover innovative projects across various industries seeking
              investment. Filter by category, sort by funding progress, or
              search for specific opportunities that match your investment
              criteria.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Search and Filter Controls */}
          <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search projects..."
                className="pl-10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-2 items-center self-end">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={() => {
                  setSortOrder(
                    sortOrder === "default"
                      ? "funding"
                      : sortOrder === "funding"
                        ? "recent"
                        : "default",
                  );
                }}
              >
                <ArrowUpDown className="h-4 w-4" />
                {sortOrder === "default"
                  ? "Default"
                  : sortOrder === "funding"
                    ? "Funding %"
                    : "Recent"}
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <Filter className="h-4 w-4" />
                More Filters
              </Button>
            </div>
          </div>

          {/* Category Tabs */}
          <Tabs
            defaultValue="all"
            className="mb-8"
            onValueChange={setActiveCategory}
          >
            <TabsList className="flex flex-wrap h-auto p-1 mb-2 overflow-x-auto">
              <TabsTrigger
                value="all"
                className="rounded-full px-4 py-1 text-sm"
              >
                All Projects
              </TabsTrigger>
              {allCategories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="rounded-full px-4 py-1 text-sm"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Projects Grid */}
            <TabsContent value="all" className="mt-6">
              {sortedProjects.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      title={project.title}
                      businessName={project.businessName}
                      description={project.description}
                      fundingProgress={project.fundingProgress}
                      fundingGoal={project.fundingGoal}
                      categories={project.categories}
                      thumbnailUrl={project.thumbnailUrl}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">
                    No projects found matching your criteria.
                  </p>
                  <Button
                    variant="link"
                    onClick={() => {
                      setSearchTerm("");
                      setActiveCategory("all");
                    }}
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </TabsContent>

            {/* Individual category tabs */}
            {allCategories.map((category) => (
              <TabsContent key={category} value={category} className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      title={project.title}
                      businessName={project.businessName}
                      description={project.description}
                      fundingProgress={project.fundingProgress}
                      fundingGoal={project.fundingGoal}
                      categories={project.categories}
                      thumbnailUrl={project.thumbnailUrl}
                    />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectsPage;

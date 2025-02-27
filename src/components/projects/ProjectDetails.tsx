import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  Calendar,
  Building,
  Globe,
  Users,
  DollarSign,
  BarChart,
  FileText,
  MessageSquare,
  Share2,
  Bookmark,
  Heart,
} from "lucide-react";

interface ProjectDetailsProps {
  // Optional props for when component is used directly
  id?: string;
  title?: string;
  businessName?: string;
  description?: string;
  fundingProgress?: number;
  fundingGoal?: number;
  categories?: string[];
  thumbnailUrl?: string;
  businessDescription?: string;
  businessLogo?: string;
  businessWebsite?: string;
  businessLocation?: string;
  teamMembers?: { name: string; role: string; avatar: string }[];
  financialHighlights?: { label: string; value: string }[];
  marketAnalysis?: string;
  documents?: { name: string; type: string; url: string }[];
  updates?: { date: string; title: string; content: string }[];
  comments?: { user: string; avatar: string; date: string; content: string }[];
}

const ProjectDetails = ({
  id: propId,
  title = "Eco-Friendly Urban Farm Initiative",
  businessName = "Green City Ventures",
  description = "A sustainable urban farming project that aims to provide fresh produce to local communities while reducing carbon footprint. The project will implement vertical farming techniques, rainwater harvesting, and solar power to create a self-sustaining urban agriculture system.",
  fundingProgress = 125000,
  fundingGoal = 250000,
  categories = ["Agriculture", "Sustainability", "Urban Development"],
  thumbnailUrl = "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  businessDescription = "Green City Ventures is a forward-thinking company dedicated to sustainable urban development. Founded in 2018, we've successfully implemented eco-friendly projects across multiple cities, focusing on reducing environmental impact while enhancing community well-being.",
  businessLogo = "https://api.dicebear.com/7.x/shapes/svg?seed=GreenCity",
  businessWebsite = "https://www.greencityventures.com",
  businessLocation = "Portland, Oregon, USA",
  teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    {
      name: "Michael Chen",
      role: "Head of Agriculture",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    },
    {
      name: "Priya Patel",
      role: "Sustainability Director",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    },
    {
      name: "David Rodriguez",
      role: "Community Outreach",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    },
  ],
  financialHighlights = [
    { label: "Initial Investment", value: "$250,000" },
    { label: "Projected Annual Revenue", value: "$420,000" },
    { label: "Break-even Point", value: "18 months" },
    { label: "5-Year ROI", value: "215%" },
    { label: "Profit Margin", value: "32%" },
    { label: "Investor Equity Offered", value: "15%" },
  ],
  marketAnalysis = "The urban farming market is projected to grow at a CAGR of 25% over the next five years, driven by increasing demand for locally-sourced produce and sustainable food systems. Our target market includes health-conscious consumers, restaurants focused on farm-to-table offerings, and institutional buyers like schools and hospitals seeking to reduce their carbon footprint.",
  documents = [
    {
      name: "Business Plan",
      type: "PDF",
      url: "#business-plan",
    },
    {
      name: "Financial Projections",
      type: "Excel",
      url: "#financial-projections",
    },
    {
      name: "Market Research Report",
      type: "PDF",
      url: "#market-research",
    },
    {
      name: "Technical Specifications",
      type: "PDF",
      url: "#technical-specs",
    },
  ],
  updates = [
    {
      date: "2023-10-15",
      title: "Site Selection Completed",
      content:
        "We've finalized the location for our first urban farm installation. The 2-acre site in East Portland offers excellent access to transportation and utilities while being centrally located to serve multiple communities.",
    },
    {
      date: "2023-09-01",
      title: "Partnership with Local Restaurants",
      content:
        "We're excited to announce partnerships with 12 local restaurants who have committed to purchasing produce from our urban farm once operational. This represents approximately 40% of our projected initial capacity.",
    },
    {
      date: "2023-08-15",
      title: "Sustainability Grant Awarded",
      content:
        "Green City Ventures has been awarded a $50,000 sustainability grant from the State Environmental Fund, which will be used to implement advanced rainwater harvesting systems in our urban farm design.",
    },
  ],
  comments = [
    {
      user: "Jennifer Wu",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jennifer",
      date: "2023-10-20",
      content:
        "I'm impressed by the comprehensive approach to sustainability. Have you considered integrating aquaponics into your system?",
    },
    {
      user: "Robert Taylor",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
      date: "2023-10-18",
      content:
        "As a restaurant owner, I'm excited about the potential for ultra-fresh produce. What's your planned delivery schedule going to look like?",
    },
    {
      user: "Aisha Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha",
      date: "2023-10-15",
      content:
        "The community education component of this project is what sets it apart. Looking forward to seeing how this develops!",
    },
  ],
}: ProjectDetailsProps) => {
  const params = useParams();
  const id = propId || params.id;

  const [activeTab, setActiveTab] = useState("overview");
  const [newComment, setNewComment] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState(1000);

  const progressPercentage = Math.min(
    Math.round((fundingProgress / fundingGoal) * 100),
    100,
  );

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit the comment to a backend
    console.log("Comment submitted:", newComment);
    setNewComment("");
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      {/* Hero Section with Project Image */}
      <div className="relative w-full h-[400px] bg-gray-900">
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
          <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-8">
            <div className="flex items-center mb-4">
              <Link
                to="/projects"
                className="text-white flex items-center hover:underline"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Link>
            </div>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {title}
                </h1>
                <div className="flex items-center">
                  <img
                    src={businessLogo}
                    alt={businessName}
                    className="w-8 h-8 rounded-full mr-2 bg-white"
                  />
                  <span className="text-white">{businessName}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                >
                  <Bookmark
                    className={`h-5 w-5 ${isBookmarked ? "fill-white" : ""}`}
                  />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart className={`h-5 w-5 ${isLiked ? "fill-white" : ""}`} />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs Navigation */}
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full mb-8"
            >
              <TabsList className="w-full justify-start overflow-x-auto">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="business">Business</TabsTrigger>
                <TabsTrigger value="financials">Financials</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="updates">Updates</TabsTrigger>
                <TabsTrigger value="discussion">Discussion</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="mt-6">
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <h2 className="text-2xl font-semibold mb-4">
                    Project Overview
                  </h2>
                  <p className="text-gray-700 mb-6">{description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {categories.map((category, index) => (
                      <Badge key={index} variant="secondary">
                        {category}
                      </Badge>
                    ))}
                  </div>

                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">
                        ${(fundingProgress / 1000).toFixed(1)}K raised
                      </span>
                      <span className="text-gray-600">
                        ${(fundingGoal / 1000).toFixed(1)}K goal
                      </span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-gray-600">
                        {progressPercentage}% funded
                      </span>
                      <span className="text-gray-600">42 investors</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Timeline</p>
                        <p className="text-sm text-gray-600">
                          6 months (Est. completion: June 2024)
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Users className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Team Size</p>
                        <p className="text-sm text-gray-600">
                          {teamMembers.length} core members + 12 staff
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Building className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Location</p>
                        <p className="text-sm text-gray-600">
                          {businessLocation}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Globe className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Website</p>
                        <a
                          href={businessWebsite}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline"
                        >
                          {businessWebsite.replace(/(https?:\/\/)/i, "")}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Team Section */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <h2 className="text-xl font-semibold mb-4">Team</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {teamMembers.map((member, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center text-center"
                      >
                        <div className="w-16 h-16 rounded-full overflow-hidden mb-2 bg-gray-100">
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="font-medium text-sm">{member.name}</h3>
                        <p className="text-xs text-gray-600">{member.role}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Market Analysis */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Market Analysis
                  </h2>
                  <p className="text-gray-700">{marketAnalysis}</p>
                </div>
              </TabsContent>

              {/* Business Tab */}
              <TabsContent value="business" className="mt-6">
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 rounded-full overflow-hidden mr-4 bg-white">
                      <img
                        src={businessLogo}
                        alt={businessName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold">{businessName}</h2>
                      <p className="text-gray-600">{businessLocation}</p>
                    </div>
                  </div>

                  <h3 className="text-lg font-medium mb-3">
                    About the Company
                  </h3>
                  <p className="text-gray-700 mb-6">{businessDescription}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Founded</p>
                        <p className="text-sm text-gray-600">2018</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Users className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Company Size</p>
                        <p className="text-sm text-gray-600">25-50 employees</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Building className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Headquarters</p>
                        <p className="text-sm text-gray-600">
                          {businessLocation}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Globe className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Website</p>
                        <a
                          href={businessWebsite}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline"
                        >
                          {businessWebsite.replace(/(https?:\/\/)/i, "")}
                        </a>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-medium mb-3">
                    Previous Projects
                  </h3>
                  <div className="space-y-4">
                    <div className="border rounded-md p-4">
                      <h4 className="font-medium">
                        Community Garden Initiative
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        2021-2022 • Seattle, WA
                      </p>
                      <p className="text-sm text-gray-700">
                        Developed 5 community gardens across Seattle
                        neighborhoods, providing fresh produce to over 500
                        families annually.
                      </p>
                    </div>
                    <div className="border rounded-md p-4">
                      <h4 className="font-medium">
                        School Sustainability Program
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        2019-2020 • Portland, OR
                      </p>
                      <p className="text-sm text-gray-700">
                        Implemented educational gardens and sustainability
                        curriculum in 12 Portland schools, reaching over 3,000
                        students.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Financials Tab */}
              <TabsContent value="financials" className="mt-6">
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <h2 className="text-2xl font-semibold mb-4">
                    Financial Overview
                  </h2>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                    {financialHighlights.map((item, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 p-4 rounded-lg text-center"
                      >
                        <p className="text-sm text-gray-600 mb-1">
                          {item.label}
                        </p>
                        <p className="text-lg font-semibold">{item.value}</p>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-lg font-medium mb-3">
                    Funding Allocation
                  </h3>
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">
                        Equipment & Infrastructure
                      </span>
                      <span className="text-sm font-medium">45%</span>
                    </div>
                    <Progress value={45} className="h-2 mb-4" />

                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Operations & Staffing</span>
                      <span className="text-sm font-medium">30%</span>
                    </div>
                    <Progress value={30} className="h-2 mb-4" />

                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Marketing & Distribution</span>
                      <span className="text-sm font-medium">15%</span>
                    </div>
                    <Progress value={15} className="h-2 mb-4" />

                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Research & Development</span>
                      <span className="text-sm font-medium">10%</span>
                    </div>
                    <Progress value={10} className="h-2" />
                  </div>

                  <h3 className="text-lg font-medium mb-3">
                    Revenue Projections
                  </h3>
                  <div className="border rounded-md p-4 mb-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Year 1</span>
                      <span className="text-sm font-medium">$420,000</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Year 2</span>
                      <span className="text-sm font-medium">$680,000</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Year 3</span>
                      <span className="text-sm font-medium">$950,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Year 4</span>
                      <span className="text-sm font-medium">$1,250,000</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium mb-2">
                      Investment Terms
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <span className="font-medium">Minimum Investment:</span>{" "}
                        $1,000
                      </li>
                      <li>
                        <span className="font-medium">Equity Offered:</span> 15%
                      </li>
                      <li>
                        <span className="font-medium">Investment Type:</span>{" "}
                        Common Shares
                      </li>
                      <li>
                        <span className="font-medium">Exit Strategy:</span>{" "}
                        Acquisition or IPO within 5-7 years
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>

              {/* Documents Tab */}
              <TabsContent value="documents" className="mt-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-2xl font-semibold mb-4">
                    Project Documents
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Review the following documents to get a comprehensive
                    understanding of the project, its financial projections, and
                    technical specifications.
                  </p>

                  <div className="space-y-4">
                    {documents.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between border rounded-md p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-gray-500 mr-3" />
                          <div>
                            <p className="font-medium">{doc.name}</p>
                            <p className="text-xs text-gray-500">
                              {doc.type} File
                            </p>
                          </div>
                        </div>
                        <a
                          href={doc.url}
                          className="text-primary hover:underline text-sm font-medium"
                        >
                          Download
                        </a>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-medium mb-2">
                      Confidentiality Notice
                    </h3>
                    <p className="text-sm text-gray-700">
                      The documents provided contain confidential and
                      proprietary information. By accessing these documents, you
                      agree to maintain the confidentiality of the information
                      and use it solely for the purpose of evaluating a
                      potential investment in this project.
                    </p>
                  </div>
                </div>
              </TabsContent>

              {/* Updates Tab */}
              <TabsContent value="updates" className="mt-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-2xl font-semibold mb-4">
                    Project Updates
                  </h2>
                  <div className="space-y-6">
                    {updates.map((update, index) => (
                      <div
                        key={index}
                        className="border-b last:border-b-0 pb-6 last:pb-0"
                      >
                        <div className="flex items-center mb-2">
                          <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                          <span className="text-sm text-gray-600">
                            {formatDate(update.date)}
                          </span>
                        </div>
                        <h3 className="text-lg font-medium mb-2">
                          {update.title}
                        </h3>
                        <p className="text-gray-700">{update.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Discussion Tab */}
              <TabsContent value="discussion" className="mt-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-2xl font-semibold mb-4">Discussion</h2>

                  <form onSubmit={handleCommentSubmit} className="mb-8">
                    <div className="mb-4">
                      <textarea
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                        rows={3}
                        placeholder="Ask a question or leave a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        required
                      ></textarea>
                    </div>
                    <Button type="submit" className="ml-auto">
                      Post Comment
                    </Button>
                  </form>

                  <div className="space-y-6">
                    {comments.map((comment, index) => (
                      <div key={index} className="flex space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100">
                            <img
                              src={comment.avatar}
                              alt={comment.user}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center mb-1">
                            <span className="font-medium mr-2">
                              {comment.user}
                            </span>
                            <span className="text-xs text-gray-500">
                              {formatDate(comment.date)}
                            </span>
                          </div>
                          <p className="text-gray-700">{comment.content}</p>
                          <div className="mt-2">
                            <button className="text-sm text-gray-500 hover:text-primary mr-4">
                              Reply
                            </button>
                            <button className="text-sm text-gray-500 hover:text-primary">
                              Like
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4">
                Invest in this Project
              </h2>

              <div className="mb-6">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">
                    ${(fundingProgress / 1000).toFixed(1)}K raised
                  </span>
                  <span className="text-gray-600">
                    ${(fundingGoal / 1000).toFixed(1)}K goal
                  </span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-gray-600">
                    {progressPercentage}% funded
                  </span>
                  <span className="text-gray-600">42 investors</span>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Investment Amount
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                  <input
                    type="number"
                    min="1000"
                    step="100"
                    value={investmentAmount}
                    onChange={(e) =>
                      setInvestmentAmount(parseInt(e.target.value))
                    }
                    className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <button
                    className="text-xs text-primary"
                    onClick={() => setInvestmentAmount(1000)}
                  >
                    Min: $1,000
                  </button>
                  <button
                    className="text-xs text-primary"
                    onClick={() => setInvestmentAmount(10000)}
                  >
                    Suggested: $10,000
                  </button>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span>Equity</span>
                  <span className="font-medium">
                    {((investmentAmount / fundingGoal) * 15).toFixed(2)}%
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Processing Fee</span>
                  <span className="font-medium">
                    ${(investmentAmount * 0.02).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-medium pt-2 border-t">
                  <span>Total</span>
                  <span>${(investmentAmount * 1.02).toFixed(2)}</span>
                </div>
              </div>

              <Button className="w-full mb-4">Invest Now</Button>
              <Button variant="outline" className="w-full">
                Contact Business
              </Button>

              <div className="mt-6 pt-6 border-t">
                <h3 className="text-sm font-medium mb-2">Project Metrics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Risk Level</span>
                    <span className="font-medium">Moderate</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Time to Funding</span>
                    <span className="font-medium">32 days left</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Minimum Investment</span>
                    <span className="font-medium">$1,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;

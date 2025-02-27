import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search, User, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
  isLoggedIn?: boolean;
  userName?: string;
}

const Header = ({
  onLoginClick = () => {},
  onRegisterClick = () => {},
  isLoggedIn = false,
  userName = "John Doe",
}: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full h-20 bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <div className="font-bold text-2xl text-primary">InvestConnect</div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/projects"
            className="text-gray-700 hover:text-primary transition-colors"
          >
            Browse Projects
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center text-gray-700 hover:text-primary transition-colors">
                For Investors
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link to="/how-it-works" className="w-full">
                  How It Works
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/investment-guide" className="w-full">
                  Investment Guide
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/success-stories" className="w-full">
                  Success Stories
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center text-gray-700 hover:text-primary transition-colors">
                For Businesses
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link to="/raise-capital" className="w-full">
                  Raise Capital
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/business-resources" className="w-full">
                  Resources
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/pricing" className="w-full">
                  Pricing
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link
            to="/about"
            className="text-gray-700 hover:text-primary transition-colors"
          >
            About Us
          </Link>
        </nav>

        {/* Search, Auth Buttons, User Menu (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="text-gray-700 hover:text-primary transition-colors">
            <Search className="h-5 w-5" />
          </button>

          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    <User className="h-5 w-5 text-gray-600" />
                  </div>
                  <span className="font-medium">{userName}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <Link to="/dashboard" className="w-full">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/profile" className="w-full">
                    My Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/investments" className="w-full">
                    My Investments
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/messages" className="w-full">
                    Messages
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/settings" className="w-full">
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button className="w-full text-left text-red-600">
                    Sign Out
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-3">
              <Button variant="ghost" onClick={onLoginClick}>
                Log In
              </Button>
              <Button onClick={onRegisterClick}>Register</Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 top-20 bg-white z-40 md:hidden transition-transform duration-300 ease-in-out",
          isMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="container mx-auto px-4 py-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <div className="text-lg font-medium">Menu</div>
            <button className="text-gray-700 hover:text-primary transition-colors">
              <Search className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex flex-col space-y-6">
            <Link
              to="/projects"
              className="text-gray-700 hover:text-primary transition-colors text-lg"
              onClick={toggleMenu}
            >
              Browse Projects
            </Link>
            <div className="space-y-4">
              <div className="font-medium text-gray-900">For Investors</div>
              <div className="pl-4 space-y-3">
                <Link
                  to="/how-it-works"
                  className="block text-gray-700 hover:text-primary transition-colors"
                  onClick={toggleMenu}
                >
                  How It Works
                </Link>
                <Link
                  to="/investment-guide"
                  className="block text-gray-700 hover:text-primary transition-colors"
                  onClick={toggleMenu}
                >
                  Investment Guide
                </Link>
                <Link
                  to="/success-stories"
                  className="block text-gray-700 hover:text-primary transition-colors"
                  onClick={toggleMenu}
                >
                  Success Stories
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <div className="font-medium text-gray-900">For Businesses</div>
              <div className="pl-4 space-y-3">
                <Link
                  to="/raise-capital"
                  className="block text-gray-700 hover:text-primary transition-colors"
                  onClick={toggleMenu}
                >
                  Raise Capital
                </Link>
                <Link
                  to="/business-resources"
                  className="block text-gray-700 hover:text-primary transition-colors"
                  onClick={toggleMenu}
                >
                  Resources
                </Link>
                <Link
                  to="/pricing"
                  className="block text-gray-700 hover:text-primary transition-colors"
                  onClick={toggleMenu}
                >
                  Pricing
                </Link>
              </div>
            </div>
            <Link
              to="/about"
              className="text-gray-700 hover:text-primary transition-colors text-lg"
              onClick={toggleMenu}
            >
              About Us
            </Link>
          </nav>

          <div className="mt-auto pt-6 border-t border-gray-200">
            {isLoggedIn ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    <User className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <div className="font-medium">{userName}</div>
                    <Link to="/profile" className="text-sm text-primary">
                      View Profile
                    </Link>
                  </div>
                </div>
                <div className="space-y-3">
                  <Link
                    to="/dashboard"
                    className="block text-gray-700 hover:text-primary transition-colors"
                    onClick={toggleMenu}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/investments"
                    className="block text-gray-700 hover:text-primary transition-colors"
                    onClick={toggleMenu}
                  >
                    My Investments
                  </Link>
                  <Link
                    to="/messages"
                    className="block text-gray-700 hover:text-primary transition-colors"
                    onClick={toggleMenu}
                  >
                    Messages
                  </Link>
                  <Link
                    to="/settings"
                    className="block text-gray-700 hover:text-primary transition-colors"
                    onClick={toggleMenu}
                  >
                    Settings
                  </Link>
                  <button className="text-red-600 hover:text-red-700 transition-colors">
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col space-y-3">
                <Button
                  onClick={() => {
                    onLoginClick();
                    toggleMenu();
                  }}
                >
                  Log In
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    onRegisterClick();
                    toggleMenu();
                  }}
                >
                  Register
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

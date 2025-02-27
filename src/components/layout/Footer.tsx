import React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

interface FooterProps {
  companyName?: string;
  companyDescription?: string;
  contactEmail?: string;
  contactPhone?: string;
  contactAddress?: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  navigationLinks?: {
    title: string;
    links: { label: string; href: string }[];
  }[];
}

const Footer = ({
  companyName = "Investment Platform",
  companyDescription = "A comprehensive platform connecting investors with business owners through a secure, feature-rich environment that facilitates investment opportunities, project management, and communication.",
  contactEmail = "contact@investmentplatform.com",
  contactPhone = "+1 (555) 123-4567",
  contactAddress = "123 Investment Street, Financial District, New York, NY 10004",
  socialLinks = {
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
  },
  navigationLinks = [
    {
      title: "Platform",
      links: [
        { label: "How it works", href: "/how-it-works" },
        { label: "Pricing", href: "/pricing" },
        { label: "FAQ", href: "/faq" },
        { label: "Success stories", href: "/success-stories" },
      ],
    },
    {
      title: "For Investors",
      links: [
        { label: "Browse projects", href: "/projects" },
        { label: "Investment guide", href: "/investment-guide" },
        { label: "Due diligence", href: "/due-diligence" },
        { label: "Risk assessment", href: "/risk-assessment" },
      ],
    },
    {
      title: "For Businesses",
      links: [
        { label: "Submit a project", href: "/submit-project" },
        { label: "Business resources", href: "/business-resources" },
        { label: "Funding options", href: "/funding-options" },
        { label: "Partner network", href: "/partner-network" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About us", href: "/about" },
        { label: "Team", href: "/team" },
        { label: "Careers", href: "/careers" },
        { label: "Contact", href: "/contact" },
      ],
    },
  ],
}: FooterProps) => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 px-4 md:px-8 lg:px-12 w-full">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4">{companyName}</h2>
            <p className="text-gray-400 mb-6 max-w-md">{companyDescription}</p>

            {/* Social Media Links */}
            <div className="flex space-x-4 mb-6">
              {socialLinks.facebook && (
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 p-2 rounded-full hover:bg-primary transition-colors"
                >
                  <Facebook size={20} />
                </a>
              )}
              {socialLinks.twitter && (
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 p-2 rounded-full hover:bg-primary transition-colors"
                >
                  <Twitter size={20} />
                </a>
              )}
              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 p-2 rounded-full hover:bg-primary transition-colors"
                >
                  <Instagram size={20} />
                </a>
              )}
              {socialLinks.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 p-2 rounded-full hover:bg-primary transition-colors"
                >
                  <Linkedin size={20} />
                </a>
              )}
            </div>

            {/* Contact Information */}
            <div className="space-y-2">
              <div className="flex items-center">
                <Mail size={16} className="mr-2 text-gray-400" />
                <a
                  href={`mailto:${contactEmail}`}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {contactEmail}
                </a>
              </div>
              <div className="flex items-center">
                <Phone size={16} className="mr-2 text-gray-400" />
                <a
                  href={`tel:${contactPhone.replace(/\s+/g, "")}`}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {contactPhone}
                </a>
              </div>
              <div className="flex items-start">
                <MapPin size={16} className="mr-2 mt-1 text-gray-400" />
                <span className="text-gray-400">{contactAddress}</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          {navigationLinks.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-800 pt-8 pb-6">
          <div className="max-w-md mx-auto lg:mx-0">
            <h3 className="text-lg font-semibold mb-3">
              Subscribe to our newsletter
            </h3>
            <p className="text-gray-400 mb-4">
              Stay updated with the latest investment opportunities and platform
              news.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                placeholder="Your email address"
                className={cn(
                  "bg-gray-800 border-gray-700 text-white",
                  "focus:border-primary focus:ring-primary",
                )}
              />
              <Button className="whitespace-nowrap">Subscribe</Button>
            </div>
          </div>
        </div>

        {/* Copyright and Legal */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} {companyName}. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a
              href="/privacy-policy"
              className="text-gray-500 hover:text-white text-sm transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/terms-of-service"
              className="text-gray-500 hover:text-white text-sm transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="/cookies"
              className="text-gray-500 hover:text-white text-sm transition-colors"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

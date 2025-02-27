import React, { useState } from "react";

import Header from "./layout/Header";
import HeroSection from "./home/HeroSection";
import FeaturedProjects from "./home/FeaturedProjects";
import AuthModal from "./auth/AuthModal";
import Footer from "./layout/Footer";

const Home = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "register">(
    "login",
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginClick = () => {
    setAuthModalTab("login");
    setIsAuthModalOpen(true);
  };

  const handleRegisterClick = () => {
    setAuthModalTab("register");
    setIsAuthModalOpen(true);
  };

  const handleInvestorSignup = () => {
    setAuthModalTab("register");
    setIsAuthModalOpen(true);
  };

  const handleBusinessSignup = () => {
    setAuthModalTab("register");
    setIsAuthModalOpen(true);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setIsAuthModalOpen(false);
  };

  const handleRegisterSuccess = () => {
    // After registration, we typically want users to log in
    setAuthModalTab("login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header
        onLoginClick={handleLoginClick}
        onRegisterClick={handleRegisterClick}
        isLoggedIn={isLoggedIn}
      />

      {/* Main content with padding to account for fixed header */}
      <main className="flex-grow pt-20">
        <HeroSection
          onInvestorSignup={handleInvestorSignup}
          onBusinessSignup={handleBusinessSignup}
        />
        <FeaturedProjects />
      </main>

      <Footer />

      <AuthModal
        defaultOpen={isAuthModalOpen}
        defaultTab={authModalTab}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        onRegisterSuccess={handleRegisterSuccess}
      />
    </div>
  );
};

export default Home;

import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface AuthModalProps {
  defaultOpen?: boolean;
  defaultTab?: "login" | "register";
  triggerButton?: React.ReactNode;
  onClose?: () => void;
  onLoginSuccess?: () => void;
  onRegisterSuccess?: () => void;
}

const AuthModal = ({
  defaultOpen = true,
  defaultTab = "login",
  triggerButton,
  onClose = () => {},
  onLoginSuccess = () => {},
  onRegisterSuccess = () => {},
}: AuthModalProps) => {
  const [open, setOpen] = useState(defaultOpen);
  const [activeTab, setActiveTab] = useState<"login" | "register">(defaultTab);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const handleLoginSubmit = (data: {
    email: string;
    password: string;
    rememberMe: boolean;
  }) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log("Login submitted:", data);
      onLoginSuccess();
      handleClose();
    }, 1500);
  };

  const handleRegistrationComplete = () => {
    console.log("Registration completed");
    onRegisterSuccess();
    setActiveTab("login");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {triggerButton && <DialogTrigger asChild>{triggerButton}</DialogTrigger>}
      <DialogContent className="sm:max-w-[500px] p-0 bg-white overflow-hidden">
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 z-10"
            onClick={handleClose}
          >
            <X className="h-4 w-4" />
          </Button>

          <Tabs
            value={activeTab}
            onValueChange={(value) =>
              setActiveTab(value as "login" | "register")
            }
            className="w-full"
          >
            <div className="border-b px-6 pt-6">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login" className="text-base">
                  Login
                </TabsTrigger>
                <TabsTrigger value="register" className="text-base">
                  Register
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="px-6 py-6">
              <TabsContent value="login" className="mt-0">
                <LoginForm
                  onSubmit={handleLoginSubmit}
                  isLoading={isLoading}
                  onForgotPassword={() =>
                    console.log("Forgot password clicked")
                  }
                />
              </TabsContent>

              <TabsContent value="register" className="mt-0">
                <RegistrationForm onComplete={handleRegistrationComplete} />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;

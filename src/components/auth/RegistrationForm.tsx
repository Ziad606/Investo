import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Upload, User, Building2, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Form validation schemas
const personalInfoSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters" }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  country: z.string().min(1, { message: "Please select your country" }),
});

const businessInfoSchema = z.object({
  businessName: z
    .string()
    .min(2, { message: "Business name must be at least 2 characters" }),
  businessType: z
    .string()
    .min(1, { message: "Please select your business type" }),
  registrationNumber: z
    .string()
    .min(1, { message: "Registration number is required" }),
  foundedYear: z.string().min(4, { message: "Please enter a valid year" }),
  website: z
    .string()
    .url({ message: "Please enter a valid URL" })
    .optional()
    .or(z.literal("")),
});

const documentUploadSchema = z.object({
  identityProof: z.any(),
  businessRegistration: z.any().optional(),
  additionalDocuments: z.any().optional(),
});

interface RegistrationFormProps {
  onComplete?: () => void;
  userRole?: "investor" | "business";
}

const RegistrationForm = ({
  onComplete = () => {},
  userRole = "investor",
}: RegistrationFormProps) => {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<"investor" | "business">(
    userRole,
  );

  // Form for personal information
  const personalInfoForm = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      country: "",
    },
  });

  // Form for business information
  const businessInfoForm = useForm<z.infer<typeof businessInfoSchema>>({
    resolver: zodResolver(businessInfoSchema),
    defaultValues: {
      businessName: "",
      businessType: "",
      registrationNumber: "",
      foundedYear: "",
      website: "",
    },
  });

  // Form for document upload
  const documentUploadForm = useForm<z.infer<typeof documentUploadSchema>>({
    resolver: zodResolver(documentUploadSchema),
    defaultValues: {
      identityProof: undefined,
      businessRegistration: undefined,
      additionalDocuments: undefined,
    },
  });

  const handleRoleSelect = (role: "investor" | "business") => {
    setSelectedRole(role);
  };

  const handlePersonalInfoSubmit = (
    data: z.infer<typeof personalInfoSchema>,
  ) => {
    console.log("Personal info submitted:", data);
    setStep(2);
  };

  const handleBusinessInfoSubmit = (
    data: z.infer<typeof businessInfoSchema>,
  ) => {
    console.log("Business info submitted:", data);
    setStep(3);
  };

  const handleDocumentUploadSubmit = (
    data: z.infer<typeof documentUploadSchema>,
  ) => {
    console.log("Documents uploaded:", data);
    onComplete();
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-sm">
      {/* Step 1: Role Selection */}
      {step === 1 && (
        <div>
          <h2 className="text-2xl font-bold mb-6 text-center">
            Create Your Account
          </h2>

          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-4 text-center">
              Select your role on the platform
            </p>

            <Tabs
              defaultValue={selectedRole}
              onValueChange={(value) =>
                handleRoleSelect(value as "investor" | "business")
              }
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger
                  value="investor"
                  className="flex items-center justify-center gap-2"
                >
                  <User size={18} />
                  Investor
                </TabsTrigger>
                <TabsTrigger
                  value="business"
                  className="flex items-center justify-center gap-2"
                >
                  <Building2 size={18} />
                  Business Owner
                </TabsTrigger>
              </TabsList>

              <TabsContent value="investor" className="mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm text-gray-600">
                      As an investor, you'll be able to browse investment
                      opportunities, fund projects, and track your investments.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="business" className="mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm text-gray-600">
                      As a business owner, you'll be able to create project
                      listings, attract investors, and manage your funding
                      campaigns.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <Form {...personalInfoForm}>
            <form
              onSubmit={personalInfoForm.handleSubmit(handlePersonalInfoSubmit)}
              className="space-y-4"
            >
              <FormField
                control={personalInfoForm.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={personalInfoForm.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={personalInfoForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="john.doe@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={personalInfoForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 (555) 123-4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={personalInfoForm.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="au">Australia</SelectItem>
                        <SelectItem value="de">Germany</SelectItem>
                        <SelectItem value="fr">France</SelectItem>
                        <SelectItem value="jp">Japan</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Continue
              </Button>
            </form>
          </Form>
        </div>
      )}

      {/* Step 2: Business Information (only for business owners) */}
      {step === 2 && selectedRole === "business" && (
        <div>
          <h2 className="text-2xl font-bold mb-6 text-center">
            Business Information
          </h2>

          <Form {...businessInfoForm}>
            <form
              onSubmit={businessInfoForm.handleSubmit(handleBusinessInfoSubmit)}
              className="space-y-4"
            >
              <FormField
                control={businessInfoForm.control}
                name="businessName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Acme Corporation" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={businessInfoForm.control}
                name="businessType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select business type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="startup">Startup</SelectItem>
                        <SelectItem value="small_business">
                          Small Business
                        </SelectItem>
                        <SelectItem value="corporation">Corporation</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="nonprofit">Non-profit</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={businessInfoForm.control}
                name="registrationNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Registration Number</FormLabel>
                    <FormControl>
                      <Input placeholder="BRN12345678" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={businessInfoForm.control}
                name="foundedYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Founded Year</FormLabel>
                    <FormControl>
                      <Input placeholder="2020" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={businessInfoForm.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://www.example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-4 pt-2">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button type="submit" className="flex-1">
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}

      {/* Skip business info for investors */}
      {step === 2 && selectedRole === "investor" && (
        <div>
          <h2 className="text-2xl font-bold mb-6 text-center">
            Investor Profile
          </h2>
          <p className="text-sm text-gray-600 mb-6 text-center">
            We need to verify your identity to comply with regulations and
            ensure a secure investment environment.
          </p>
          <Button onClick={() => setStep(3)} className="w-full">
            Continue to Document Upload
          </Button>
        </div>
      )}

      {/* Step 3: Document Upload */}
      {step === 3 && (
        <div>
          <h2 className="text-2xl font-bold mb-6 text-center">
            Document Verification
          </h2>

          <Form {...documentUploadForm}>
            <form
              onSubmit={documentUploadForm.handleSubmit(
                handleDocumentUploadSubmit,
              )}
              className="space-y-6"
            >
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <div className="flex flex-col items-center">
                    <FileText className="h-10 w-10 text-gray-400 mb-2" />
                    <h3 className="text-sm font-medium">
                      Identity Verification
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 mb-3">
                      Upload a government-issued ID (passport, driver's license)
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Upload size={16} />
                      Upload ID
                    </Button>
                  </div>
                </div>

                {selectedRole === "business" && (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <div className="flex flex-col items-center">
                      <FileText className="h-10 w-10 text-gray-400 mb-2" />
                      <h3 className="text-sm font-medium">
                        Business Registration
                      </h3>
                      <p className="text-xs text-gray-500 mt-1 mb-3">
                        Upload business registration certificate or equivalent
                        document
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <Upload size={16} />
                        Upload Document
                      </Button>
                    </div>
                  </div>
                )}

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <div className="flex flex-col items-center">
                    <FileText className="h-10 w-10 text-gray-400 mb-2" />
                    <h3 className="text-sm font-medium">
                      Additional Documents (Optional)
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 mb-3">
                      Upload any additional supporting documents
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Upload size={16} />
                      Upload Documents
                    </Button>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <p className="text-xs text-gray-500 mb-4 text-center">
                  By submitting these documents, you agree to our verification
                  process. Your documents will be securely stored and reviewed
                  by our team.
                </p>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => setStep(selectedRole === "business" ? 2 : 1)}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button type="submit" className="flex-1">
                    Complete Registration
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;

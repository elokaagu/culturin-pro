'use client'

import { useState } from "react";
import { Link, useNavigate } from "../../lib/navigation";
import { Globe, Shield, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Header from "@/components/Header";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  rememberMe: z.boolean().optional(),
  use2FA: z.boolean().optional()
});

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [show2FAInput, setShow2FAInput] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
      use2FA: false
    }
  });
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // If 2FA is enabled and we haven't shown the 2FA input yet
    if (values.use2FA && !show2FAInput) {
      setShow2FAInput(true);
      toast({
        title: "Verification code sent",
        description: "Please check your email for a verification code."
      });
      return;
    }
    
    // Proceed with login
    setIsLoading(true);
    
    try {
      // Simulating authentication delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      localStorage.setItem('culturinProAccess', 'true');
      
      // Show success message
      toast({
        title: "Signed in successfully",
        description: values.use2FA ? 
          "You've been authenticated with two-factor authentication!" :
          "Welcome back to Culturin!"
      });
      
      navigate("/");
    } catch (error) {
      toast({
        title: "Sign in failed",
        description: "Please check your credentials and try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header type="operator" />
      
      <main className="flex-1 pt-24 bg-gray-50">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
              <p className="text-gray-600">
                Sign in to continue your cultural journey
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
              <Form {...form}>
                <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Email address</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="you@example.com"
                            required
                            className="h-12"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex justify-between items-center">
                          <FormLabel className="text-gray-700">Password</FormLabel>
                          <Link 
                            to="/forgot-password" 
                            className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                          >
                            Forgot password?
                          </Link>
                        </div>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              type={showPassword ? "text" : "password"}
                              placeholder="••••••••"
                              required
                              className="h-12 pr-10"
                            />
                            <button 
                              type="button"
                              onClick={togglePasswordVisibility} 
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                              tabIndex={-1}
                            >
                              {showPassword ? (
                                <EyeOff className="h-5 w-5" />
                              ) : (
                                <Eye className="h-5 w-5" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  {show2FAInput && (
                    <div className="space-y-2 animate-in fade-in duration-300">
                      <FormLabel className="text-gray-700" htmlFor="verification-code">Verification Code</FormLabel>
                      <Input
                        id="verification-code"
                        type="text"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        placeholder="Enter the 6-digit code"
                        className="h-12"
                        required
                      />
                      <p className="text-xs text-gray-500">
                        Enter the verification code sent to your email
                      </p>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <FormField
                      control={form.control}
                      name="rememberMe"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal cursor-pointer text-gray-600">
                            Remember me
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="use2FA"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              disabled={show2FAInput}
                            />
                          </FormControl>
                          <div className="flex items-center space-x-1">
                            <FormLabel className="text-sm font-normal cursor-pointer text-gray-600">
                              Use 2FA
                            </FormLabel>
                            <Shield className="h-4 w-4 text-blue-600" />
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : show2FAInput ? "Verify & Sign In" : "Sign In"}
                  </Button>
                  
                  {form.watch("use2FA") && !show2FAInput && (
                    <div className="bg-blue-50 border border-blue-100 rounded-md p-3 text-sm text-blue-800 flex items-start">
                      <Shield className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                      <p>Two-factor authentication adds an extra layer of security to your account by requiring a verification code in addition to your password.</p>
                    </div>
                  )}
                </form>
              </Form>
              
              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <Link to="/sign-up" className="text-blue-600 hover:text-blue-700 hover:underline font-medium">
                    Create one
                  </Link>
                </p>
              </div>
              
              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-4 text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>
                
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full mt-6 h-12 border border-gray-300 hover:border-gray-400"
                  onClick={() => {
                    toast({
                      title: "Google Sign In",
                      description: "This feature is coming soon!",
                    });
                  }}
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="google"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 488 512"
                  >
                    <path
                      fill="currentColor"
                      d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                    ></path>
                  </svg>
                  Sign in with Google
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignIn;

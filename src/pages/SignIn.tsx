
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // This is a placeholder for actual authentication logic
    try {
      // Simulating authentication delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Signed in successfully",
        description: "Welcome back to Culturin!"
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
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <div className="flex flex-col items-center text-center">
          <Link to="/" className="flex items-center mb-8 group">
            <Globe className="w-8 h-8 mr-2 text-culturin-accent" />
            <span className="font-sans font-bold text-2xl text-culturin-accent">
              Culturin
            </span>
          </Link>
          
          <h1 className="text-3xl font-medium">Welcome back to Culturin</h1>
          <p className="text-muted-foreground mt-2 mb-6">
            Sign in to continue your cultural journey
          </p>
        </div>
        
        <div className="bg-card rounded-xl border shadow-sm p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="h-12"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-culturin-accent hover:text-culturin-gold hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="h-12"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-12 bg-culturin-primary hover:bg-culturin-primary/90 text-white transition-colors border-2 border-culturin-yellow/40"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
            
            <div className="flex justify-center text-sm">
              <p className="text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/sign-up" className="text-culturin-accent hover:text-culturin-gold hover:underline font-medium">
                  Create one
                </Link>
              </p>
            </div>
          </form>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-card px-4 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            
            <Button 
              type="button" 
              variant="outline" 
              className="w-full mt-6 h-12 border-2 border-culturin-yellow/30 hover:border-culturin-yellow/60"
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
  );
};

export default SignIn;


import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Coins, Mail, Phone, ArrowLeft, CircleX } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [isEmailAuth, setIsEmailAuth] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const { toast } = useToast();

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the login with a service like Clerk
    toast({
      title: "Login attempted",
      description: `Tried to login with email: ${email}`,
    });
  };

  const handlePhoneLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isVerifying) {
      // Send verification code
      setIsVerifying(true);
      toast({
        title: "Verification code sent",
        description: `Code sent to ${phoneNumber}`,
      });
    } else {
      // Verify code
      toast({
        title: "Login attempted",
        description: `Tried to verify code: ${verificationCode}`,
      });
    }
  };

  const handleGoogleLogin = () => {
    toast({
      title: "Google Login",
      description: "Attempted to login with Google",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-lg mx-auto pt-10 px-4">
        <Link to="/" className="flex items-center text-sm text-muted-foreground mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
        
        <Card className="border-border">
          <CardHeader className="text-center border-b border-border pb-6">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-finpurple/10 rounded-full flex items-center justify-center">
                <Coins className="h-6 w-6 text-finpurple" />
              </div>
            </div>
            <CardTitle className="text-2xl">Welcome to FinTown</CardTitle>
            <CardDescription>
              Login or create an account to continue your financial journey
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-6">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="space-y-4">
                {isEmailAuth ? (
                  <form onSubmit={handleEmailLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Input 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <Input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">Login</Button>
                  </form>
                ) : isVerifying ? (
                  <form onSubmit={handlePhoneLogin} className="space-y-4">
                    <div className="flex items-center mb-2">
                      <Button 
                        variant="ghost" 
                        className="h-8 w-8 p-0 mr-2" 
                        onClick={() => setIsVerifying(false)}
                      >
                        <CircleX className="h-4 w-4" />
                      </Button>
                      <span>Enter the code sent to {phoneNumber}</span>
                    </div>
                    <Input 
                      type="text" 
                      placeholder="Verification code" 
                      value={verificationCode} 
                      onChange={(e) => setVerificationCode(e.target.value)}
                      required
                    />
                    <Button type="submit" className="w-full">Verify</Button>
                  </form>
                ) : (
                  <form onSubmit={handlePhoneLogin} className="space-y-4">
                    <Input 
                      type="tel" 
                      placeholder="Phone number" 
                      value={phoneNumber} 
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                    <Button type="submit" className="w-full">Send verification code</Button>
                  </form>
                )}
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    className={`${isEmailAuth ? 'bg-primary text-primary-foreground hover:bg-primary/90' : ''}`}
                    onClick={() => setIsEmailAuth(true)}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Email
                  </Button>
                  <Button 
                    variant="outline" 
                    className={`${!isEmailAuth ? 'bg-primary text-primary-foreground hover:bg-primary/90' : ''}`}
                    onClick={() => setIsEmailAuth(false)}
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Phone
                  </Button>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full bg-white text-black hover:bg-gray-100"
                  onClick={handleGoogleLogin}
                >
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                    <path d="M1 1h22v22H1z" fill="none" />
                  </svg>
                  Google
                </Button>
              </TabsContent>
              
              <TabsContent value="signup" className="space-y-4">
                {isEmailAuth ? (
                  <form onSubmit={handleEmailLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Input 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <Input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">Sign Up</Button>
                  </form>
                ) : isVerifying ? (
                  <form onSubmit={handlePhoneLogin} className="space-y-4">
                    <div className="flex items-center mb-2">
                      <Button 
                        variant="ghost" 
                        className="h-8 w-8 p-0 mr-2" 
                        onClick={() => setIsVerifying(false)}
                      >
                        <CircleX className="h-4 w-4" />
                      </Button>
                      <span>Enter the code sent to {phoneNumber}</span>
                    </div>
                    <Input 
                      type="text" 
                      placeholder="Verification code" 
                      value={verificationCode} 
                      onChange={(e) => setVerificationCode(e.target.value)}
                      required
                    />
                    <Button type="submit" className="w-full">Verify</Button>
                  </form>
                ) : (
                  <form onSubmit={handlePhoneLogin} className="space-y-4">
                    <Input 
                      type="tel" 
                      placeholder="Phone number" 
                      value={phoneNumber} 
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                    <Button type="submit" className="w-full">Send verification code</Button>
                  </form>
                )}
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    className={`${isEmailAuth ? 'bg-primary text-primary-foreground hover:bg-primary/90' : ''}`}
                    onClick={() => setIsEmailAuth(true)}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Email
                  </Button>
                  <Button 
                    variant="outline" 
                    className={`${!isEmailAuth ? 'bg-primary text-primary-foreground hover:bg-primary/90' : ''}`}
                    onClick={() => setIsEmailAuth(false)}
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Phone
                  </Button>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full bg-white text-black hover:bg-gray-100"
                  onClick={handleGoogleLogin}
                >
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                    <path d="M1 1h22v22H1z" fill="none" />
                  </svg>
                  Google
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
          
          <CardFooter className="flex-col border-t border-border">
            <p className="text-center text-sm text-muted-foreground mt-4">
              By using FinTown, you agree to our Terms of Service and Privacy Policy.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Auth;

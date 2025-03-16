
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Key, User, Fingerprint } from 'lucide-react';
import OpenBallotLogo from '@/components/OpenBallotLogo';
import GhanaButton from '@/components/GhanaButton';
import GlassCard from '@/components/GlassCard';
import { toast } from "sonner"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    idNumber: '',
    secretPhrase: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showBiometric, setShowBiometric] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.idNumber || !formData.secretPhrase) {
      toast("Error", {
        description: "Please fill in all fields",
        duration: 3000,
      });
      return;
    }

    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      setShowBiometric(true);
    }, 1500);
  };

  const handleBiometric = () => {
    setIsLoading(true);

    // Simulate biometric verification
    setTimeout(() => {
      setIsLoading(false);

      toast("Login Successful", {
        description: "Welcome back to OpenBallot!",
        duration: 3000,
      });

      navigate('/dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white py-4 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <GhanaButton
              variant="black"
              size="sm"
              onClick={() => navigate('/')}
              className="mr-4"
            >
              <ArrowLeft size={16} className="mr-1" /> Back
            </GhanaButton>
            <OpenBallotLogo />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-12 px-6 flex items-center justify-center">
        <div className="w-full max-w-md">
          <GlassCard className="p-8 animate-fade-in">
            {!showBiometric ? (
              <>
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold">Welcome Back</h1>
                  <p className="text-gray-600 mt-2">
                    Sign in to access your voting portal
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="idNumber">ID Number</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      <Input
                        id="idNumber"
                        name="idNumber"
                        value={formData.idNumber}
                        onChange={handleInputChange}
                        className="pl-10 w-full"
                        placeholder="Enter your ID number"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="secretPhrase">Secret Phrase</Label>
                    <div className="relative">
                      <Key className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      <Input
                        id="secretPhrase"
                        name="secretPhrase"
                        type="password"
                        value={formData.secretPhrase}
                        onChange={handleInputChange}
                        className="pl-10 w-full"
                        placeholder="Enter your secret phrase"
                        required
                      />
                    </div>
                  </div>

                  <GhanaButton
                    variant="red"
                    size="lg"
                    fullWidth
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? "Verifying..." : "Continue"}
                  </GhanaButton>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <a
                      href="/register"
                      className="text-ghana-green hover:underline"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate('/register');
                      }}
                    >
                      Register now
                    </a>
                  </p>
                </div>
              </>
            ) : (
              <div className="text-center space-y-8 py-4">
                <div>
                  <h1 className="text-3xl font-bold mb-4">Biometric Verification</h1>
                  <p className="text-gray-600">
                    Complete your login with biometric verification
                  </p>
                </div>

                <div className="flex flex-col items-center space-y-8 py-6">
                  <div className="w-32 h-32 rounded-full border-2 border-ghana-gold flex items-center justify-center bg-ghana-gold/5 animate-pulse-soft">
                    <Fingerprint className="h-16 w-16 text-ghana-gold" />
                  </div>
                  <p className="text-center text-sm text-gray-600">
                    Place your finger on the fingerprint scanner
                  </p>
                </div>

                <GhanaButton
                  variant="green"
                  size="lg"
                  onClick={handleBiometric}
                  disabled={isLoading}
                  className="mx-auto"
                >
                  {isLoading ? "Verifying..." : "Verify Biometric"}
                </GhanaButton>

                <div className="mt-4">
                  <button
                    className="text-sm text-gray-500 hover:text-gray-700 underline"
                    onClick={() => setShowBiometric(false)}
                  >
                    Go back to login
                  </button>
                </div>
              </div>
            )}
          </GlassCard>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 px-6 bg-white border-t border-gray-200">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-sm text-gray-500">
            © 2023 OpenBallot. Secure electronic voting for the future.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Login;
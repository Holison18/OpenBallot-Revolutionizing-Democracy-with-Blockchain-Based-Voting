import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Calendar, Clock, User, LogOut, CheckCircle, BarChart3, Wallet } from 'lucide-react';
import OpenBallotLogo from '@/components/OpenBallotLogo';
import GhanaButton from '@/components/GhanaButton';
import GlassCard from '@/components/GlassCard';
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [userName, setUserName] = useState<string>("Voter");

  // Load wallet address from local storage or URL params on component mount
  useEffect(() => {
    // Check if wallet address is in URL params (for first login)
    const queryParams = new URLSearchParams(location.search);
    const addressFromParams = queryParams.get('walletAddress');
    
    if (addressFromParams) {
      // Save to local storage and state
      localStorage.setItem('walletAddress', addressFromParams);
      setWalletAddress(addressFromParams);
      
      // Clean up URL by removing the query parameter
      navigate('/dashboard', { replace: true });
    } else {
      // Check local storage for wallet address
      const storedAddress = localStorage.getItem('walletAddress');
      if (storedAddress) {
        setWalletAddress(storedAddress);
      } else {
        // Redirect to login if no wallet address is found
        toast.error("No wallet connected. Please login again.");
        navigate('/');
      }
    }
    
    // Get username if available
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
    }
  }, [location, navigate]);

  // Mock election data
  const activeElections = [
    {
      id: '2025-presidential',
      title: '2025 Presidential Election',
      date: 'December 7, 2025',
      status: 'active',
      timeRemaining: '2 days',
      hasVoted: false
    },
    {
      id: '2025-parliamentary',
      title: '2025 Parliamentary Election',
      date: 'December 7, 2025',
      status: 'active',
      timeRemaining: '2 days',
      hasVoted: false
    }
  ];

  const upcomingElections = [
    {
      id: 'local-assembly',
      title: 'Local Assembly Elections',
      date: 'February 12, 2024',
      status: 'upcoming',
      timeRemaining: '68 days'
    }
  ];

  const handleLogout = () => {
    // Clear wallet address from local storage on logout
    localStorage.removeItem('walletAddress');
    localStorage.removeItem('userName');
    
    toast("Logged Out", {
      description: "You have been successfully logged out.",
      duration: 3000,
    });
    
    navigate('/');
  };

  // const formatDate = (dateString: string) => {
  //   const options: Intl.DateTimeFormatOptions = { 
  //     year: 'numeric', 
  //     month: 'long', 
  //     day: 'numeric' 
  //   };
  //   return new Date(dateString).toLocaleDateString('en-US', options);
  // };

  // Truncate wallet address for display
  const truncateAddress = (address: string) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white py-4 px-6 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <OpenBallotLogo />
          
          <div className="flex items-center gap-4">
            <div className="flex items-center mr-2">
              <div className="w-8 h-8 rounded-full bg-ghana-green flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <span className="ml-2 text-sm font-medium">{userName}</span>
            </div>
            
            {walletAddress && (
              <div className="hidden md:flex items-center bg-gray-100 rounded-full px-3 py-1">
                <Wallet size={14} className="text-ghana-gold mr-2" />
                <span className="text-xs font-mono">{truncateAddress(walletAddress)}</span>
              </div>
            )}
            
            <GhanaButton 
              variant="black" 
              size="sm" 
              onClick={handleLogout}
              className="flex items-center gap-1"
            >
              <LogOut size={16} /> Logout
            </GhanaButton>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Your Dashboard</h1>
              <p className="text-gray-600">
                Welcome back, {userName}. Here are your active and upcoming elections.
              </p>
            </div>
            
            {/* Wallet info card on mobile */}
            {walletAddress && (
              <div className="md:hidden">
                <GlassCard className="p-3">
                  <div className="flex items-center">
                    <Wallet size={14} className="text-ghana-gold mr-2" />
                    <span className="text-xs font-mono">{truncateAddress(walletAddress)}</span>
                  </div>
                </GlassCard>
              </div>
            )}
          </div>
          
          {/* Active Elections */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Active Elections</h2>
            
            {activeElections.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activeElections.map((election) => (
                  <GlassCard 
                    key={election.id} 
                    className="p-6 animate-fade-in"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-ghana-red text-white mb-2">
                          Active
                        </div>
                        <h3 className="text-xl font-semibold">{election.title}</h3>
                      </div>
                      {election.hasVoted && (
                        <div className="flex items-center text-ghana-green">
                          <CheckCircle size={16} className="mr-1" />
                          <span className="text-xs font-medium">Voted</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span className="text-sm">{election.date}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-4 w-4 mr-2" />
                        <span className="text-sm">Closes in {election.timeRemaining}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {!election.hasVoted && (
                        <GhanaButton 
                          variant="gold" 
                          onClick={() => navigate(`/voting/${election.id}?walletAddress=${walletAddress}`)}
                          fullWidth
                        >
                          Vote Now
                        </GhanaButton>
                      )}
                      <GhanaButton 
                        variant={election.hasVoted ? "gold" : "black"} 
                        onClick={() => navigate(`/results/${election.id}`)}
                        fullWidth
                        className="flex items-center justify-center gap-1"
                      >
                        <BarChart3 size={16} /> Results
                      </GhanaButton>
                    </div>
                  </GlassCard>
                ))}
              </div>
            ) : (
              <GlassCard className="p-6 text-center animate-fade-in">
                <p className="text-gray-600">
                  There are no active elections at the moment.
                </p>
              </GlassCard>
            )}
          </section>
          
          {/* Upcoming Elections */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Upcoming Elections</h2>
            
            {upcomingElections.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {upcomingElections.map((election) => (
                  <GlassCard 
                    key={election.id} 
                    className="p-6 animate-fade-in"
                  >
                    <div className="mb-4">
                      <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-ghana-gold text-black mb-2">
                        Upcoming
                      </div>
                      <h3 className="text-xl font-semibold">{election.title}</h3>
                    </div>
                    
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span className="text-sm">{election.date}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-4 w-4 mr-2" />
                        <span className="text-sm">Starts in {election.timeRemaining}</span>
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            ) : (
              <GlassCard className="p-6 text-center animate-fade-in">
                <p className="text-gray-600">
                  There are no upcoming elections scheduled.
                </p>
              </GlassCard>
            )}
          </section>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-4 px-6 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} OpenBallot. Secure electronic voting for the future.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
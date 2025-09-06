"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Wallet,
  Settings,
  Moon,
  Sun,
  ChevronDown,
  LogOut,
  User,
  Home,
  Users,
  Compass,
  WalletCards,
  Activity,
  Globe,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/utils';
import { useTheme } from '@/providers/ThemeProvider';
import { useWallet } from '@/hooks/useWallet';

// Create properly typed motion components
const MotionHeader = motion.header;
const MotionDiv = motion.div;
const MotionSpan = motion.span;

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  badge?: string;
}

const navigation: NavItem[] = [
  { href: '/', label: 'Home', icon: <Home className="h-4 w-4" /> },
  { href: '/social', label: 'Community', icon: <Users className="h-4 w-4" /> },
  { href: '/explore', label: 'Explore', icon: <Compass className="h-4 w-4" /> },
  { href: '/wallet', label: 'Wallet', icon: <WalletCards className="h-4 w-4" />, badge: 'NEW' },
];

const navbarVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      type: "spring", 
      stiffness: 100, 
      damping: 20,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      type: "spring", 
      stiffness: 100, 
      damping: 20
    }
  }
};

const mobileMenuVariants = {
  hidden: { 
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: { duration: 0.2 }
  },
  visible: { 
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { 
      type: "spring", 
      stiffness: 300,
      damping: 30
    }
  },
  exit: { 
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: { duration: 0.2 }
  }
};

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { user, isConnected, isConnecting, connect, disconnect, keychainInstalled } = useWallet();

  // Set isMounted to true after the component mounts on the client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Close mobile menu when pathname changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileOpen(false);
  }, [pathname]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isProfileOpen && e.target instanceof Element) {
        const profileDropdown = document.getElementById('profile-dropdown');
        if (profileDropdown && !profileDropdown.contains(e.target)) {
          setIsProfileOpen(false);
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isProfileOpen]);

  const formatWalletAddress = (address: string | null): string => {
    if (!address) return 'Connected';
    if (address.length <= 10) return address;
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleConnect = async () => {
    try {
      await connect();
    } catch (error) {
      console.error('Header: connect failed', error);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
      setIsProfileOpen(false);
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
    }
  };

  return (
    <MotionHeader 
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
    >
      <div className={cn(
        "sticky top-0 z-50 w-full border-b backdrop-blur-2xl supports-[backdrop-filter]:bg-background/70 transition-all duration-500 relative overflow-hidden",
        "bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 border-border/60",
        isScrolled 
          ? "py-2 shadow-xl shadow-blue-500/20 border-b-2 border-blue-500/30" 
          : "py-3 shadow-lg shadow-purple-500/10"
      )}>
        {/* Mesh gradient background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/5 via-purple-500/5 to-cyan-500/5"></div>
        </div>
        
        {/* Animated border */}
        <div className="absolute inset-0 rounded-xl pointer-events-none border border-blue-500/20"></div>
        
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <MotionDiv 
              variants={itemVariants}
            >
              <div className="flex items-center space-x-4">
                <Link href="/" className="flex items-center space-x-3 group">
                  <MotionDiv 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500/40 to-purple-500/30 backdrop-blur-sm border border-blue-500/50 flex items-center justify-center transition-all duration-300 group-hover:from-blue-500/60 group-hover:to-purple-500/50">
                      <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center relative">
                        <MotionSpan 
                          animate={{ 
                            textShadow: [
                              "0 0 5px #00ffff",
                              "0 0 10px #00ffff",
                              "0 0 5px #00ffff"
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <span className="text-primary-foreground font-extrabold text-sm tracking-tighter z-10">
                            H
                          </span>
                        </MotionSpan>
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 opacity-70"></div>
                      </div>
                    </div>
                  </MotionDiv>
                  <MotionSpan 
                    whileHover={{ scale: 1.02 }}
                  >
                    <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 hidden sm:block transition-all duration-300 group-hover:from-blue-500/90 tracking-tight">
                      Hive<span className="text-cyan-500">Social</span>
                    </span>
                  </MotionSpan>
                  <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 sm:hidden tracking-tight">
                    HS
                  </span>
                </Link>
              </div>
            </MotionDiv>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => (
                <MotionDiv
                  key={item.href}
                  variants={itemVariants}
                >
                  <div className="relative">
                    <Link
                      href={item.href}
                      className={cn(
                        "px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 relative overflow-hidden group flex items-center space-x-2",
                        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-500/40 before:via-purple-500/40 before:to-cyan-500/40 before:opacity-0 before:transition-opacity before:duration-300 before:rounded-xl",
                        "hover:before:opacity-100 hover:text-cyan-500 hover:scale-105",
                        pathname === item.href
                          ? "bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-cyan-500/50 text-cyan-500 font-bold backdrop-blur-sm border border-blue-500/60 shadow-lg shadow-blue-500/30"
                          : "text-muted-foreground hover:text-blue-500",
                        "transition-all duration-300"
                      )}
                    >
                      <span className="relative z-10 flex items-center space-x-2">
                        {item.icon}
                        <span>{item.label}</span>
                      </span>
                      {item.badge && (
                        <Badge 
                          variant="secondary" 
                          className="ml-2 relative z-10 bg-gradient-to-r from-purple-500/40 to-pink-500/40 text-purple-500 border-purple-500/50"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </div>
                </MotionDiv>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-3">
              {/* Theme Toggle */}
              {isMounted && (
                <MotionDiv variants={itemVariants}>
                  <MotionDiv
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleTheme}
                      className="h-10 w-10 p-0 rounded-xl bg-background/60 backdrop-blur-sm border border-muted hover:border-blue-500/40 transition-all duration-300 shadow-md hover:shadow-blue-500/30"
                      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                    >
                      {theme === 'dark' ? (
                        <MotionDiv
                          initial={{ rotate: -90 }}
                          animate={{ rotate: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Sun className="h-5 w-5 text-yellow-500" />
                        </MotionDiv>
                      ) : (
                        <MotionDiv
                          initial={{ rotate: 90 }}
                          animate={{ rotate: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Moon className="h-5 w-5 text-indigo-500" />
                        </MotionDiv>
                      )}
                    </Button>
                  </MotionDiv>
                </MotionDiv>
              )}

              {/* Settings */}
              <MotionDiv variants={itemVariants}>
                <MotionDiv
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-10 w-10 p-0 rounded-xl bg-background/60 backdrop-blur-sm border border-muted hover:border-blue-500/40 transition-all duration-300 shadow-md hover:shadow-blue-500/30"
                    aria-label="Settings"
                  >
                    <Settings className="h-4 w-4 text-blue-500" />
                  </Button>
                </MotionDiv>
              </MotionDiv>

              {/* Wallet Connection */}
              <MotionDiv variants={itemVariants}>
                {isMounted ? (
                  isConnected ? (
                    <div className="relative">
                      <MotionDiv
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsProfileOpen(!isProfileOpen);
                          }}
                          className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-cyan-500/30 backdrop-blur-sm border border-blue-500/40 hover:from-blue-500/40 hover:via-purple-500/40 hover:to-cyan-500/40 transition-all duration-300 shadow-lg shadow-blue-500/30"
                        >
                          <div className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse"></div>
                          <span className="font-medium text-cyan-500">{formatWalletAddress(user?.name || null)}</span>
                          <MotionDiv
                            animate={{ rotate: isProfileOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown className="h-4 w-4 text-cyan-500" />
                          </MotionDiv>
                        </Button>
                      </MotionDiv>

                      <AnimatePresence>
                        {isProfileOpen && (
                          <div
                            className="absolute right-0 top-full mt-2 w-56 rounded-2xl border bg-popover/90 backdrop-blur-xl p-2 shadow-2xl z-50 border-blue-500/30"
                          >
                            <motion.div
                              initial={{ opacity: 0, y: -10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -10, scale: 0.95 }}
                              transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            >
                              <div 
                                id="profile-dropdown"
                                className="px-3 py-2 text-xs text-muted-foreground border-b border-border/50"
                              >
                                Connected as @{user?.name}
                              </div>
                              <button className="flex w-full items-center space-x-3 rounded-xl px-3 py-2.5 text-sm hover:bg-accent transition-all duration-200 group">
                                <User className="h-4 w-4 text-blue-500 group-hover:text-cyan-500" />
                                <span>Profile</span>
                              </button>
                              <button className="flex w-full items-center space-x-3 rounded-xl px-3 py-2.5 text-sm hover:bg-accent transition-all duration-200 group">
                                <Activity className="h-4 w-4 text-purple-500 group-hover:text-cyan-500" />
                                <span>Activity</span>
                              </button>
                              <button className="flex w-full items-center space-x-3 rounded-xl px-3 py-2.5 text-sm hover:bg-accent transition-all duration-200 group">
                                <Globe className="h-4 w-4 text-cyan-500 group-hover:text-cyan-500" />
                                <span>Network</span>
                              </button>
                              <hr className="my-2 border-border/50" />
                              <button
                                className="flex w-full items-center space-x-3 rounded-xl px-3 py-2.5 text-sm hover:bg-accent text-destructive transition-all duration-200 group"
                                onClick={handleDisconnect}
                              >
                                <LogOut className="h-4 w-4 group-hover:text-cyan-500" />
                                <span>Disconnect</span>
                              </button>
                            </motion.div>
                          </div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : keychainInstalled ? (
                    <MotionDiv
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Button
                        className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-cyan-500 hover:to-blue-500 text-primary-foreground backdrop-blur-sm border-2 border-blue-500/60 transition-all duration-300 shadow-xl shadow-blue-500/40 hover:shadow-2xl hover:shadow-cyan-500/50"
                        onClick={handleConnect}
                        disabled={isConnecting}
                      >
                        <Wallet className="h-4 w-4" />
                        <span className="font-medium">{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
                      </Button>
                    </MotionDiv>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-2 text-sm text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-950/50 px-3 py-2 rounded-xl border border-yellow-200 dark:border-yellow-800/50">
                        <AlertCircle className="h-4 w-4 flex-shrink-0" />
                        <span className="hidden sm:inline">Install HiveKeychain</span>
                        <span className="sm:hidden">Install</span>
                      </div>
                      <Button asChild variant="outline" size="sm" className="rounded-xl">
                        <Link href="/wallet-setup">
                          Setup Guide
                        </Link>
                      </Button>
                    </div>
                  )
                ) : (
                  // Render a placeholder during SSR and initial client render
                  <Button
                    className="flex items-center space-x-2 rounded-xl"
                    disabled
                  >
                    <Wallet className="h-4 w-4" />
                    <span>Loading Wallet...</span>
                  </Button>
                )}
              </MotionDiv>
            </div>

            {/* Mobile Menu Button */}
            <MotionDiv variants={itemVariants}>
              <MotionDiv
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden h-10 w-10 p-0 rounded-xl bg-background/60 backdrop-blur-sm border border-muted hover:border-blue-500/40 transition-all duration-300 shadow-md hover:shadow-blue-500/30"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                >
                  {isMobileMenuOpen ? (
                    <X className="h-5 w-5 text-blue-500" />
                  ) : (
                    <Menu className="h-5 w-5 text-blue-500" />
                  )}
                </Button>
              </MotionDiv>
            </MotionDiv>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <MotionDiv
                variants={mobileMenuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="md:hidden border-t py-4 backdrop-blur-2xl bg-background/80 rounded-b-2xl border-border/50 mt-2 shadow-2xl">
                  <div className="container mx-auto px-4 space-y-4">
                    <nav className="flex flex-col space-y-2">
                      {navigation.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={cn(
                            "flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300",
                            "hover:bg-accent hover:text-accent-foreground",
                            pathname === item.href
                              ? "bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-cyan-500/30 text-cyan-500 font-bold backdrop-blur-sm border border-blue-500/40"
                              : "text-muted-foreground"
                          )}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.icon}
                          <span>{item.label}</span>
                          {item.badge && (
                            <Badge variant="secondary" className="ml-auto bg-gradient-to-r from-purple-500/40 to-pink-500/40 text-purple-500 border-purple-500/50">
                              {item.badge}
                            </Badge>
                          )}
                        </Link>
                      ))}
                    </nav>

                    <div className="pt-4 border-t border-border/50 space-y-3">
                      {/* Theme Toggle */}
                      <button
                        onClick={toggleTheme}
                        className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-base font-medium bg-background/60 backdrop-blur-sm border border-muted hover:border-blue-500/40 transition-all duration-300"
                        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                      >
                        <span className="flex items-center space-x-3">
                          {theme === 'dark' ? (
                            <Sun className="h-5 w-5 text-yellow-500" />
                          ) : (
                            <Moon className="h-5 w-5 text-indigo-500" />
                          )}
                          <span>Theme</span>
                        </span>
                        <span className="text-muted-foreground">
                          {theme === 'dark' ? 'Light' : 'Dark'}
                        </span>
                      </button>

                      {/* Settings */}
                      <button className="flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium bg-background/60 backdrop-blur-sm border border-muted hover:border-blue-500/40 transition-all duration-300">
                        <Settings className="h-5 w-5 text-blue-500" />
                        <span>Settings</span>
                      </button>

                      {/* Wallet Actions */}
                      {isConnected ? (
                        <div className="space-y-3">
                          <div className="px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 backdrop-blur-sm border border-blue-500/30">
                            <div className="text-sm font-medium text-cyan-500 truncate">
                              Connected as @{user?.name}
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            className="w-full flex items-center space-x-3 rounded-xl bg-gradient-to-r from-red-500/30 via-orange-500/30 to-yellow-500/30 backdrop-blur-sm border border-red-500/40 hover:from-red-500/40 hover:via-orange-500/40 hover:to-yellow-500/40 transition-all duration-300"
                            onClick={handleDisconnect}
                          >
                            <LogOut className="h-5 w-5" />
                            <span>Disconnect Wallet</span>
                          </Button>
                        </div>
                      ) : keychainInstalled ? (
                        <Button
                          className="w-full flex items-center space-x-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-cyan-500 hover:to-blue-500 text-primary-foreground backdrop-blur-sm border-2 border-blue-500/60 transition-all duration-300 shadow-xl shadow-blue-500/40 hover:shadow-2xl hover:shadow-cyan-500/50"
                          onClick={handleConnect}
                          disabled={isConnecting}
                        >
                          <Wallet className="h-5 w-5" />
                          <span>{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
                        </Button>
                      ) : (
                        <div className="flex flex-col space-y-3">
                          <div className="flex items-center space-x-2 text-sm text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-950/50 px-3 py-2 rounded-xl border border-yellow-200 dark:border-yellow-800/50">
                            <AlertCircle className="h-4 w-4 flex-shrink-0" />
                            <span>Install HiveKeychain</span>
                          </div>
                          <Button asChild variant="outline" className="rounded-xl">
                            <Link href="/wallet-setup">
                              Setup Guide
                            </Link>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </MotionDiv>
            )}
          </AnimatePresence>
        </div>
      </div>
    </MotionHeader>
  );
}
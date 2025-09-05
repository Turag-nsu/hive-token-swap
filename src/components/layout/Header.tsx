"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
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
  Activity,
  AlertCircle,
  Zap,
  Globe,
  Home,
  Users,
  Compass,
  WalletCards
} from 'lucide-react';
import { cn } from '@/utils';
import { useTheme } from '@/providers/ThemeProvider';
import { useWallet } from '@/hooks/useWallet';

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
    <motion.header 
      className={cn(
        "sticky top-0 z-50 w-full border-b backdrop-blur-2xl supports-[backdrop-filter]:bg-background/70 transition-all duration-500 relative overflow-hidden",
        "bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 border-border/60",
        isScrolled 
          ? "py-2 shadow-xl shadow-blue-500/20 border-b-2 border-blue-500/30" 
          : "py-3 shadow-lg shadow-purple-500/10"
      )}
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Mesh gradient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/5 via-purple-500/5 to-cyan-500/5"></div>
      </div>
      
      {/* Animated border */}
      <div className="absolute inset-0 rounded-xl pointer-events-none border border-blue-500/20"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-4"
            variants={itemVariants}
          >
            <Link href="/" className="flex items-center space-x-3 group">
              <motion.div 
                className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500/40 to-purple-500/30 backdrop-blur-sm border border-blue-500/50 flex items-center justify-center transition-all duration-300 group-hover:from-blue-500/60 group-hover:to-purple-500/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center relative">
                  <motion.span 
                    className="text-primary-foreground font-extrabold text-sm tracking-tighter z-10"
                    animate={{ 
                      textShadow: [
                        "0 0 5px #00ffff",
                        "0 0 10px #00ffff",
                        "0 0 5px #00ffff"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    H
                  </motion.span>
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 opacity-70"></div>
                </div>
              </motion.div>
              <motion.span 
                className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 hidden sm:block transition-all duration-300 group-hover:from-blue-500/90 tracking-tight"
                whileHover={{ scale: 1.02 }}
              >
                Hive<span className="text-cyan-500">Social</span>
              </motion.span>
              <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 sm:hidden tracking-tight">
                HS
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item, index) => (
              <motion.div
                key={item.href}
                variants={itemVariants}
                className="relative"
              >
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
              </motion.div>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Theme Toggle */}
            {isMounted && (
              <motion.div variants={itemVariants}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleTheme}
                  className="h-10 w-10 p-0 rounded-xl bg-background/60 backdrop-blur-sm border border-muted hover:border-blue-500/40 transition-all duration-300 shadow-md hover:shadow-blue-500/30"
                  aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {theme === 'dark' ? (
                    <motion.div
                      initial={{ rotate: -90 }}
                      animate={{ rotate: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Sun className="h-5 w-5 text-yellow-500" />
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ rotate: 90 }}
                      animate={{ rotate: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Moon className="h-5 w-5 text-indigo-500" />
                    </motion.div>
                  )}
                </Button>
              </motion.div>
            )}

            {/* Settings */}
            <motion.div variants={itemVariants}>
              <Button
                variant="ghost"
                size="sm"
                className="h-10 w-10 p-0 rounded-xl bg-background/60 backdrop-blur-sm border border-muted hover:border-blue-500/40 transition-all duration-300 shadow-md hover:shadow-blue-500/30"
                aria-label="Settings"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Settings className="h-4 w-4 text-blue-500" />
              </Button>
            </motion.div>

            {/* Wallet Connection */}
            <motion.div variants={itemVariants}>
              {isMounted ? (
                isConnected ? (
                  <div className="relative">
                    <Button
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsProfileOpen(!isProfileOpen);
                      }}
                      className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-cyan-500/30 backdrop-blur-sm border border-blue-500/40 hover:from-blue-500/40 hover:via-purple-500/40 hover:to-cyan-500/40 transition-all duration-300 shadow-lg shadow-blue-500/30"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="font-medium text-cyan-500">{formatWalletAddress(user?.name || null)}</span>
                      <motion.div
                        animate={{ rotate: isProfileOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="h-4 w-4 text-cyan-500" />
                      </motion.div>
                    </Button>

                    <AnimatePresence>
                      {isProfileOpen && (
                        <motion.div
                          id="profile-dropdown"
                          className="absolute right-0 top-full mt-2 w-56 rounded-2xl border bg-popover/90 backdrop-blur-xl p-2 shadow-2xl z-50 border-blue-500/30"
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                          <div className="px-3 py-2 text-xs text-muted-foreground border-b border-border/50">
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
                      )}
                    </AnimatePresence>
                  </div>
                ) : keychainInstalled ? (
                  <Button
                    className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-cyan-500 hover:to-blue-500 text-primary-foreground backdrop-blur-sm border-2 border-blue-500/60 transition-all duration-300 shadow-xl shadow-blue-500/40 hover:shadow-2xl hover:shadow-cyan-500/50"
                    onClick={handleConnect}
                    disabled={isConnecting}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Wallet className="h-4 w-4" />
                    <span className="font-medium">{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
                  </Button>
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
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.div variants={itemVariants}>
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden h-10 w-10 p-0 rounded-xl bg-background/60 backdrop-blur-sm border border-muted hover:border-blue-500/40 transition-all duration-300 shadow-md hover:shadow-blue-500/30"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 text-blue-500" />
              ) : (
                <Menu className="h-5 w-5 text-blue-500" />
              )}
            </Button>
          </motion.div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden border-t py-4 backdrop-blur-2xl bg-background/80 rounded-b-2xl border-border/50 mt-2 shadow-2xl"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <nav className="flex flex-col space-y-2">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 relative overflow-hidden group flex items-center justify-between",
                        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-500/40 before:via-purple-500/40 before:to-cyan-500/40 before:opacity-0 before:transition-opacity before:duration-300 before:rounded-xl",
                        "hover:before:opacity-100 hover:text-cyan-500 hover:scale-105",
                        pathname === item.href
                          ? "bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-cyan-500/50 text-cyan-500 font-bold backdrop-blur-sm border border-blue-500/60 shadow-lg shadow-blue-500/30"
                          : "text-muted-foreground hover:text-blue-500",
                        "transition-all duration-300"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="flex items-center space-x-2">
                        {item.icon}
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <Badge 
                          variant="secondary" 
                          className="bg-gradient-to-r from-purple-500/40 to-pink-500/40 text-purple-500 border-purple-500/50"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Mobile Actions */}
              <div className="mt-4 pt-4 border-t border-border/50">
                <div className="flex items-center justify-between">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleTheme}
                    className="flex items-center space-x-2 rounded-xl bg-background/60 backdrop-blur-sm border-2 border-blue-500/40 hover:border-cyan-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30"
                  >
                    {theme === 'dark' ? (
                      <>
                        <Sun className="h-5 w-5 text-yellow-500" />
                        <span className="text-yellow-500 font-medium hidden sm:inline">Light Mode</span>
                      </>
                    ) : (
                      <>
                        <Moon className="h-5 w-5 text-indigo-500" />
                        <span className="text-indigo-500 font-medium hidden sm:inline">Dark Mode</span>
                      </>
                    )}
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center space-x-2 rounded-xl bg-background/60 backdrop-blur-sm border-2 border-blue-500/40 hover:border-cyan-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30"
                  >
                    <Settings className="h-5 w-5 text-blue-500" />
                    <span className="text-blue-500 font-medium hidden sm:inline">Settings</span>
                  </Button>
                </div>

                <div className="mt-4">
                  <div className="space-y-3">
                    {isConnected ? (
                      <>
                        <div className="flex items-center space-x-3 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500/30 to-purple-500/30 backdrop-blur-sm border-2 border-blue-500/40 shadow-lg shadow-blue-500/30">
                          <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium truncate text-cyan-500 font-medium">Connected</div>
                            <div className="text-xs text-blue-500/80 truncate font-medium">@{formatWalletAddress(user?.name || null)}</div>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          className="w-full rounded-xl bg-gradient-to-r from-blue-500/30 to-purple-500/30 backdrop-blur-sm border-2 border-blue-500/40 hover:border-cyan-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30"
                          onClick={handleDisconnect}
                        >
                          <LogOut className="h-4 w-4 mr-2 text-blue-500" />
                          <span className="text-blue-500 font-medium">Disconnect</span>
                        </Button>
                      </>
                    ) : keychainInstalled ? (
                      <Button
                        className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-cyan-500 hover:to-blue-500 text-primary-foreground backdrop-blur-sm border-2 border-blue-500/60 transition-all duration-300 shadow-xl shadow-blue-500/40 hover:shadow-2xl hover:shadow-cyan-500/50"
                        onClick={handleConnect}
                        disabled={isConnecting}
                      >
                        <Wallet className="h-4 w-4 mr-2" />
                        <span className="font-medium">{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
                      </Button>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex items-center justify-center space-x-2 p-3 bg-yellow-50 dark:bg-yellow-950/50 rounded-xl text-yellow-700 dark:text-yellow-300 backdrop-blur-sm border border-yellow-200 dark:border-yellow-800/50">
                          <AlertCircle className="h-4 w-4 flex-shrink-0" />
                          <span className="text-sm">Install HiveKeychain extension</span>
                        </div>
                        <Button asChild variant="outline" size="sm" className="w-full rounded-xl bg-background/60 backdrop-blur-sm border border-muted hover:border-primary/40 transition-all duration-300">
                          <Link href="/wallet-setup">
                            View Setup Guide
                          </Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
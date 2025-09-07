"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Activity,
  Zap,
  Users,
  Wallet
} from 'lucide-react';
import { cn } from '@/utils';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/Tooltip';

interface SidebarItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  description?: string;
}

const mainNavigation: SidebarItem[] = [
  {
    href: '/',
    label: 'Home',
    icon: Home,
    description: 'Overview and dashboard'
  },
  {
    href: '/social',
    label: 'Community',
    icon: Users,
    description: 'Connect with the community'
  },
  {
    href: '/wallet-setup',
    label: 'Wallet',
    icon: Wallet,
    description: 'Manage your Hive wallet'
  },
];

const secondaryNavigation: SidebarItem[] = [
  {
    href: '/analytics',
    label: 'Analytics',
    icon: Activity,
    description: 'Advanced trading analytics',
    badge: 'Pro'
  },
  {
    href: '/staking',
    label: 'Staking',
    icon: Zap,
    description: 'Stake your tokens',
    badge: 'New'
  },
  {
    href: '/governance',
    label: 'Governance',
    icon: Users,
    description: 'Participate in governance'
  },
];

const bottomNavigation: SidebarItem[] = [
  {
    href: '/settings',
    label: 'Settings',
    icon: Settings,
    description: 'App preferences'
  },
  {
    href: '/help',
    label: 'Help',
    icon: HelpCircle,
    description: 'Support and documentation'
  },
];

interface SidebarProps {
  collapsed?: boolean;
}

export function Sidebar({ collapsed: controlledCollapsed }: SidebarProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const pathname = usePathname();

  // Use controlled collapsed state if provided, otherwise use internal state
  const collapsed = controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed;

  const toggleCollapsed = () => {
    if (controlledCollapsed === undefined) {
      setInternalCollapsed(!internalCollapsed);
    }
  };

  const NavItem = ({ item, isActive }: { item: SidebarItem; isActive: boolean }) => {
    const content = (
      <Link
        href={item.href}
        className={cn(
          "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative overflow-hidden",
          "before:absolute before:inset-0 before:bg-futuristic-blue/10 before:opacity-0 before:transition-opacity before:duration-300",
          "hover:before:opacity-100 hover:text-futuristic-blue",
          isActive
            ? "bg-futuristic-blue/15 text-futuristic-blue font-semibold backdrop-blur-sm border border-futuristic-blue/20"
            : "text-muted-foreground",
          collapsed && "justify-center px-2",
          "animate-fade-in-up hover-scale"
        )}
      >
        <item.icon className={cn("h-5 w-5", collapsed && "h-6 w-6")} />
        {!collapsed && (
          <>
            <span className="flex-1 relative z-10">{item.label}</span>
            {item.badge && (
              <Badge variant={isActive ? "secondary" : "outline"} className="text-xs relative z-10 bg-futuristic-purple/20 text-futuristic-purple border-futuristic-purple/30 animate-scale-in">
                {item.badge}
              </Badge>
            )}
          </>
        )}
      </Link>
    );

    if (collapsed && item.description) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            {content}
          </TooltipTrigger>
          <TooltipContent side="right" className="font-medium">
            <div>
              <div className="font-semibold">{item.label}</div>
              <div className="text-xs text-muted-foreground mt-1">{item.description}</div>
            </div>
          </TooltipContent>
        </Tooltip>
      );
    }

    return content;
  };

  return (
    <TooltipProvider>
      <aside
        className={cn(
          "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-background/80 backdrop-blur-xl border-r transition-all duration-300 z-40 animate-slide-in-left",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Toggle Button */}
          <div className="flex justify-end p-2 border-b backdrop-blur-sm bg-background/50 animate-fade-in-up">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleCollapsed}
              className="h-8 w-8 p-0 rounded-lg bg-background/50 backdrop-blur-sm border border-muted hover:border-futuristic-blue/30 transition-all duration-300 svg-neon hover-scale animate-fade-in-up delay-100"
            >
              {collapsed ? (
                <ChevronRight className="h-4 w-4 text-futuristic-blue" />
              ) : (
                <ChevronLeft className="h-4 w-4 text-futuristic-blue" />
              )}
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-6">
              {/* Main Navigation */}
              <nav className="space-y-1">
                {!collapsed && (
                  <h3 className="px-3 text-xs font-extrabold text-muted-foreground uppercase tracking-widest mb-2 animate-fade-in-up">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-futuristic-blue to-futuristic-purple">
                      Navigation
                    </span>
                  </h3>
                )}
                {mainNavigation.map((item) => (
                  <NavItem
                    key={item.href}
                    item={item}
                    isActive={pathname === item.href}
                  />
                ))}
              </nav>

              {/* Secondary Navigation */}
              <nav className="space-y-1">
                {!collapsed && (
                  <h3 className="px-3 text-xs font-extrabold text-muted-foreground uppercase tracking-widest mb-2 animate-fade-in-up delay-100">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-futuristic-purple to-futuristic-pink">
                      Advanced
                    </span>
                  </h3>
                )}
                {secondaryNavigation.map((item) => (
                  <NavItem
                    key={item.href}
                    item={item}
                    isActive={pathname === item.href}
                  />
                ))}
              </nav>

              {/* Quick Stats */}
              {!collapsed && (
                <div className="px-3 py-4 bg-muted/50 rounded-lg backdrop-blur-sm border border-muted svg-neon animate-fade-in-up delay-200">
                  <h4 className="text-sm font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-futuristic-blue to-futuristic-purple animate-float tracking-tight">
                    Community Stats
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between animate-fade-in-up delay-300">
                      <span className="text-muted-foreground">Posts Today</span>
                      <span className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-futuristic-blue to-futuristic-purple">1.2K</span>
                    </div>
                    <div className="flex justify-between animate-fade-in-up delay-400">
                      <span className="text-muted-foreground">Active Users</span>
                      <span className="font-medium text-futuristic-green bg-clip-text text-transparent bg-gradient-to-r from-futuristic-green to-futuristic-teal">856</span>
                    </div>
                    <div className="flex justify-between animate-fade-in-up delay-500">
                      <span className="text-muted-foreground">Total Rewards</span>
                      <span className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-futuristic-cyan to-futuristic-indigo">$2,847</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="border-t p-4 backdrop-blur-sm bg-background/50 animate-fade-in-up delay-300">
            <nav className="space-y-1">
              {bottomNavigation.map((item) => (
                <NavItem
                  key={item.href}
                  item={item}
                  isActive={pathname === item.href}
                />
              ))}
            </nav>

            {/* User Profile */}
            {!collapsed && (
              <div className="mt-4 pt-4 border-t backdrop-blur-sm bg-background/50 rounded-lg svg-neon animate-fade-in-up delay-400">
                <div className="flex items-center space-x-3 px-3 py-2 hover-scale">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-futuristic-blue/20 to-futuristic-purple/10 backdrop-blur-sm border border-futuristic-blue/20 flex items-center justify-center hover-scale animate-fade-in-up delay-500">
                    <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-futuristic-blue to-futuristic-purple flex items-center justify-center">
                      <span className="text-primary-foreground text-sm font-medium">U</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 animate-fade-in-up delay-600">
                    <div className="text-sm font-extrabold truncate bg-clip-text text-transparent bg-gradient-to-r from-futuristic-blue to-futuristic-purple tracking-tight">Guest User</div>
                    <div className="text-xs text-muted-foreground">Connect wallet</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </TooltipProvider>
  );
}
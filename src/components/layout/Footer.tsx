import Link from 'next/link';
import {
  Github,
  Twitter,
  Globe,
  MessageCircle,
  Heart,
  ExternalLink,
  Zap,
  Shield,
  Users,
  TrendingUp
} from 'lucide-react';

const footerLinks = {
  product: [
    { label: 'Social Feed', href: '/social' },
    { label: 'Community', href: '/social' },
    { label: 'Wallet Setup', href: '/wallet-setup' },
    { label: 'Getting Started', href: '/docs' },
  ],
  resources: [
    { label: 'Help Center', href: '/help' },
    { label: 'Community', href: '/community' },
    { label: 'Blog', href: '/blog' },
    { label: 'Status', href: '/status' },
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
    { label: 'Contact', href: '/contact' },
  ],
  developers: [
    { label: 'Documentation', href: '/docs' },
    { label: 'Hive API', href: 'https://hive.blog/hive-139531/@hiveio/hive-api-documentation' },
    { label: 'Keychain', href: 'https://hive-keychain.com' },
    { label: 'GitHub', href: 'https://github.com/hive-social', external: true },
  ],
};

const socialLinks = [
  {
    label: 'Twitter',
    href: 'https://twitter.com/hiveblockchain',
    icon: Twitter,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/hive-social',
    icon: Github,
  },
  {
    label: 'Discord',
    href: 'https://discord.gg/hive',
    icon: MessageCircle,
  },
  {
    label: 'Website',
    href: 'https://hive.io',
    icon: Globe,
  },
];

export function Footer() {
  return (
    <footer className="border-t bg-background/80 backdrop-blur-xl animate-fade-in-up">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:grid-cols-6">
          {/* Brand Section */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2 animate-fade-in-up">
            <div className="flex items-center space-x-3 mb-4 hover-scale futuristic-button">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-futuristic-blue/20 to-futuristic-purple/10 backdrop-blur-sm border border-futuristic-blue/20 flex items-center justify-center svg-neon hover-scale animate-fade-in-up delay-100 glow-border">
                <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-futuristic-blue to-futuristic-purple flex items-center justify-center relative">
                  <span className="text-primary-foreground font-bold text-xs z-10">H</span>
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-futuristic-blue to-futuristic-purple animate-pulse opacity-30"></div>
                </div>
              </div>
              <span className="font-futuristic-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-futuristic-blue to-futuristic-purple animate-fade-in-up delay-200 tracking-tight text-gradient">
                Hive<span className="text-futuristic-purple">Social</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm mb-4 max-w-sm leading-relaxed animate-fade-in-up delay-300">
              Connect with the Hive community, share your thoughts, and earn rewards
              for your content on the decentralized social network.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4 animate-fade-in-up delay-400">
              {socialLinks.map((link, index) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-futuristic-blue transition-all duration-300 p-2 rounded-lg hover:bg-futuristic-blue/10 backdrop-blur-sm svg-neon hover-scale animate-fade-in-up futuristic-button"
                  style={{ animationDelay: `${index * 100 + 500}ms` }}
                >
                  <link.icon className="h-5 w-5 text-futuristic-blue hover-glow-blue" />
                  <span className="sr-only">{link.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div className="animate-fade-in-up delay-500">
            <h3 className="font-futuristic-bold text-sm mb-4 bg-clip-text text-transparent bg-gradient-to-r from-futuristic-blue to-futuristic-purple animate-fade-in-up delay-600 tracking-tight text-gradient">
              Product
            </h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link, index) => (
                <li key={link.href} className="animate-fade-in-up hover-scale futuristic-button" style={{ animationDelay: `${index * 100 + 70}ms` }}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-futuristic-blue text-sm transition-colors relative group"
                  >
                    <span className="relative z-10">{link.label}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-futuristic-blue transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div className="animate-fade-in-up delay-800">
            <h3 className="font-futuristic-bold text-sm mb-4 bg-clip-text text-transparent bg-gradient-to-r from-futuristic-purple to-futuristic-pink animate-fade-in-up delay-900 tracking-tight text-gradient">
              Resources
            </h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link, index) => (
                <li key={link.href} className="animate-fade-in-up hover-scale futuristic-button" style={{ animationDelay: `${index * 100 + 1000}ms` }}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-futuristic-purple text-sm transition-colors relative group"
                  >
                    <span className="relative z-10">{link.label}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-futuristic-purple transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="animate-fade-in-up delay-1100">
            <h3 className="font-futuristic-bold text-sm mb-4 bg-clip-text text-transparent bg-gradient-to-r from-futuristic-cyan to-futuristic-teal animate-fade-in-up delay-1200 tracking-tight text-gradient">
              Company
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={link.href} className="animate-fade-in-up hover-scale futuristic-button" style={{ animationDelay: `${index * 100 + 1300}ms` }}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-futuristic-cyan text-sm transition-colors relative group"
                  >
                    <span className="relative z-10">{link.label}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-futuristic-cyan transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Developers Links */}
          <div className="animate-fade-in-up delay-1400">
            <h3 className="font-futuristic-bold text-sm mb-4 bg-clip-text text-transparent bg-gradient-to-r from-futuristic-indigo to-futuristic-blue animate-fade-in-up delay-1500 tracking-tight text-gradient">
              Developers
            </h3>
            <ul className="space-y-2">
              {footerLinks.developers.map((link, index) => (
                <li key={link.href} className="animate-fade-in-up hover-scale futuristic-button" style={{ animationDelay: `${index * 100 + 1600}ms` }}>
                  <Link
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="text-muted-foreground hover:text-futuristic-indigo text-sm transition-colors flex items-center relative group"
                  >
                    <span className="relative z-10">{link.label}</span>
                    {link.external && (
                      <ExternalLink className="h-3 w-3 ml-1 text-futuristic-indigo" />
                    )}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-futuristic-indigo transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-12 pt-8 border-t backdrop-blur-sm bg-background/50 rounded-xl p-6 svg-neon animate-fade-in-up delay-1700 futuristic-card">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 xs:grid-cols-2">
            <div className="text-center p-4 rounded-lg bg-futuristic-blue/5 backdrop-blur-sm border border-futuristic-blue/10 transition-all duration-300 hover:bg-futuristic-blue/10 hover-scale animate-fade-in-up delay-1800 futuristic-card interactive-card">
              <div className="flex justify-center mb-2">
                <TrendingUp className="h-6 w-6 text-futuristic-blue" />
              </div>
              <div className="text-2xl font-bold text-futuristic-blue bg-clip-text text-transparent bg-gradient-to-r from-futuristic-blue to-futuristic-purple">$2.5M+</div>
              <div className="text-sm text-muted-foreground mt-1">Volume Traded</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-futuristic-purple/5 backdrop-blur-sm border border-futuristic-purple/10 transition-all duration-300 hover:bg-futuristic-purple/10 hover-scale animate-fade-in-up delay-1900 futuristic-card interactive-card">
              <div className="flex justify-center mb-2">
                <Shield className="h-6 w-6 text-futuristic-purple" />
              </div>
              <div className="text-2xl font-bold text-futuristic-purple bg-clip-text text-transparent bg-gradient-to-r from-futuristic-purple to-futuristic-pink">15K+</div>
              <div className="text-sm text-muted-foreground mt-1">Transactions</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-futuristic-cyan/5 backdrop-blur-sm border border-futuristic-cyan/10 transition-all duration-300 hover:bg-futuristic-cyan/10 hover-scale animate-fade-in-up delay-2000 futuristic-card interactive-card">
              <div className="flex justify-center mb-2">
                <Users className="h-6 w-6 text-futuristic-cyan" />
              </div>
              <div className="text-2xl font-bold text-futuristic-cyan bg-clip-text text-transparent bg-gradient-to-r from-futuristic-cyan to-futuristic-teal">150+</div>
              <div className="text-sm text-muted-foreground mt-1">Tokens</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-futuristic-green/5 backdrop-blur-sm border border-futuristic-green/10 transition-all duration-300 hover:bg-futuristic-green/10 hover-scale animate-fade-in-up delay-2100 futuristic-card interactive-card">
              <div className="flex justify-center mb-2">
                <Zap className="h-6 w-6 text-futuristic-green" />
              </div>
              <div className="text-2xl font-bold text-futuristic-green bg-clip-text text-transparent bg-gradient-to-r from-futuristic-green to-futuristic-teal">99.9%</div>
              <div className="text-sm text-muted-foreground mt-1">Uptime</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t flex flex-col sm:flex-row justify-between items-center backdrop-blur-sm bg-background/50 rounded-xl p-4 svg-neon animate-fade-in-up delay-2200 futuristic-card">
          <div className="text-sm text-muted-foreground mb-4 sm:mb-0 bg-clip-text text-transparent bg-gradient-to-r from-futuristic-blue to-futuristic-purple animate-fade-in-up delay-2300 text-gradient">
            © 2024 Hive Social. All rights reserved.
          </div>

          <div className="flex items-center space-x-4 text-sm text-muted-foreground bg-clip-text text-transparent bg-gradient-to-r from-futuristic-pink to-futuristic-blue animate-fade-in-up delay-2400 text-gradient">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-futuristic-pink fill-current animate-pulse hover-scale" />
            <span>for the Hive community</span>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-4 text-xs text-muted-foreground text-center backdrop-blur-sm bg-background/50 rounded-lg p-3 svg-neon animate-fade-in-up delay-2500 futuristic-card">
          <p className="bg-clip-text text-transparent bg-gradient-to-r from-futuristic-blue to-futuristic-purple animate-fade-in-up delay-2600 text-gradient">
            This is a decentralized social media platform. Your content is stored on the blockchain.
            Always follow community guidelines and create quality content.
          </p>
        </div>
      </div>
    </footer>
  );
}
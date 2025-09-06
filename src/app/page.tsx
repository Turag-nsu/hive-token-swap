"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ArrowRight, Users, MessageSquare, Heart, TrendingUp, Edit3, Globe, Zap, Shield, Rocket, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ParticleBackground from '@/components/ui/ParticleBackground';
import { HeroSection } from '@/components/homepage/hero/HeroSection';

export default function HomePage() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    setIsMounted(true);

    // Rotate featured items
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 6);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Globe,
      title: "Decentralized",
      description: "Your content lives on the blockchain, ensuring true ownership and censorship resistance",
      color: "futuristic-blue"
    },
    {
      icon: Heart,
      title: "Earn Rewards",
      description: "Get rewarded in HIVE and HBD tokens for creating quality content and engaging with others",
      color: "futuristic-purple"
    },
    {
      icon: Users,
      title: "Global Community",
      description: "Connect with millions of users worldwide who share your interests and passions",
      color: "futuristic-cyan"
    },
    {
      icon: Edit3,
      title: "Rich Content",
      description: "Create posts with markdown, images, and multimedia content",
      color: "futuristic-pink"
    },
    {
      icon: MessageSquare,
      title: "Engage & Discuss",
      description: "Comment, vote, and share content to build meaningful connections",
      color: "futuristic-teal"
    },
    {
      icon: TrendingUp,
      title: "Trending Topics",
      description: "Discover what's popular and join conversations that matter to you",
      color: "futuristic-indigo"
    }
  ];

  const steps = [
    {
      number: "1",
      title: "Connect Wallet",
      description: "Login with Hive Keychain or HiveSigner to access your account",
      color: "futuristic-blue"
    },
    {
      number: "2",
      title: "Create Content",
      description: "Write posts, share images, and express your thoughts with the community",
      color: "futuristic-purple"
    },
    {
      number: "3",
      title: "Earn Rewards",
      description: "Get upvotes and earn HIVE tokens for quality content and engagement",
      color: "futuristic-cyan"
    }
  ];

  const heroActions = [
    {
      label: "Join the Community",
      href: "/social",
      variant: "default" as const
    },
    {
      label: "Explore Posts",
      href: "/social",
      variant: "outline" as const
    }
  ];

  return (
    <div className="min-h-screen">
      <ParticleBackground />

      {/* Hero Section */}
      <HeroSection
        title="Share Your Voice"
        subtitle="On The Hive Blockchain"
        description="Connect with a global community, share your thoughts, and earn rewards for your content on the decentralized Hive social network."
        actions={heroActions}
      />

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-futuristic-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-futuristic-blue to-futuristic-purple text-gradient">Why Choose Hive Social?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Built for creators who value freedom, rewards, and true ownership of their content
              </p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                viewport={{ once: true }}
              >
                <div
                  className={`relative p-6 rounded-2xl backdrop-blur-xl bg-white/90 border border-muted transition-all duration-500 transform-gpu hover-scale futuristic-card interactive-card group ${activeFeature === index ? 'ring-2 ring-' + feature.color + '/50 shadow-xl shadow-' + feature.color + '/30' : 'shadow-lg shadow-' + feature.color + '/10'}`}
                  onMouseEnter={() => setActiveFeature(index)}
                >
                  {/* Glowing border effect */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-${feature.color}/30 to-${feature.color === 'futuristic-blue' ? 'futuristic-purple' : feature.color === 'futuristic-purple' ? 'futuristic-pink' : feature.color === 'futuristic-cyan' ? 'futuristic-teal' : feature.color === 'futuristic-pink' ? 'futuristic-blue' : feature.color === 'futuristic-teal' ? 'futuristic-indigo' : 'futuristic-blue'}/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}></div>

                  {/* Icon container with enhanced glow */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-${feature.color}/20 to-${feature.color === 'futuristic-blue' ? 'futuristic-purple' : feature.color === 'futuristic-purple' ? 'futuristic-pink' : feature.color === 'futuristic-cyan' ? 'futuristic-teal' : feature.color === 'futuristic-pink' ? 'futuristic-blue' : feature.color === 'futuristic-teal' ? 'futuristic-indigo' : 'futuristic-blue'}/20 rounded-xl mb-6 backdrop-blur-sm border-${feature.color}/30 svg-neon hover-scale relative overflow-hidden shadow-lg shadow-${feature.color}/20`}>
                    <div className={`absolute inset-0 bg-gradient-to-r from-${feature.color}/30 to-${feature.color === 'futuristic-blue' ? 'futuristic-purple' : feature.color === 'futuristic-purple' ? 'futuristic-pink' : feature.color === 'futuristic-cyan' ? 'futuristic-teal' : feature.color === 'futuristic-pink' ? 'futuristic-blue' : feature.color === 'futuristic-teal' ? 'futuristic-indigo' : 'futuristic-blue'}/30 animate-pulse`}></div>
                    <feature.icon className={`h-8 w-8 text-${feature.color} relative z-10 drop-shadow-lg`} />
                  </div>

                  {/* Title with enhanced gradient */}
                  <h3 className={`font-futuristic-bold mb-3 text-xl bg-clip-text text-transparent bg-gradient-to-r from-${feature.color} to-${feature.color === 'futuristic-blue' ? 'futuristic-purple' : feature.color === 'futuristic-purple' ? 'futuristic-pink' : feature.color === 'futuristic-cyan' ? 'futuristic-teal' : feature.color === 'futuristic-pink' ? 'futuristic-blue' : feature.color === 'futuristic-teal' ? 'futuristic-indigo' : 'futuristic-blue'} text-gradient drop-shadow-sm`}>
                    {feature.title}
                  </h3>

                  {/* Description with better typography */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Hover effect indicator */}
                  <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-${feature.color} to-${feature.color === 'futuristic-blue' ? 'futuristic-purple' : feature.color === 'futuristic-purple' ? 'futuristic-pink' : feature.color === 'futuristic-cyan' ? 'futuristic-teal' : feature.color === 'futuristic-pink' ? 'futuristic-blue' : feature.color === 'futuristic-teal' ? 'futuristic-indigo' : 'futuristic-blue'} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-futuristic-blue/10 to-futuristic-purple/10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Users, value: "500K+", label: "Active Users", color: "futuristic-blue", gradient: "from-futuristic-blue to-futuristic-purple" },
                { icon: MessageSquare, value: "2M+", label: "Posts Created", color: "futuristic-purple", gradient: "from-futuristic-purple to-futuristic-pink" },
                { icon: Heart, value: "10M+", label: "Upvotes Given", color: "futuristic-cyan", gradient: "from-futuristic-cyan to-futuristic-teal" },
                { icon: Zap, value: "$5M+", label: "Rewards Distributed", color: "futuristic-green", gradient: "from-futuristic-green to-futuristic-teal" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  viewport={{ once: true }}
                  className="text-center p-6 rounded-2xl backdrop-blur-xl bg-white/90 border border-muted hover:border-futuristic-blue/50 transition-all duration-500 hover:-translate-y-2 transform-gpu hover-scale futuristic-card interactive-card group relative overflow-hidden shadow-lg shadow-futuristic-blue/10"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r from-${stat.color}/20 to-${stat.color === 'futuristic-blue' ? 'futuristic-purple' : stat.color === 'futuristic-purple' ? 'futuristic-pink' : stat.color === 'futuristic-cyan' ? 'futuristic-teal' : stat.color === 'futuristic-pink' ? 'futuristic-blue' : stat.color === 'futuristic-teal' ? 'futuristic-indigo' : 'futuristic-teal'}/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}></div>
                  <div className="flex justify-center mb-4 relative">
                    <div className={`absolute inset-0 bg-${stat.color}/20 rounded-full blur-xl animate-pulse`}></div>
                    <stat.icon className={`h-10 w-10 text-${stat.color} relative z-10 drop-shadow-lg`} />
                  </div>
                  <div className={`text-4xl font-futuristic-bold text-${stat.color} bg-clip-text text-transparent bg-gradient-to-r ${stat.gradient} mb-2 drop-shadow-sm`}>{stat.value}</div>
                  <div className="text-sm text-muted-foreground mt-2 font-medium">{stat.label}</div>
                  <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${stat.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Getting Started Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-futuristic-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-futuristic-blue to-futuristic-purple text-gradient">Get Started in Minutes</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Join the Hive community and start earning rewards for your content
                </p>
              </div>
            </motion.div>

            <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  viewport={{ once: true }}
                >
                  <div className="text-center space-y-4 p-6 rounded-2xl backdrop-blur-xl bg-white/90 border border-muted hover:border-futuristic-blue/50 transition-all duration-500 transform-gpu hover-scale futuristic-card interactive-card group relative overflow-hidden shadow-lg shadow-futuristic-blue/10">
                    {/* Glowing background effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r from-${step.color}/20 to-${step.color === 'futuristic-blue' ? 'futuristic-purple' : step.color === 'futuristic-purple' ? 'futuristic-pink' : step.color === 'futuristic-cyan' ? 'futuristic-teal' : step.color === 'futuristic-pink' ? 'futuristic-blue' : step.color === 'futuristic-teal' ? 'futuristic-indigo' : 'futuristic-teal'}/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}></div>

                    {/* Step number with enhanced styling */}
                    <div className={`mx-auto w-20 h-20 bg-gradient-to-r from-${step.color}/20 to-${step.color === 'futuristic-blue' ? 'futuristic-purple' : step.color === 'futuristic-purple' ? 'futuristic-pink' : step.color === 'futuristic-cyan' ? 'futuristic-teal' : step.color === 'futuristic-pink' ? 'futuristic-blue' : step.color === 'futuristic-teal' ? 'futuristic-indigo' : 'futuristic-teal'}/20 rounded-full flex items-center justify-center backdrop-blur-sm border-${step.color}/30 svg-neon hover-scale relative overflow-hidden shadow-lg shadow-${step.color}/20`}>
                      <div className={`absolute inset-0 bg-gradient-to-r from-${step.color}/30 to-${step.color === 'futuristic-blue' ? 'futuristic-purple' : step.color === 'futuristic-purple' ? 'futuristic-pink' : step.color === 'futuristic-cyan' ? 'futuristic-teal' : step.color === 'futuristic-pink' ? 'futuristic-blue' : step.color === 'futuristic-teal' ? 'futuristic-indigo' : 'futuristic-teal'}/30 animate-pulse`}></div>
                      <span className={`text-3xl font-futuristic-bold text-${step.color} relative z-10 drop-shadow-lg`}>{step.number}</span>
                    </div>

                    {/* Title with enhanced gradient */}
                    <h3 className={`text-2xl font-futuristic-bold bg-clip-text text-transparent bg-gradient-to-r from-${step.color} to-${step.color === 'futuristic-blue' ? 'futuristic-purple' : step.color === 'futuristic-purple' ? 'futuristic-pink' : step.color === 'futuristic-cyan' ? 'futuristic-teal' : step.color === 'futuristic-pink' ? 'futuristic-blue' : step.color === 'futuristic-teal' ? 'futuristic-indigo' : 'futuristic-teal'} text-gradient drop-shadow-sm`}>
                      {step.title}
                    </h3>

                    {/* Description with better typography */}
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>

                    {/* Hover effect indicator */}
                    <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-${step.color} to-${step.color === 'futuristic-blue' ? 'futuristic-purple' : step.color === 'futuristic-purple' ? 'futuristic-pink' : step.color === 'futuristic-cyan' ? 'futuristic-teal' : step.color === 'futuristic-pink' ? 'futuristic-blue' : step.color === 'futuristic-teal' ? 'futuristic-indigo' : 'futuristic-teal'} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="text-center mt-12">
                <Button size="lg" asChild className="hover-scale futuristic-button group">
                  <Link href="/social" className="flex items-center justify-center hover-scale">
                    Start Creating Content
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 bg-gradient-to-r from-futuristic-blue/5 to-futuristic-purple/5 rounded-3xl my-8">
        <div className="max-w-3xl mx-auto text-center space-y-8 relative">
          {/* Background glow effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-futuristic-blue/10 to-futuristic-purple/10 blur-2xl -z-10"></div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className="text-3xl font-futuristic-bold bg-clip-text text-transparent bg-gradient-to-r from-futuristic-blue to-futuristic-purple text-gradient drop-shadow-sm">Ready to Join the Revolution?</h2>
              <p className="text-xl text-muted-foreground leading-relaxed mt-4">
                Be part of the future of social media where your content has real value
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div>
                <Button size="lg" asChild className="text-lg px-8 rounded-xl bg-gradient-to-r from-futuristic-blue to-futuristic-purple hover:from-futuristic-blue/90 hover:to-futuristic-purple/90 text-primary-foreground backdrop-blur-sm border border-futuristic-blue/30 transition-all duration-300 shadow-lg shadow-futuristic-blue/30 svg-neon mx-auto hover-scale futuristic-button group glow-border">
                  <Link href="/social" className="flex items-center hover-scale">
                    Get Started Now
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
              <div>
                <Button size="lg" variant="outline" asChild className="text-lg px-8 rounded-xl backdrop-blur-sm border-muted hover:border-futuristic-cyan/50 transition-all duration-300 hover-scale futuristic-button group shadow-lg shadow-futuristic-cyan/10 glow-border">
                  <Link href="/docs" className="flex items-center hover-scale">
                    <Rocket className="mr-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    View Documentation
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

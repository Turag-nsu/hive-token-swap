import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ArrowRight, Users, MessageSquare, Heart, TrendingUp, Edit3, Globe } from 'lucide-react';

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
            {/* Hero Section */}
            <section className="container mx-auto px-4 pt-20 pb-16">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                            Share Your Voice on
                            <span className="block text-primary">The Hive Blockchain</span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Connect with a global community, share your thoughts, and earn rewards
                            for your content on the decentralized Hive social network.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" asChild className="text-lg px-8">
                            <Link href="/social" className="flex items-center">
                                Join the Community
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild className="text-lg px-8">
                            <Link href="/social">
                                Explore Posts
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="container mx-auto px-4 py-16">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Why Choose Hive Social?</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Built for creators who value freedom, rewards, and true ownership of their content
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Card className="p-6 text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                                <Globe className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="font-semibold mb-2">Decentralized</h3>
                            <p className="text-sm text-muted-foreground">
                                Your content lives on the blockchain, ensuring true ownership and censorship resistance
                            </p>
                        </Card>

                        <Card className="p-6 text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                                <Heart className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="font-semibold mb-2">Earn Rewards</h3>
                            <p className="text-sm text-muted-foreground">
                                Get rewarded in HIVE and HBD tokens for creating quality content and engaging with others
                            </p>
                        </Card>

                        <Card className="p-6 text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                                <Users className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="font-semibold mb-2">Global Community</h3>
                            <p className="text-sm text-muted-foreground">
                                Connect with millions of users worldwide who share your interests and passions
                            </p>
                        </Card>

                        <Card className="p-6 text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                                <Edit3 className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="font-semibold mb-2">Rich Content</h3>
                            <p className="text-sm text-muted-foreground">
                                Create posts with markdown, images, and multimedia content
                            </p>
                        </Card>

                        <Card className="p-6 text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                                <MessageSquare className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="font-semibold mb-2">Engage & Discuss</h3>
                            <p className="text-sm text-muted-foreground">
                                Comment, vote, and share content to build meaningful connections
                            </p>
                        </Card>

                        <Card className="p-6 text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                                <TrendingUp className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="font-semibold mb-2">Trending Topics</h3>
                            <p className="text-sm text-muted-foreground">
                                Discover what's popular and join conversations that matter to you
                            </p>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Getting Started Section */}
            <section className="bg-muted/50 py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold mb-4">Get Started in Minutes</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Join the Hive community and start earning rewards for your content
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center space-y-4">
                                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                                    <span className="text-2xl font-bold text-primary">1</span>
                                </div>
                                <h3 className="text-xl font-semibold">Connect Wallet</h3>
                                <p className="text-muted-foreground">
                                    Login with Hive Keychain or HiveSigner to access your account
                                </p>
                            </div>

                            <div className="text-center space-y-4">
                                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                                    <span className="text-2xl font-bold text-primary">2</span>
                                </div>
                                <h3 className="text-xl font-semibold">Create Content</h3>
                                <p className="text-muted-foreground">
                                    Write posts, share images, and express your thoughts with the community
                                </p>
                            </div>

                            <div className="text-center space-y-4">
                                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                                    <span className="text-2xl font-bold text-primary">3</span>
                                </div>
                                <h3 className="text-xl font-semibold">Earn Rewards</h3>
                                <p className="text-muted-foreground">
                                    Get upvotes and earn HIVE tokens for quality content and engagement
                                </p>
                            </div>
                        </div>

                        <div className="text-center mt-12">
                            <Button size="lg" asChild>
                                <Link href="/social">Start Creating Content</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-4 py-16">
                <div className="max-w-3xl mx-auto text-center space-y-8">
                    <h2 className="text-3xl font-bold">Ready to Join the Revolution?</h2>
                    <p className="text-xl text-muted-foreground">
                        Be part of the future of social media where your content has real value
                    </p>
                    <Button size="lg" asChild className="text-lg px-8">
                        <Link href="/social" className="flex items-center">
                            Get Started Now
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}

import { Suspense } from 'react';
import { SocialFeed } from '@/components/social/SocialFeed';
import { CreatePost } from '@/components/social/CreatePost';
import { SocialSidebar } from '@/components/social/SocialSidebar';
import { TrendingTopics } from '@/components/social/TrendingTopics';

export default function SocialPage() {
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-6">
                <div className="grid gap-6 lg:grid-cols-12">
                    {/* Left Sidebar */}
                    <div className="lg:col-span-3">
                        <div className="sticky top-6 space-y-6">
                            <Suspense fallback={<div>Loading sidebar...</div>}>
                                <SocialSidebar />
                            </Suspense>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-6">
                        <div className="space-y-6">
                            {/* Create Post Section */}
                            <Suspense fallback={<div>Loading create post...</div>}>
                                <CreatePost />
                            </Suspense>

                            {/* Social Feed */}
                            <Suspense fallback={<div>Loading feed...</div>}>
                                <SocialFeed />
                            </Suspense>
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="lg:col-span-3">
                        <div className="sticky top-6 space-y-6">
                            <Suspense fallback={<div>Loading trending...</div>}>
                                <TrendingTopics />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export const metadata = {
    title: 'Hive Social - Share Your Thoughts',
    description: 'Connect with the Hive community, share your thoughts, and earn rewards for your content.',
};

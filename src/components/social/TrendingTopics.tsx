"use client";

import { useState } from 'react';
import { TrendingUp, Hash, Flame, Users, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useSocialStore } from '@/stores/social';

interface TrendingTopic {
    tag: string;
    count: number;
    growth: number;
}

interface TopAuthor {
    username: string;
    posts: number;
    reputation: number;
}

export function TrendingTopics() {
    const { setFilters } = useSocialStore();
    const [trendingTopics] = useState<TrendingTopic[]>([
        { tag: 'photography', count: 125, growth: 15 },
        { tag: 'crypto', count: 89, growth: 12 },
        { tag: 'travel', count: 76, growth: 8 },
        { tag: 'food', count: 62, growth: 23 },
        { tag: 'technology', count: 58, growth: 6 },
        { tag: 'art', count: 45, growth: 18 },
        { tag: 'gaming', count: 41, growth: 4 },
        { tag: 'music', count: 38, growth: 11 }
    ]);

    const [topAuthors] = useState<TopAuthor[]>([
        { username: 'travelfeed', posts: 23, reputation: 78 },
        { username: 'photography', posts: 19, reputation: 72 },
        { username: 'cryptowriter', posts: 17, reputation: 69 },
        { username: 'foodblogger', posts: 15, reputation: 65 },
        { username: 'techguru', posts: 14, reputation: 71 }
    ]);

    const handleTopicClick = (tag: string) => {
        setFilters({ tag, sortBy: 'trending' });
    };

    return (
        <div className="space-y-6">
            {/* Trending Topics */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                        <TrendingUp className="w-5 h-5 mr-2" />
                        Trending Topics
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {trendingTopics.slice(0, 8).map((topic, index) => (
                        <div
                            key={topic.tag}
                            className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                            onClick={() => handleTopicClick(topic.tag)}
                        >
                            <div className="flex items-center space-x-3">
                                <div className="flex items-center text-sm text-muted-foreground">
                                    {index + 1}
                                </div>
                                <div>
                                    <div className="flex items-center">
                                        <Hash className="w-3 h-3 mr-1" />
                                        <span className="font-medium">{topic.tag}</span>
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        {topic.count} posts
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Badge
                                    variant={topic.growth > 10 ? 'default' : 'secondary'}
                                    className="text-xs"
                                >
                                    <TrendingUp className="w-3 h-3 mr-1" />
                                    +{topic.growth}%
                                </Badge>
                            </div>
                        </div>
                    ))}

                    <Button
                        variant="ghost"
                        className="w-full text-sm"
                        onClick={() => setFilters({ 
                          tag: '',
                          sortBy: 'trending' 
                        })}
                    >
                        View All Trending
                    </Button>
                </CardContent>
            </Card>

            {/* Top Authors Today */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                        <Users className="w-5 h-5 mr-2" />
                        Active Authors
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {topAuthors.map((author, index) => (
                        <div
                            key={author.username}
                            className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                        >
                            <div className="flex items-center space-x-3">
                                <div className="flex items-center justify-center w-6 h-6 bg-primary/10 rounded-full text-xs font-semibold">
                                    {index + 1}
                                </div>
                                <div>
                                    <div className="font-medium">@{author.username}</div>
                                    <div className="text-xs text-muted-foreground">
                                        Rep {author.reputation}
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm font-medium">{author.posts}</div>
                                <div className="text-xs text-muted-foreground">posts</div>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                        <Flame className="w-5 h-5 mr-2" />
                        Quick Stats
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="p-3 rounded-lg bg-muted/50">
                            <div className="text-xl font-bold">1.2K</div>
                            <div className="text-xs text-muted-foreground">Posts Today</div>
                        </div>
                        <div className="p-3 rounded-lg bg-muted/50">
                            <div className="text-xl font-bold">856</div>
                            <div className="text-xs text-muted-foreground">Active Users</div>
                        </div>
                    </div>

                    <div className="text-center p-3 rounded-lg bg-primary/10">
                        <div className="text-lg font-bold text-primary">$2,847</div>
                        <div className="text-xs text-muted-foreground">Total Rewards Today</div>
                    </div>

                    <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>Updated 5 minutes ago</span>
                    </div>
                </CardContent>
            </Card>

            {/* Suggestions */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Suggestions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="space-y-2">
                        <Button
                            variant="ghost"
                            className="w-full justify-start text-sm h-auto p-3"
                            onClick={() => setFilters({ tag: 'introduceyourself', sortBy: 'created' })}
                        >
                            <div className="text-left">
                                <div className="font-medium">New to Hive?</div>
                                <div className="text-xs text-muted-foreground">
                                    Check out introduction posts
                                </div>
                            </div>
                        </Button>

                        <Button
                            variant="ghost"
                            className="w-full justify-start text-sm h-auto p-3"
                            onClick={() => setFilters({ tag: 'contest', sortBy: 'trending' })}
                        >
                            <div className="text-left">
                                <div className="font-medium">Join Contests</div>
                                <div className="text-xs text-muted-foreground">
                                    Participate and win prizes
                                </div>
                            </div>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
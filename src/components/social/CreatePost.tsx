"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Badge } from '@/components/ui/Badge';
import { useUser } from '@/hooks/useUser';
import { useSocialStore } from '@/stores/social';
import { hiveSocialAPI } from '@/lib/api/hive-social';
import { PenTool, Hash, X, Send, Image, Smile } from 'lucide-react';
import { toast } from 'sonner';

export function CreatePost() {
    const { isAuthenticated, username } = useUser();
    const { clearFeed } = useSocialStore();
    const [isExpanded, setIsExpanded] = useState(false);
    const [isPosting, setIsPosting] = useState(false);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [tags, setTags] = useState<string[]>(['hive-social']);
    const [currentTag, setCurrentTag] = useState('');

    const addTag = () => {
        if (currentTag.trim() && !tags.includes(currentTag.trim()) && tags.length < 10) {
            setTags([...tags, currentTag.trim().toLowerCase()]);
            setCurrentTag('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleSubmit = async () => {
        if (!isAuthenticated || !username) {
            toast.error('Please login to create a post');
            return;
        }

        if (!title.trim()) {
            toast.error('Please enter a title');
            return;
        }

        if (!body.trim()) {
            toast.error('Please enter some content');
            return;
        }

        if (tags.length === 0) {
            toast.error('Please add at least one tag');
            return;
        }

        setIsPosting(true);
        try {
            const permlink = hiveSocialAPI.generatePermlink(title);
            const metadata = {
                tags: tags,
                app: 'hive-social/1.0.0',
                format: 'markdown',
                description: body.substring(0, 160),
                timestamp: Date.now()
            };

            const postData = {
                parent_author: '',
                parent_permlink: tags[0], // First tag as category
                author: username,
                permlink: permlink,
                title: title.trim(),
                body: body.trim(),
                json_metadata: JSON.stringify(metadata)
            };

            await hiveSocialAPI.submitPost(postData);

            toast.success('Post created successfully!');

            // Reset form
            setTitle('');
            setBody('');
            setTags(['hive-social']);
            setIsExpanded(false);

            // Clear feed to refresh with new post
            clearFeed();

        } catch (error: any) {
            console.error('Error creating post:', error);
            toast.error(error.message || 'Failed to create post');
        } finally {
            setIsPosting(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            handleSubmit();
        }
    };

    if (!isAuthenticated) {
        return (
            <Card>
                <CardContent className="p-6 text-center">
                    <PenTool className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="font-semibold mb-2">Share Your Thoughts</h3>
                    <p className="text-muted-foreground mb-4">
                        Connect your Hive account to start posting and earning rewards
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Login from the sidebar to get started
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    <PenTool className="w-5 h-5 mr-2" />
                    Create New Post
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {!isExpanded ? (
                    <div
                        className="p-4 border border-dashed border-muted-foreground/25 rounded-lg cursor-pointer hover:border-primary/50 transition-colors"
                        onClick={() => setIsExpanded(true)}
                    >
                        <p className="text-muted-foreground text-center">
                            What's on your mind, {username}?
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {/* Title Input */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Title</label>
                            <Input
                                placeholder="Enter an engaging title..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                maxLength={255}
                                onKeyPress={handleKeyPress}
                            />
                            <div className="text-xs text-muted-foreground text-right">
                                {title.length}/255
                            </div>
                        </div>

                        {/* Content Input */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Content</label>
                            <Textarea
                                placeholder="Share your thoughts... (Markdown supported)"
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                className="min-h-[120px] resize-none"
                                onKeyPress={handleKeyPress}
                            />
                            <div className="text-xs text-muted-foreground text-right">
                                {body.length} characters
                            </div>
                        </div>

                        {/* Tags Input */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Tags</label>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {tags.map((tag) => (
                                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                                        <Hash className="w-3 h-3" />
                                        {tag}
                                        {tag !== 'hive-social' && (
                                            <X
                                                className="w-3 h-3 cursor-pointer hover:text-destructive"
                                                onClick={() => removeTag(tag)}
                                            />
                                        )}
                                    </Badge>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Add a tag..."
                                    value={currentTag}
                                    onChange={(e) => setCurrentTag(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            addTag();
                                        }
                                    }}
                                    maxLength={24}
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={addTag}
                                    disabled={!currentTag.trim() || tags.length >= 10}
                                >
                                    Add
                                </Button>
                            </div>
                            <div className="text-xs text-muted-foreground">
                                Max 10 tags. Use lowercase letters, numbers, and hyphens only.
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-between items-center pt-4 border-t">
                            <div className="flex gap-2">
                                <Button variant="ghost" size="sm" disabled>
                                    <Image className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm" disabled>
                                    <Smile className="w-4 h-4" />
                                </Button>
                            </div>

                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setIsExpanded(false);
                                        setTitle('');
                                        setBody('');
                                        setTags(['hive-social']);
                                    }}
                                    disabled={isPosting}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleSubmit}
                                    disabled={isPosting || !title.trim() || !body.trim()}
                                    className="min-w-[100px]"
                                >
                                    {isPosting ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                                            Posting...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4 mr-2" />
                                            Post
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>

                        <div className="text-xs text-muted-foreground">
                            💡 Tip: Use Ctrl+Enter to post quickly
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
"use client";

import { useState } from 'react';
import { PenTool, Hash, X, Send, Image, Smile, Sparkles, Wand2, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Badge } from '@/components/ui/Badge';
import { useUser } from '@/hooks/useUser';
import { useSocialStore } from '@/stores/social';
import { hiveSocialAPI } from '@/lib/api/hive-social';
import { refinePost } from '@/lib/gemini';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalTitle,
    ModalDescription,
    ModalFooter,
    useModal
} from '@/components/ui/Modal';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
export function CreatePost() {
    const { isAuthenticated, username } = useUser();
    const { clearFeed } = useSocialStore();
    const [isExpanded, setIsExpanded] = useState(false);
    const [isPosting, setIsPosting] = useState(false);
    const [isRefining, setIsRefining] = useState(false);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [tags, setTags] = useState<string[]>(['hive-social']);
    const [currentTag, setCurrentTag] = useState('');

    // Preview modal state
    const previewModal = useModal();

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
                parent_permlink: tags.length > 0 ? tags[0] : 'hive-social', // First tag as category, fallback to 'hive-social'
                author: username,
                permlink: permlink,
                title: title.trim(),
                body: body.trim(),
                json_metadata: JSON.stringify(metadata)
            };

            // Ensure parent_permlink is never undefined (type-safe)
            const safePostData = {
                ...postData,
                parent_permlink: postData.parent_permlink || 'hive-social'
            };

            await hiveSocialAPI.submitPost(safePostData);

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

    const handleRefinePost = async () => {
        if (!body.trim()) {
            toast.error('Please enter some content to refine');
            return;
        }

        // Get API key from environment or prompt user
        let apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

        if (!apiKey) {
            const promptedKey = prompt('Please enter your Gemini API key to refine your post with AI:');
            if (!promptedKey) {
                toast.error('Gemini API key is required for AI refinement');
                return;
            }
            apiKey = promptedKey;
        }

        setIsRefining(true);
        try {
            toast.info('Refining your post with AI... This may take a moment.');
            const refinedContent = await refinePost(body, apiKey);

            // Parse the refined content to extract title, body, and tags
            const lines = refinedContent.split('\n');
            let extractedTitle = '';
            let extractedTags: string[] = [];

            let isInBody = false;
            let bodyLines: string[] = [];

            for (let i = 0; i < lines.length; i++) {
                const line = lines[i]?.trim() || '';

                // Extract title from H1 heading
                if (line.startsWith('# ') && !extractedTitle) {
                    extractedTitle = line.substring(2).trim();
                    continue;
                }

                // Look for horizontal line (---) which separates content from tags
                if (line === '---') {
                    isInBody = false;
                    // Extract tags from remaining lines
                    for (let j = i + 1; j < lines.length; j++) {
                        const tagLine = lines[j]?.trim() || '';
                        if (tagLine.startsWith('#')) {
                            // Extract hashtags and clean them
                            const tagMatches = tagLine.match(/#(\w+)/g);
                            if (tagMatches) {
                                extractedTags = tagMatches.map(tag => tag.substring(1).toLowerCase());
                            }
                        }
                    }
                    break;
                }

                // Collect body content
                if (isInBody || (!line.startsWith('#') && line !== '')) {
                    isInBody = true;
                    const currentLine = lines[i];
                    if (currentLine !== undefined) {
                        bodyLines.push(currentLine);
                    }
                }
            }

            // Set the extracted title if not already set
            if (extractedTitle && !title.trim()) {
                setTitle(extractedTitle);
            }

            // Set the body content (without title and tags)
            const cleanBody = bodyLines.join('\n').trim();
            if (cleanBody) {
                setBody(cleanBody);
            }

            // Add extracted tags if any
            if (extractedTags.length > 0) {
                const newTags = [...tags];
                extractedTags.forEach(tag => {
                    if (!newTags.includes(tag) && newTags.length < 10) {
                        newTags.push(tag);
                    }
                });
                setTags(newTags);
            }

            toast.success('✨ Post refined with AI! Title, content, and tags have been organized.');
        } catch (error: any) {
            console.error('Error refining post:', error);
            toast.error(error.message || 'Failed to refine post with AI. Please check your API key.');
        } finally {
            setIsRefining(false);
        }
    }; if (!isAuthenticated) {
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
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleRefinePost}
                                    disabled={isRefining || !body.trim()}
                                    className="text-purple-600 hover:text-purple-700"
                                >
                                    {isRefining ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                                            Refining...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="w-4 h-4 mr-2" />
                                            Refine with AI
                                        </>
                                    )}
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={previewModal.openModal}
                                    disabled={!title.trim() && !body.trim()}
                                    className="text-blue-600 hover:text-blue-700"
                                >
                                    <Eye className="w-4 h-4 mr-2" />
                                    Preview
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

                {/* Post Preview Modal */}
                <Modal open={previewModal.open} onOpenChange={previewModal.setOpen}>
                    <ModalContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <ModalHeader>
                            <ModalTitle className="flex items-center">
                                <Eye className="w-5 h-5 mr-2" />
                                Post Preview
                            </ModalTitle>
                            <ModalDescription>
                                This is how your post will appear on the Hive blockchain
                            </ModalDescription>
                        </ModalHeader>

                        <div className="space-y-6 py-4">
                            {/* Preview Header */}
                            <div className="flex items-start justify-between border-b pb-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                        <PenTool className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-lg">@{username || 'your-username'}</div>
                                        <div className="text-sm text-muted-foreground">
                                            Just now • Draft
                                        </div>
                                    </div>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    0 HBD • 0 HP
                                </div>
                            </div>

                            {/* Preview Title */}
                            {title && (
                                <h1 className="text-2xl md:text-3xl font-bold leading-tight">
                                    {title}
                                </h1>
                            )}

                            {/* Preview Content */}
                            {body && (
                                <div className="prose prose-sm md:prose-base max-w-none dark:prose-invert">
                                    <ReactMarkdown
                                        children={body}
                                        remarkPlugins={[remarkGfm]}
                                    />
                                </div>
                            )}

                            {/* Preview Tags */}
                            {tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 pt-4 border-t">
                                    {tags.map((tag) => (
                                        <Badge key={tag} variant="secondary" className="text-xs">
                                            <Hash className="w-3 h-3 mr-1" />
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            )}

                            {/* Preview Actions */}
                            <div className="flex items-center justify-between pt-4 border-t">
                                <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                                    <span className="flex items-center">
                                        <span className="mr-1">👍</span>
                                        0 upvotes
                                    </span>
                                    <span className="flex items-center">
                                        <span className="mr-1">💬</span>
                                        0 replies
                                    </span>
                                    <span className="flex items-center">
                                        <span className="mr-1">🔗</span>
                                        Share
                                    </span>
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    Preview Mode
                                </div>
                            </div>
                        </div>

                        <ModalFooter>
                            <Button variant="outline" onClick={previewModal.closeModal}>
                                Close Preview
                            </Button>
                            <Button onClick={previewModal.closeModal}>
                                Continue Editing
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </CardContent>
        </Card>
    );
}
import React, { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalFooter, ModalClose } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { SocialFeedItem } from '@/types/social';
import { toast } from 'sonner';
import { useUser } from '@/hooks/useUser';
import { formatDistanceToNow } from 'date-fns';
import { RefreshCw } from 'lucide-react';
import { usePostComment, usePostDetail, socialFeedQueryKeys } from '@/hooks/useSocialFeed'; // Updated import
import { useQueryClient } from '@tanstack/react-query';

interface CommentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  post: SocialFeedItem;
  onCommentSuccess?: () => void;
}

export const CommentModal: React.FC<CommentModalProps> = ({ 
  open, 
  onOpenChange, 
  post,
  onCommentSuccess 
}) => {
  const { username } = useUser();
  const [comment, setComment] = useState('');
  const queryClient = useQueryClient();
  
  // Use our new React Query hook for posting comments
  const { mutate: postComment, isPending: isSubmitting } = usePostComment();
  
  // Use our new React Query hook for fetching post details with comments
  const { 
    data: postData, 
    isLoading: loadingComments, 
    isError: errorComments, 
    refetch: fetchComments 
  } = usePostDetail(post.author, post.permlink);
  
  const comments = postData?.replies || [];

  const formatBody = (body: string): string => {
    // Simple markdown-like formatting for display
    return body
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br />');
  };

  const extractImageFromBody = (body: string): string | null => {
    const imageRegex = /!\[.*?\]\((https?:\/\/[^\s)]+)\)/;
    const match = body.match(imageRegex);
    return match ? match[1] : null;
  };

  useEffect(() => {
    if (open && post) {
      fetchComments();
    }
  }, [open, post, fetchComments]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username) {
      toast.error('You must be logged in to comment');
      return;
    }
    
    if (!comment.trim()) {
      toast.error('Comment cannot be empty');
      return;
    }
    
    // Generate a unique permlink for the comment
    const permlink = `re-${post.permlink}-${Date.now()}`;
    
    // Prepare comment data
    const commentData = {
      parent_author: post.author,
      parent_permlink: post.permlink,
      author: username,
      permlink: permlink,
      title: '',
      body: comment,
      json_metadata: JSON.stringify({
        tags: ['comment'],
        app: 'hive-token-swap'
      })
    };
    
    // Submit the comment using React Query mutation
    postComment(commentData, {
      onSuccess: () => {
        toast.success('Comment posted successfully!');
        setComment('');
        // Refresh comments after posting
        fetchComments();
        onCommentSuccess?.();
      },
      onError: (error: any) => {
        console.error('Error posting comment:', error);
        toast.error(error.message || 'Failed to post comment');
      }
    });
  };

  const postImage = extractImageFromBody(post.body);

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent className="max-w-3xl max-h-[90vh] overflow-y-auto sm:max-w-full sm:m-4 sm:w-[calc(100%-2rem)]">
        <ModalHeader>
          <ModalTitle>Reply to @{post.author}&apos;s post</ModalTitle>
          <ModalDescription>
            Share your thoughts on this post
          </ModalDescription>
        </ModalHeader>
        
        <div className="space-y-6 py-4">
          {/* Original Post */}
          <div className="border rounded-lg p-4 bg-muted/50">
            <div className="flex items-center justify-between mb-3">
              <div className="font-semibold">@{post.author}</div>
              <div className="text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(post.created), { addSuffix: true })}
              </div>
            </div>
            
            {post.title && (
              <h3 className="font-bold text-lg mb-3">{post.title}</h3>
            )}
            
            {postImage && (
              <div className="rounded-lg overflow-hidden my-3">
                <img
                  src={postImage}
                  alt=""
                  className="w-full max-h-60 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            )}
            
            <div 
              className="text-muted-foreground leading-relaxed"
              dangerouslySetInnerHTML={{ __html: formatBody(post.body) }}
            />
            
            <div className="mt-3 pt-3 border-t flex items-center text-sm text-muted-foreground">
              <span className="mr-3">↑ {post.upvotes}</span>
              <span>↓ {post.downvotes}</span>
              {post.children && post.children > 0 && (
                <span className="ml-3">💬 {post.children}</span>
              )}
            </div>
          </div>
          
          {/* Existing Comments Section */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Comments ({comments.length})</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => fetchComments()}
                disabled={loadingComments}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loadingComments ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
            
            {loadingComments ? (
              <div className="text-center py-4">
                <div className="inline-block animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary"></div>
                <p className="mt-2 text-muted-foreground">Loading comments...</p>
              </div>
            ) : errorComments ? (
              <div className="text-center py-4 text-red-500">
                Failed to load comments
              </div>
            ) : comments.length === 0 ? (
              <div className="text-center py-4 text-muted-foreground">
                No comments yet. Be the first to comment!
              </div>
            ) : (
              <div className="space-y-4 max-h-60 overflow-y-auto">
                {comments.map((comment) => {
                  const commentImage = extractImageFromBody(comment.body);
                  return (
                    <div key={comment.id} className="border-b pb-4 last:border-b-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-semibold">@{comment.author}</div>
                        <div className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(comment.created), { addSuffix: true })}
                        </div>
                      </div>
                      
                      {commentImage && (
                        <div className="rounded-lg overflow-hidden my-2">
                          <img
                            src={commentImage}
                            alt=""
                            className="w-full max-h-40 object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                      
                      <div 
                        className="text-muted-foreground text-sm"
                        dangerouslySetInnerHTML={{ __html: formatBody(comment.body) }}
                      />
                      
                      <div className="mt-2 flex items-center text-xs text-muted-foreground">
                        <span className="mr-3">↑ {comment.upvotes}</span>
                        <span>↓ {comment.downvotes}</span>
                        {comment.children && comment.children > 0 && (
                          <span className="ml-3">💬 {comment.children}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          
          {/* Comment Form */}
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <h4 className="font-semibold">Your Comment</h4>
              <div className="grid grid-cols-4 items-center gap-4">
                <Textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write your comment here..."
                  className="col-span-4"
                  rows={4}
                  disabled={isSubmitting}
                />
              </div>
            </div>
            
            <ModalFooter className="mt-6">
              <ModalClose asChild>
                <Button type="button" variant="ghost" disabled={isSubmitting}>
                  Cancel
                </Button>
              </ModalClose>
              <Button type="submit" disabled={isSubmitting || !comment.trim()}>
                {isSubmitting ? 'Posting...' : 'Post Comment'}
              </Button>
            </ModalFooter>
          </form>
        </div>
      </ModalContent>
    </Modal>
  );
};
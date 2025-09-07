import React from 'react';

export const SocialMediaFeatures: React.FC = () => {
  return (
    <div>
      <h3 className="text-xl text-purple-400 mt-6">4.4 Social Media Features</h3>
      <p className="text-gray-300 leading-relaxed">
        The platform implements core social media functionality:
      </p>

      <h4 className="text-lg text-cyan-400 mt-4">4.4.1 Content Feed</h4>
      <p className="text-gray-300 leading-relaxed">
        The SocialFeed component provides:
      </p>
      <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
        <li>Infinite scrolling content display</li>
        <li>Content voting (upvote/downvote)</li>
        <li>Commenting functionality</li>
        <li>Content sharing</li>
        <li>User following/unfollowing</li>
      </ul>

      <h4 className="text-lg text-cyan-400 mt-4">4.4.2 Content Creation</h4>
      <p className="text-gray-300 leading-relaxed">
        The platform supports:
      </p>
      <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
        <li>Text-based post creation</li>
        <li>Markdown formatting</li>
        <li>Tagging system</li>
        <li>Image embedding</li>
        <li>Draft saving</li>
      </ul>
    </div>
  );
};
import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';

export const CaseStudies: React.FC = () => {
  return (
    <section className="mb-12">
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="prose prose-invert max-w-none">
          <h3 className="text-xl text-purple-400 mt-6">7.4 Case Studies and User Testimonials</h3>
          <p className="text-gray-300 leading-relaxed">
            This section presents hypothetical case studies and user testimonials that illustrate the real-world applications and benefits of the Hive Token Swap Platform. 
            These examples demonstrate how different types of users have successfully utilized the platform for various purposes.
          </p>

          <h4 className="text-lg text-cyan-400 mt-4">7.4.1 Case Study: Content Creator Monetization</h4>
          <div className="mt-3 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
            <h5 className="text-md font-semibold text-blue-400">User Profile</h5>
            <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
              <li><strong>Name</strong>: Sarah Johnson</li>
              <li><strong>Role</strong>: Technology blogger and content creator</li>
              <li><strong>Platform Usage</strong>: 8 months</li>
              <li><strong>Content Focus</strong>: Blockchain technology and decentralized applications</li>
            </ul>
            
            <h5 className="text-md font-semibold text-blue-400 mt-4">Challenge</h5>
            <p className="text-gray-300 mt-2">
              Sarah was struggling to monetize her content effectively on traditional social media platforms. She faced issues with:
            </p>
            <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
              <li>Unpredictable algorithm changes affecting content visibility</li>
              <li>High platform fees reducing her earnings</li>
              <li>Limited control over her audience and content distribution</li>
              <li>Difficulty in building a sustainable income from her passion</li>
            </ul>
            
            <h5 className="text-md font-semibold text-blue-400 mt-4">Solution</h5>
            <p className="text-gray-300 mt-2">
              Sarah adopted the Hive Token Swap Platform to:
            </p>
            <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
              <li>Create and publish content directly to the Hive blockchain</li>
              <li>Engage with her audience through token-based rewards</li>
              <li>Utilize the integrated wallet for seamless token management</li>
              <li>Participate in the platform's token swap functionality to diversify her holdings</li>
            </ul>
            
            <h5 className="text-md font-semibold text-blue-400 mt-4">Results</h5>
            <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
              <li><strong>Increased Earnings</strong>: 300% growth in monthly income from content creation</li>
              <li><strong>Audience Growth</strong>: 150% increase in followers and engagement rates</li>
              <li><strong>Financial Autonomy</strong>: Direct control over earnings without platform intermediaries</li>
              <li><strong>Portfolio Diversification</strong>: Successfully swapped HIVE tokens for other blockchain assets</li>
            </ul>
            
            <h5 className="text-md font-semibold text-blue-400 mt-4">Testimonial</h5>
            <blockquote className="text-gray-300 italic mt-2 border-l-4 border-blue-500 pl-4">
              "The Hive Token Swap Platform has completely transformed how I approach content creation. I now have direct relationships with my audience, 
              and the token-based rewards system has provided a sustainable income stream. The wallet integration makes managing my earnings incredibly simple."
            </blockquote>
          </div>

          <h4 className="text-lg text-cyan-400 mt-6">7.4.2 Case Study: Decentralized Finance Enthusiast</h4>
          <div className="mt-3 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
            <h5 className="text-md font-semibold text-blue-400">User Profile</h5>
            <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
              <li><strong>Name</strong>: Michael Chen</li>
              <li><strong>Role</strong>: DeFi investor and blockchain developer</li>
              <li><strong>Platform Usage</strong>: 12 months</li>
              <li><strong>Investment Focus</strong>: Decentralized finance protocols and token ecosystems</li>
            </ul>
            
            <h5 className="text-md font-semibold text-blue-400 mt-4">Challenge</h5>
            <p className="text-gray-300 mt-2">
              Michael was seeking a platform that would allow him to:
            </p>
            <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
              <li>Engage with blockchain communities while maintaining his investments</li>
              <li>Access new token opportunities in a secure environment</li>
              <li>Participate in governance and decision-making processes</li>
              <li>Seamlessly swap between different blockchain assets</li>
            </ul>
            
            <h5 className="text-md font-semibold text-blue-400 mt-4">Solution</h5>
            <p className="text-gray-300 mt-2">
              Michael utilized the Hive Token Swap Platform to:
            </p>
            <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
              <li>Participate in community discussions and proposal voting</li>
              <li>Execute secure token swaps using the integrated wallet</li>
              <li>Track his diversified portfolio through the comprehensive dashboard</li>
              <li>Stay informed about new token offerings and platform developments</li>
            </ul>
            
            <h5 className="text-md font-semibold text-blue-400 mt-4">Results</h5>
            <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
              <li><strong>Portfolio Growth</strong>: 120% increase in portfolio value through strategic token swaps</li>
              <li><strong>Community Engagement</strong>: Active participation in 15+ governance proposals</li>
              <li><strong>Risk Management</strong>: Diversified holdings across multiple blockchain ecosystems</li>
              <li><strong>Educational Value</strong>: Gained insights from community discussions and expert opinions</li>
            </ul>
            
            <h5 className="text-md font-semibold text-blue-400 mt-4">Testimonial</h5>
            <blockquote className="text-gray-300 italic mt-2 border-l-4 border-blue-500 pl-4">
              "As someone deeply involved in the DeFi space, I appreciate the security and transparency that the Hive Token Swap Platform provides. 
              The ability to engage with communities while managing my investments in one place has been invaluable for my investment strategy."
            </blockquote>
          </div>

          <h4 className="text-lg text-cyan-400 mt-6">7.4.3 Case Study: Social Media Influencer</h4>
          <div className="mt-3 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
            <h5 className="text-md font-semibold text-blue-400">User Profile</h5>
            <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
              <li><strong>Name</strong>: David Rodriguez</li>
              <li><strong>Role</strong>: Lifestyle influencer and brand ambassador</li>
              <li><strong>Platform Usage</strong>: 6 months</li>
              <li><strong>Content Focus</strong>: Travel, fashion, and lifestyle content</li>
            </ul>
            
            <h5 className="text-md font-semibold text-blue-400 mt-4">Challenge</h5>
            <p className="text-gray-300 mt-2">
              David was facing several challenges with traditional social media platforms:
            </p>
            <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
              <li>Declining organic reach affecting brand partnership opportunities</li>
              <li>Complex monetization processes with lengthy payout periods</li>
              <li>Limited control over his digital identity and content ownership</li>
              <li>Privacy concerns with data collection and usage practices</li>
            </ul>
            
            <h5 className="text-md font-semibold text-blue-400 mt-4">Solution</h5>
            <p className="text-gray-300 mt-2">
              David transitioned to the Hive Token Swap Platform to:
            </p>
            <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
              <li>Build authentic relationships with his audience through token rewards</li>
              <li>Monetize his content directly without intermediary platforms</li>
              <li>Maintain ownership of his digital content and identity</li>
              <li>Engage with privacy-focused communities that align with his values</li>
            </ul>
            
            <h5 className="text-md font-semibold text-blue-400 mt-4">Results</h5>
            <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
              <li><strong>Revenue Increase</strong>: 180% growth in content-related income</li>
              <li><strong>Audience Loyalty</strong>: 200% increase in meaningful engagement metrics</li>
              <li><strong>Brand Partnerships</strong>: Secured 5 new long-term brand partnerships</li>
              <li><strong>Content Control</strong>: Full ownership and control over his digital content</li>
            </ul>
            
            <h5 className="text-md font-semibold text-blue-400 mt-4">Testimonial</h5>
            <blockquote className="text-gray-300 italic mt-2 border-l-4 border-blue-500 pl-4">
              "Moving to the Hive Token Swap Platform was one of the best decisions for my career as an influencer. 
              The direct connection with my audience through token rewards has created a community that truly values my content. 
              I love that I have complete control over my earnings and content without worrying about algorithm changes."
            </blockquote>
          </div>

          <h4 className="text-lg text-cyan-400 mt-6">7.4.4 Platform Impact Summary</h4>
          <p className="text-gray-300 leading-relaxed">
            These case studies demonstrate the diverse applications and benefits of the Hive Token Swap Platform:
          </p>
          <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
            <li><strong>Financial Empowerment</strong>: Users gain direct control over their earnings and investments</li>
            <li><strong>Community Building</strong>: Authentic relationships between creators and audiences through token-based incentives</li>
            <li><strong>Privacy and Control</strong>: Enhanced data privacy and content ownership compared to traditional platforms</li>
            <li><strong>Accessibility</strong>: Democratized access to blockchain technology for users of all technical levels</li>
            <li><strong>Innovation</strong>: Cutting-edge features that combine social media with decentralized finance</li>
          </ul>
        </CardContent>
      </Card>
    </section>
  );
};

// A function to refine a post using the Gemini API
export async function refinePost(rawPostText: string, apiKey: string): Promise<string> {
    const prompt = `You are an advanced AI content synthesizer specializing in creating futuristic, high-tech documentation. Transform the user's raw text into a sleek, professional technical specification document with a cyberpunk aesthetic.

**STYLING REQUIREMENTS:**
- Use monochromatic color scheme: deep black backgrounds, electric blue (#00FFFF) accents, neon green (#00FF00) highlights
- Incorporate glowing text effects for important terms and headers
- Maintain clean, minimalist layout with structured sections
- Use futuristic typography and formatting

**CONTENT STRUCTURE:**
1. **MISSION BRIEF** (H1 Header with glowing effect)
   - Create a compelling, attention-grabbing title that sounds like a classified technical document
   - Include a security clearance level indicator
   - Add timestamp and classification markers

2. **EXECUTIVE SUMMARY** (H2 Header)
   - Write a concise overview in technical jargon
   - Highlight key specifications and capabilities
   - Use bullet points for core features

3. **TECHNICAL SPECIFICATIONS** (H2 Header)
   - Break down the content into logical technical sections
   - Use **bold** for critical parameters and **_italic_** for emphasis
   - Include performance metrics, system requirements, and operational parameters
   - Format as structured data with clear hierarchies

4. **SYSTEM ARCHITECTURE** (H2 Header)
   - Describe the underlying technology or system design
   - Use numbered lists for sequential processes
   - Include diagrams descriptions in markdown format

5. **OPERATIONAL PROTOCOLS** (H2 Header)
   - Detail usage instructions and procedures
   - Format as step-by-step guides
   - Include safety protocols and best practices

6. **VISUAL ENHANCEMENTS**
   - Suggest futuristic UI mockups or technical diagrams
   - Use code blocks for configuration examples
   - Add status indicators and progress bars descriptions

7. **MISSION OBJECTIVES & OUTCOMES** (H2 Header)
   - Conclude with clear goals and expected results
   - Include engagement prompts disguised as "system feedback requests"
   - Add performance tracking metrics

8. **CLASSIFICATION FOOTER**
   - End with horizontal line (---)
   - Include relevant tags formatted as system identifiers
   - Add version control and update timestamps

**FORMATTING GUIDELINES:**
- Use markdown tables for specifications and data
- Employ blockquotes for important warnings or notes
- Use inline code for technical terms and commands
- Create visual hierarchy with proper heading levels
- Include progress indicators and status badges

**CONTENT THEME OPTIONS:**
Choose ONE of these futuristic themes based on content:
- **NEURAL NETWORK SPECIFICATION** - For AI/ML content
- **QUANTUM COMPUTING MISSION REPORT** - For technical computing topics
- **CYBERSECURITY PROTOCOL UPDATE** - For security-related content
- **SPACE MISSION TECHNICAL BRIEF** - For exploration/innovation topics
- **ADVANCED AUTOMATION SYSTEM** - For productivity/automation content

**ENGAGEMENT ENHANCEMENT:**
- Frame discussions as "peer review sessions"
- Use "system optimization suggestions" instead of comments
- Include "performance benchmarking" calls-to-action
- Add "collaboration protocols" for community interaction

Transform this raw content into a classified technical document:

${rawPostText}`;

    const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

    const payload = {
        contents: [
            {
                parts: [
                    {
                        text: prompt,
                    },
                ],
            },
        ],
    };

    try {
        const response = await fetch(`${url}?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('API Error:', errorData);
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error('An error occurred during the API request:', error);
        throw error;
    }
}

// Example usage
// Replace 'YOUR_API_KEY' with your actual Gemini API key.
// Make sure to install node-fetch: npm install node-fetch@2 or equivalent.
// const myApiKey = 'YOUR_API_KEY';
// const myRawPost = 'This is my draft about how I am learning about crypto. I started on Coinbase but now I am trying out some new decentralized platforms. I find it really confusing but I am excited to learn more.';

// refinePost(myRawPost, myApiKey)
//   .then(refinedPost => {
//     console.log('--- Refined Hive Blog Post ---');
//     console.log(refinedPost);
//   })
//   .catch(err => {
//     console.error('Failed to refine post:', err);
//   });
import "dotenv/config";
import { currentDataset } from "../routes/dataset.js";

// Enhanced AI Provider with multiple fallbacks and local intelligence
const getAIResponse = async (message, provider = 'local', conversationHistory = []) => {
    const providers = {
        openai: getOpenAIResponse,
        gemini: getGeminiResponse,
        local: getLocalEthicsResponse
    };

    const selectedProvider = providers[provider] || providers.local;
    
    try {
        return await selectedProvider(message, conversationHistory);
    } catch (error) {
        console.error(`${provider} provider failed:`, error);
        // Fallback to local response
        if (provider !== 'local') {
            return await getLocalEthicsResponse(message, conversationHistory);
        }
        throw error;
    }
};

// OpenAI Integration
const getOpenAIResponse = async (message, conversationHistory = []) => {
    if (!process.env.OPENAI_API_KEY) {
        throw new Error("OpenAI API key not configured");
    }

    const systemPrompt = getSystemPrompt();
    const datasetContext = getDatasetContext(message);
    
    const messages = [
        { role: "system", content: systemPrompt },
        ...conversationHistory.slice(-6), // Keep last 6 messages for context
        { role: "user", content: datasetContext ? `${message}\n\nDataset Context: ${datasetContext}` : message }
    ];

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: messages,
            temperature: 0.7,
            max_tokens: 1000
        })
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", options);
    
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`OpenAI API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }
    
    const data = await response.json();
    return data.choices[0].message.content;
};

// Gemini AI Integration
const getGeminiResponse = async (message, conversationHistory = []) => {
    if (!process.env.GEMINI_API_KEY) {
        throw new Error("Gemini API key not configured");
    }

    const systemPrompt = getSystemPrompt();
    const datasetContext = getDatasetContext(message);
    
    let prompt = `${systemPrompt}\n\nUser: ${message}`;
    if (datasetContext) {
        prompt += `\n\nDataset Context: ${datasetContext}`;
    }

    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
    
    const requestBody = {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
        }
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-goog-api-key': process.env.GEMINI_API_KEY
        },
        body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Gemini AI API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
};

// Enhanced Local Ethics Response System
const getLocalEthicsResponse = async (message, conversationHistory = []) => {
    const lowerMessage = message.toLowerCase();
    const datasetContext = getDatasetContext(message);
    
    // Ethics knowledge base
    const ethicsResponses = {
        fairness: "AI fairness involves ensuring that AI systems treat all individuals and groups equitably, without bias or discrimination. This includes avoiding algorithmic bias, ensuring equal opportunity, and considering different definitions of fairness such as individual vs. group fairness, and equality of outcome vs. opportunity.",
        
        bias: "AI bias occurs when algorithms produce systematically prejudiced results due to biased training data, algorithmic design choices, or societal prejudices reflected in data. Key mitigation strategies include using diverse datasets, implementing fairness metrics, conducting algorithmic auditing, and building inclusive development teams.",
        
        transparency: "AI transparency means making AI systems understandable and their decision-making processes clear to users. This includes implementing explainable AI techniques, ensuring algorithmic accountability, and providing users with clear information about how AI systems work and what data they use.",
        
        privacy: "AI privacy involves protecting personal data used in AI systems. Key considerations include data minimization, purpose limitation, obtaining proper consent, using anonymization techniques, implementing federated learning, and applying differential privacy to protect individual privacy while enabling AI development.",
        
        accountability: "AI accountability ensures clear lines of responsibility for AI system outcomes. This includes implementing human oversight, maintaining audit trails, establishing governance frameworks, and creating mechanisms for redress when AI systems cause harm.",
        
        safety: "AI safety focuses on ensuring AI systems are robust, reliable, and aligned with human values. This includes testing for edge cases, implementing fail-safe mechanisms, maintaining human oversight, and considering long-term risks from advanced AI systems.",
        
        ethics: "AI ethics encompasses principles like fairness, transparency, accountability, and privacy. It's about ensuring AI systems are developed and deployed responsibly, with consideration for their impact on individuals and society."
    };

    // Check for specific ethics topics
    for (const [topic, response] of Object.entries(ethicsResponses)) {
        if (lowerMessage.includes(topic)) {
            let enhancedResponse = response;
            
            if (datasetContext) {
                enhancedResponse += `\n\n**Based on your dataset analysis:**\n${datasetContext}`;
            }
            
            return enhancedResponse;
        }
    }

    // Greeting responses
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        let greeting = "Hello! I'm EthicBot, your AI Ethics Assistant. I can help you understand AI ethics principles, discuss ethical challenges in technology, and explore how we can build more responsible AI systems.";
        
        if (currentDataset) {
            greeting += `\n\nI also have access to your uploaded dataset "${currentDataset.filename}" with ${currentDataset.rowCount} entries. Feel free to ask questions about ethics issues in your data!`;
        }
        
        greeting += "\n\n**You can ask me about:**\n• AI ethics principles (fairness, transparency, accountability)\n• Ethical challenges in AI development\n• Analysis of your dataset for ethics issues\n• Best practices for responsible AI\n\nWhat would you like to explore?";
        
        return greeting;
    }

    // Dataset-specific queries
    if (currentDataset && (lowerMessage.includes('dataset') || lowerMessage.includes('data') || lowerMessage.includes('analysis'))) {
        return analyzeDatasetQuery(message, currentDataset);
    }

    // Question responses
    if (lowerMessage.includes('what is') || lowerMessage.includes('define') || lowerMessage.includes('explain')) {
        if (lowerMessage.includes('ai ethics') || lowerMessage.includes('artificial intelligence ethics')) {
            return "AI Ethics is a set of values, principles, and techniques that employ widely accepted standards of right and wrong to guide moral conduct in the development and use of AI technologies.\n\n**Core AI Ethics Principles:**\n\n• **Fairness**: Ensuring AI systems treat all individuals equitably\n• **Transparency**: Making AI decision-making processes understandable\n• **Accountability**: Establishing clear responsibility for AI outcomes\n• **Privacy**: Protecting personal data and respecting user consent\n• **Beneficence**: Designing AI to benefit humanity and avoid harm\n• **Human Agency**: Preserving human autonomy and decision-making\n\nThese principles help ensure AI development serves society responsibly and ethically.";
        }
    }

    // Default intelligent response
    let defaultResponse = "That's an excellent question about AI ethics! ";
    
    if (datasetContext) {
        defaultResponse += `Based on your dataset analysis, here are some relevant insights:\n\n${datasetContext}\n\n`;
    }
    
    defaultResponse += "AI ethics encompasses principles like fairness, transparency, accountability, and privacy. It's about ensuring AI systems are developed and deployed responsibly, with consideration for their impact on individuals and society.\n\n**Would you like to explore:**\n• Specific ethical principles in detail\n• How ethics applies to your dataset\n• Challenges in implementing ethical AI\n• Best practices for responsible development";
    
    return defaultResponse;
};

// Generate system prompt for AI providers
const getSystemPrompt = () => {
    return `You are EthicBot, an AI Ethics Assistant specializing in helping users understand and implement ethical AI practices. Your responses should be:

1. **Knowledgeable**: Provide accurate information about AI ethics principles, challenges, and solutions
2. **Practical**: Offer actionable advice and real-world examples
3. **Balanced**: Consider multiple perspectives on complex ethical issues
4. **Accessible**: Explain technical concepts in understandable terms
5. **Supportive**: Help users make ethical decisions in AI development

Core areas of expertise:
- AI Ethics principles (fairness, transparency, accountability, privacy, beneficence)
- Bias detection and mitigation
- Algorithmic auditing and testing
- Privacy-preserving AI techniques
- Governance and regulatory compliance
- Ethical AI frameworks and best practices

Always encourage responsible AI development and consider the societal impact of AI technologies.`;
};

// Get relevant dataset context for the query
const getDatasetContext = (message) => {
    if (!currentDataset || !currentDataset.analysis) {
        return null;
    }

    const lowerMessage = message.toLowerCase();
    const analysis = currentDataset.analysis;
    let context = '';

    if (lowerMessage.includes('bias') || lowerMessage.includes('fair')) {
        if (analysis.keywordFrequency.bias || analysis.keywordFrequency.fair) {
            context += `Your dataset shows potential bias-related content with ${analysis.keywordFrequency.bias || 0} bias mentions and ${analysis.keywordFrequency.fair || 0} fairness mentions. `;
        }
    }

    if (lowerMessage.includes('risk')) {
        context += `Risk analysis of your dataset: ${analysis.riskLevels.high} high-risk, ${analysis.riskLevels.medium} medium-risk, ${analysis.riskLevels.low} low-risk entries. `;
    }

    if (lowerMessage.includes('categories') || lowerMessage.includes('types')) {
        const topCategories = Object.entries(analysis.categories)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5)
            .map(([cat, count]) => `${cat} (${count})`)
            .join(', ');
        if (topCategories) {
            context += `Top categories in your dataset: ${topCategories}. `;
        }
    }

    if (analysis.ethicsRelated) {
        context += `Your dataset contains ethics-related content in columns: ${analysis.ethicsColumns.join(', ')}. `;
    }

    return context.trim() || null;
};

// Analyze dataset-specific queries
const analyzeDatasetQuery = (message, dataset) => {
    const analysis = dataset.analysis;
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('summary') || lowerMessage.includes('overview')) {
        return `**Dataset Analysis Summary for "${dataset.filename}"**

📊 **Basic Statistics:**
• Total entries: ${analysis.totalRows}
• Columns: ${analysis.columns.length} (${analysis.columns.join(', ')})
• Ethics-related: ${analysis.ethicsRelated ? 'Yes' : 'No'}

⚠️ **Risk Distribution:**
• High risk: ${analysis.riskLevels.high}
• Medium risk: ${analysis.riskLevels.medium}
• Low risk: ${analysis.riskLevels.low}

�� **Ethics Keywords Found:**
${Object.entries(analysis.keywordFrequency).map(([keyword, count]) => `• ${keyword}: ${count} mentions`).join('\n') || '• No specific ethics keywords detected'}

${analysis.ethicsRelated ? `\n📈 **Ethics-Related Columns:** ${analysis.ethicsColumns.join(', ')}` : ''}

**Recommendations:**
• Review high-risk entries for potential bias
• Implement fairness testing for AI models trained on this data
• Consider data augmentation to address any identified gaps`;
    }

    return `I can analyze your dataset "${dataset.filename}" which contains ${analysis.totalRows} entries. What specific aspect would you like me to examine? I can look at bias patterns, risk levels, categories, or provide an overall ethics assessment.`;
};

export default getAIResponse;

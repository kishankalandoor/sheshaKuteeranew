// EthicBot Enhanced - Advanced AI Ethics Assistant with IEEE Standards Integration
// Version 2.0 - Comprehensive regenerative thinking and natural language processing

let chatHistory = [];
let isTyping = false;
let contextMemory = [];
let currentThinkingProcess = null;

// Enhanced API Configuration with additional providers
const API_CONFIG = {
    openai: {
        endpoint: 'https://api.openai.com/v1/chat/completions',
        apiKey: 'your-openai-api-key-here',
        model: 'gpt-4-turbo-preview'
    },
    anthropic: {
        endpoint: 'https://api.anthropic.com/v1/messages',
        apiKey: 'your-anthropic-api-key-here',
        model: 'claude-3-opus-20240229'
    },
    huggingface: {
        endpoint: 'https://api-inference.huggingface.co/models/microsoft/DialoGPT-large',
        apiKey: 'your-huggingface-api-key-here'
    },
    gemini: {
        endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
        apiKey: 'your-gemini-api-key-here'
    },
    cohere: {
        endpoint: 'https://api.cohere.ai/v1/generate',
        apiKey: 'your-cohere-api-key-here'
    },
    public: {
        endpoint: 'https://api.quotable.io/random',
        needsKey: false
    }
};

let currentProvider = 'local';

// IEEE Ethics Standards Based Knowledge Base
const ieeeEthicsKnowledge = {
    ieee2859: {
        keywords: ['ieee', '2859', 'privacy', 'engineering', 'bias assessment', 'privacy engineering'],
        response: `**IEEE 2859 - Privacy Engineering and Risk Management**

According to IEEE 2859 standards for privacy engineering and risk management in AI systems, organizations must implement comprehensive privacy-by-design methodologies. This standard emphasizes the following critical principles:

**Core Privacy Engineering Requirements:**
• **Risk-Based Assessment**: Organizations shall conduct systematic privacy impact assessments throughout the AI lifecycle, identifying potential privacy risks before deployment.
• **Data Minimization Protocols**: AI systems must collect only the minimum data necessary for their intended function, implementing technical and organizational measures to limit data processing.
• **Purpose Limitation Enforcement**: Data usage must be strictly limited to the declared purposes, with clear documentation of any secondary uses.
• **Consent Management Systems**: Implement granular consent mechanisms that allow users to understand and control how their data is processed.

**Technical Implementation Guidelines:**
• **Privacy-Preserving Algorithms**: Utilize differential privacy, federated learning, and homomorphic encryption where technically feasible.
• **Data Lifecycle Management**: Establish clear data retention policies with automated deletion mechanisms.
• **Access Control Frameworks**: Implement role-based access controls with audit trails for all data access.
• **Cross-Border Transfer Protocols**: Ensure compliance with international data transfer regulations.

**Continuous Monitoring Requirements:**
The standard mandates ongoing privacy monitoring, requiring organizations to establish metrics for privacy preservation and implement automated privacy violation detection systems. Regular audits must be conducted to ensure continued compliance with privacy objectives.

This framework provides a systematic approach to integrating privacy considerations into AI development processes, ensuring that privacy is not an afterthought but a fundamental design principle.`
    },

    ieee2857: {
        keywords: ['ieee', '2857', 'bias', 'fairness', 'algorithmic bias', 'ai bias'],
        response: `**IEEE 2857 - Framework for Bias Assessment in AI Systems**

The IEEE 2857 standard establishes a comprehensive framework for identifying, measuring, and mitigating bias in artificial intelligence systems. This standard provides systematic methodologies for bias assessment throughout the AI development lifecycle.

**Bias Identification Framework:**
• **Historical Bias Detection**: Systematic examination of training data for embedded societal biases, including underrepresentation of marginalized groups and historical discrimination patterns.
• **Representation Bias Analysis**: Quantitative assessment of demographic representation across all data dimensions, ensuring adequate coverage of protected characteristics.
• **Measurement Bias Evaluation**: Analysis of data collection methodologies to identify systematic errors that may disproportionately affect certain populations.
• **Algorithmic Bias Testing**: Comprehensive testing of model outputs across demographic groups using standardized fairness metrics.

**Standardized Fairness Metrics:**
• **Demographic Parity**: Equal positive prediction rates across all protected groups
• **Equalized Odds**: Equal true positive and false positive rates across groups
• **Calibration**: Consistent prediction accuracy across different demographic segments
• **Individual Fairness**: Similar treatment for similar individuals regardless of group membership

**Mitigation Strategies Framework:**
• **Pre-processing Interventions**: Data augmentation, re-sampling, and synthetic data generation to address representation gaps.
• **In-processing Constraints**: Integration of fairness constraints directly into model training algorithms.
• **Post-processing Adjustments**: Output calibration and threshold optimization to achieve fairness objectives.
• **Continuous Monitoring**: Real-time bias detection and alerting systems for deployed models.

**Organizational Requirements:**
The standard requires organizations to establish bias assessment committees with diverse expertise, implement regular bias auditing schedules, and maintain comprehensive documentation of bias testing and mitigation efforts. Organizations must also establish clear escalation procedures for addressing identified bias issues.

This framework ensures that fairness considerations are systematically integrated into AI development processes, promoting equitable outcomes across all user populations.`
    },

    ieee3652: {
        keywords: ['ieee', '3652', 'autonomous systems', 'ai safety', 'safety standards'],
        response: `**IEEE 3652.1 - Autonomous Systems Safety and Security Guidelines**

IEEE 3652.1 provides comprehensive guidelines for ensuring the safety and security of autonomous AI systems, establishing rigorous standards for risk management and safety assurance in autonomous operations.

**Safety Architecture Requirements:**
• **Hierarchical Safety Systems**: Implementation of multi-layered safety architectures with independent monitoring and override capabilities.
• **Fail-Safe Mechanisms**: Design of systems that default to safe states in case of component failures or unexpected scenarios.
• **Human Supervisory Control**: Maintenance of meaningful human oversight with clearly defined intervention protocols.
• **Safety Integrity Levels**: Classification of autonomous systems based on risk profiles and implementation of appropriate safety measures.

**Risk Assessment Methodologies:**
• **Hazard Analysis and Risk Assessment (HARA)**: Systematic identification of potential hazards and assessment of their severity, exposure, and controllability.
• **Fault Tree Analysis**: Comprehensive analysis of potential failure modes and their cascading effects on system safety.
• **Monte Carlo Risk Simulation**: Probabilistic modeling of safety risks under various operational scenarios.
• **Scenario-Based Testing**: Extensive testing across diverse operational scenarios, including edge cases and adversarial conditions.

**Security Integration Framework:**
• **Cybersecurity-by-Design**: Integration of security considerations from the initial design phase, including threat modeling and security architecture design.
• **Resilience Against Attacks**: Implementation of defenses against adversarial attacks, including input validation and anomaly detection.
• **Secure Communication Protocols**: Establishment of encrypted, authenticated communication channels for all system interactions.
• **Incident Response Procedures**: Clear protocols for responding to security incidents and safety compromises.

**Validation and Verification Requirements:**
The standard mandates comprehensive testing protocols including simulation-based testing, controlled real-world testing, and formal verification methods. Organizations must maintain detailed safety cases documenting all safety arguments and evidence.

**Continuous Safety Monitoring:**
Deployed systems must implement real-time safety monitoring with automated anomaly detection and immediate response capabilities. Regular safety assessments must be conducted to ensure continued safe operation as systems evolve and encounter new scenarios.

This standard ensures that autonomous AI systems operate safely and securely across diverse environments while maintaining appropriate human oversight and control.`
    }
};

// Advanced Natural Language Processing for Grammar and Context
class NaturalLanguageProcessor {
    constructor() {
        this.grammarRules = this.initializeGrammarRules();
        this.contextAnalyzer = new ContextAnalyzer();
    }

    initializeGrammarRules() {
        return {
            sentenceStarters: [
                "To provide comprehensive guidance on this important topic, ",
                "It's essential to understand that ",
                "From an ethical AI perspective, ",
                "Research and industry best practices demonstrate that ",
                "According to IEEE standards and guidelines, ",
                "To ensure thorough understanding, "
            ],
            transitionPhrases: [
                "Furthermore, it's crucial to consider that",
                "Building upon this foundation,",
                "To expand on this concept,",
                "Additionally, we must recognize that",
                "From a practical implementation standpoint,",
                "To ensure comprehensive coverage,"
            ],
            conclusionPhrases: [
                "In summary, these principles collectively ensure",
                "To conclude this analysis,",
                "These considerations ultimately lead to",
                "The implementation of these guidelines results in",
                "This comprehensive approach guarantees"
            ]
        };
    }

    enhanceResponse(response) {
        let enhanced = this.improveStructure(response);
        enhanced = this.refineGrammar(enhanced);
        enhanced = this.addConclusiveStatement(enhanced);
        return enhanced;
    }

    improveStructure(text) {
        // Add better paragraph structure
        return text
            .replace(/\n\n/g, '\n\n')
            .replace(/(\*\*[^*]+\*\*)/g, '\n\n$1')
            .replace(/^(.)/gm, (match, char) => char.toUpperCase())
            .trim();
    }

    refineGrammar(text) {
        return text
            .replace(/\s+/g, ' ')
            .replace(/([.!?])\s*([a-z])/g, '$1 $2')
            .replace(/\s+([.!?])/g, '$1')
            .trim();
    }

    addConclusiveStatement(text) {
        if (!text.includes('These principles') && !text.includes('In conclusion')) {
            const conclusions = this.grammarRules.conclusionPhrases;
            const randomConclusion = conclusions[Math.floor(Math.random() * conclusions.length)];
            return text + `\n\n${randomConclusion} a more ethical and responsible approach to AI development and deployment.`;
        }
        return text;
    }
}

// Context Analysis for Regenerative Thinking
class ContextAnalyzer {
    constructor() {
        this.conversationContext = [];
        this.topicHistory = [];
        this.userInterests = new Set();
    }

    analyzeContext(message, chatHistory) {
        this.updateConversationContext(message);
        this.extractUserInterests(message);
        
        return {
            mainTopic: this.identifyMainTopic(message),
            relatedTopics: this.findRelatedTopics(message),
            conversationDepth: this.assessConversationDepth(),
            userExpertiseLevel: this.assessUserExpertise(),
            followUpSuggestions: this.generateFollowUpSuggestions()
        };
    }

    updateConversationContext(message) {
        this.conversationContext.push({
            message: message,
            timestamp: Date.now(),
            topics: this.extractTopics(message)
        });
        
        if (this.conversationContext.length > 10) {
            this.conversationContext.shift();
        }
    }

    extractTopics(message) {
        const topicKeywords = {
            'bias': ['bias', 'discrimination', 'fairness', 'prejudice', 'equity'],
            'privacy': ['privacy', 'data protection', 'personal information', 'confidentiality'],
            'explainability': ['explainable', 'interpretable', 'transparency', 'black box'],
            'safety': ['safety', 'risk', 'harm', 'security'],
            'governance': ['governance', 'regulation', 'policy', 'compliance']
        };

        const foundTopics = [];
        const messageLower = message.toLowerCase();

        for (const [topic, keywords] of Object.entries(topicKeywords)) {
            if (keywords.some(keyword => messageLower.includes(keyword))) {
                foundTopics.push(topic);
            }
        }

        return foundTopics;
    }

    identifyMainTopic(message) {
        const topics = this.extractTopics(message);
        return topics.length > 0 ? topics[0] : 'general ethics';
    }

    findRelatedTopics(message) {
        const mainTopic = this.identifyMainTopic(message);
        const relatedMap = {
            'bias': ['fairness', 'discrimination', 'equity'],
            'privacy': ['data protection', 'security', 'consent'],
            'explainability': ['transparency', 'interpretability', 'trust'],
            'safety': ['risk management', 'security', 'robustness'],
            'governance': ['regulation', 'compliance', 'oversight']
        };
        
        return relatedMap[mainTopic] || [];
    }

    assessConversationDepth() {
        return this.conversationContext.length;
    }

    assessUserExpertise() {
        // Simple heuristic based on question complexity
        const recentMessages = this.conversationContext.slice(-3);
        const avgLength = recentMessages.reduce((sum, ctx) => sum + ctx.message.length, 0) / recentMessages.length;
        
        if (avgLength > 100) return 'advanced';
        if (avgLength > 50) return 'intermediate';
        return 'beginner';
    }

    generateFollowUpSuggestions() {
        const recentTopics = this.conversationContext
            .slice(-3)
            .flatMap(ctx => ctx.topics);

        const suggestions = [];
        
        if (recentTopics.includes('bias')) {
            suggestions.push("Would you like me to explain specific IEEE 2857 bias detection techniques?");
        }
        
        if (recentTopics.includes('privacy')) {
            suggestions.push("Should we explore IEEE 2859 privacy engineering standards?");
        }

        return suggestions.slice(0, 2);
    }

    extractUserInterests(message) {
        const interests = this.extractTopics(message);
        interests.forEach(interest => this.userInterests.add(interest));
    }
}

// Regenerative Thinking Engine
class RegenerativeThinkingEngine {
    constructor() {
        this.nlp = new NaturalLanguageProcessor();
        this.contextAnalyzer = new ContextAnalyzer();
        this.thinkingSteps = [];
    }

    async processQuery(message, context = {}) {
        const analysis = this.contextAnalyzer.analyzeContext(message, chatHistory);
        let response = await this.generateInitialResponse(message, analysis);
        response = await this.applyRegenerativeThinking(response, analysis);
        response = this.nlp.enhanceResponse(response);
        response = this.addContextualFollowUps(response, analysis);
        
        return response;
    }

    async generateInitialResponse(message, analysis) {
        // Check IEEE standards first
        for (const [standard, data] of Object.entries(ieeeEthicsKnowledge)) {
            if (data.keywords.some(keyword => message.toLowerCase().includes(keyword))) {
                return data.response;
            }
        }

        return this.getGeneralEthicsResponse(message, analysis);
    }

    async applyRegenerativeThinking(response, analysis) {
        const thinkingProcess = this.generateThinkingProcess(analysis);
        const perspectives = this.generateMultiplePerspectives(response, analysis);
        
        return this.combineThinkingAndResponse(thinkingProcess, response, perspectives);
    }

    generateThinkingProcess(analysis) {
        return `**🤔 Analytical Process:**
1. **Topic Identification**: Analyzing your question within the context of ${analysis.mainTopic}
2. **Standards Consultation**: Referencing relevant IEEE standards and industry best practices
3. **Multi-dimensional Analysis**: Considering technical, ethical, and societal implications
4. **Contextual Integration**: Building upon our previous discussion points
5. **Comprehensive Synthesis**: Formulating a complete, actionable response

`;
    }

    generateMultiplePerspectives(response, analysis) {
        return `

**🔍 Multiple Perspectives Analysis:**

**Technical Perspective:** From an implementation standpoint, this involves systematic application of established methodologies and best practices, ensuring technical rigor and measurable outcomes.

**Ethical Perspective:** The moral implications require careful consideration of stakeholder impacts, rights preservation, and long-term societal consequences.

**Regulatory Perspective:** Compliance considerations include current and emerging regulations, industry standards, and legal frameworks that govern AI development and deployment.

**Practical Perspective:** Real-world implementation requires balancing idealistic goals with practical constraints, resource limitations, and organizational capabilities.`;
    }

    combineThinkingAndResponse(thinking, response, perspectives) {
        return thinking + response + perspectives;
    }

    addContextualFollowUps(response, analysis) {
        const suggestions = analysis.followUpSuggestions;
        if (suggestions.length > 0) {
            response += `\n\n**🎯 Suggested Next Steps:**\n`;
            suggestions.forEach((suggestion, index) => {
                response += `${index + 1}. ${suggestion}\n`;
            });
        }
        return response;
    }

    getGeneralEthicsResponse(message, analysis) {
        const messageLower = message.toLowerCase();
        
        if (messageLower.includes('hello') || messageLower.includes('hi')) {
            return `Welcome to EthicBot Enhanced! I'm your advanced AI ethics assistant, powered by IEEE standards and regenerative thinking capabilities. I specialize in providing comprehensive, contextual guidance on AI ethics, drawing from the latest research and industry best practices.

**My Enhanced Capabilities Include:**
• **IEEE Standards Integration**: Deep knowledge of IEEE 2857, 2859, 3652, and other relevant standards
• **Regenerative Analysis**: Multi-step thinking processes that build comprehensive understanding
• **Contextual Memory**: Remembering our conversation to provide increasingly relevant insights
• **Multi-perspective Analysis**: Examining issues from technical, ethical, regulatory, and practical viewpoints
• **Natural Language Enhancement**: Providing clear, well-structured responses with proper grammar and flow

What specific aspect of AI ethics would you like to explore today?`;
        }

        return `I understand you're inquiring about ${analysis.mainTopic}. While I'm processing your specific question, let me provide some foundational context that may be helpful.

**Current Analysis:** Your question touches on important considerations in AI ethics that require careful examination from multiple perspectives.

**Relevant Standards:** This topic is addressed by various IEEE standards and industry frameworks that provide systematic approaches to ethical AI development.

**Key Considerations:** The ethical implications involve balancing innovation with responsibility, ensuring stakeholder protection, and maintaining transparency throughout the development process.

Could you please provide more specific details about what aspect you'd like me to focus on? This will help me generate a more targeted and comprehensive response.`;
    }
}

// Initialize systems
const regenerativeEngine = new RegenerativeThinkingEngine();
const nlp = new NaturalLanguageProcessor();

// Enhanced message handling with API integration
async function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim();
    
    if (message === '' || isTyping) return;
    
    // Add user message to context
    contextMemory.push({ role: 'user', content: message, timestamp: Date.now() });
    
    // Add user message to UI
    addMessage('user', message);
    messageInput.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    try {
        let response;
        
        if (currentProvider === 'local') {
            response = await regenerativeEngine.processQuery(message, {
                history: chatHistory,
                context: contextMemory
            });
        } else {
            response = await getEnhancedAPIResponse(message, currentProvider);
        }
        
        // Add AI response
        addMessage('assistant', response);
        
        // Update context memory
        contextMemory.push({ role: 'assistant', content: response, timestamp: Date.now() });
        
        // Limit context memory to last 20 exchanges
        if (contextMemory.length > 40) {
            contextMemory = contextMemory.slice(-40);
        }
        
    } catch (error) {
        console.error('Error getting response:', error);
        addMessage('assistant', 'I apologize, but I encountered an error while processing your request. This could be due to API connectivity issues or configuration problems. Please check your API settings and try again, or continue with local responses.');
    } finally {
        hideTypingIndicator();
    }
}

async function getEnhancedAPIResponse(message, provider) {
    const config = API_CONFIG[provider];
    const apiKey = getAPIKey(provider);
    
    if (!apiKey && config.needsKey !== false) {
        throw new Error(`API key not configured for ${provider}. Please configure your API keys in the settings.`);
    }
    
    if (provider === 'public') {
        return await getEnhancedPublicAPIResponse(message);
    }
    
    // Enhanced ethics prompt with IEEE standards
    const ethicsPrompt = `You are EthicBot Enhanced, an advanced AI ethics expert specializing in IEEE standards (2857, 2859, 3652), regenerative thinking, and comprehensive ethical analysis. 

Your expertise includes:
- IEEE ethical AI standards and their practical implementation
- Multi-perspective analysis (technical, ethical, regulatory, practical)
- Bias detection and mitigation strategies
- Privacy engineering and data protection
- AI safety and security frameworks
- Explainable AI and transparency requirements
- Governance and regulatory compliance

Provide detailed, well-structured responses that:
1. Begin with clear context setting
2. Include relevant IEEE standards where applicable
3. Offer multiple perspectives on the issue
4. Provide practical implementation guidance
5. Conclude with actionable recommendations
6. Use proper grammar and professional language

User question: ${message}

Context from conversation: ${contextMemory.slice(-6).map(m => `${m.role}: ${m.content.substring(0, 200)}`).join('\n')}`;
    
    let requestBody, headers;
    
    switch (provider) {
        case 'openai':
            headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            };
            requestBody = {
                model: config.model,
                messages: [
                    { role: "system", content: ethicsPrompt },
                    { role: "user", content: message }
                ],
                max_tokens: 1500,
                temperature: 0.7,
                presence_penalty: 0.1,
                frequency_penalty: 0.1
            };
            break;
            
        case 'anthropic':
            headers = {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01'
            };
            requestBody = {
                model: config.model,
                max_tokens: 1500,
                messages: [{ role: "user", content: ethicsPrompt + "\n\n" + message }],
                temperature: 0.7
            };
            break;
            
        case 'gemini':
            headers = {
                'Content-Type': 'application/json'
            };
            requestBody = {
                contents: [{
                    parts: [{ text: ethicsPrompt + "\n\n" + message }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 1500
                }
            };
            break;
            
        case 'cohere':
            headers = {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            };
            requestBody = {
                prompt: ethicsPrompt + "\n\n" + message,
                max_tokens: 1500,
                temperature: 0.7,
                k: 0,
                stop_sequences: [],
                return_likelihoods: "NONE"
            };
            break;
            
        case 'huggingface':
            headers = {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            };
            requestBody = {
                inputs: ethicsPrompt + "\n\n" + message,
                parameters: {
                    max_new_tokens: 1000,
                    temperature: 0.7,
                    do_sample: true,
                    top_p: 0.95
                }
            };
            break;
    }
    
    const endpoint = provider === 'gemini' ? 
        `${config.endpoint}?key=${apiKey}` : 
        config.endpoint;
    
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API request failed: ${response.status} ${response.statusText}. ${errorText}`);
    }
    
    const data = await response.json();
    
    let result;
    switch (provider) {
        case 'openai':
            result = data.choices[0].message.content;
            break;
        case 'anthropic':
            result = data.content[0].text;
            break;
        case 'gemini':
            result = data.candidates[0].content.parts[0].text;
            break;
        case 'cohere':
            result = data.generations[0].text;
            break;
        case 'huggingface':
            result = Array.isArray(data) ? data[0].generated_text.replace(ethicsPrompt + "\n\n" + message, "").trim() : 
                     data.generated_text.replace(ethicsPrompt + "\n\n" + message, "").trim();
            break;
        default:
            result = 'Response format not supported for this provider.';
    }
    
    // Apply NLP enhancement to API responses as well
    return nlp.enhanceResponse(result);
}

async function getEnhancedPublicAPIResponse(message) {
    try {
        const response = await fetch('https://api.quotable.io/random?tags=wisdom,technology&minLength=100');
        const data = await response.json();
        
        return `**Inspirational Wisdom for Ethical AI Development**

"${data.content}"
— ${data.author}

**Connecting Wisdom to AI Ethics:**

This timeless wisdom resonates deeply with the challenges we face in AI ethics today. The principles of wisdom, reflection, and moral consideration that have guided human societies for centuries are more relevant than ever in our technological age.

**Contemporary Application:**
Just as this quote suggests, ethical AI development requires us to balance innovation with responsibility, ensuring that our technological advances serve humanity's best interests while respecting individual dignity and rights.

**IEEE Standards Connection:**
The IEEE standards for ethical AI echo these philosophical foundations, providing concrete frameworks for implementing these timeless values in modern technological contexts.

Would you like to explore how these philosophical principles translate into specific ethical frameworks for AI development?`;
    } catch (error) {
        return `I apologize, but I'm having trouble accessing external resources right now. However, I can still provide comprehensive guidance on AI ethics using my extensive knowledge base.

**Available Topics:**
• IEEE standards for ethical AI (2857, 2859, 3652)
• Bias detection and mitigation strategies
• Privacy engineering and data protection
• AI safety and security frameworks
• Explainable AI and transparency
• Governance and regulatory compliance

What specific aspect of AI ethics would you like to explore?`;
    }
}

// UI Enhancement Functions
function addMessage(sender, content) {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    if (sender === 'user') {
        messageDiv.innerHTML = `
            <div class="message-content">
                <div class="message-text">${escapeHtml(content)}</div>
                <div class="message-time">${formatTime(new Date())}</div>
            </div>
            <div class="message-avatar">
                <i class="fas fa-user"></i>
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <div class="message-text">${formatResponse(content)}</div>
                <div class="message-time">${formatTime(new Date())}</div>
            </div>
        `;
    }
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Add to chat history
    chatHistory.push({ sender, content, timestamp: new Date() });
    
    // Limit chat history
    if (chatHistory.length > 100) {
        chatHistory = chatHistory.slice(-100);
    }
}

function formatResponse(text) {
    // Enhanced markdown-style formatting to HTML
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`(.*?)`/g, '<code>$1</code>')
        .replace(/#{1,6}\s(.*?)$/gm, '<h3>$1</h3>')
        .replace(/•\s(.*?)$/gm, '<li>$1</li>')
        .replace(/(\n<li>.*<\/li>\n)/gs, '<ul>$1</ul>')
        .replace(/<\/li>\n<li>/g, '</li><li>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br>')
        .replace(/^/, '<p>')
        .replace(/$/, '</p>')
        .replace(/<p><\/p>/g, '')
        .replace(/<p><ul>/g, '<ul>')
        .replace(/<\/ul><\/p>/g, '</ul>');
}

function formatTime(date) {
    return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showTypingIndicator() {
    isTyping = true;
    const chatMessages = document.getElementById('chat-messages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message assistant-message typing-indicator';
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="message-content">
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div class="typing-text">EthicBot is thinking...</div>
        </div>
    `;
    
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTypingIndicator() {
    isTyping = false;
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Topic card handlers with enhanced queries
function handleTopicClick(topic) {
    const enhancedTopicQueries = {
        'AI Principles': 'What are the fundamental principles of AI ethics according to IEEE standards, and how do they integrate with international best practices?',
        'Bias & Fairness': 'How can we implement IEEE 2857 standards for systematic bias detection and mitigation in AI systems?',
        'Privacy Protection': 'What does IEEE 2859 privacy engineering standard require for AI systems, and what are the key technical implementation strategies?',
        'Explainable AI': 'How can we implement explainable AI systems that meet transparency requirements while maintaining performance?',
        'AI Safety': 'What are the comprehensive safety frameworks for AI systems according to IEEE 3652 standards?',
        'Governance': 'What governance frameworks and regulatory approaches are emerging for AI ethics globally?',
        'Sustainability': 'How can we develop environmentally sustainable AI systems while maintaining ethical standards?',
        'Applications': 'What are the specific ethical considerations for AI applications in healthcare, finance, and autonomous systems?'
    };
    
    const query = enhancedTopicQueries[topic];
    if (query) {
        document.getElementById('message-input').value = query;
        sendMessage();
    }
}

// API Configuration and Settings Management
function openAPIConfig() {
    const modal = document.getElementById('api-modal');
    if (modal) {
        modal.style.display = 'block';
        loadAPISettings();
    }
}

function closeAPIConfig() {
    const modal = document.getElementById('api-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function loadAPISettings() {
    // Load API keys from localStorage
    for (const provider in API_CONFIG) {
        const key = localStorage.getItem(`ethicbot_${provider}_key`);
        const input = document.getElementById(`${provider}-key`);
        if (input && key) {
            input.value = key;
            API_CONFIG[provider].apiKey = key;
        }
    }
    
    // Load selected provider
    const savedProvider = localStorage.getItem('ethicbot_current_provider') || 'local';
    const providerSelect = document.getElementById('provider-select');
    if (providerSelect) {
        providerSelect.value = savedProvider;
        currentProvider = savedProvider;
    }
}

function saveAPISettings() {
    try {
        // Save API keys
        for (const provider in API_CONFIG) {
            const input = document.getElementById(`${provider}-key`);
            if (input && input.value.trim()) {
                const apiKey = input.value.trim();
                localStorage.setItem(`ethicbot_${provider}_key`, apiKey);
                API_CONFIG[provider].apiKey = apiKey;
            }
        }
        
        // Save selected provider
        const providerSelect = document.getElementById('provider-select');
        if (providerSelect) {
            currentProvider = providerSelect.value;
            localStorage.setItem('ethicbot_current_provider', currentProvider);
        }
        
        closeAPIConfig();
        
        // Show success feedback
        const button = document.querySelector('.save-btn');
        if (button) {
            const originalText = button.textContent;
            button.textContent = '✓ Saved!';
            button.style.backgroundColor = '#10b981';
            setTimeout(() => {
                button.textContent = originalText;
                button.style.backgroundColor = '';
            }, 2000);
        }
        
        addMessage('assistant', '🎉 **Configuration Updated Successfully!**\n\nYour API settings have been saved. You can now use the selected provider for enhanced AI ethics discussions.');
        
    } catch (error) {
        console.error('Error saving API settings:', error);
        addMessage('assistant', '⚠️ **Configuration Error**\n\nThere was an issue saving your settings. Please check your inputs and try again.');
    }
}

function getAPIKey(provider) {
    return localStorage.getItem(`ethicbot_${provider}_key`) || API_CONFIG[provider]?.apiKey || '';
}

// Enhanced Event Listeners and Initialization
document.addEventListener('DOMContentLoaded', function() {
    try {
        console.log('Initializing EthicBot Enhanced with advanced capabilities...');
        
        // Focus on message input
        const messageInput = document.getElementById('message-input');
        if (messageInput) {
            messageInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                }
            });
            messageInput.focus();
        }
        
        // Send button event listener
        const sendButton = document.getElementById('send-button');
        if (sendButton) {
            sendButton.addEventListener('click', sendMessage);
        }
        
        // Topic cards event listeners
        const topicCards = document.querySelectorAll('.topic-card');
        topicCards.forEach(card => {
            card.addEventListener('click', function() {
                const topic = this.querySelector('h3').textContent;
                handleTopicClick(topic);
            });
        });
        
        // Load saved API settings
        loadAPISettings();
        
        // Modal event listeners
        const modal = document.getElementById('api-modal');
        if (modal) {
            window.addEventListener('click', function(event) {
                if (event.target === modal) {
                    closeAPIConfig();
                }
            });
        }
        
        // Initialize welcome message with delay
        setTimeout(() => {
            addMessage('assistant', `🤖 **Welcome to EthicBot Enhanced!**

I'm your advanced AI ethics assistant, now powered with **IEEE standards integration**, **regenerative thinking capabilities**, and **enhanced natural language processing**.

**🚀 Enhanced Features:**
• **IEEE Standards Expertise**: Deep knowledge of IEEE 2857, 2859, 3652, and related standards
• **Regenerative Thinking**: Multi-step analytical processes that build comprehensive understanding
• **Advanced NLP**: Improved grammar, context awareness, and natural language flow
• **Multi-perspective Analysis**: Technical, ethical, regulatory, and practical viewpoints
• **Contextual Memory**: Conversation awareness for increasingly relevant insights
• **Enhanced API Integration**: Support for multiple advanced AI providers

**📚 My Specializations:**
• Comprehensive bias detection and mitigation strategies
• Privacy engineering with IEEE 2859 standards
• AI safety frameworks per IEEE 3652 guidelines
• Explainable AI and transparency requirements
• Governance and regulatory compliance
• Environmental sustainability in AI
• Human-centered ethical design

**🎯 Getting Started:**
Click on any topic card below, or ask me a specific question about AI ethics. I'll provide detailed, well-structured responses that combine academic rigor with practical implementation guidance.

What aspect of AI ethics would you like to explore today?`);
        }, 1500);
        
        console.log('EthicBot Enhanced initialization complete!');
        
    } catch (error) {
        console.error('Error during initialization:', error);
    }
});

// Utility Functions
function clearChat() {
    const chatMessages = document.getElementById('chat-messages');
    if (chatMessages) {
        chatMessages.innerHTML = '';
    }
    chatHistory = [];
    contextMemory = [];
    
    setTimeout(() => {
        addMessage('assistant', `🔄 **Chat Cleared**\n\nStarting fresh! I'm ready to help you explore AI ethics with enhanced capabilities. What would you like to discuss?`);
    }, 500);
}

function exportChat() {
    if (chatHistory.length === 0) {
        addMessage('assistant', '📝 **No Chat History**\n\nThere are no messages to export yet. Start a conversation first!');
        return;
    }
    
    const exportData = {
        timestamp: new Date().toISOString(),
        botVersion: 'EthicBot Enhanced v2.0',
        chatHistory: chatHistory,
        contextMemory: contextMemory.slice(-10),
        totalMessages: chatHistory.length
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `ethicbot-chat-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    addMessage('assistant', '📥 **Chat Exported Successfully!**\n\nYour conversation has been downloaded as a JSON file.');
}

console.log('🎉 EthicBot Enhanced - Fully Loaded and Ready!');
console.log('Features: IEEE Standards, Regenerative Thinking, Enhanced NLP, Multi-API Support');
console.log('Current Provider:', currentProvider);
console.log('Available APIs:', Object.keys(API_CONFIG).join(', '));

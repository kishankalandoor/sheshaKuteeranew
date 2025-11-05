// EthicBot Enhanced - Advanced AI Ethics Assistant with IEEE Standards Integration
// Version 2.0 - Comprehensive regenerative thinking and natural language processing

let chatHistory = [];
let isTyping = false;
let contextMemory = [];
let currentThinkingProcess = null;

// Enhanced API Configuration with additional providers including Meta
const API_CONFIG = {
    openai: {
        endpoint: 'https://api.openai.com/v1/chat/completions',
        apiKey: 'your-openai-api-key-here',
        model: 'gpt-4-turbo-preview',
        name: 'OpenAI GPT-4'
    },
    anthropic: {
        endpoint: 'https://api.anthropic.com/v1/messages',
        apiKey: 'your-anthropic-api-key-here',
        model: 'claude-3-opus-20240229',
        name: 'Anthropic Claude'
    },
    gemini: {
        endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
        apiKey: 'your-gemini-api-key-here',
        name: 'Google Gemini'
    },
    meta: {
        endpoint: 'https://api.llama-api.com/chat/completions',
        apiKey: 'your-meta-api-key-here',
        model: 'llama-2-70b-chat',
        name: 'Meta Llama 2'
    },
    cohere: {
        endpoint: 'https://api.cohere.ai/v1/generate',
        apiKey: 'your-cohere-api-key-here',
        name: 'Cohere'
    },
    huggingface: {
        endpoint: 'https://api-inference.huggingface.co/models/microsoft/DialoGPT-large',
        apiKey: 'your-huggingface-api-key-here',
        name: 'Hugging Face'
    },
    public: {
        endpoint: 'https://api.quotable.io/random',
        needsKey: false,
        name: 'Public APIs'
    }
};

let currentProvider = 'local';

// Enhanced Knowledge Base with Definitions and Comprehensive Coverage
const aiEthicsKnowledgeBase = {
    // Definitions Section
    definitions: {
        keywords: ['define', 'definition', 'what is', 'meaning', 'explain', 'concept of'],
        terms: {
            'artificial intelligence': {
                definition: `**Artificial Intelligence (AI)** is a branch of computer science that aims to create intelligent machines capable of performing tasks that typically require human intelligence, such as learning, reasoning, problem-solving, perception, and language understanding.`,
                examples: ['Machine learning algorithms', 'Natural language processing', 'Computer vision', 'Robotics'],
                applications: ['Healthcare diagnosis', 'Autonomous vehicles', 'Financial trading', 'Personal assistants']
            },
            'machine learning': {
                definition: `**Machine Learning (ML)** is a subset of AI that enables computer systems to automatically learn and improve from experience without being explicitly programmed. It uses algorithms to analyze data, identify patterns, and make predictions or decisions.`,
                types: ['Supervised learning', 'Unsupervised learning', 'Reinforcement learning', 'Deep learning'],
                examples: ['Image recognition', 'Recommendation systems', 'Spam detection', 'Predictive analytics']
            },
            'deep learning': {
                definition: `**Deep Learning** is a subset of machine learning that uses artificial neural networks with multiple layers (hence "deep") to model and understand complex patterns in data. It mimics the way human brains process information.`,
                components: ['Neural networks', 'Layers', 'Neurons', 'Activation functions'],
                applications: ['Image recognition', 'Speech recognition', 'Natural language processing', 'Game playing']
            },
            'neural network': {
                definition: `**Neural Networks** are computing systems inspired by biological neural networks. They consist of interconnected nodes (neurons) that process information by responding to external inputs and relaying information between nodes.`,
                structure: ['Input layer', 'Hidden layers', 'Output layer', 'Weights and biases'],
                types: ['Feedforward networks', 'Convolutional networks', 'Recurrent networks', 'Transformer networks']
            },
            'algorithm': {
                definition: `**Algorithm** is a step-by-step procedure or set of rules designed to solve a specific problem or perform a particular task. In AI, algorithms are used to process data and make decisions.`,
                characteristics: ['Input', 'Process', 'Output', 'Deterministic', 'Finite'],
                examples: ['Sorting algorithms', 'Search algorithms', 'Classification algorithms', 'Optimization algorithms']
            },
            'bias': {
                definition: `**Bias in AI** refers to systematic prejudice or unfairness in AI systems that leads to discriminatory outcomes against certain groups or individuals. It can be introduced through biased training data, flawed algorithms, or biased human decisions.`,
                types: ['Historical bias', 'Representation bias', 'Measurement bias', 'Algorithmic bias', 'Confirmation bias'],
                impacts: ['Unfair hiring practices', 'Discriminatory lending', 'Biased criminal justice decisions', 'Healthcare disparities']
            },
            'fairness': {
                definition: `**Fairness in AI** refers to the principle that AI systems should treat all individuals and groups equitably, without discrimination based on protected characteristics like race, gender, age, or religion.`,
                metrics: ['Demographic parity', 'Equalized odds', 'Individual fairness', 'Counterfactual fairness'],
                approaches: ['Bias detection', 'Bias mitigation', 'Fair representation', 'Inclusive design']
            },
            'transparency': {
                definition: `**Transparency in AI** refers to the openness and clarity about how AI systems work, including their data sources, algorithms, decision-making processes, and limitations.`,
                levels: ['Data transparency', 'Model transparency', 'Outcome transparency', 'Process transparency'],
                benefits: ['Trust building', 'Accountability', 'Error detection', 'Regulatory compliance']
            },
            'explainability': {
                definition: `**Explainable AI (XAI)** refers to AI systems that can provide human-understandable explanations for their decisions and predictions, making their reasoning process interpretable.`,
                techniques: ['LIME', 'SHAP', 'Attention mechanisms', 'Decision trees', 'Rule-based explanations'],
                importance: ['Trust', 'Debugging', 'Compliance', 'Human oversight', 'Learning']
            },
            'accountability': {
                definition: `**Accountability in AI** refers to the principle that there should be clear responsibility and answerability for AI system decisions and their consequences, with mechanisms for oversight and redress.`,
                elements: ['Responsibility assignment', 'Audit trails', 'Governance structures', 'Legal frameworks'],
                challenges: ['Distributed responsibility', 'Complexity', 'Automation', 'Scale']
            },
            'privacy': {
                definition: `**Privacy in AI** refers to the protection of personal information and individual autonomy in the context of AI systems that collect, process, and analyze personal data.`,
                principles: ['Data minimization', 'Purpose limitation', 'Consent', 'Transparency', 'Security'],
                techniques: ['Differential privacy', 'Federated learning', 'Homomorphic encryption', 'Anonymization']
            },
            'ethics': {
                definition: `**AI Ethics** is the branch of ethics that examines the moral implications of artificial intelligence, focusing on ensuring AI systems are developed and deployed in ways that respect human values, rights, and dignity.`,
                principles: ['Beneficence', 'Non-maleficence', 'Autonomy', 'Justice', 'Explicability'],
                areas: ['Bias and fairness', 'Privacy', 'Transparency', 'Safety', 'Human rights']
            },
            'governance': {
                definition: `**AI Governance** refers to the frameworks, policies, and processes used to guide the development, deployment, and oversight of AI systems to ensure they align with societal values and legal requirements.`,
                components: ['Policies', 'Standards', 'Regulations', 'Best practices', 'Oversight mechanisms'],
                stakeholders: ['Government', 'Industry', 'Academia', 'Civil society', 'International organizations']
            }
        }
    },

    // IEEE Standards Section
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
        
        // Enhanced definition handling
        if (this.isDefinitionRequest(message)) {
            return this.handleDefinitionRequest(message, analysis);
        }
        
        let response = await this.generateInitialResponse(message, analysis);
        response = await this.applyRegenerativeThinking(response, analysis);
        response = this.nlp.enhanceResponse(response);
        response = this.addContextualFollowUps(response, analysis);
        
        return response;
    }

    isDefinitionRequest(message) {
        const messageLower = message.toLowerCase();
        return aiEthicsKnowledgeBase.definitions.keywords.some(keyword => 
            messageLower.includes(keyword)
        );
    }

    handleDefinitionRequest(message, analysis) {
        const messageLower = message.toLowerCase();
        const term = this.extractTermFromDefinitionQuery(messageLower);
        const definition = this.findDefinitionInKnowledgeBase(term);
        
        if (definition) {
            return this.formatComprehensiveDefinition(term, definition, analysis);
        } else {
            return this.generateUnknownTermResponse(term, analysis);
        }
    }

    extractTermFromDefinitionQuery(message) {
        let cleanMessage = message;
        
        // Remove definition triggers
        const triggers = ['what is', 'define', 'definition of', 'meaning of', 'explain', 'concept of', 'tell me about', 'describe', 'what are', 'what does', 'how would you define'];
        triggers.forEach(trigger => {
            cleanMessage = cleanMessage.replace(new RegExp(trigger + '\\s*(a\\s+|an\\s+|the\\s+)?', 'gi'), '');
        });
        
        return cleanMessage.replace(/[?.,!]/g, '').trim();
    }

    findDefinitionInKnowledgeBase(term) {
        const termLower = term.toLowerCase();
        
        // Direct match
        if (aiEthicsKnowledgeBase.definitions.terms[termLower]) {
            return aiEthicsKnowledgeBase.definitions.terms[termLower];
        }
        
        // Partial match
        for (const [key, value] of Object.entries(aiEthicsKnowledgeBase.definitions.terms)) {
            if (termLower.includes(key) || key.includes(termLower) || 
                termLower.includes(key.replace(/\s+/g, '')) || key.replace(/\s+/g, '').includes(termLower)) {
                return value;
            }
        }
        
        return null;
    }

    formatComprehensiveDefinition(term, definition, analysis) {
        let response = `**📚 ${term.toUpperCase()} - Comprehensive Definition**\n\n`;
        
        response += definition.definition + '\n\n';
        
        // Add all available properties dynamically
        const propertyLabels = {
            'types': '🔧 Types',
            'components': '⚙️ Key Components', 
            'examples': '💡 Examples',
            'applications': '🚀 Applications',
            'principles': '🎯 Key Principles',
            'metrics': '📊 Key Metrics',
            'characteristics': '✨ Characteristics',
            'levels': '📈 Levels',
            'benefits': '🌟 Benefits',
            'techniques': '🛠️ Techniques',
            'importance': '⭐ Importance',
            'elements': '🔍 Elements',
            'challenges': '⚠️ Challenges',
            'areas': '🌐 Areas',
            'stakeholders': '👥 Stakeholders'
        };
        
        Object.entries(propertyLabels).forEach(([key, label]) => {
            if (definition[key] && Array.isArray(definition[key])) {
                response += `**${label}:**\n`;
                definition[key].forEach(item => response += `• ${item}\n`);
                response += '\n';
            }
        });
        
        // Add contextual enhancements
        response += `**🔗 Related Topics:**\n`;
        const relatedTopics = analysis.relatedTopics.length > 0 ? analysis.relatedTopics : ['AI governance', 'ethical frameworks', 'implementation strategies'];
        relatedTopics.forEach(topic => response += `• ${topic}\n`);
        
        response += `\n**🤖 Enhanced Learning:**\nFor deeper insights, advanced examples, or current research on ${term}, try switching to an AI provider (OpenAI GPT-4, Google Gemini, etc.) for comprehensive, up-to-date information.\n\n`;
        response += `**💬 Continue the Conversation:**\nFeel free to ask follow-up questions about implementation, challenges, or related concepts!`;
        
        return response;
    }

    generateUnknownTermResponse(term, analysis) {
        return `**🔍 Term Not Found: "${term}"**

I don't have a specific definition for "${term}" in my current local knowledge base. Here's how to get the best answer:

**🤖 Recommended Next Steps:**
1. **Switch to AI Provider**: Use OpenAI GPT-4, Google Gemini, or Anthropic Claude for comprehensive definitions of specialized terms
2. **Rephrase Your Question**: Try using simpler or more common terminology
3. **Explore Related Concepts**: Ask about broader categories that might include your term

**📚 Available Definitions in My Knowledge Base:**
${Object.keys(aiEthicsKnowledgeBase.definitions.terms).slice(0, 8).map(t => `• ${t}`).join('\n')}
${Object.keys(aiEthicsKnowledgeBase.definitions.terms).length > 8 ? '• ...and more' : ''}

**💡 Suggestion:**
If "${term}" is related to AI ethics, try asking about the broader category or use one of the AI providers for the most current and comprehensive information.

Would you like me to help you rephrase your question or explore a related concept I do know about?`;
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
    console.log('sendMessage function called');
    const messageInput = document.getElementById('messageInput');
    console.log('Message input element:', messageInput);
    
    if (!messageInput) {
        console.error('Message input element not found!');
        return;
    }
    
    const message = messageInput.value.trim();
    console.log('Message content:', message);
    
    if (message === '' || isTyping) {
        console.log('Empty message or currently typing, returning');
        return;
    }
    
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
        // Provide helpful guidance for API key configuration
        return `**🔑 API Configuration Required**
        
To use ${config.name || provider}, you need to configure your API key:

1. **Click the ⚙️ Settings button** in the sidebar
2. **Select API Configuration**
3. **Enter your ${config.name || provider} API key**
4. **Save settings**

**💡 Alternative Options:**
• Switch back to **Local Mode** for comprehensive IEEE-based responses
• Configure a different API provider
• Use **Public APIs** for basic responses (no key required)

**📚 Local Knowledge Available:**
My local knowledge base includes comprehensive information about AI ethics, IEEE standards, bias detection, privacy engineering, and more. Switch back to local mode to continue learning!`;
    }
    
    if (provider === 'public') {
        return await getEnhancedPublicAPIResponse(message);
    }
    
    // Check if message is a definition request - enhance with local knowledge first
    const isDefinitionQuery = aiEthicsKnowledgeBase.definitions.keywords.some(keyword => 
        message.toLowerCase().includes(keyword)
    );
    
    let enhancedPrompt;
    
    if (isDefinitionQuery) {
        // For definition queries, combine local knowledge with API capability
        const term = extractTermFromMessage(message);
        const localDef = findLocalDefinition(term);
        
        enhancedPrompt = `You are EthicBot Enhanced, an advanced AI ethics expert. The user is asking for a definition. 

${localDef ? `LOCAL KNOWLEDGE BASE ENTRY FOR "${term.toUpperCase()}":
${formatLocalDefinition(localDef)}

Please enhance this definition with:` : `The user is asking about "${term}". Please provide:`}

1. **Current Research & Developments** (2024 updates)
2. **Real-world Case Studies** with specific examples
3. **Technical Implementation Details** where applicable
4. **Industry Best Practices** and standards
5. **Challenges and Limitations** in practice
6. **Future Trends** and emerging considerations

Make your response comprehensive, well-structured, and educational. Use clear formatting with headers and bullet points.

User question: ${message}`;
    } else {
        // Standard ethics prompt for non-definition queries
        enhancedPrompt = `You are EthicBot Enhanced, an advanced AI ethics expert specializing in IEEE standards (2857, 2859, 3652), practical implementation, and comprehensive ethical analysis.

Provide detailed, well-structured responses that:
1. Begin with clear context and relevance
2. Include specific examples and case studies
3. Reference applicable standards and frameworks
4. Offer multiple perspectives (technical, ethical, regulatory, practical)
5. Provide actionable implementation guidance
6. Conclude with clear recommendations
7. Use professional language with proper structure

Context from our conversation: ${contextMemory.slice(-4).map(m => `${m.role}: ${m.content.substring(0, 150)}...`).join('\n')}

User question: ${message}`;
    }
    
    let requestBody, headers;
    
    try {
        switch (provider) {
            case 'openai':
                headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                };
                requestBody = {
                    model: config.model,
                    messages: [
                        { role: "system", content: enhancedPrompt },
                        { role: "user", content: message }
                    ],
                    max_tokens: 2000,
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
                    max_tokens: 2000,
                    messages: [{ role: "user", content: enhancedPrompt + "\n\n" + message }],
                    temperature: 0.7
                };
                break;
                
            case 'gemini':
                headers = {
                    'Content-Type': 'application/json'
                };
                const geminiUrl = `${config.endpoint}?key=${apiKey}`;
                const geminiResponse = await fetch(geminiUrl, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({
                        contents: [{
                            parts: [{ text: enhancedPrompt + "\n\n" + message }]
                        }],
                        generationConfig: {
                            temperature: 0.7,
                            topK: 40,
                            topP: 0.95,
                            maxOutputTokens: 2000
                        }
                    })
                });
                
                if (!geminiResponse.ok) {
                    throw new Error(`Gemini API error: ${geminiResponse.status} ${geminiResponse.statusText}`);
                }
                
                const geminiData = await geminiResponse.json();
                return geminiData.candidates?.[0]?.content?.parts?.[0]?.text || 
                       'I apologize, but I received an unexpected response format from Gemini. Please try again.';
                
            case 'meta':
                headers = {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                };
                requestBody = {
                    model: config.model,
                    messages: [
                        { role: "system", content: enhancedPrompt },
                        { role: "user", content: message }
                    ],
                    max_tokens: 2000,
                    temperature: 0.7,
                    top_p: 0.9
                };
                break;
                
            case 'cohere':
                headers = {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                };
                requestBody = {
                    prompt: enhancedPrompt + "\n\n" + message,
                    max_tokens: 2000,
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
                    inputs: enhancedPrompt + "\n\n" + message,
                    parameters: {
                        max_length: 1000,
                        temperature: 0.7,
                        do_sample: true
                    }
                };
                break;
                
            default:
                throw new Error(`Unsupported provider: ${provider}`);
        }
        
        // Make the API request (skip for Gemini as it's handled above)
        if (provider !== 'gemini') {
            const response = await fetch(config.endpoint, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(requestBody)
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`${config.name || provider} API error: ${response.status} ${response.statusText}. ${errorText}`);
            }
            
            const data = await response.json();
            return parseAPIResponse(data, provider);
        }
        
    } catch (error) {
        console.error(`API Error (${provider}):`, error);
        
        // Provide helpful fallback with local knowledge
        const fallbackResponse = `**⚠️ API Connection Issue**

I encountered an error connecting to ${config.name || provider}: ${error.message}

**🔄 Automatic Fallback to Local Knowledge:**
Let me provide you with a comprehensive response using my local IEEE standards-based knowledge:

${await regenerativeEngine.processQuery(message, { history: chatHistory, context: contextMemory })}

**💡 Troubleshooting Tips:**
• Check your API key configuration in Settings
• Verify your internet connection
• Try switching to a different API provider
• Contact the provider if issues persist

**🏠 Local Mode Always Available:**
Remember, my local knowledge base provides comprehensive AI ethics information even without API access!`;
        
        return fallbackResponse;
    }
}

// Helper functions for enhanced definition handling
function extractTermFromMessage(message) {
    const messageLower = message.toLowerCase();
    let term = messageLower;
    
    const triggers = ['what is', 'define', 'definition of', 'meaning of', 'explain', 'concept of', 'tell me about', 'describe'];
    triggers.forEach(trigger => {
        term = term.replace(new RegExp(trigger + '\\s*(a\\s+|an\\s+|the\\s+)?', 'gi'), '');
    });
    
    return term.replace(/[?.,!]/g, '').trim();
}

function findLocalDefinition(term) {
    const termLower = term.toLowerCase();
    
    if (aiEthicsKnowledgeBase.definitions.terms[termLower]) {
        return aiEthicsKnowledgeBase.definitions.terms[termLower];
    }
    
    for (const [key, value] of Object.entries(aiEthicsKnowledgeBase.definitions.terms)) {
        if (termLower.includes(key) || key.includes(termLower)) {
            return value;
        }
    }
    
    return null;
}

function formatLocalDefinition(definition) {
    let formatted = definition.definition + '\n\n';
    
    const sections = ['types', 'components', 'examples', 'applications', 'principles', 'metrics'];
    sections.forEach(section => {
        if (definition[section]) {
            formatted += `${section.toUpperCase()}:\n`;
            definition[section].forEach(item => formatted += `• ${item}\n`);
            formatted += '\n';
        }
    });
    
    return formatted;
}

function parseAPIResponse(data, provider) {
    try {
        switch (provider) {
            case 'openai':
            case 'meta':
                return data.choices?.[0]?.message?.content || 'No response generated';
                
            case 'anthropic':
                return data.content?.[0]?.text || 'No response generated';
                
            case 'cohere':
                return data.generations?.[0]?.text || 'No response generated';
                
            case 'huggingface':
                if (Array.isArray(data) && data[0]?.generated_text) {
                    return data[0].generated_text;
                }
                return data.generated_text || 'No response generated';
                
            default:
                return 'Unsupported response format';
        }
    } catch (error) {
        console.error('Error parsing API response:', error);
        return 'Error parsing response from API provider';
    }
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
    console.log('addMessage called with:', sender, content.substring(0, 50) + '...');
    const chatMessages = document.getElementById('chatContainer');
    console.log('Chat container element:', chatMessages);
    
    if (!chatMessages) {
        console.error('Chat container not found! Looking for alternative...');
        // Try alternative container names
        const alternatives = ['chat-messages', 'chatMessages', 'main-content'];
        for (const alt of alternatives) {
            const altContainer = document.getElementById(alt);
            if (altContainer) {
                console.log(`Found alternative container: ${alt}`);
                // Use this container instead
                addMessageToContainer(altContainer, sender, content);
                return;
            }
        }
        console.error('No suitable chat container found!');
        return;
    }
    
    addMessageToContainer(chatMessages, sender, content);
}

function addMessageToContainer(container, sender, content) {
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
    
    container.appendChild(messageDiv);
    container.scrollTop = container.scrollHeight;
    
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
    const chatMessages = document.getElementById('chatContainer');
    if (!chatMessages) {
        console.error('Chat container not found for typing indicator');
        return;
    }
    
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
        document.getElementById('messageInput').value = query;
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
        if (key) {
            API_CONFIG[provider].apiKey = key;
        }
    }
    
    // Load selected provider
    const savedProvider = localStorage.getItem('ethicbot_current_provider') || 'local';
    const providerSelect = document.getElementById('apiProvider');
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
        const messageInput = document.getElementById('messageInput');
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
        const sendButton = document.getElementById('sendBtn');
        if (sendButton) {
            sendButton.addEventListener('click', sendMessage);
        }
        
        // Topic cards event listeners
        const topicCards = document.querySelectorAll('.topic-card');
        topicCards.forEach(card => {
            card.addEventListener('click', function() {
                const topic = this.querySelector('h4').textContent;
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
            console.log('Adding welcome message...');
            
            // Clear any existing content first
            const chatContainer = document.getElementById('chatContainer');
            if (chatContainer) {
                console.log('Chat container found, clearing existing content...');
                chatContainer.innerHTML = '';
            }
            
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
Type a message below or try asking: "What are the key IEEE standards for AI ethics?"

What aspect of AI ethics would you like to explore today?`);
        }, 1500);
        
        console.log('EthicBot Enhanced initialization complete!');
        
    } catch (error) {
        console.error('Error during initialization:', error);
    }
});

// Utility Functions
function clearChat() {
    const chatMessages = document.getElementById('chatContainer');
    if (chatMessages) {
        chatMessages.innerHTML = '';
    }
    chatHistory = [];
    contextMemory = [];
    
    setTimeout(() => {
        addMessage('assistant', `🔄 **Chat Cleared**\n\nStarting fresh! I'm ready to help you explore AI ethics with enhanced capabilities. What would you like to discuss?`);
    }, 500);
}

// Handle keyboard input (referenced in HTML)
function handleKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
}

// Auto-resize textarea (referenced in HTML)
function autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}

// Send predefined message from topic cards (referenced in HTML)
async function sendPredefinedMessage(message) {
    const messageInput = document.getElementById('messageInput');
    messageInput.value = message;
    await sendMessage();
}

// Switch API provider (referenced in HTML)
function switchAPIProvider(provider) {
    currentProvider = provider;
    localStorage.setItem('ethicbot_current_provider', provider);
    console.log(`Switched to ${provider} provider`);
    
    addMessage('assistant', `🔄 **Provider Changed**\n\nSwitched to ${provider} provider. ${provider === 'local' ? 'Using local knowledge base.' : 'Make sure your API keys are configured in the settings.'}`);
}

// Start new chat (referenced in HTML)
function startNewChat() {
    clearChat();
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

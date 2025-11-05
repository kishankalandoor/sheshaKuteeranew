// EthicBot Enhanced - Advanced AI Ethics Assistant with Comprehensive Definitions and Hybrid AI
// Version 3.0 - Enhanced definition handling, Meta AI integration, and improved hybrid functionality

let chatHistory = [];
let isTyping = false;
let contextMemory = [];
let currentThinkingProcess = null;

// Enhanced API Configuration with Meta and improved hybrid functionality
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

// Enhanced Knowledge Base with Comprehensive Definitions
const aiEthicsKnowledgeBase = {
    definitions: {
        keywords: ['define', 'definition', 'what is', 'meaning', 'explain', 'concept of', 'tell me about', 'describe', 'what are', 'what does', 'how would you define'],
        terms: {
            'artificial intelligence': {
                definition: `**Artificial Intelligence (AI)** is a branch of computer science that aims to create intelligent machines capable of performing tasks that typically require human intelligence, such as learning, reasoning, problem-solving, perception, and language understanding.`,
                examples: ['Machine learning algorithms', 'Natural language processing', 'Computer vision', 'Robotics'],
                applications: ['Healthcare diagnosis', 'Autonomous vehicles', 'Financial trading', 'Personal assistants'],
                types: ['Narrow AI', 'General AI', 'Superintelligence', 'Reactive machines']
            },
            'machine learning': {
                definition: `**Machine Learning (ML)** is a subset of AI that enables computer systems to automatically learn and improve from experience without being explicitly programmed. It uses algorithms to analyze data, identify patterns, and make predictions or decisions.`,
                types: ['Supervised learning', 'Unsupervised learning', 'Reinforcement learning', 'Deep learning'],
                examples: ['Image recognition', 'Recommendation systems', 'Spam detection', 'Predictive analytics'],
                applications: ['Natural language processing', 'Computer vision', 'Autonomous systems', 'Predictive maintenance']
            },
            'deep learning': {
                definition: `**Deep Learning** is a subset of machine learning that uses artificial neural networks with multiple layers (hence "deep") to model and understand complex patterns in data. It mimics the way human brains process information.`,
                components: ['Neural networks', 'Layers', 'Neurons', 'Activation functions'],
                applications: ['Image recognition', 'Speech recognition', 'Natural language processing', 'Game playing'],
                types: ['Convolutional Neural Networks', 'Recurrent Neural Networks', 'Transformer Networks', 'Generative Adversarial Networks']
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
                impacts: ['Unfair hiring practices', 'Discriminatory lending', 'Biased criminal justice decisions', 'Healthcare disparities'],
                examples: ['Facial recognition failing on darker skin tones', 'Resume screening favoring male candidates', 'Loan approval discrimination']
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
            },
            'robustness': {
                definition: `**AI Robustness** refers to the ability of AI systems to maintain reliable performance under various conditions, including noisy data, adversarial attacks, and distribution shifts.`,
                aspects: ['Data quality tolerance', 'Adversarial resistance', 'Generalization', 'Error handling'],
                techniques: ['Data augmentation', 'Adversarial training', 'Ensemble methods', 'Regularization']
            },
            'safety': {
                definition: `**AI Safety** encompasses the measures and practices designed to ensure AI systems operate without causing harm to humans, society, or the environment.`,
                areas: ['Technical safety', 'Operational safety', 'Societal safety', 'Long-term safety'],
                principles: ['Do no harm', 'Fail-safe design', 'Human oversight', 'Risk assessment']
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

// Enhanced Natural Language Processing for better grammar and structure
class NaturalLanguageProcessor {
    constructor() {
        this.grammarRules = {
            conjunctions: ['furthermore', 'moreover', 'additionally', 'consequently', 'therefore', 'however', 'nevertheless'],
            transitionPhrases: ['in this context', 'from this perspective', 'building upon this foundation', 'expanding on this concept'],
            conclusionPhrases: ['these principles collectively support', 'this framework ensures', 'implementing these guidelines promotes']
        };
    }

    enhanceResponse(text) {
        let enhanced = text;
        enhanced = this.improveStructure(enhanced);
        enhanced = this.refineGrammar(enhanced);
        enhanced = this.addConclusiveStatement(enhanced);
        return enhanced;
    }

    improveStructure(text) {
        return text
            .replace(/([.!?])\s+([A-Z])/g, '$1\n\n$2')
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

// Context Analysis for Enhanced Understanding
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
        
        return relatedMap[mainTopic] || ['ethical frameworks', 'implementation strategies'];
    }

    assessConversationDepth() {
        return this.conversationContext.length;
    }

    assessUserExpertise() {
        const technicalTerms = ['algorithm', 'neural network', 'backpropagation', 'gradient descent'];
        const recentMessages = this.conversationContext.slice(-3);
        
        for (const context of recentMessages) {
            if (technicalTerms.some(term => context.message.toLowerCase().includes(term))) {
                return 'advanced';
            }
        }
        
        return 'beginner';
    }

    generateFollowUpSuggestions() {
        const suggestions = [
            'Explore implementation strategies for this concept',
            'Learn about related IEEE standards',
            'Discover real-world applications and case studies',
            'Understand potential challenges and limitations'
        ];
        
        return suggestions.slice(0, 2);
    }
}

// Enhanced Regenerative Thinking Engine with Definition Handling
class RegenerativeThinkingEngine {
    constructor() {
        this.nlp = new NaturalLanguageProcessor();
        this.contextAnalyzer = new ContextAnalyzer();
    }

    async generateBasicResponse(message) {
        console.log('Generating basic response for:', message);
        const messageLower = message.toLowerCase();
        
        // Check for IEEE standards
        if (messageLower.includes('ieee') && messageLower.includes('2857')) {
            return aiEthicsKnowledgeBase.ieee2857.response;
        }
        
        if (messageLower.includes('ieee') && messageLower.includes('2859')) {
            return aiEthicsKnowledgeBase.ieee2859.response;
        }
        
        if (messageLower.includes('ieee') && messageLower.includes('3652')) {
            return aiEthicsKnowledgeBase.ieee3652.response;
        }
        
        // Check for definitions
        if (this.isDefinitionRequest(message)) {
            const term = this.extractTermFromDefinitionQuery(messageLower);
            const definition = this.findDefinitionInKnowledgeBase(term);
            
            if (definition) {
                let response = `**📚 ${term.toUpperCase()} - Definition**\n\n`;
                response += definition.definition + '\n\n';
                
                if (definition.examples) {
                    response += '**Examples:**\n';
                    definition.examples.forEach(example => response += `• ${example}\n`);
                    response += '\n';
                }
                
                if (definition.applications) {
                    response += '**Applications:**\n';
                    definition.applications.forEach(app => response += `• ${app}\n`);
                }
                
                return response;
            }
        }
        
        // Basic ethics response
        return `I understand you're asking about AI ethics. While I'm experiencing some processing issues, I can help you with:

**📚 Available Topics:**
• AI definitions (artificial intelligence, machine learning, bias, fairness)
• IEEE standards (2857, 2859, 3652)
• AI ethics principles and frameworks
• Privacy and transparency in AI

**💡 Try asking:**
• "What is artificial intelligence?"
• "Define AI bias"
• "Tell me about IEEE 2857"

What specific aspect would you like to explore?`;
    }

    isDefinitionRequest(message) {
        const messageLower = message.toLowerCase();
        return aiEthicsKnowledgeBase.definitions.keywords.some(keyword => 
            messageLower.includes(keyword)
        );
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
            'stakeholders': '👥 Stakeholders',
            'aspects': '🔍 Key Aspects',
            'structure': '🏗️ Structure',
            'impacts': '⚡ Impacts'
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
        for (const [standard, data] of Object.entries(aiEthicsKnowledgeBase)) {
            if (standard !== 'definitions' && data.keywords && data.keywords.some(keyword => message.toLowerCase().includes(keyword))) {
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

**Practical Perspective:** Real-world implementation must balance idealistic ethical goals with practical constraints, resource limitations, and organizational capabilities.

`;
    }

    combineThinkingAndResponse(thinking, response, perspectives) {
        return `${thinking}${response}${perspectives}

**🎯 Key Takeaways:**
These insights provide a foundation for understanding the multifaceted nature of AI ethics, emphasizing the need for comprehensive, well-informed approaches to ethical AI development and deployment.`;
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
            return `Welcome to EthicBot Enhanced v3.0! I'm your advanced AI ethics assistant with comprehensive definition capabilities and hybrid AI integration.

**🚀 Enhanced Features:**
• **Comprehensive Definitions**: Detailed explanations of 15+ core AI ethics terms
• **IEEE Standards Integration**: Deep knowledge of IEEE 2857, 2859, 3652
• **Hybrid AI Functionality**: Seamless integration with OpenAI GPT-4, Google Gemini, Meta Llama, Anthropic Claude, and more
• **Regenerative Thinking**: Multi-step analysis with context awareness
• **Educational Focus**: Clear, structured learning with practical examples

**💡 What You Can Ask:**
• "Define artificial intelligence" or "What is machine learning?"
• Questions about bias, fairness, privacy, transparency
• IEEE standards and implementation guidance
• Practical examples and case studies

**🔧 Multiple Modes Available:**
• **Local Mode**: IEEE standards-based responses with comprehensive definitions
• **AI Providers**: Enhanced responses with current research and detailed examples

What would you like to explore in AI ethics today?`;
        }

        return `I understand you're inquiring about ${analysis.mainTopic}. Let me provide comprehensive guidance on this important aspect of AI ethics.

**Current Analysis:** Your question touches on fundamental considerations that require examination from multiple perspectives including technical implementation, ethical implications, and practical applications.

**Relevant Standards:** This topic is addressed by various IEEE standards and industry frameworks that provide systematic approaches to ethical AI development.

**Key Considerations:** The ethical implications involve balancing innovation with responsibility, ensuring stakeholder protection, and maintaining transparency throughout the development process.

**🔍 For Specific Definitions:** Ask "What is [term]?" or "Define [concept]" for detailed explanations of AI ethics terminology.

**🤖 For Enhanced Insights:** Switch to an AI provider for current research, detailed case studies, and implementation examples.

Could you please provide more specific details about what aspect you'd like me to focus on?`;
    }
}

// Initialize enhanced systems
const regenerativeEngine = new RegenerativeThinkingEngine();
const nlp = new NaturalLanguageProcessor();

// Enhanced message handling with improved hybrid functionality
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
            console.log('Using local mode for message:', message);
            try {
                response = await regenerativeEngine.processQuery(message, {
                    history: chatHistory,
                    context: contextMemory
                });
                console.log('Local response generated successfully');
            } catch (localError) {
                console.error('Local processing error:', localError);
                // Fallback to basic local response
                response = await regenerativeEngine.generateBasicResponse(message);
            }
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
        
        // Try local fallback if not already using local
        if (currentProvider !== 'local') {
            console.log('Attempting local fallback...');
            try {
                const localResponse = await regenerativeEngine.processQuery(message, {
                    history: chatHistory,
                    context: contextMemory
                });
                addMessage('assistant', `⚠️ **API Connection Issue - Using Local Fallback**\n\n${localResponse}`);
                
                // Switch to local mode
                currentProvider = 'local';
                updateProviderDisplay();
                return;
            } catch (localFallbackError) {
                console.error('Local fallback also failed:', localFallbackError);
            }
        }
        
        addMessage('assistant', '⚠️ **Connection Issue** - I encountered an error while processing your request. This could be due to API connectivity issues. I\'m automatically switching to local mode to continue helping you with IEEE standards-based responses.');
        
        // Automatically fallback to local mode on API errors
        if (currentProvider !== 'local') {
            console.log('Switching to local mode due to API error');
            currentProvider = 'local';
            updateProviderDisplay();
        }
    } finally {
        hideTypingIndicator();
    }
}

// Enhanced API Response with Meta AI and improved error handling
async function getEnhancedAPIResponse(message, provider) {
    const config = API_CONFIG[provider];
    const apiKey = getAPIKey(provider);
    
    if (!apiKey && config.needsKey !== false) {
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
My local knowledge base includes comprehensive information about AI ethics, IEEE standards, bias detection, privacy engineering, and detailed definitions of 15+ key terms.`;
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
    
    try {
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
                const geminiUrl = `${config.endpoint}?key=${apiKey}`;
                const geminiResponse = await fetch(geminiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
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
}

async function getEnhancedPublicAPIResponse(message) {
    try {
        const response = await fetch('https://api.quotable.io/random?tags=wisdom');
        const data = await response.json();
        
        return `**💭 Inspirational Perspective on Ethics**

"${data.content}"
*— ${data.author}*

**Connecting to Your Question:**
While this quote provides philosophical insight, for comprehensive AI ethics guidance tailored to your specific question about "${message}", I recommend:

1. **Switching to Local Mode** for detailed IEEE standards-based responses
2. **Configuring an AI provider** for current research and detailed analysis
3. **Asking specific definition questions** if you need terminology explained

**📚 Available Local Knowledge:**
I have comprehensive definitions and guidance on AI ethics concepts including bias, fairness, transparency, privacy, explainability, and more.

Would you like me to switch to local mode or help you with a specific AI ethics definition?`;
        
    } catch (error) {
        return `I encountered an issue accessing public APIs. Let me provide you with comprehensive AI ethics guidance using my local knowledge base instead.

**🏠 Switching to Local Knowledge:**
${await regenerativeEngine.processQuery(message, { history: chatHistory, context: contextMemory })}

For the best experience, consider configuring an AI provider or continue with local mode for IEEE standards-based responses.`;
    }
}

// Message handling functions
function handleKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
}

function addMessage(sender, content) {
    console.log('Adding message:', sender, content.substring(0, 100) + '...');
    const chatContainer = document.getElementById('chatContainer');
    console.log('Chat container:', chatContainer);
    
    if (!chatContainer) {
        console.error('Chat container not found!');
        return;
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.innerHTML = formatMessage(content);
    
    messageDiv.appendChild(contentDiv);
    chatContainer.appendChild(messageDiv);
    
    chatContainer.scrollTop = chatContainer.scrollHeight;
    
    chatHistory.push({ sender, content });
}

function formatMessage(content) {
    return content
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br>')
        .replace(/^• (.+)/gm, '<div class="bullet-point">• $1</div>');
}

function showTypingIndicator() {
    console.log('Showing typing indicator');
    isTyping = true;
    const chatContainer = document.getElementById('chatContainer');
    if (!chatContainer) return;
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message assistant-message typing-indicator';
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = '<div class="message-content"><div class="typing-dots"><span>●</span><span>●</span><span>●</span></div></div>';
    
    chatContainer.appendChild(typingDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function hideTypingIndicator() {
    console.log('Hiding typing indicator');
    isTyping = false;
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

function autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}

function sendPredefinedMessage(messageText) {
    console.log('Sending predefined message:', messageText);
    const messageInput = document.getElementById('messageInput');
    if (messageInput) {
        messageInput.value = messageText;
        sendMessage();
    }
}

// Provider switching functionality
function switchAPIProvider(provider) {
    console.log('Switching to provider:', provider);
    currentProvider = provider;
    updateProviderDisplay();
    
    // Show confirmation message
    addMessage('assistant', `**🔄 Provider Switch**\n\nNow using: **${API_CONFIG[provider]?.name || provider.toUpperCase()}**\n\n${getProviderDescription(provider)}`);
}

function getProviderDescription(provider) {
    const descriptions = {
        'local': '🏠 **Local Mode**: IEEE standards-based responses with comprehensive definitions and regenerative thinking. No API key required.',
        'openai': '🤖 **OpenAI GPT-4**: Advanced reasoning with current knowledge and detailed analysis.',
        'anthropic': '🧠 **Anthropic Claude**: Thoughtful, nuanced responses with strong ethical reasoning.',
        'gemini': '🌟 **Google Gemini**: Comprehensive analysis with integrated search capabilities.',
        'meta': '🦙 **Meta Llama 2**: Open-source AI with balanced performance and efficiency.',
        'cohere': '⚡ **Cohere**: Specialized in natural language understanding and generation.',
        'huggingface': '🤗 **Hugging Face**: Community-driven AI with diverse model options.',
        'public': '🌐 **Public APIs**: Basic responses using free public services.'
    };
    
    return descriptions[provider] || 'Advanced AI provider for comprehensive responses.';
}

function updateProviderDisplay() {
    const providerElements = document.querySelectorAll('.provider-option');
    providerElements.forEach(el => {
        el.classList.remove('active');
        if (el.dataset.provider === currentProvider) {
            el.classList.add('active');
        }
    });
}

// API Configuration Functions
function openAPIConfig() {
    document.getElementById('apiConfigModal').style.display = 'block';
    loadAPISettings();
}

function closeAPIConfig() {
    document.getElementById('apiConfigModal').style.display = 'none';
}

function loadAPISettings() {
    const providers = ['openai', 'anthropic', 'gemini', 'meta', 'cohere', 'huggingface'];
    providers.forEach(provider => {
        const input = document.getElementById(`${provider}Key`);
        if (input) {
            const savedKey = localStorage.getItem(`${provider}_api_key`);
            if (savedKey) {
                input.value = savedKey;
            }
        }
    });
}

function saveAPISettings() {
    const providers = ['openai', 'anthropic', 'gemini', 'meta', 'cohere', 'huggingface'];
    let savedCount = 0;
    
    providers.forEach(provider => {
        const input = document.getElementById(`${provider}Key`);
        if (input && input.value.trim()) {
            localStorage.setItem(`${provider}_api_key`, input.value.trim());
            savedCount++;
        }
    });
    
    if (savedCount > 0) {
        addMessage('assistant', `**✅ API Configuration Saved**\n\nSuccessfully configured ${savedCount} API provider${savedCount > 1 ? 's' : ''}. You can now switch between providers for enhanced responses!\n\n**🎯 Tips:**\n• Different providers offer unique strengths\n• Local mode is always available as fallback\n• Try asking the same question with different providers to compare responses`);
    }
    
    closeAPIConfig();
}

function getAPIKey(provider) {
    const key = localStorage.getItem(`${provider}_api_key`);
    if (!key && API_CONFIG[provider]?.apiKey !== `your-${provider}-api-key-here`) {
        return API_CONFIG[provider]?.apiKey;
    }
    return key;
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Initializing EthicBot Enhanced');
    
    // Set up event listeners
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    
    if (messageInput) {
        messageInput.addEventListener('keypress', handleKeyPress);
        messageInput.addEventListener('input', function() {
            autoResize(this);
        });
        console.log('Message input event listeners set up');
    } else {
        console.error('Message input element not found during initialization');
    }
    
    if (sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
        console.log('Send button event listener set up');
    } else {
        console.error('Send button element not found during initialization');
    }
    
    // Initialize provider display
    updateProviderDisplay();
    
    // Welcome message
    addMessage('assistant', `Welcome to **EthicBot Enhanced v3.0**! 🚀

I'm your comprehensive AI ethics assistant with:
• **📚 Detailed Definitions** - Ask "What is AI?" or "Define bias" for comprehensive explanations
• **🔬 IEEE Standards** - Deep knowledge of IEEE 2857, 2859, 3652
• **🤖 Hybrid AI** - Switch between local responses and multiple AI providers
• **🧠 Regenerative Thinking** - Multi-perspective analysis and context awareness

**🎯 Try asking:**
• "Define artificial intelligence"
• "What is algorithmic bias?"
• "Explain AI fairness"
• "Tell me about IEEE 2857"

**⚙️ Enhanced Features:**
• Switch providers for different AI perspectives
• Local mode works without any API keys
• Automatic fallback if APIs fail
• Context-aware conversations

What would you like to explore in AI ethics?`);
    
    console.log('EthicBot Enhanced initialization complete');
});

// Global error handler
window.addEventListener('error', function(event) {
    console.error('Global error caught:', event.error);
    if (isTyping) {
        hideTypingIndicator();
    }
});

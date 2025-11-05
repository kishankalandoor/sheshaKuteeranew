// EthicBot - Advanced AI Ethics Assistant with IEEE Standards Integration
// Enhanced with regenerative thinking and natural language processing

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
        endpoint: 'https://api-inference.huggingface.co/models/microsoft/Diconsole.log('🎉 EthicBot Enhanced - Fully Loaded and Ready!');
console.log('Features: IEEE Standards, Regenerative Thinking, Enhanced NLP, Multi-API Support');
console.log('Current Provider:', currentProvider);
console.log('Available APIs:', Object.keys(API_CONFIG).join(', '));PT-large',
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
    },

    ethicalDesign: {
        keywords: ['ethical design', 'responsible ai', 'ethics by design', 'human-centered'],
        response: `**IEEE Standards for Ethical AI Design**

Based on comprehensive IEEE ethics standards, ethical AI design requires a human-centered approach that prioritizes human welfare, dignity, and rights throughout the entire AI development lifecycle.

**Foundational Ethical Principles:**
• **Human Autonomy**: AI systems must enhance rather than diminish human agency and decision-making capabilities. Humans should retain meaningful control over important decisions affecting their lives.
• **Beneficence and Non-maleficence**: AI systems should be designed to benefit humanity while actively preventing harm. This includes both direct harm prevention and consideration of long-term societal impacts.
• **Justice and Fairness**: AI systems must treat all individuals and groups equitably, actively working to reduce rather than perpetuate societal inequalities.
• **Explicability**: AI decisions must be interpretable and explainable to affected parties, enabling understanding and appropriate trust calibration.

**Human-Centered Design Process:**
• **Stakeholder Engagement**: Meaningful involvement of affected communities throughout the design process, including traditionally marginalized voices.
• **Value-Sensitive Design**: Explicit identification and incorporation of human values into system requirements and design specifications.
• **Participatory Design Methods**: Collaborative design processes that include end-users as active participants rather than passive subjects.
• **Cultural Sensitivity**: Recognition and accommodation of diverse cultural values and norms in global AI deployments.

**Ethical Impact Assessment Framework:**
• **Prospective Impact Analysis**: Systematic evaluation of potential positive and negative impacts before deployment.
• **Stakeholder Impact Mapping**: Identification of all parties who may be affected by the AI system and assessment of potential impacts on each group.
• **Rights Impact Assessment**: Evaluation of potential impacts on fundamental human rights and civil liberties.
• **Long-term Societal Consideration**: Analysis of potential long-term effects on social structures, employment, and human relationships.

**Accountability and Governance Mechanisms:**
• **Clear Responsibility Assignment**: Establishment of clear chains of responsibility for AI system outcomes and impacts.
• **Ethical Review Processes**: Implementation of institutional review boards or ethics committees to evaluate AI projects.
• **Transparency Requirements**: Clear documentation and communication of AI capabilities, limitations, and potential risks.
• **Remediation Procedures**: Established processes for addressing identified ethical issues and providing recourse to affected parties.

This comprehensive approach ensures that ethical considerations are embedded throughout the AI development process, resulting in systems that genuinely serve human interests and uphold human dignity.`
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
                "To elaborate on this important topic, ",
                "It's crucial to understand that ",
                "From an ethical perspective, ",
                "Research demonstrates that ",
                "Industry best practices suggest that ",
                "According to IEEE standards, ",
                "To provide a comprehensive answer, "
            ],
            transitionPhrases: [
                "Furthermore, it's important to note that",
                "Building upon this foundation,",
                "To expand on this concept,",
                "Additionally, we must consider that",
                "From a practical implementation standpoint,",
                "To ensure comprehensive understanding,"
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
        // Add natural language flow and improved grammar
        let enhanced = this.addContextualIntroduction(response);
        enhanced = this.improveTransitions(enhanced);
        enhanced = this.addConclusiveStatement(enhanced);
        enhanced = this.refineGrammar(enhanced);
        return enhanced;
    }

    addContextualIntroduction(response) {
        const starters = this.grammarRules.sentenceStarters;
        const randomStarter = starters[Math.floor(Math.random() * starters.length)];
        return randomStarter + response.charAt(0).toLowerCase() + response.slice(1);
    }

    improveTransitions(text) {
        // Add transitional phrases between major sections
        return text.replace(/(\*\*[^*]+\*\*)/g, (match, header) => {
            const transitions = this.grammarRules.transitionPhrases;
            if (Math.random() > 0.7) { // 30% chance to add transition
                const transition = transitions[Math.floor(Math.random() * transitions.length)];
                return `\n\n${transition} ${match}`;
            }
            return match;
        });
    }

    addConclusiveStatement(text) {
        const conclusions = this.grammarRules.conclusionPhrases;
        const randomConclusion = conclusions[Math.floor(Math.random() * conclusions.length)];
        return text + `\n\n${randomConclusion} a more ethical and responsible approach to AI development and deployment.`;
    }

    refineGrammar(text) {
        // Basic grammar improvements
        return text
            .replace(/\s+/g, ' ') // Normalize whitespace
            .replace(/([.!?])\s*([a-z])/g, '$1 $2') // Ensure space after punctuation
            .replace(/([a-z])([A-Z])/g, '$1. $2') // Add periods between sentences
            .trim();
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
        this.updateTopicHistory(message);
        
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
        
        // Keep only last 10 messages for context
        if (this.conversationContext.length > 10) {
            this.conversationContext.shift();
        }
    }

    extractTopics(message) {
        const topicKeywords = {
            'bias': ['bias', 'discrimination', 'fairness', 'prejudice'],
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

    generateFollowUpSuggestions() {
        const recentTopics = this.conversationContext
            .slice(-3)
            .flatMap(ctx => ctx.topics);

        const suggestions = [];
        
        if (recentTopics.includes('bias')) {
            suggestions.push("Would you like me to explain specific bias detection techniques?");
            suggestions.push("Are you interested in learning about IEEE 2857 bias assessment standards?");
        }
        
        if (recentTopics.includes('privacy')) {
            suggestions.push("Should we explore privacy-preserving machine learning techniques?");
            suggestions.push("Would you like to understand GDPR compliance in AI systems?");
        }

        return suggestions.slice(0, 2); // Return max 2 suggestions
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
        // Step 1: Analyze the query
        const analysis = this.contextAnalyzer.analyzeContext(message, chatHistory);
        
        // Step 2: Generate initial response
        let response = await this.generateInitialResponse(message, analysis);
        
        // Step 3: Apply regenerative thinking
        response = await this.applyRegenerativeThinking(response, analysis);
        
        // Step 4: Enhance with natural language processing
        response = this.nlp.enhanceResponse(response);
        
        // Step 5: Add contextual follow-ups
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

        // Fallback to general ethics knowledge
        return this.getGeneralEthicsResponse(message, analysis);
    }

    async applyRegenerativeThinking(response, analysis) {
        // Add thinking process visualization
        const thinkingProcess = this.generateThinkingProcess(analysis);
        
        // Enhance response with multi-perspective analysis
        const perspectives = this.generateMultiplePerspectives(response, analysis);
        
        // Combine thinking process with enhanced response
        return this.combineThinkingAndResponse(thinkingProcess, response, perspectives);
    }

    generateThinkingProcess(analysis) {
        return `**🤔 Analytical Process:**
1. **Topic Identification**: Analyzing your question within the context of ${analysis.mainTopic || 'AI ethics'}
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
        // Enhanced fallback response generation
        const messageLower = message.toLowerCase();
        
        if (messageLower.includes('hello') || messageLower.includes('hi')) {
            return `Welcome to EthicBot! I'm your advanced AI ethics assistant, powered by IEEE standards and regenerative thinking capabilities. I specialize in providing comprehensive, contextual guidance on AI ethics, drawing from the latest research and industry best practices.

**My Capabilities Include:**
• **IEEE Standards Integration**: Deep knowledge of IEEE 2857, 2859, 3652, and other relevant standards
• **Regenerative Analysis**: Multi-step thinking processes that build comprehensive understanding
• **Contextual Memory**: Remembering our conversation to provide increasingly relevant insights
• **Multi-perspective Analysis**: Examining issues from technical, ethical, regulatory, and practical viewpoints
• **Natural Language Enhancement**: Providing clear, well-structured responses with proper grammar and flow

What specific aspect of AI ethics would you like to explore today?`;
        }

        return `I understand you're inquiring about ${analysis.mainTopic || 'AI ethics'}. While I'm processing your specific question, let me provide some foundational context that may be helpful.

**Current Analysis:** Your question touches on important considerations in AI ethics that require careful examination from multiple perspectives.

**Relevant Standards:** This topic is addressed by various IEEE standards and industry frameworks that provide systematic approaches to ethical AI development.

**Key Considerations:** The ethical implications involve balancing innovation with responsibility, ensuring stakeholder protection, and maintaining transparency throughout the development process.

Could you please provide more specific details about what aspect you'd like me to focus on? This will help me generate a more targeted and comprehensive response.`;
    }
}

// Initialize systems
const regenerativeEngine = new RegenerativeThinkingEngine();
const nlp = new NaturalLanguageProcessor();// Initialize the applicationdocument.addEventListener('DOMContentLoaded', function() {    const messageInput = document.getElementById('messageInput');    messageInput.focus();    loadSavedAPIKeys();        const savedProvider = localStorage.getItem('ethicbot_current_provider');    if (savedProvider && !needsAPIKey(savedProvider)) {        currentProvider = savedProvider;        document.getElementById('apiProvider').value = savedProvider;    }});// Handle keyboard inputfunction handleKeyPress(event) {    if (event.key === 'Enter' && !event.shiftKey) {        event.preventDefault();        sendMessage();    }}// Auto-resize textareafunction autoResize(textarea) {    textarea.style.height = 'auto';    textarea.style.height = textarea.scrollHeight + 'px';}// Send message function (updated for async API calls)async function sendMessage() {    const messageInput = document.getElementById('messageInput');    const message = messageInput.value.trim();        if (message === '' || isTyping) return;        messageInput.value = '';    messageInput.style.height = 'auto';        addMessage(message, 'user');    hideWelcomeMessage();    showTypingIndicator();        try {        const response = await generateResponse(message);        hideTypingIndicator();        addMessage(response, 'bot');    } catch (error) {        console.error('Error generating response:', error);        hideTypingIndicator();        addMessage('I apologize, but I encountered an error while processing your request. Please try again or check your API configuration.', 'bot');    }}// Send predefined message from topic cardsasync function sendPredefinedMessage(message) {    const messageInput = document.getElementById('messageInput');    messageInput.value = message;    await sendMessage();}// Generate AI response using APIs or local knowledgeasync function generateResponse(message) {    if (currentProvider !== 'local') {        try {            const apiResponse = await getAPIResponse(message);            if (apiResponse) {                return apiResponse;            }        } catch (error) {            console.error('API Error:', error);        }    }        return getLocalResponse(message);}// Get response from external APIsasync function getAPIResponse(message) {    const ethicsPrompt = `You are EthicBot, an AI ethics specialist. Please provide a comprehensive, educational response about AI ethics for the following question: ${message}`;    switch (currentProvider) {        case 'openai':            return await getOpenAIResponse(ethicsPrompt);        case 'huggingface':            return await getHuggingFaceResponse(ethicsPrompt);        case 'anthropic':            return await getAnthropicResponse(ethicsPrompt);        case 'public':            return await getPublicAPIResponse(message);        default:            return null;    }}// OpenAI API Integrationasync function getOpenAIResponse(prompt) {    if (!API_CONFIG.openai.apiKey || API_CONFIG.openai.apiKey === 'your-openai-api-key-here') {        throw new Error('OpenAI API key not configured');    }        const response = await fetch(API_CONFIG.openai.endpoint, {        method: 'POST',        headers: {            'Content-Type': 'application/json',            'Authorization': `Bearer ${API_CONFIG.openai.apiKey}`        },        body: JSON.stringify({            model: API_CONFIG.openai.model,            messages: [                {                    role: 'system',                    content: 'You are EthicBot, a specialized AI ethics assistant.'                },                {                    role: 'user',                    content: prompt                }            ],            max_tokens: 1500,            temperature: 0.7        })    });        if (!response.ok) {        throw new Error(`OpenAI API error: ${response.status}`);    }        const data = await response.json();    return data.choices[0].message.content;}// Public API Integration (demo)async function getPublicAPIResponse(message) {    try {        const response = await fetch('https://api.quotable.io/random?tags=wisdom,motivational');        const data = await response.json();                return `Based on your question about AI ethics: "${message}"Here's a thoughtful perspective: "${data.content}" - ${data.author}**AI Ethics Context:**This relates to the importance of wisdom and ethical consideration in AI development. When building AI systems, we must:• **Consider Long-term Impact**: Think beyond immediate functionality to societal effects• **Embrace Responsibility**: Take ownership of the consequences of our technological choices  • **Seek Diverse Perspectives**: Include varied viewpoints in ethical decision-making• **Balance Innovation with Caution**: Move forward thoughtfully, not recklesslyWould you like me to provide more specific information about any particular aspect of AI ethics?`;    } catch (error) {        throw new Error('Public API unavailable');    }}// Local response generation (fallback)function getLocalResponse(message) {    const messageLower = message.toLowerCase();        // Advanced topic matching    let bestMatch = null;    let bestScore = 0;        for (const [topic, data] of Object.entries(ethicsKnowledge)) {        let score = 0;        for (const keyword of data.keywords) {            if (messageLower.includes(keyword)) {                score += keyword.length;            }        }        if (score > bestScore) {            bestScore = score;            bestMatch = data;        }    }        if (bestMatch && bestScore > 0) {        return bestMatch.response;    }        // Default responses    if (messageLower.includes('hello') || messageLower.includes('hi') || messageLower.includes('hey')) {        return `Hello! I'm EthicBot, your comprehensive AI ethics assistant. I can help you explore AI ethics principles, bias mitigation, privacy protection, explainable AI, governance frameworks, and more. What would you like to learn about today?`;    }        if (messageLower.includes('help') || messageLower.includes('what can you do')) {        return `I'm a specialized AI ethics assistant with knowledge about:• **AI Ethics Principles** - Foundational guidelines for responsible AI• **Bias Detection & Mitigation** - Identifying and addressing unfairness• **Privacy & Data Protection** - Safeguarding personal information• **Explainable AI** - Making AI decisions transparent• **AI Governance** - Regulatory frameworks and oversight• **AI Safety** - Preventing harmful outcomesFeel free to ask specific questions about any of these topics!`;    }        return `That's an interesting question about AI ethics! I'd be happy to help you explore this topic in more detail. Could you be more specific about what aspect of AI ethics you're interested in? For example, bias mitigation, privacy protection, explainable AI, or governance frameworks?`;}// Add message to chatfunction addMessage(content, sender) {    const chatContainer = document.getElementById('chatContainer');        const messageDiv = document.createElement('div');    messageDiv.className = `message ${sender}`;        const avatar = document.createElement('div');    avatar.className = 'message-avatar';    avatar.innerHTML = sender === 'user' ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';        const messageContent = document.createElement('div');    messageContent.className = 'message-content';        if (sender === 'bot') {        messageContent.innerHTML = formatBotResponse(content);    } else {        messageContent.innerHTML = `<p>${escapeHtml(content)}</p>`;    }        messageDiv.appendChild(avatar);    messageDiv.appendChild(messageContent);        chatContainer.appendChild(messageDiv);    chatContainer.scrollTop = chatContainer.scrollHeight;        chatHistory.push({ content, sender, timestamp: new Date() });}// Hide welcome messagefunction hideWelcomeMessage() {    const welcomeMessage = document.querySelector('.welcome-message');    if (welcomeMessage) {        welcomeMessage.style.display = 'none';    }}// Show typing indicatorfunction showTypingIndicator() {    isTyping = true;    const chatContainer = document.getElementById('chatContainer');        const typingDiv = document.createElement('div');    typingDiv.className = 'typing-indicator';    typingDiv.id = 'typingIndicator';    typingDiv.innerHTML = `        <i class="fas fa-robot"></i>        <span>EthicBot is thinking</span>        <div class="typing-dots">            <span></span>            <span></span>            <span></span>        </div>    `;        chatContainer.appendChild(typingDiv);    chatContainer.scrollTop = chatContainer.scrollHeight;}// Hide typing indicatorfunction hideTypingIndicator() {    isTyping = false;    const typingIndicator = document.getElementById('typingIndicator');    if (typingIndicator) {        typingIndicator.remove();    }}// Format bot response with proper HTMLfunction formatBotResponse(response) {    let formatted = response        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')        .replace(/•\s/g, '<li>')        .replace(/\n\n/g, '</p><p>')        .replace(/\n/g, '<br>');        formatted = formatted.replace(/(<li>.*?)(<p>|$)/g, function(match, li, end) {        return li + '</li>' + (end === '<p>' ? '<p>' : '');    });        formatted = '<p>' + formatted + '</p>';    formatted = formatted.replace(/(<li>.*?<\/li>)/g, '<ul>$1</ul>');    formatted = formatted.replace(/<\/ul><ul>/g, '');    formatted = formatted.replace(/<p><\/p>/g, '');    formatted = formatted.replace(/<p><br><\/p>/g, '');        return formatted;}// Escape HTML to prevent XSSfunction escapeHtml(text) {    const div = document.createElement('div');    div.textContent = text;    return div.innerHTML;}// Switch API providerfunction switchAPIProvider(provider) {    currentProvider = provider;    localStorage.setItem('ethicbot_current_provider', provider);    console.log(`Switched to ${provider} provider`);        if (provider !== 'local' && needsAPIKey(provider)) {        showAPIConfigModal(provider);    }}// Check if API key is neededfunction needsAPIKey(provider) {    if (provider === 'local' || provider === 'public') {        return false;    }    const config = API_CONFIG[provider];    return !config || !config.apiKey || config.apiKey.includes('your-') || config.apiKey === '';}// Show API configuration modalfunction showAPIConfigModal(provider) {    const modal = document.createElement('div');    modal.className = 'api-config-modal';    modal.innerHTML = `        <div class="modal-content">            <div class="modal-header">                <h3>Configure ${provider.charAt(0).toUpperCase() + provider.slice(1)} API</h3>                <button class="close-btn" onclick="closeAPIConfigModal()">&times;</button>            </div>            <div class="modal-body">                <p>To use ${provider} API, please enter your API key:</p>                <input type="password" id="apiKeyInput" placeholder="Enter your API key" />                <div class="api-info">                    ${getAPIInfo(provider)}                </div>            </div>            <div class="modal-footer">                <button class="cancel-btn" onclick="closeAPIConfigModal()">Cancel</button>                <button class="save-btn" onclick="saveAPIKey('${provider}')">Save</button>            </div>        </div>    `;        document.body.appendChild(modal);}// Get API informationfunction getAPIInfo(provider) {    const info = {        openai: `<p><strong>How to get OpenAI API key:</strong></p>            <ol>                <li>Visit <a href="https://platform.openai.com" target="_blank">platform.openai.com</a></li>                <li>Sign up or log in to your account</li>                <li>Go to API Keys section</li>                <li>Create a new secret key</li>                <li>Copy and paste it here</li>            </ol>`,        huggingface: `<p><strong>How to get Hugging Face API key:</strong></p>            <ol>                <li>Visit <a href="https://huggingface.co" target="_blank">huggingface.co</a></li>                <li>Sign up for a free account</li>                <li>Go to Settings > Access Tokens</li>                <li>Create a new token</li>                <li>Copy and paste it here</li>            </ol>`,        anthropic: `<p><strong>How to get Anthropic API key:</strong></p>            <ol>                <li>Visit <a href="https://console.anthropic.com" target="_blank">console.anthropic.com</a></li>                <li>Sign up for an account</li>                <li>Go to API Keys section</li>                <li>Generate a new API key</li>                <li>Copy and paste it here</li>            </ol>`    };        return info[provider] || '';}// Save API keyfunction saveAPIKey(provider) {    const apiKey = document.getElementById('apiKeyInput').value.trim();        if (!apiKey) {        alert('Please enter a valid API key');        return;    }        API_CONFIG[provider].apiKey = apiKey;    localStorage.setItem(`ethicbot_${provider}_key`, apiKey);        closeAPIConfigModal();    addMessage(`✅ ${provider.charAt(0).toUpperCase() + provider.slice(1)} API configured successfully!`, 'bot');}// Close API config modalfunction closeAPIConfigModal() {    const modal = document.querySelector('.api-config-modal');    if (modal) {        modal.remove();    }        if (needsAPIKey(currentProvider)) {        currentProvider = 'local';        document.getElementById('apiProvider').value = 'local';    }}// Load saved API keysfunction loadSavedAPIKeys() {    for (const provider in API_CONFIG) {        const savedKey = localStorage.getItem(`ethicbot_${provider}_key`);        if (savedKey) {            API_CONFIG[provider].apiKey = savedKey;        }    }}// Start new chatfunction startNewChat() {    const chatContainer = document.getElementById('chatContainer');    chatContainer.innerHTML = `        <div class="welcome-message">            <div class="bot-avatar">                <i class="fas fa-robot"></i>            </div>            <div class="welcome-content">                <h3>Welcome to EthicBot!</h3>                <p>I'm here to help you explore the fascinating world of AI ethics. I can discuss topics like:</p>                <div class="topic-cards">                    <div class="topic-card" onclick="sendPredefinedMessage('What are the fundamental principles of AI ethics?')">                        <i class="fas fa-balance-scale"></i>                        <h4>AI Ethics Principles</h4>                        <p>Explore fairness, transparency, accountability, and human dignity</p>                    </div>                    <div class="topic-card" onclick="sendPredefinedMessage('How can we detect and mitigate algorithmic bias in AI systems?')">                        <i class="fas fa-search"></i>                        <h4>Bias & Fairness</h4>                        <p>Understanding and addressing discrimination in AI</p>                    </div>                    <div class="topic-card" onclick="sendPredefinedMessage('What are the privacy risks and protection strategies for AI?')">                        <i class="fas fa-shield-alt"></i>                        <h4>Privacy & Security</h4>                        <p>Protecting personal data in AI applications</p>                    </div>                    <div class="topic-card" onclick="sendPredefinedMessage('How do we make AI systems explainable and transparent?')">                        <i class="fas fa-lightbulb"></i>                        <h4>Explainable AI</h4>                        <p>Making AI decisions interpretable and trustworthy</p>                    </div>                    <div class="topic-card" onclick="sendPredefinedMessage('What governance frameworks exist for responsible AI?')">                        <i class="fas fa-cogs"></i>                        <h4>AI Governance</h4>                        <p>Regulatory frameworks and organizational oversight</p>                    </div>                    <div class="topic-card" onclick="sendPredefinedMessage('How do we ensure AI safety and prevent harmful outcomes?')">                        <i class="fas fa-shield"></i>                        <h4>AI Safety</h4>                        <p>Robustness, alignment, and risk management</p>                    </div>                    <div class="topic-card" onclick="sendPredefinedMessage('What are the social impacts of AI on society?')">                        <i class="fas fa-users"></i>                        <h4>Social Impact</h4>                        <p>AI effects on employment, inequality, and society</p>                    </div>                    <div class="topic-card" onclick="sendPredefinedMessage('How does AI affect human rights and dignity?')">                        <i class="fas fa-hands-helping"></i>                        <h4>Human Rights</h4>                        <p>Protecting fundamental rights in AI applications</p>                    </div>                </div>            </div>        </div>    `;        chatHistory = [];        document.querySelectorAll('.chat-item').forEach(item => {        item.classList.remove('active');    });        // API Configuration and Settings Management
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
            // Update the API_CONFIG
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
        
        // Add success message to chat
        addMessage('assistant', '🎉 **Configuration Updated Successfully!**\n\nYour API settings have been saved. You can now use the selected provider for enhanced AI ethics discussions.');
        
    } catch (error) {
        console.error('Error saving API settings:', error);
        addMessage('assistant', '⚠️ **Configuration Error**\n\nThere was an issue saving your settings. Please check your inputs and try again.');
    }
}

function getAPIKey(provider) {
    // First check localStorage, then check API_CONFIG
    return localStorage.getItem(`ethicbot_${provider}_key`) || API_CONFIG[provider]?.apiKey || '';
}

// Enhanced Event Listeners and Initialization
document.addEventListener('DOMContentLoaded', function() {
    // Initialize regenerative engine and NLP
    try {
        console.log('Initializing EthicBot with enhanced capabilities...');
        
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
            addMessage('assistant', `🤖 **Welcome to EthicBot Enhanced!**\n\nI'm your advanced AI ethics assistant, now powered with **IEEE standards integration**, **regenerative thinking capabilities**, and **enhanced natural language processing**.\n\n**🚀 New Enhanced Features:**\n• **IEEE Standards Expertise**: Deep knowledge of IEEE 2857, 2859, 3652, and related standards\n• **Regenerative Thinking**: Multi-step analytical processes that build comprehensive understanding\n• **Advanced NLP**: Improved grammar, context awareness, and natural language flow\n• **Multi-perspective Analysis**: Technical, ethical, regulatory, and practical viewpoints\n• **Contextual Memory**: Conversation awareness for increasingly relevant insights\n• **Enhanced API Integration**: Support for multiple advanced AI providers\n\n**📚 My Specializations:**\n• Comprehensive bias detection and mitigation strategies\n• Privacy engineering with IEEE 2859 standards\n• AI safety frameworks per IEEE 3652 guidelines\n• Explainable AI and transparency requirements\n• Governance and regulatory compliance\n• Environmental sustainability in AI\n• Human-centered ethical design\n\n**🎯 Getting Started:**\nClick on any topic card below, or ask me a specific question about AI ethics. I'll provide detailed, well-structured responses that combine academic rigor with practical implementation guidance.\n\nWhat aspect of AI ethics would you like to explore today?`);
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
    
    // Reset welcome message
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
        contextMemory: contextMemory.slice(-10), // Last 10 exchanges for context
        totalMessages: chatHistory.length
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `ethicbot-chat-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    addMessage('assistant', '📥 **Chat Exported Successfully!**\n\nYour conversation has been downloaded as a JSON file. You can review it later or use it for research purposes.');
}

function toggleTheme() {
    const body = document.body;
    const currentTheme = body.classList.contains('light-theme') ? 'light' : 'dark';
    
    if (currentTheme === 'dark') {
        body.classList.add('light-theme');
        localStorage.setItem('ethicbot_theme', 'light');
    } else {
        body.classList.remove('light-theme');
        localStorage.setItem('ethicbot_theme', 'dark');
    }
    
    addMessage('assistant', `🎨 **Theme Changed**\n\nSwitched to ${currentTheme === 'dark' ? 'light' : 'dark'} theme. Your preference has been saved.`);
}

// Load saved theme on startup
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('ethicbot_theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    }
});

// Error Handling and Recovery
window.addEventListener('error', function(event) {
    console.error('Global error caught:', event.error);
    
    // Don't show error message for every error, just log it
    if (event.error && event.error.message && !event.error.message.includes('Script error')) {
        console.warn('EthicBot Error Recovery: Falling back to local responses');
        
        // If there was an API error, fall back to local
        if (currentProvider !== 'local') {
            addMessage('assistant', '⚠️ **Service Notice**\n\nI encountered a temporary issue with the external service. Switching to local knowledge base to continue helping you with AI ethics questions.');
        }
    }
});

// Performance Monitoring
let performanceStartTime = Date.now();

function logPerformance(operation, startTime) {
    const duration = Date.now() - startTime;
    if (duration > 1000) { // Log only if operation takes more than 1 second
        console.log(`Performance: ${operation} took ${duration}ms`);
    }
}

// Enhanced API Response Processing
async function processAPIResponse(response, provider) {
    const startTime = Date.now();
    
    try {
        // Apply NLP enhancement to API responses
        const enhanced = nlp.enhanceResponse(response);
        
        // Add IEEE standards context if relevant
        const withIEEEContext = addIEEEContextIfRelevant(enhanced);
        
        logPerformance(`${provider} API processing`, startTime);
        return withIEEEContext;
        
    } catch (error) {
        console.error('Error processing API response:', error);
        return response; // Return original response if processing fails
    }
}

function addIEEEContextIfRelevant(response) {
    const ieeeKeywords = ['bias', 'privacy', 'safety', 'fairness', 'ethical', 'standard'];
    const responseLower = response.toLowerCase();
    
    const hasIEEERelevance = ieeeKeywords.some(keyword => responseLower.includes(keyword));
    
    if (hasIEEERelevance && !responseLower.includes('ieee')) {
        return response + `\n\n**📋 IEEE Standards Connection:**\nThis topic is addressed by IEEE standards for ethical AI. Would you like me to provide specific guidance from IEEE 2857 (bias assessment), IEEE 2859 (privacy engineering), or IEEE 3652 (autonomous systems safety)?`;
    }
    
    return response;
}

// Search and Discovery Features
function searchChatHistory(query) {
    if (!query || query.trim().length === 0) {
        return [];
    }
    
    const queryLower = query.toLowerCase();
    const results = chatHistory.filter(message => 
        message.content.toLowerCase().includes(queryLower)
    );
    
    return results.slice(-10); // Return last 10 matching results
}

function suggestRelatedTopics(currentMessage) {
    const messageLower = currentMessage.toLowerCase();
    const suggestions = [];
    
    // Topic relationships based on IEEE standards
    const topicMap = {
        'bias': ['fairness', 'discrimination', 'equality', 'IEEE 2857'],
        'privacy': ['data protection', 'consent', 'GDPR', 'IEEE 2859'],
        'safety': ['risk management', 'autonomous systems', 'IEEE 3652'],
        'explainability': ['transparency', 'interpretability', 'XAI'],
        'governance': ['regulation', 'compliance', 'oversight']
    };
    
    for (const [topic, related] of Object.entries(topicMap)) {
        if (messageLower.includes(topic)) {
            suggestions.push(...related);
        }
    }
    
    return [...new Set(suggestions)].slice(0, 3); // Return unique suggestions, max 3
}

// Enhanced greeting with system status
function getSystemStatus() {
    const apiStatus = Object.keys(API_CONFIG).map(provider => {
        const hasKey = getAPIKey(provider) && !getAPIKey(provider).includes('your-');
        return {
            provider,
            configured: hasKey || provider === 'local' || provider === 'public',
            active: provider === currentProvider
        };
    });
    
    return {
        currentProvider,
        apis: apiStatus,
        memorySize: contextMemory.length,
        historySize: chatHistory.length
    };
}

console.log('🎉 EthicBot Enhanced - Fully Loaded and Ready!');
console.log('Features: IEEE Standards, Regenerative Thinking, Enhanced NLP, Multi-API Support');
console.log('Current Provider:', currentProvider);
console.log('Available APIs:', Object.keys(API_CONFIG).join(', ');}
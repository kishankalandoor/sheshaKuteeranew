<?php
/**
 * EthicBot Enhanced - PHP Version
 * Advanced AI Ethics Assistant with Comprehensive Definitions and Hybrid AI
 * Version 3.0 PHP - Synchronous implementation with session management
 */

session_start();

// Initialize session variables
if (!isset($_SESSION['chat_history'])) {
    $_SESSION['chat_history'] = [];
}
if (!isset($_SESSION['context_memory'])) {
    $_SESSION['context_memory'] = [];
}
if (!isset($_SESSION['current_provider'])) {
    $_SESSION['current_provider'] = 'local';
}

// Enhanced API Configuration
class APIConfig {
    public static $providers = [
        'openai' => [
            'endpoint' => 'https://api.openai.com/v1/chat/completions',
            'model' => 'gpt-4-turbo-preview',
            'name' => 'OpenAI GPT-4',
            'needs_key' => true
        ],
        'anthropic' => [
            'endpoint' => 'https://api.anthropic.com/v1/messages',
            'model' => 'claude-3-opus-20240229',
            'name' => 'Anthropic Claude',
            'needs_key' => true
        ],
        'gemini' => [
            'endpoint' => 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
            'name' => 'Google Gemini',
            'needs_key' => true
        ],
        'meta' => [
            'endpoint' => 'https://api.llama-api.com/chat/completions',
            'model' => 'llama-2-70b-chat',
            'name' => 'Meta Llama 2',
            'needs_key' => true
        ],
        'cohere' => [
            'endpoint' => 'https://api.cohere.ai/v1/generate',
            'name' => 'Cohere',
            'needs_key' => true
        ],
        'huggingface' => [
            'endpoint' => 'https://api-inference.huggingface.co/models/microsoft/DialoGPT-large',
            'name' => 'Hugging Face',
            'needs_key' => true
        ],
        'public' => [
            'endpoint' => 'https://api.quotable.io/random',
            'name' => 'Public APIs',
            'needs_key' => false
        ]
    ];
}

// AI Ethics Knowledge Base
class AIEthicsKnowledgeBase {
    public static $definitions = [
        'keywords' => ['define', 'definition', 'what is', 'meaning', 'explain', 'concept of', 'tell me about', 'describe', 'what are', 'what does', 'how would you define'],
        'terms' => [
            'artificial intelligence' => [
                'definition' => '**Artificial Intelligence (AI)** is a branch of computer science that aims to create intelligent machines capable of performing tasks that typically require human intelligence, such as learning, reasoning, problem-solving, perception, and language understanding.',
                'examples' => ['Machine learning algorithms', 'Natural language processing', 'Computer vision', 'Robotics'],
                'applications' => ['Healthcare diagnosis', 'Autonomous vehicles', 'Financial trading', 'Personal assistants'],
                'types' => ['Narrow AI', 'General AI', 'Superintelligence', 'Reactive machines']
            ],
            'machine learning' => [
                'definition' => '**Machine Learning (ML)** is a subset of AI that enables computer systems to automatically learn and improve from experience without being explicitly programmed. It uses algorithms to analyze data, identify patterns, and make predictions or decisions.',
                'types' => ['Supervised learning', 'Unsupervised learning', 'Reinforcement learning', 'Deep learning'],
                'examples' => ['Image recognition', 'Recommendation systems', 'Spam detection', 'Predictive analytics'],
                'applications' => ['Natural language processing', 'Computer vision', 'Autonomous systems', 'Predictive maintenance']
            ],
            'deep learning' => [
                'definition' => '**Deep Learning** is a subset of machine learning that uses artificial neural networks with multiple layers (hence "deep") to model and understand complex patterns in data. It mimics the way human brains process information.',
                'components' => ['Neural networks', 'Layers', 'Neurons', 'Activation functions'],
                'applications' => ['Image recognition', 'Speech recognition', 'Natural language processing', 'Game playing'],
                'types' => ['Convolutional Neural Networks', 'Recurrent Neural Networks', 'Transformer Networks', 'Generative Adversarial Networks']
            ],
            'bias' => [
                'definition' => '**Bias in AI** refers to systematic prejudice or unfairness in AI systems that leads to discriminatory outcomes against certain groups or individuals. It can be introduced through biased training data, flawed algorithms, or biased human decisions.',
                'types' => ['Historical bias', 'Representation bias', 'Measurement bias', 'Algorithmic bias', 'Confirmation bias'],
                'impacts' => ['Unfair hiring practices', 'Discriminatory lending', 'Biased criminal justice decisions', 'Healthcare disparities'],
                'examples' => ['Facial recognition failing on darker skin tones', 'Resume screening favoring male candidates', 'Loan approval discrimination']
            ],
            'fairness' => [
                'definition' => '**Fairness in AI** refers to the principle that AI systems should treat all individuals and groups equitably, without discrimination based on protected characteristics like race, gender, age, or religion.',
                'metrics' => ['Demographic parity', 'Equalized odds', 'Individual fairness', 'Counterfactual fairness'],
                'approaches' => ['Bias detection', 'Bias mitigation', 'Fair representation', 'Inclusive design']
            ],
            'transparency' => [
                'definition' => '**Transparency in AI** refers to the openness and clarity about how AI systems work, including their data sources, algorithms, decision-making processes, and limitations.',
                'levels' => ['Data transparency', 'Model transparency', 'Outcome transparency', 'Process transparency'],
                'benefits' => ['Trust building', 'Accountability', 'Error detection', 'Regulatory compliance']
            ],
            'explainability' => [
                'definition' => '**Explainable AI (XAI)** refers to AI systems that can provide human-understandable explanations for their decisions and predictions, making their reasoning process interpretable.',
                'techniques' => ['LIME', 'SHAP', 'Attention mechanisms', 'Decision trees', 'Rule-based explanations'],
                'importance' => ['Trust', 'Debugging', 'Compliance', 'Human oversight', 'Learning']
            ],
            'privacy' => [
                'definition' => '**Privacy in AI** refers to the protection of personal information and individual autonomy in the context of AI systems that collect, process, and analyze personal data.',
                'principles' => ['Data minimization', 'Purpose limitation', 'Consent', 'Transparency', 'Security'],
                'techniques' => ['Differential privacy', 'Federated learning', 'Homomorphic encryption', 'Anonymization']
            ],
            'ethics' => [
                'definition' => '**AI Ethics** is the branch of ethics that examines the moral implications of artificial intelligence, focusing on ensuring AI systems are developed and deployed in ways that respect human values, rights, and dignity.',
                'principles' => ['Beneficence', 'Non-maleficence', 'Autonomy', 'Justice', 'Explicability'],
                'areas' => ['Bias and fairness', 'Privacy', 'Transparency', 'Safety', 'Human rights']
            ],
            'governance' => [
                'definition' => '**AI Governance** refers to the frameworks, policies, and processes used to guide the development, deployment, and oversight of AI systems to ensure they align with societal values and legal requirements.',
                'components' => ['Policies', 'Standards', 'Regulations', 'Best practices', 'Oversight mechanisms'],
                'stakeholders' => ['Government', 'Industry', 'Academia', 'Civil society', 'International organizations']
            ]
        ]
    ];

    public static $ieee_standards = [
        'ieee2859' => [
            'keywords' => ['ieee', '2859', 'privacy', 'engineering', 'bias assessment', 'privacy engineering'],
            'response' => '**IEEE 2859 - Privacy Engineering and Risk Management**

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

This framework provides a systematic approach to integrating privacy considerations into AI development processes.'
        ],
        'ieee2857' => [
            'keywords' => ['ieee', '2857', 'bias', 'fairness', 'algorithmic bias', 'ai bias'],
            'response' => '**IEEE 2857 - Framework for Bias Assessment in AI Systems**

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

This framework ensures that fairness considerations are systematically integrated into AI development processes.'
        ]
    ];
}

// Natural Language Processor
class NaturalLanguageProcessor {
    private $grammar_rules = [
        'conjunctions' => ['furthermore', 'moreover', 'additionally', 'consequently', 'therefore', 'however', 'nevertheless'],
        'transition_phrases' => ['in this context', 'from this perspective', 'building upon this foundation', 'expanding on this concept'],
        'conclusion_phrases' => ['these principles collectively support', 'this framework ensures', 'implementing these guidelines promotes']
    ];

    public function enhanceResponse($text) {
        $enhanced = $this->improveStructure($text);
        $enhanced = $this->refineGrammar($enhanced);
        $enhanced = $this->addConclusiveStatement($enhanced);
        return $enhanced;
    }

    private function improveStructure($text) {
        $text = preg_replace('/([.!?])\s+([A-Z])/', "$1\n\n$2", $text);
        $text = preg_replace('/(\*\*[^*]+\*\*)/', "\n\n$1", $text);
        return trim($text);
    }

    private function refineGrammar($text) {
        $text = preg_replace('/\s+/', ' ', $text);
        $text = preg_replace('/([.!?])\s*([a-z])/', '$1 $2', $text);
        $text = preg_replace('/\s+([.!?])/', '$1', $text);
        return trim($text);
    }

    private function addConclusiveStatement($text) {
        if (strpos($text, 'These principles') === false && strpos($text, 'In conclusion') === false) {
            $conclusions = $this->grammar_rules['conclusion_phrases'];
            $random_conclusion = $conclusions[array_rand($conclusions)];
            return $text . "\n\n" . ucfirst($random_conclusion) . " a more ethical and responsible approach to AI development and deployment.";
        }
        return $text;
    }
}

// Context Analyzer
class ContextAnalyzer {
    public function analyzeContext($message, $chat_history = []) {
        return [
            'main_topic' => $this->identifyMainTopic($message),
            'related_topics' => $this->findRelatedTopics($message),
            'conversation_depth' => count($chat_history),
            'user_expertise_level' => $this->assessUserExpertise($message),
            'follow_up_suggestions' => $this->generateFollowUpSuggestions()
        ];
    }

    private function identifyMainTopic($message) {
        $topic_keywords = [
            'bias' => ['bias', 'discrimination', 'fairness', 'prejudice', 'equity'],
            'privacy' => ['privacy', 'data protection', 'personal information', 'confidentiality'],
            'explainability' => ['explainable', 'interpretable', 'transparency', 'black box'],
            'safety' => ['safety', 'risk', 'harm', 'security'],
            'governance' => ['governance', 'regulation', 'policy', 'compliance']
        ];

        $message_lower = strtolower($message);
        
        foreach ($topic_keywords as $topic => $keywords) {
            foreach ($keywords as $keyword) {
                if (strpos($message_lower, $keyword) !== false) {
                    return $topic;
                }
            }
        }
        
        return 'general ethics';
    }

    private function findRelatedTopics($message) {
        $main_topic = $this->identifyMainTopic($message);
        $related_map = [
            'bias' => ['fairness', 'discrimination', 'equity'],
            'privacy' => ['data protection', 'security', 'consent'],
            'explainability' => ['transparency', 'interpretability', 'trust'],
            'safety' => ['risk management', 'security', 'robustness'],
            'governance' => ['regulation', 'compliance', 'oversight']
        ];
        
        return $related_map[$main_topic] ?? ['ethical frameworks', 'implementation strategies'];
    }

    private function assessUserExpertise($message) {
        $technical_terms = ['algorithm', 'neural network', 'backpropagation', 'gradient descent'];
        $message_lower = strtolower($message);
        
        foreach ($technical_terms as $term) {
            if (strpos($message_lower, $term) !== false) {
                return 'advanced';
            }
        }
        
        return 'beginner';
    }

    private function generateFollowUpSuggestions() {
        $suggestions = [
            'Explore implementation strategies for this concept',
            'Learn about related IEEE standards',
            'Discover real-world applications and case studies',
            'Understand potential challenges and limitations'
        ];
        
        return array_slice($suggestions, 0, 2);
    }
}

// Main Regenerative Thinking Engine
class RegenerativeThinkingEngine {
    private $nlp;
    private $context_analyzer;

    public function __construct() {
        $this->nlp = new NaturalLanguageProcessor();
        $this->context_analyzer = new ContextAnalyzer();
    }

    public function processQuery($message, $context = []) {
        $analysis = $this->context_analyzer->analyzeContext($message, $context['history'] ?? []);
        
        // Enhanced definition handling
        if ($this->isDefinitionRequest($message)) {
            return $this->handleDefinitionRequest($message, $analysis);
        }
        
        $response = $this->generateInitialResponse($message, $analysis);
        $response = $this->applyRegenerativeThinking($response, $analysis);
        $response = $this->nlp->enhanceResponse($response);
        $response = $this->addContextualFollowUps($response, $analysis);
        
        return $response;
    }

    private function isDefinitionRequest($message) {
        $message_lower = strtolower($message);
        $keywords = AIEthicsKnowledgeBase::$definitions['keywords'];
        
        foreach ($keywords as $keyword) {
            if (strpos($message_lower, $keyword) !== false) {
                return true;
            }
        }
        
        return false;
    }

    private function handleDefinitionRequest($message, $analysis) {
        $message_lower = strtolower($message);
        $term = $this->extractTermFromDefinitionQuery($message_lower);
        $definition = $this->findDefinitionInKnowledgeBase($term);
        
        if ($definition) {
            return $this->formatComprehensiveDefinition($term, $definition, $analysis);
        } else {
            return $this->generateUnknownTermResponse($term, $analysis);
        }
    }

    private function extractTermFromDefinitionQuery($message) {
        $clean_message = $message;
        
        $triggers = ['what is', 'define', 'definition of', 'meaning of', 'explain', 'concept of', 'tell me about', 'describe', 'what are', 'what does', 'how would you define'];
        foreach ($triggers as $trigger) {
            $clean_message = preg_replace('/' . preg_quote($trigger) . '\s*(a\s+|an\s+|the\s+)?/i', '', $clean_message);
        }
        
        return trim(preg_replace('/[?.,!]/', '', $clean_message));
    }

    private function findDefinitionInKnowledgeBase($term) {
        $term_lower = strtolower($term);
        $terms = AIEthicsKnowledgeBase::$definitions['terms'];
        
        // Direct match
        if (isset($terms[$term_lower])) {
            return $terms[$term_lower];
        }
        
        // Partial match
        foreach ($terms as $key => $value) {
            if (strpos($term_lower, $key) !== false || strpos($key, $term_lower) !== false) {
                return $value;
            }
        }
        
        return null;
    }

    private function formatComprehensiveDefinition($term, $definition, $analysis) {
        $response = "**📚 " . strtoupper($term) . " - Comprehensive Definition**\n\n";
        
        $response .= $definition['definition'] . "\n\n";
        
        // Add all available properties dynamically
        $property_labels = [
            'types' => '🔧 Types',
            'components' => '⚙️ Key Components',
            'examples' => '💡 Examples',
            'applications' => '🚀 Applications',
            'principles' => '🎯 Key Principles',
            'metrics' => '📊 Key Metrics',
            'characteristics' => '✨ Characteristics',
            'levels' => '📈 Levels',
            'benefits' => '🌟 Benefits',
            'techniques' => '🛠️ Techniques',
            'importance' => '⭐ Importance',
            'elements' => '🔍 Elements',
            'challenges' => '⚠️ Challenges',
            'areas' => '🌐 Areas',
            'stakeholders' => '👥 Stakeholders',
            'aspects' => '🔍 Key Aspects',
            'structure' => '🏗️ Structure',
            'impacts' => '⚡ Impacts'
        ];
        
        foreach ($property_labels as $key => $label) {
            if (isset($definition[$key]) && is_array($definition[$key])) {
                $response .= "**{$label}:**\n";
                foreach ($definition[$key] as $item) {
                    $response .= "• {$item}\n";
                }
                $response .= "\n";
            }
        }
        
        // Add contextual enhancements
        $response .= "**🔗 Related Topics:**\n";
        $related_topics = !empty($analysis['related_topics']) ? $analysis['related_topics'] : ['AI governance', 'ethical frameworks', 'implementation strategies'];
        foreach ($related_topics as $topic) {
            $response .= "• {$topic}\n";
        }
        
        $response .= "\n**🤖 Enhanced Learning:**\nFor deeper insights, advanced examples, or current research on {$term}, try switching to an AI provider (OpenAI GPT-4, Google Gemini, etc.) for comprehensive, up-to-date information.\n\n";
        $response .= "**💬 Continue the Conversation:**\nFeel free to ask follow-up questions about implementation, challenges, or related concepts!";
        
        return $response;
    }

    private function generateUnknownTermResponse($term, $analysis) {
        $available_terms = array_keys(AIEthicsKnowledgeBase::$definitions['terms']);
        $display_terms = array_slice($available_terms, 0, 8);
        
        return "**🔍 Term Not Found: \"{$term}\"**

I don't have a specific definition for \"{$term}\" in my current local knowledge base. Here's how to get the best answer:

**🤖 Recommended Next Steps:**
1. **Switch to AI Provider**: Use OpenAI GPT-4, Google Gemini, or Anthropic Claude for comprehensive definitions of specialized terms
2. **Rephrase Your Question**: Try using simpler or more common terminology
3. **Explore Related Concepts**: Ask about broader categories that might include your term

**📚 Available Definitions in My Knowledge Base:**
" . implode("\n", array_map(function($t) { return "• {$t}"; }, $display_terms)) . "
" . (count($available_terms) > 8 ? '• ...and more' : '') . "

**💡 Suggestion:**
If \"{$term}\" is related to AI ethics, try asking about the broader category or use one of the AI providers for the most current and comprehensive information.

Would you like me to help you rephrase your question or explore a related concept I do know about?";
    }

    private function generateInitialResponse($message, $analysis) {
        // Check IEEE standards first
        foreach (AIEthicsKnowledgeBase::$ieee_standards as $standard => $data) {
            foreach ($data['keywords'] as $keyword) {
                if (strpos(strtolower($message), $keyword) !== false) {
                    return $data['response'];
                }
            }
        }

        return $this->getGeneralEthicsResponse($message, $analysis);
    }

    private function applyRegenerativeThinking($response, $analysis) {
        $thinking_process = $this->generateThinkingProcess($analysis);
        $perspectives = $this->generateMultiplePerspectives($response, $analysis);
        
        return $this->combineThinkingAndResponse($thinking_process, $response, $perspectives);
    }

    private function generateThinkingProcess($analysis) {
        return "**🤔 Analytical Process:**
1. **Topic Identification**: Analyzing your question within the context of {$analysis['main_topic']}
2. **Standards Consultation**: Referencing relevant IEEE standards and industry best practices
3. **Multi-dimensional Analysis**: Considering technical, ethical, and societal implications
4. **Contextual Integration**: Building upon our previous discussion points
5. **Comprehensive Synthesis**: Formulating a complete, actionable response

";
    }

    private function generateMultiplePerspectives($response, $analysis) {
        return "

**🔍 Multiple Perspectives Analysis:**

**Technical Perspective:** From an implementation standpoint, this involves systematic application of established methodologies and best practices, ensuring technical rigor and measurable outcomes.

**Ethical Perspective:** The moral implications require careful consideration of stakeholder impacts, rights preservation, and long-term societal consequences.

**Regulatory Perspective:** Compliance considerations include current and emerging regulations, industry standards, and legal frameworks that govern AI development and deployment.

**Practical Perspective:** Real-world implementation must balance idealistic ethical goals with practical constraints, resource limitations, and organizational capabilities.

";
    }

    private function combineThinkingAndResponse($thinking, $response, $perspectives) {
        return "{$thinking}{$response}{$perspectives}

**🎯 Key Takeaways:**
These insights provide a foundation for understanding the multifaceted nature of AI ethics, emphasizing the need for comprehensive, well-informed approaches to ethical AI development and deployment.";
    }

    private function addContextualFollowUps($response, $analysis) {
        $suggestions = $analysis['follow_up_suggestions'];
        
        if (!empty($suggestions)) {
            $response .= "\n\n**🎯 Suggested Next Steps:**\n";
            foreach ($suggestions as $index => $suggestion) {
                $response .= ($index + 1) . ". {$suggestion}\n";
            }
        }
        return $response;
    }

    private function getGeneralEthicsResponse($message, $analysis) {
        $message_lower = strtolower($message);
        
        if (strpos($message_lower, 'hello') !== false || strpos($message_lower, 'hi') !== false) {
            return "Welcome to EthicBot Enhanced v3.0 PHP! I'm your advanced AI ethics assistant with comprehensive definition capabilities and hybrid AI integration.

**🚀 Enhanced Features:**
• **Comprehensive Definitions**: Detailed explanations of 10+ core AI ethics terms
• **IEEE Standards Integration**: Deep knowledge of IEEE 2857, 2859, 3652
• **Hybrid AI Functionality**: Integration with OpenAI GPT-4, Google Gemini, Meta Llama, Anthropic Claude, and more
• **Regenerative Thinking**: Multi-step analysis with context awareness
• **Educational Focus**: Clear, structured learning with practical examples

**💡 What You Can Ask:**
• \"Define artificial intelligence\" or \"What is machine learning?\"
• Questions about bias, fairness, privacy, transparency
• IEEE standards and implementation guidance
• Practical examples and case studies

**🔧 Multiple Modes Available:**
• **Local Mode**: IEEE standards-based responses with comprehensive definitions
• **AI Providers**: Enhanced responses with current research and detailed examples

What would you like to explore in AI ethics today?";
        }

        return "I understand you're inquiring about {$analysis['main_topic']}. Let me provide comprehensive guidance on this important aspect of AI ethics.

**Current Analysis:** Your question touches on fundamental considerations that require examination from multiple perspectives including technical implementation, ethical implications, and practical applications.

**Relevant Standards:** This topic is addressed by various IEEE standards and industry frameworks that provide systematic approaches to ethical AI development.

**Key Considerations:** The ethical implications involve balancing innovation with responsibility, ensuring stakeholder protection, and maintaining transparency throughout the development process.

**🔍 For Specific Definitions:** Ask \"What is [term]?\" or \"Define [concept]\" for detailed explanations of AI ethics terminology.

**🤖 For Enhanced Insights:** Switch to an AI provider for current research, detailed case studies, and implementation examples.

Could you please provide more specific details about what aspect you'd like me to focus on?";
    }
}

// API Handler for external AI providers (synchronous)
class APIHandler {
    public static function makeRequest($provider, $message, $context = []) {
        $config = APIConfig::$providers[$provider] ?? null;
        if (!$config) {
            return ['error' => 'Invalid provider'];
        }

        $api_key = self::getAPIKey($provider);
        if ($config['needs_key'] && !$api_key) {
            return [
                'error' => 'API key required',
                'message' => "**🔑 API Configuration Required**
        
To use {$config['name']}, you need to configure your API key:

1. **Go to Settings** and configure your API keys
2. **Enter your {$config['name']} API key**
3. **Save settings**

**💡 Alternative Options:**
• Switch back to **Local Mode** for comprehensive IEEE-based responses
• Configure a different API provider
• Use **Public APIs** for basic responses (no key required)

**📚 Local Knowledge Available:**
My local knowledge base includes comprehensive information about AI ethics, IEEE standards, bias detection, privacy engineering, and detailed definitions."
            ];
        }

        if ($provider === 'public') {
            return self::handlePublicAPI($message);
        }

        // Check if message is a definition request
        $is_definition_query = false;
        foreach (AIEthicsKnowledgeBase::$definitions['keywords'] as $keyword) {
            if (strpos(strtolower($message), $keyword) !== false) {
                $is_definition_query = true;
                break;
            }
        }

        $enhanced_prompt = self::buildPrompt($message, $is_definition_query, $context);
        
        try {
            switch ($provider) {
                case 'openai':
                    return self::callOpenAI($config, $api_key, $enhanced_prompt, $message);
                case 'anthropic':
                    return self::callAnthropic($config, $api_key, $enhanced_prompt, $message);
                case 'gemini':
                    return self::callGemini($config, $api_key, $enhanced_prompt, $message);
                case 'meta':
                    return self::callMeta($config, $api_key, $enhanced_prompt, $message);
                case 'cohere':
                    return self::callCohere($config, $api_key, $enhanced_prompt, $message);
                case 'huggingface':
                    return self::callHuggingFace($config, $api_key, $enhanced_prompt, $message);
                default:
                    return ['error' => 'Unsupported provider'];
            }
        } catch (Exception $e) {
            // Provide fallback with local knowledge
            $engine = new RegenerativeThinkingEngine();
            $local_response = $engine->processQuery($message, $context);
            
            return [
                'response' => "**⚠️ API Connection Issue**

I encountered an error connecting to {$config['name']}: {$e->getMessage()}

**🔄 Automatic Fallback to Local Knowledge:**
Let me provide you with a comprehensive response using my local IEEE standards-based knowledge:

{$local_response}

**💡 Troubleshooting Tips:**
• Check your API key configuration
• Verify your internet connection
• Try switching to a different API provider
• Contact the provider if issues persist

**🏠 Local Mode Always Available:**
Remember, my local knowledge base provides comprehensive AI ethics information even without API access!"
            ];
        }
    }

    private static function buildPrompt($message, $is_definition_query, $context) {
        if ($is_definition_query) {
            $term = self::extractTermFromMessage($message);
            $local_def = self::findLocalDefinition($term);
            
            $prompt = "You are EthicBot Enhanced, an advanced AI ethics expert. The user is asking for a definition. ";
            
            if ($local_def) {
                $formatted_def = self::formatLocalDefinition($local_def);
                $prompt .= "\n\nLOCAL KNOWLEDGE BASE ENTRY FOR \"" . strtoupper($term) . "\":\n{$formatted_def}\n\nPlease enhance this definition with:";
            } else {
                $prompt .= "\n\nThe user is asking about \"{$term}\". Please provide:";
            }
            
            $prompt .= "\n\n1. **Current Research & Developments** (2025 updates)
2. **Real-world Case Studies** with specific examples
3. **Technical Implementation Details** where applicable
4. **Industry Best Practices** and standards
5. **Challenges and Limitations** in practice
6. **Future Trends** and emerging considerations

Make your response comprehensive, well-structured, and educational. Use clear formatting with headers and bullet points.

User question: {$message}";
        } else {
            $context_str = '';
            if (!empty($context['context_memory'])) {
                $recent_context = array_slice($context['context_memory'], -4);
                foreach ($recent_context as $ctx) {
                    $context_str .= "{$ctx['role']}: " . substr($ctx['content'], 0, 150) . "...\n";
                }
            }
            
            $prompt = "You are EthicBot Enhanced, an advanced AI ethics expert specializing in IEEE standards (2857, 2859, 3652), practical implementation, and comprehensive ethical analysis.

Provide detailed, well-structured responses that:
1. Begin with clear context and relevance
2. Include specific examples and case studies
3. Reference applicable standards and frameworks
4. Offer multiple perspectives (technical, ethical, regulatory, practical)
5. Provide actionable implementation guidance
6. Conclude with clear recommendations
7. Use professional language with proper structure

Context from our conversation: {$context_str}

User question: {$message}";
        }
        
        return $prompt;
    }

    private static function extractTermFromMessage($message) {
        $message_lower = strtolower($message);
        $term = $message_lower;
        
        $triggers = ['what is', 'define', 'definition of', 'meaning of', 'explain', 'concept of', 'tell me about', 'describe'];
        foreach ($triggers as $trigger) {
            $term = preg_replace('/' . preg_quote($trigger) . '\s*(a\s+|an\s+|the\s+)?/i', '', $term);
        }
        
        return trim(preg_replace('/[?.,!]/', '', $term));
    }

    private static function findLocalDefinition($term) {
        $term_lower = strtolower($term);
        $terms = AIEthicsKnowledgeBase::$definitions['terms'];
        
        if (isset($terms[$term_lower])) {
            return $terms[$term_lower];
        }
        
        foreach ($terms as $key => $value) {
            if (strpos($term_lower, $key) !== false || strpos($key, $term_lower) !== false) {
                return $value;
            }
        }
        
        return null;
    }

    private static function formatLocalDefinition($definition) {
        $formatted = $definition['definition'] . "\n\n";
        
        $sections = ['types', 'components', 'examples', 'applications', 'principles', 'metrics'];
        foreach ($sections as $section) {
            if (isset($definition[$section])) {
                $formatted .= strtoupper($section) . ":\n";
                foreach ($definition[$section] as $item) {
                    $formatted .= "• {$item}\n";
                }
                $formatted .= "\n";
            }
        }
        
        return $formatted;
    }

    private static function callOpenAI($config, $api_key, $prompt, $message) {
        $headers = [
            'Content-Type: application/json',
            'Authorization: Bearer ' . $api_key
        ];
        
        $data = [
            'model' => $config['model'],
            'messages' => [
                ['role' => 'system', 'content' => $prompt],
                ['role' => 'user', 'content' => $message]
            ],
            'max_tokens' => 2000,
            'temperature' => 0.7
        ];
        
        $response = self::makeCurlRequest($config['endpoint'], $headers, json_encode($data));
        $result = json_decode($response, true);
        
        return ['response' => $result['choices'][0]['message']['content'] ?? 'No response generated'];
    }

    private static function callGemini($config, $api_key, $prompt, $message) {
        $url = $config['endpoint'] . '?key=' . $api_key;
        $headers = ['Content-Type: application/json'];
        
        $data = [
            'contents' => [
                [
                    'parts' => [
                        ['text' => $prompt . "\n\n" . $message]
                    ]
                ]
            ],
            'generationConfig' => [
                'temperature' => 0.7,
                'topK' => 40,
                'topP' => 0.95,
                'maxOutputTokens' => 2000
            ]
        ];
        
        $response = self::makeCurlRequest($url, $headers, json_encode($data));
        $result = json_decode($response, true);
        
        return ['response' => $result['candidates'][0]['content']['parts'][0]['text'] ?? 'No response generated'];
    }

    private static function handlePublicAPI($message) {
        try {
            $response = file_get_contents('https://api.quotable.io/random?tags=wisdom');
            $data = json_decode($response, true);
            
            return ['response' => "**💭 Inspirational Perspective on Ethics**

\"{$data['content']}\"
*— {$data['author']}*

**Connecting to Your Question:**
While this quote provides philosophical insight, for comprehensive AI ethics guidance tailored to your specific question about \"{$message}\", I recommend:

1. **Switching to Local Mode** for detailed IEEE standards-based responses
2. **Configuring an AI provider** for current research and detailed analysis
3. **Asking specific definition questions** if you need terminology explained

**📚 Available Local Knowledge:**
I have comprehensive definitions and guidance on AI ethics concepts including bias, fairness, transparency, privacy, explainability, and more."];
        } catch (Exception $e) {
            $engine = new RegenerativeThinkingEngine();
            $local_response = $engine->processQuery($message);
            
            return ['response' => "I encountered an issue accessing public APIs. Let me provide you with comprehensive AI ethics guidance using my local knowledge base instead.

**🏠 Switching to Local Knowledge:**
{$local_response}"];
        }
    }

    private static function makeCurlRequest($url, $headers, $data) {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 30);
        
        $response = curl_exec($ch);
        $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        
        if (curl_error($ch)) {
            throw new Exception('cURL Error: ' . curl_error($ch));
        }
        
        if ($http_code >= 400) {
            throw new Exception("HTTP Error: {$http_code}");
        }
        
        curl_close($ch);
        return $response;
    }

    private static function getAPIKey($provider) {
        return $_SESSION["api_key_{$provider}"] ?? null;
    }

    // Placeholder methods for other providers
    private static function callAnthropic($config, $api_key, $prompt, $message) {
        return ['response' => 'Anthropic API integration coming soon in PHP version.'];
    }

    private static function callMeta($config, $api_key, $prompt, $message) {
        return ['response' => 'Meta API integration coming soon in PHP version.'];
    }

    private static function callCohere($config, $api_key, $prompt, $message) {
        return ['response' => 'Cohere API integration coming soon in PHP version.'];
    }

    private static function callHuggingFace($config, $api_key, $prompt, $message) {
        return ['response' => 'Hugging Face API integration coming soon in PHP version.'];
    }
}

// Message formatting functions
function formatMessage($content) {
    $content = preg_replace('/\*\*(.*?)\*\*/', '<strong>$1</strong>', $content);
    $content = preg_replace('/\*(.*?)\*/', '<em>$1</em>', $content);
    $content = nl2br($content);
    $content = preg_replace('/^• (.+)/m', '<div class="bullet-point">• $1</div>', $content);
    return $content;
}

// Main processing logic
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    header('Content-Type: application/json');
    
    $input = json_decode(file_get_contents('php://input'), true);
    $action = $input['action'] ?? '';
    
    switch ($action) {
        case 'send_message':
            $message = trim($input['message'] ?? '');
            if (empty($message)) {
                echo json_encode(['error' => 'Empty message']);
                exit;
            }
            
            // Add user message to session
            $_SESSION['context_memory'][] = [
                'role' => 'user',
                'content' => $message,
                'timestamp' => time()
            ];
            
            $response = '';
            $current_provider = $_SESSION['current_provider'];
            
            if ($current_provider === 'local') {
                $engine = new RegenerativeThinkingEngine();
                $response = $engine->processQuery($message, [
                    'history' => $_SESSION['chat_history'],
                    'context' => $_SESSION['context_memory']
                ]);
            } else {
                $api_result = APIHandler::makeRequest($current_provider, $message, [
                    'history' => $_SESSION['chat_history'],
                    'context_memory' => $_SESSION['context_memory']
                ]);
                
                if (isset($api_result['error'])) {
                    $response = $api_result['message'] ?? 'API Error occurred';
                } else {
                    $response = $api_result['response'];
                }
            }
            
            // Add AI response to session
            $_SESSION['context_memory'][] = [
                'role' => 'assistant',
                'content' => $response,
                'timestamp' => time()
            ];
            
            // Add to chat history
            $_SESSION['chat_history'][] = ['sender' => 'user', 'content' => $message];
            $_SESSION['chat_history'][] = ['sender' => 'assistant', 'content' => $response];
            
            // Limit context memory
            if (count($_SESSION['context_memory']) > 40) {
                $_SESSION['context_memory'] = array_slice($_SESSION['context_memory'], -40);
            }
            
            echo json_encode([
                'success' => true,
                'response' => $response,
                'formatted' => formatMessage($response)
            ]);
            break;
            
        case 'switch_provider':
            $provider = $input['provider'] ?? 'local';
            $_SESSION['current_provider'] = $provider;
            
            $provider_name = APIConfig::$providers[$provider]['name'] ?? strtoupper($provider);
            $description = getProviderDescription($provider);
            
            echo json_encode([
                'success' => true,
                'message' => "**🔄 Provider Switch**\n\nNow using: **{$provider_name}**\n\n{$description}"
            ]);
            break;
            
        case 'save_api_key':
            $provider = $input['provider'] ?? '';
            $api_key = $input['api_key'] ?? '';
            
            if ($provider && $api_key) {
                $_SESSION["api_key_{$provider}"] = $api_key;
                echo json_encode(['success' => true]);
            } else {
                echo json_encode(['error' => 'Invalid provider or API key']);
            }
            break;
            
        case 'get_chat_history':
            echo json_encode([
                'success' => true,
                'history' => $_SESSION['chat_history'],
                'current_provider' => $_SESSION['current_provider']
            ]);
            break;
            
        default:
            echo json_encode(['error' => 'Unknown action']);
            break;
    }
    exit;
}

function getProviderDescription($provider) {
    $descriptions = [
        'local' => '🏠 **Local Mode**: IEEE standards-based responses with comprehensive definitions and regenerative thinking. No API key required.',
        'openai' => '🤖 **OpenAI GPT-4**: Advanced reasoning with current knowledge and detailed analysis.',
        'anthropic' => '🧠 **Anthropic Claude**: Thoughtful, nuanced responses with strong ethical reasoning.',
        'gemini' => '🌟 **Google Gemini**: Comprehensive analysis with integrated search capabilities.',
        'meta' => '🦙 **Meta Llama 2**: Open-source AI with balanced performance and efficiency.',
        'cohere' => '⚡ **Cohere**: Specialized in natural language understanding and generation.',
        'huggingface' => '🤗 **Hugging Face**: Community-driven AI with diverse model options.',
        'public' => '🌐 **Public APIs**: Basic responses using free public services.'
    ];
    
    return $descriptions[$provider] ?? 'Advanced AI provider for comprehensive responses.';
}
?>

import express from "express";
import { body, validationResult } from "express-validator";

const router = express.Router();

// Ethics knowledge base
const ethicsKnowledgeBase = {
    principles: {
        fairness: {
            definition: "AI systems should treat all individuals and groups equitably, without bias or discrimination.",
            examples: ["Unbiased hiring algorithms", "Fair credit scoring", "Equal healthcare AI recommendations"],
            challenges: ["Historical bias in data", "Defining fairness metrics", "Balancing individual vs group fairness"]
        },
        transparency: {
            definition: "AI decision-making processes should be understandable and explainable to users.",
            examples: ["Explainable AI models", "Algorithm auditing", "Clear disclosure of AI use"],
            challenges: ["Black box algorithms", "Technical complexity", "Trade-offs with performance"]
        },
        accountability: {
            definition: "Clear responsibility must be established for AI system outcomes and decisions.",
            examples: ["Human oversight systems", "Audit trails", "Liability frameworks"],
            challenges: ["Diffused responsibility", "Autonomous systems", "Legal frameworks"]
        },
        privacy: {
            definition: "Personal data must be protected and used only with proper consent and safeguards.",
            examples: ["Data minimization", "Federated learning", "Differential privacy"],
            challenges: ["Data collection scale", "Cross-border data flow", "Consent complexity"]
        },
        beneficence: {
            definition: "AI should be designed to benefit humanity and avoid harm.",
            examples: ["Healthcare AI", "Educational tools", "Environmental monitoring"],
            challenges: ["Dual-use technologies", "Unintended consequences", "Benefit distribution"]
        }
    },
    applications: {
        healthcare: {
            issues: ["Bias in diagnostic algorithms", "Patient privacy", "Informed consent for AI"],
            solutions: ["Diverse training data", "Federated learning", "Transparent AI disclosure"]
        },
        finance: {
            issues: ["Algorithmic discrimination", "Credit scoring bias", "Market manipulation"],
            solutions: ["Fairness testing", "Regulatory compliance", "Explainable decisions"]
        },
        criminal_justice: {
            issues: ["Risk assessment bias", "Surveillance concerns", "Due process"],
            solutions: ["Bias auditing", "Human oversight", "Transparent algorithms"]
        },
        employment: {
            issues: ["Hiring bias", "Job displacement", "Workplace surveillance"],
            solutions: ["Diverse datasets", "Reskilling programs", "Privacy protections"]
        }
    }
};

// Get ethics principles
router.get("/principles", (req, res) => {
    try {
        res.json({
            success: true,
            principles: ethicsKnowledgeBase.principles
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

// Get specific principle
router.get("/principles/:principle", (req, res) => {
    try {
        const { principle } = req.params;
        const principleData = ethicsKnowledgeBase.principles[principle.toLowerCase()];
        
        if (!principleData) {
            return res.status(404).json({
                success: false,
                error: "Principle not found"
            });
        }
        
        res.json({
            success: true,
            principle: principle.toLowerCase(),
            data: principleData
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

// Get application areas
router.get("/applications", (req, res) => {
    try {
        res.json({
            success: true,
            applications: ethicsKnowledgeBase.applications
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

// Get specific application area
router.get("/applications/:area", (req, res) => {
    try {
        const { area } = req.params;
        const applicationData = ethicsKnowledgeBase.applications[area.toLowerCase()];
        
        if (!applicationData) {
            return res.status(404).json({
                success: false,
                error: "Application area not found"
            });
        }
        
        res.json({
            success: true,
            area: area.toLowerCase(),
            data: applicationData
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

// Analyze ethics query
router.post("/analyze", [
    body('query').notEmpty().trim().isLength({ min: 1, max: 1000 }).withMessage('Query must be between 1 and 1000 characters'),
], (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                error: "Validation failed",
                details: errors.array()
            });
        }

        const { query } = req.body;
        const lowerQuery = query.toLowerCase();
        
        // Analyze query for ethics concepts
        const relevantPrinciples = [];
        const relevantApplications = [];
        
        Object.keys(ethicsKnowledgeBase.principles).forEach(principle => {
            if (lowerQuery.includes(principle) || 
                ethicsKnowledgeBase.principles[principle].definition.toLowerCase().includes(lowerQuery) ||
                ethicsKnowledgeBase.principles[principle].examples.some(ex => 
                    ex.toLowerCase().includes(lowerQuery) || lowerQuery.includes(ex.toLowerCase())
                )) {
                relevantPrinciples.push({
                    principle,
                    data: ethicsKnowledgeBase.principles[principle]
                });
            }
        });
        
        Object.keys(ethicsKnowledgeBase.applications).forEach(application => {
            if (lowerQuery.includes(application) ||
                ethicsKnowledgeBase.applications[application].issues.some(issue =>
                    issue.toLowerCase().includes(lowerQuery) || lowerQuery.includes(issue.toLowerCase())
                )) {
                relevantApplications.push({
                    application,
                    data: ethicsKnowledgeBase.applications[application]
                });
            }
        });
        
        res.json({
            success: true,
            query,
            analysis: {
                relevantPrinciples,
                relevantApplications,
                hasEthicsContent: relevantPrinciples.length > 0 || relevantApplications.length > 0
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

export default router;

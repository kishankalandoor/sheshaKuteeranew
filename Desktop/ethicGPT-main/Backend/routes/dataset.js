import express from "express";
import multer from "multer";
import csv from "csv-parser";
import fs from "fs";
import path from "path";
import { body, validationResult } from "express-validator";

const router = express.Router();

// Configure multer for file uploads
const upload = multer({
    dest: 'uploads/',
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'text/csv' || file.originalname.endsWith('.csv')) {
            cb(null, true);
        } else {
            cb(new Error('Only CSV files are allowed'), false);
        }
    }
});

// In-memory dataset storage (in production, use a proper database)
let datasets = [];
let currentDataset = null;

// Upload and process CSV dataset
router.post("/upload", upload.single('dataset'), async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                error: "No file uploaded"
            });
        }

        const results = [];
        const filePath = req.file.path;
        
        // Parse CSV file
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                // Clean up uploaded file
                fs.unlinkSync(filePath);
                
                // Process the dataset
                const processedDataset = {
                    id: Date.now().toString(),
                    filename: req.file.originalname,
                    uploadedAt: new Date(),
                    rowCount: results.length,
                    columns: results.length > 0 ? Object.keys(results[0]) : [],
                    data: results,
                    analysis: analyzeDataset(results)
                };
                
                datasets.push(processedDataset);
                currentDataset = processedDataset;
                
                res.json({
                    success: true,
                    dataset: {
                        id: processedDataset.id,
                        filename: processedDataset.filename,
                        rowCount: processedDataset.rowCount,
                        columns: processedDataset.columns,
                        uploadedAt: processedDataset.uploadedAt,
                        analysis: processedDataset.analysis
                    }
                });
            })
            .on('error', (error) => {
                fs.unlinkSync(filePath);
                next(error);
            });

    } catch (err) {
        next(err);
    }
});

// Get all datasets
router.get("/", (req, res) => {
    try {
        const datasetSummaries = datasets.map(dataset => ({
            id: dataset.id,
            filename: dataset.filename,
            rowCount: dataset.rowCount,
            columns: dataset.columns,
            uploadedAt: dataset.uploadedAt,
            analysis: dataset.analysis
        }));
        
        res.json({
            success: true,
            datasets: datasetSummaries,
            currentDataset: currentDataset ? currentDataset.id : null
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

// Get specific dataset
router.get("/:id", (req, res) => {
    try {
        const { id } = req.params;
        const dataset = datasets.find(d => d.id === id);
        
        if (!dataset) {
            return res.status(404).json({
                success: false,
                error: "Dataset not found"
            });
        }
        
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 100;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        
        res.json({
            success: true,
            dataset: {
                id: dataset.id,
                filename: dataset.filename,
                rowCount: dataset.rowCount,
                columns: dataset.columns,
                uploadedAt: dataset.uploadedAt,
                analysis: dataset.analysis,
                data: dataset.data.slice(startIndex, endIndex),
                pagination: {
                    page,
                    limit,
                    total: dataset.rowCount,
                    pages: Math.ceil(dataset.rowCount / limit)
                }
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

// Search dataset
router.post("/:id/search", [
    body('query').notEmpty().trim().withMessage('Search query is required'),
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

        const { id } = req.params;
        const { query, column } = req.body;
        
        const dataset = datasets.find(d => d.id === id);
        
        if (!dataset) {
            return res.status(404).json({
                success: false,
                error: "Dataset not found"
            });
        }
        
        let results = dataset.data;
        
        if (column && dataset.columns.includes(column)) {
            // Search in specific column
            results = results.filter(row => 
                row[column] && row[column].toString().toLowerCase().includes(query.toLowerCase())
            );
        } else {
            // Search in all columns
            results = results.filter(row =>
                Object.values(row).some(value =>
                    value && value.toString().toLowerCase().includes(query.toLowerCase())
                )
            );
        }
        
        res.json({
            success: true,
            query,
            column: column || 'all',
            resultCount: results.length,
            results: results.slice(0, 100) // Limit results
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

// Set current dataset
router.patch("/:id/activate", (req, res) => {
    try {
        const { id } = req.params;
        const dataset = datasets.find(d => d.id === id);
        
        if (!dataset) {
            return res.status(404).json({
                success: false,
                error: "Dataset not found"
            });
        }
        
        currentDataset = dataset;
        
        res.json({
            success: true,
            message: "Dataset activated successfully",
            currentDataset: {
                id: dataset.id,
                filename: dataset.filename,
                rowCount: dataset.rowCount
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

// Delete dataset
router.delete("/:id", (req, res) => {
    try {
        const { id } = req.params;
        const datasetIndex = datasets.findIndex(d => d.id === id);
        
        if (datasetIndex === -1) {
            return res.status(404).json({
                success: false,
                error: "Dataset not found"
            });
        }
        
        const deletedDataset = datasets.splice(datasetIndex, 1)[0];
        
        if (currentDataset && currentDataset.id === id) {
            currentDataset = datasets.length > 0 ? datasets[0] : null;
        }
        
        res.json({
            success: true,
            message: "Dataset deleted successfully",
            deletedDataset: deletedDataset.filename
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

// Analyze dataset for ethics-related content
function analyzeDataset(data) {
    if (!data || data.length === 0) return null;
    
    const columns = Object.keys(data[0]);
    const ethicsKeywords = [
        'bias', 'fair', 'discrimination', 'ethics', 'privacy', 'security',
        'transparent', 'accountable', 'harmful', 'beneficial', 'risk'
    ];
    
    const analysis = {
        totalRows: data.length,
        columns: columns,
        ethicsRelated: false,
        ethicsColumns: [],
        keywordFrequency: {},
        riskLevels: { high: 0, medium: 0, low: 0, unknown: 0 },
        categories: {}
    };
    
    // Check for ethics-related columns
    columns.forEach(col => {
        const lowerCol = col.toLowerCase();
        if (ethicsKeywords.some(keyword => lowerCol.includes(keyword))) {
            analysis.ethicsRelated = true;
            analysis.ethicsColumns.push(col);
        }
    });
    
    // Analyze content
    data.forEach(row => {
        Object.entries(row).forEach(([key, value]) => {
            if (value) {
                const lowerValue = value.toString().toLowerCase();
                ethicsKeywords.forEach(keyword => {
                    if (lowerValue.includes(keyword)) {
                        analysis.keywordFrequency[keyword] = (analysis.keywordFrequency[keyword] || 0) + 1;
                        analysis.ethicsRelated = true;
                    }
                });
                
                // Check for risk levels
                if (lowerValue.includes('high')) analysis.riskLevels.high++;
                else if (lowerValue.includes('medium')) analysis.riskLevels.medium++;
                else if (lowerValue.includes('low')) analysis.riskLevels.low++;
                else analysis.riskLevels.unknown++;
                
                // Categorize entries
                if (key.toLowerCase().includes('category') || key.toLowerCase().includes('type')) {
                    analysis.categories[value] = (analysis.categories[value] || 0) + 1;
                }
            }
        });
    });
    
    return analysis;
}

// Get current dataset for AI responses
router.get("/current/data", (req, res) => {
    try {
        if (!currentDataset) {
            return res.status(404).json({
                success: false,
                error: "No active dataset"
            });
        }
        
        res.json({
            success: true,
            dataset: currentDataset
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

export default router;
export { currentDataset };

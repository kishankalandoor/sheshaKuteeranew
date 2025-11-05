import express from "express";
import { body, validationResult } from "express-validator";
import Thread from "../models/Thread.js";
import getAIResponse from "../utils/aiProvider.js";
import rateLimit from "express-rate-limit";

const router = express.Router();

// Rate limiting for chat endpoints
const chatLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 20, // limit each IP to 20 chat requests per minute
    message: { error: "Too many chat requests, please slow down" }
});

// Validation middleware
const validateChatMessage = [
    body('threadId').notEmpty().withMessage('Thread ID is required'),
    body('message').notEmpty().trim().isLength({ min: 1, max: 2000 }).withMessage('Message must be between 1 and 2000 characters'),
];

const validateThreadId = [
    body('threadId').notEmpty().withMessage('Thread ID is required'),
];

// Get all threads
router.get("/threads", async(req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const threads = await Thread.find({})
            .sort({updatedAt: -1})
            .skip(skip)
            .limit(limit)
            .select('threadId title updatedAt createdAt');

        const total = await Thread.countDocuments();

        res.json({
            success: true,
            threads,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch(err) {
        next(err);
    }
});

// Get specific thread messages
router.get("/thread/:threadId", async(req, res, next) => {
    const {threadId} = req.params;

    try {
        const thread = await Thread.findOne({threadId});

        if(!thread) {
            return res.status(404).json({
                success: false,
                error: "Thread not found"
            });
        }

        res.json({
            success: true,
            messages: thread.messages,
            title: thread.title,
            createdAt: thread.createdAt,
            updatedAt: thread.updatedAt
        });
    } catch(err) {
        next(err);
    }
});

// Delete thread
router.delete("/thread/:threadId", async (req, res, next) => {
    const {threadId} = req.params;

    try {
        const deletedThread = await Thread.findOneAndDelete({threadId});

        if(!deletedThread) {
            return res.status(404).json({
                success: false,
                error: "Thread not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Thread deleted successfully"
        });

    } catch(err) {
        next(err);
    }
});

// Send chat message
router.post("/message", chatLimiter, validateChatMessage, async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            error: "Validation failed",
            details: errors.array()
        });
    }

    const {threadId, message, provider = 'local'} = req.body;

    try {
        let thread = await Thread.findOne({threadId});

        if(!thread) {
            thread = new Thread({
                threadId,
                title: message.substring(0, 50) + (message.length > 50 ? '...' : ''),
                messages: [{role: "user", content: message}]
            });
        } else {
            thread.messages.push({role: "user", content: message});
        }

        // Get AI response
        let assistantReply;
        try {
            assistantReply = await getAIResponse(message, provider, thread.messages);
        } catch (aiError) {
            console.error('AI Provider Error:', aiError);
            assistantReply = "I apologize, but I'm having trouble processing your request right now. Please try again later.";
        }

        thread.messages.push({role: "assistant", content: assistantReply});
        thread.updatedAt = new Date();

        await thread.save();

        res.json({
            success: true,
            reply: assistantReply,
            threadId: thread.threadId,
            messageCount: thread.messages.length
        });
    } catch(err) {
        next(err);
    }
});

// Update thread title
router.patch("/thread/:threadId/title", validateThreadId, async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            error: "Validation failed",
            details: errors.array()
        });
    }

    const {threadId} = req.params;
    const {title} = req.body;

    try {
        const thread = await Thread.findOneAndUpdate(
            {threadId}, 
            {title, updatedAt: new Date()}, 
            {new: true}
        );

        if(!thread) {
            return res.status(404).json({
                success: false,
                error: "Thread not found"
            });
        }

        res.json({
            success: true,
            message: "Title updated successfully",
            title: thread.title
        });
    } catch(err) {
        next(err);
    }
});

// Get chat statistics
router.get("/stats", async(req, res, next) => {
    try {
        const totalThreads = await Thread.countDocuments();
        const totalMessages = await Thread.aggregate([
            { $project: { messageCount: { $size: "$messages" } } },
            { $group: { _id: null, total: { $sum: "$messageCount" } } }
        ]);

        const recentActivity = await Thread.find({})
            .sort({updatedAt: -1})
            .limit(5)
            .select('threadId title updatedAt');

        res.json({
            success: true,
            stats: {
                totalThreads,
                totalMessages: totalMessages[0]?.total || 0,
                recentActivity
            }
        });
    } catch(err) {
        next(err);
    }
});

export default router;

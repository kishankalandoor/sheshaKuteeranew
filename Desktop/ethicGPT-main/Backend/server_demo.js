import express from "express";
import "dotenv/config";
import cors from "cors";
import chatRoutes from "./routes/chat.js";
import ethicsRoutes from "./routes/ethics.js";
import datasetRoutes from "./routes/dataset.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 8080;

// Enhanced middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.FRONTEND_URL || ["http://localhost:3000", "http://localhost:5173"],
    credentials: true
}));

// Routes
app.use("/api/chat", chatRoutes);
app.use("/api/ethics", ethicsRoutes);
app.use("/api/dataset", datasetRoutes);

// Health check
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        message: "EthicGPT Backend is running!"
    });
});

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📱 Environment: ${process.env.NODE_ENV || "development"}`);
    console.log(`⚠️  Note: MongoDB connection disabled for demo`);
    console.log(`🔗 Health check: http://localhost:${PORT}/health`);
});

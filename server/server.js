require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import Routes
const authRoutes = require("./routes/auth");
const budgetRoutes = require("./routes/budgetsuggestion");
const waterUsageRoute = require("./routes/waterUsageRoute");
const elecUsageRoute = require("./routes/elecUsageRoute");
const effluentQualityRoute = require("./routes/effluentQualityRoute");
const app = express();

// Middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

app.get("/", (req, res) => {
  res.send("API is running fine!!!");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/budget", budgetRoutes);
app.use("/api/water-usage", waterUsageRoute);
app.use("/api/elec-usage", elecUsageRoute);
app.use("/api/effluent-quality", effluentQualityRoute);

// Basic Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

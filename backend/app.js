const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const storeRoutes = require("./routes/storeRoutes");
const ratingRoutes = require("./routes/ratingRoutes");
const userRoutes=require("./routes/userRoutes");
const ownerRoutes = require("./routes/ownerRoutes");

const app = express();

/* ===========================
   Global Middleware
=========================== */

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true
    })
);

app.use(helmet());

app.use(morgan("dev"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());


/* ===========================
   Health Check Route
=========================== */

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "🚀 Store Rating System Backend is Running",
        version: "1.0.0"
    });
});

/* ===========================
   API Routes
=========================== */

// Authentication
app.use("/api/auth", require("./routes/authRoutes"));

// Admin
app.use("/api/admin", require("./routes/adminRoutes"));

// User
app.use("/api/user", require("./routes/userRoutes"));

// Store Owner
app.use("/api/owner", require("./routes/ownerRoutes"));

// Ratings
app.use("/api/ratings", require("./routes/ratingRoutes"));

// Stores
app.use("/api/stores", require("./routes/storeRoutes"));

app.use("/api/user/ratings", ratingRoutes);

app.use("/api/owner", ownerRoutes);
app.use("/api/user",userRoutes);


/* ===========================
   404 Route
=========================== */

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found"
    });
});

/* ===========================
   Global Error Handler
=========================== */

app.use((err, req, res, next) => {

    console.error(err.stack);

    res.status(err.status || 500).json({

        success: false,

        message: err.message || "Internal Server Error"

    });

});

module.exports = app;
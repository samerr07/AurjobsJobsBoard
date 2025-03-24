import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import candidateRoutes from "./routes/candidate-route.js";
import employerRoutes from "./routes/employer-routes.js";
import jobRoutes from "./routes/job-route.js";
import matchRoutes from "./routes/matchRoutes.js";
import job_external_routes from "./routes/job_external_routes.js"
import payment_routes from "./routes/payment-route.js"
import prerender from "prerender-node";
import path from "path";
import { configurePassport, passport } from "./config/passport.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config();

// ✅ Initialize Passport Strategy
configurePassport();

const app = express();
const port = process.env.PORT || 3000; // Default to 3000 if not set

prerender.set("prerenderToken", process.env.PRERENDER_TOKEN); // Store this in your .env file
app.use(prerender);

const corsOptions = {
    origin: true,
    credentials: true
};

app.use(cors(corsOptions));
app.use(cookieParser());

// Middleware
app.use(bodyParser.json()); // Allow JSON requests

// ✅ Initialize Passport Middleware
app.use(passport.initialize());

// Candidate Routes
app.use("/candidates", candidateRoutes);
app.use("/employers", employerRoutes);
app.use("/jobs_post", jobRoutes);
app.use("/match", matchRoutes);
app.use("/external_jobs", job_external_routes);
app.use("/payments", payment_routes);


// Serve static assets if you have any (for production)

app.use(express.static("build"));

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/build/index.html");
});


// Start server
app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
});
import { Router } from "express";
import CandidateController from "../controllers/candidate-controller.js";
import { verifyToken } from "../middleware/candidate-auth.js";
import { otp_verification, job_sender } from "../controllers/verification.js";
import passport from "passport";

const router = Router();

// Candidate Signup & Login
router.post("/CandidateSignup", CandidateController.signupCandidate);
router.post("/CandidateLogin", CandidateController.loginCandidate);
router.get("/CandidateProfile/:id", CandidateController.getCandidateProfile);
router.put("/CandidateProfile/:id", verifyToken, CandidateController.updateCandidateProfile);
router.post("/otp_verification", otp_verification);
router.post("/job_sender", job_sender);

// ✅ Google OAuth Login (Redirects to Google)
router.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

// ✅ Google OAuth Callback (Handles response from Google)
router.get(
    "/auth/google/callback",
    passport.authenticate("google", { session: false, failureRedirect: "/login" }),
    CandidateController.candidate_login_google
);

export default router;
import { Router } from "express";
import CandidateController from "../controllers/candidate-controller.js";
import { verifyToken } from "../middleware/candidate-auth.js";

const router = Router();

// Candidate Signup Route
router.post("/CandidateSignup", CandidateController.signupCandidate); // Handle candidate signup
router.post("/CandidateLogin", CandidateController.loginCandidate); //handles candidate login
router.get("/CandidateProfile", verifyToken, CandidateController.getCandidateProfile); // handles candidate profile

console.log("hey im in candidate- route.js file")
export default router;
import { Router } from "express";
import { SignUpCandidate, loginCandidate } from "../controllers/candidate-controller.js";

const router = Router();

// Candidate Signup Route
router.post("/CandidateSignup", SignUpCandidate); // Handle candidate signup
router.post("/CandidateLogin", loginCandidate);

console.log("hey im in candidate- route.js file")
export default router;
import { Router } from "express";
import { SignUpEmployer, loginEmployer } from "../controllers/employer-controller.js";

const router = Router();

// Employer Signup Route
router.post("/EmployerSignup", SignUpEmployer); // Handle Employer signup
router.post("/EmployerLogin", loginEmployer);

console.log("hey im in employer- route.js file")
export default router;
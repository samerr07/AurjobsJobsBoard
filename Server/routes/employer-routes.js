import { Router } from "express";
import { SignUpEmployer, loginEmployer } from "../controllers/employer-controller.js";

const router = Router();

router.post("/EmployerSignup", SignUpEmployer); // Handle Employer signup
router.post("/EmployerLogin", loginEmployer); // Handle Employer login

console.log("hey im in employer- route.js file")
export default router;
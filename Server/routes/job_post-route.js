import { getalljobs } from "../controllers/job_post-controller.js";
import { Router } from "express";

const router = Router();
router.get("/jobs", getalljobs);
console.log("in job post route");
export default router;
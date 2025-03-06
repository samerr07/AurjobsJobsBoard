import { create_Job_Post_external } from "../controllers/job_external_controller.js";
import { Router } from "express";
const router = Router();
router.post("/create_external_jobs", create_Job_Post_external);
export default router;
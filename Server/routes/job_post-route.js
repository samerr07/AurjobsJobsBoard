import { getalljobs, CreateJobPost, getJobsbyId } from "../controllers/job_post-controller.js";
import { Router } from "express";
import { verifyToken } from "../middleware/employer-auth.js";

const router = Router();

router.get("/jobs", getalljobs); //to get some details of all the jobs in db
router.post("/create_Job_Post", verifyToken, CreateJobPost); //to create a job post by filling the required fields
router.get("/job_details/:id", getJobsbyId); //to get a job full details of a particular job
console.log("in job post route");
export default router;
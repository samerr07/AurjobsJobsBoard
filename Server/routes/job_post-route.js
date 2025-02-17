import { getalljobs, CreateJobPost, getJobsbyId } from "../controllers/job_post-controller.js";
import { Router } from "express";

const router = Router();
router.get("/jobs", getalljobs); //to get some details of all the jobs in db
router.post("/createJobPost", CreateJobPost); //to create a job post by filling the required fields
router.get("/jobdetails/:id", getJobsbyId); //to get a job full details of a particular job
console.log("in job post route");
export default router;
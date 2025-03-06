import { create_Job_Post_external, company_registration_, all_companies_data_, all_external_jobs_data_ } from "../controllers/job_external_controller.js";
import { Router } from "express";
const router = Router();
router.post("/create_external_jobs", create_Job_Post_external);
router.post("/create_external_company", company_registration_);
router.get("/external_companies_details", all_companies_data_);
router.get("/external_job_details", all_external_jobs_data_);

export default router;
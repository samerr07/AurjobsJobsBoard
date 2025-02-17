import { alljobs, createJobPost, getjobsdetailsbyid } from "../models/job-post.js";

console.log("in controllers job post");
export const getalljobs = async(req, res) => {
    try {
        const jobs = await alljobs();
        return res.status(200).json(jobs);
    } catch (error) {
        return res.status(500).json({ error: "Failed to fetch jobs" });
    }
};
export const getJobsbyId = async(req, res) => {
    try {
        const { id } = req.params;

        const job_details = await getjobsdetailsbyid(id);

        if (!job_details || job_details.length === 0) {
            return res.status(404).json({ error: "Job not found", success: false });
        }

        res.status(200).json({ job: job_details, success: true });
    } catch (error) {
        console.error("Error fetching job by ID:", error);
        res.status(500).json({ error: "Internal Server Error", success: false });
    }
};

export const CreateJobPost = async(req, res) => {
    try {
        const {
            job_title,
            job_description,
            employment_type,
            job_location,
            salary_range,
            job_experience_required,
            job_skills_required,
            industry,
            work_mode,

        } = req.body;

        if (!Array.isArray(job_skills_required)) {
            return res.status(400).json({ error: "job_skills_required must be an array", success: false });
        }

        const jobCreated = await createJobPost(
            job_title,
            job_description,
            employment_type,
            job_location,
            salary_range,
            job_experience_required,
            job_skills_required,
            industry, work_mode,
        );

        res.status(201).json({
            message: "Job created successfully",
            job: jobCreated,
            success: true
        });
    } catch (error) {
        console.error("Error creating job post:", error);
        res.status(500).json({ error: "Internal Server Error", success: false });
    }
};
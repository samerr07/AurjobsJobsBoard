import { Job_Post_external } from "../models/job-external.js";

export const create_Job_Post_external = async(req, res) => {
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
            job_link,
        } = req.body;
        console.log(req.body);
        // Get employer_id from the token (set by verifyToken middleware)
        const employer_id = req.body.employer_id;
        console.log(employer_id);

        if (!employer_id) {
            return res.status(403).json({ error: "Unauthorized: Employer ID missing", success: false });
        }

        if (!Array.isArray(job_skills_required)) {
            return res.status(400).json({ error: "job_skills_required must be an array", success: false });
        }

        const jobCreated = await Job_Post_external(
            job_title,
            job_description,
            employment_type,
            job_location,
            salary_range,
            job_experience_required,
            job_skills_required,
            industry,
            work_mode,
            job_link,
            employer_id // Now passing employer_id
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
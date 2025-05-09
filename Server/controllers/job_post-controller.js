import supabase from "../config/supabase-client.js";
import { alljobs, createJobPost, employer_Jobs, createJobApplication, getApplicationsByCandidateId, Job_application, getCandidatesForJob, getJobDetailsByJobId, delete_Job_FromDB, jobs_Posted_Today } from "../models/job-post.js";

console.log("in controllers job post");
// export const employer_jobs = async(req, res) => {
//     try {
//         const { id } = req.params; // Employer ID passed as a URL parameter
//         const jobs = await employer_Jobs(id); // Fetch jobs using employer_Jobs function
//         return res.status(200).json(jobs); // Return jobs in response
//     } catch (error) {
//         return res.status(500).json({ error: `Failed to fetch Employer Jobs: ${error.message}` });
//     }
// };


export const employer_jobs = async(req, res) => {
    try {
        const { id } = req.params; // Employer ID passed as a URL parameter

        // Validate if employer ID is provided
        if (!id) {
            return res.status(400).json({
                success: false,
                error: "Employer ID is required"
            });
        }

        const jobs = await employer_Jobs(id); // Fetch jobs using employer_Jobs function

        return res.status(200).json({
            success: true,
            data: jobs
        });

    } catch (error) {
        console.error("Error fetching employer jobs:", error); // Log the error for debugging

        if (error.message.includes("No jobs found")) {
            return res.status(404).json({
                success: false,
                error: "No jobs found for this employer"
            });
        }

        return res.status(500).json({
            success: false,
            error: `Internal Server Error: ${error.message}`
        });
    }
}

export const job_application = async(req, res) => {
    try {
        const { id } = req.params;
        console.log(id)
        const job = await Job_application(id);
        return res.status(200).json(job);
    } catch (error) {
        return res.status(500).json({ error: `Failed to fetch Employer Jobs: ${error.message}` });
    }
}

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

        const job_details = await getJobDetailsByJobId(id);

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

        const jobCreated = await createJobPost(
            job_title,
            job_description,
            employment_type,
            job_location,
            salary_range,
            job_experience_required,
            job_skills_required,
            industry,
            work_mode,
            employer_id // Now passing employer_id
        );
        if (jobCreated.error) {
            res.status(500).json({
                message: "error creating the jobs",
                success: false
            })
        }
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

//apply for job

export const applyForJob = async(req, res) => {
    try {
        const { job_id, candidate_id, score } = req.body;

        const screening_score = score;

        if (!candidate_id) {
            return res.status(403).json({
                error: "Unauthorized: Candidate ID missing",
                success: false
            });
        }

        // Check if job exists
        const jobExists = await getJobDetailsByJobId(job_id);
        if (!jobExists) {
            return res.status(404).json({
                error: "Job not found",
                success: false
            });
        }

        // Check if already applied
        const { data: existingApplication } = await supabase
            .from("applications")
            .select("*")
            .eq("job_id", job_id)
            .eq("candidate_id", candidate_id)
            .single();

        if (existingApplication) {
            return res.status(400).json({
                error: "You have already applied for this job",
                success: false
            });
        }

        // Create application
        const application = await createJobApplication(
            job_id,
            candidate_id,
            screening_score
        );

        res.status(201).json({
            message: "Application submitted successfully",
            application,
            success: true
        });
    } catch (error) {
        console.error("Error applying for job:", error);
        res.status(500).json({
            error: "Internal Server Error",
            success: false
        });
    }
};

//get applied jobs of candidate
export const getCandidateApplications = async(req, res) => {
    try {
        const candidate_id = req.params.id;
        // console.log(req.params)
        const applications = await getApplicationsByCandidateId(candidate_id);

        res.status(200).json({
            applications,
            success: true
        });
    } catch (error) {
        console.error("Error fetching candidate applications:", error);
        res.status(500).json({
            error: "Internal Server Error",
            success: false
        });
    }
};

export const job_applicants = async(req, res) => {
    try {
        const { id } = req.params; // Get the job_id from the request parameters

        // Fetch all candidates for the given job_id
        console.log("f")
        const job_applicants = await getCandidatesForJob(id);

        // If no applicants found, return a 404 response
        if (job_applicants.error || job_applicants.length === 0) {
            return res.status(404).json({ error: "Applicants not found", success: false });
        }

        // Return the list of applicants with the job details
        res.status(200).json({ job: job_applicants, success: true });
    } catch (error) {
        console.error("Error fetching applicants by job ID:", error);
        res.status(500).json({ error: "Internal Server Error", success: false });
    }
};

export const delete_job = async(req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Invalid ID", success: false });
        }

        const { error } = await delete_Job_FromDB(id);

        if (error) {
            console.error("Error deleting job:", error);
            return res.status(500).json({ error: "Failed to delete job", success: false });
        }

        res.status(200).json({ message: "Job deleted successfully", success: true });
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ error: "Internal Server Error", success: false });
    }
};
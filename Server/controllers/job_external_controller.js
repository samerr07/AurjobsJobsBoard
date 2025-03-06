import { Job_Post_external, company_registration, all_companies_data, all_external_jobs_data } from "../models/job-external.js";

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
export const company_registration_ = async(req, res) => {
    try {
        const {
            company_display_name,
            company_website,
            company_logo,
            industry,
            description
        } = req.body;

        // Validate required fields
        if (!company_display_name || !industry || !description) {
            return res.status(400).json({
                error: "Missing required fields: company_display_name, industry, description",
                success: false
            });
        }

        // Create company
        const company_Created = await company_registration(
            company_display_name,
            company_website,
            company_logo,
            industry,
            description
        );

        // Check if company was successfully created
        if (!company_Created || company_Created.length === 0) {
            return res.status(500).json({
                error: "Failed to create company",
                success: false
            });
        }

        res.status(201).json({
            message: "Company created successfully",
            company: company_Created,
            success: true
        });

    } catch (error) {
        console.error("Error during company registration:", error);
        res.status(500).json({
            error: "Internal Server Error",
            success: false
        });
    }
};

export const all_companies_data_ = async(req, res) => {
    try {
        const companies_data = await all_companies_data();

        if (!companies_data || companies_data.length === 0) {
            return res.status(404).json({
                error: "No companies found",
                success: false
            });
        }

        res.status(200).json({
            message: "Companies fetched successfully",
            success: true,
            companies: companies_data
        });
    } catch (error) {
        console.error("Error fetching companies:", error.message);
        res.status(500).json({
            error: "Internal Server Error",
            success: false
        });
    }
};

export const all_external_jobs_data_ = async(req, res) => {
    try {
        const jobs_data = await all_external_jobs_data();

        if (!jobs_data || jobs_data.length === 0) {
            return res.status(404).json({
                error: "No Jobs found",
                success: false
            });
        }

        res.status(200).json({
            message: "Jobs fetched successfully",
            success: true,
            external_jobs: jobs_data
        });
    } catch (error) {
        console.error("Error fetching Jobs_ext:", error.message);
        res.status(500).json({
            error: "Internal Server Error",
            success: false
        });
    }
}
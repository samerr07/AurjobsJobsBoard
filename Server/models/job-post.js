import supabase from "../config/supabase-client.js";
console.log("in models job post"); // Ensure supabase is properly imported

export const alljobs = async() => {
    try {
        const { data, error } = await supabase
            .from("jobs")
            .select("job_title, job_experience_required, salary_range, job_location, employer_id");

        if (error) throw error;

        const employerIds = data.map(job => job.employer_id).filter(id => id);

        if (employerIds.length === 0) return data; // No employers to fetch

        const { data: employers, error: employerError } = await supabase
            .from("employers")
            .select("employer_id, company_display_name, company_logo")
            .in("employer_id", employerIds);
        console.log(employers)
        if (employerError) throw employerError;

        // Merge employer details with job details
        const jobsWithCompany = data.map(job => {
            const employer = employers.find(emp => emp.employer_id === job.employer_id);
            return {
                ...job,
                company_display_name: employer ? employer.company_display_name : null,
                company_logo: employer ? employer.company_logo : null
            };
        });

        return jobsWithCompany; // Return jobs with company details
    } catch (error) {
        console.error("Error fetching jobs:", error.message);
        return []; // Return an empty array instead of null
    }
};


export const getjobsdetailsbyid = async(job_id) => {
    try {
        const { data, error } = await supabase.from("jobs").select("*").eq("job_id", job_id);
        if (error) throw error;

        console.log("Job details for job_id", job_id, data);
        return data;
    } catch (error) {
        console.error("Error fetching job details with job_id", job_id, error);
        return null;
    }
};
export const createJobPost = async(
    job_title,
    job_description,
    employment_type,
    job_location,
    salary_range,
    job_experience_required,
    job_skills_required,
    industry,
    work_mode,

) => {
    try {
        const { data, error } = await supabase.from("jobs").insert([{
            job_title,
            job_description,
            employment_type,
            job_location,
            salary_range,
            job_experience_required,
            job_skills_required, // Assuming Supabase supports array column type
            industry,
            work_mode: work_mode,

            status: "active",

        }]).select("*");

        if (error) throw error;

        console.log("Job created successfully:", data);
        return data;
    } catch (error) {
        console.error("Error inserting job:", error.message);
        return [];
    }
};
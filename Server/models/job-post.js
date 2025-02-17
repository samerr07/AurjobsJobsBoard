import supabase from "../config/supabase-client.js";
console.log("in models job post"); // Ensure supabase is properly imported

const getEmployerDetails = async(employerIds) => {
    if (employerIds.length === 0) return [];

    const { data: employers, error } = await supabase
        .from("employers")
        .select("employer_id, company_display_name, company_logo")
        .in("employer_id", employerIds);

    if (error) throw error;
    return employers;
};

export const alljobs = async() => {
    try {
        const { data, error } = await supabase
            .from("jobs")
            .select("*");

        if (error) throw error;

        const employerIds = data.map(job => job.employer_id).filter(id => id);
        console.log(employerIds, "employer id");
        const employers = await getEmployerDetails(employerIds);

        const jobsWithCompany = data.map(job => {
            const employer = employers.find(emp => emp.employer_id === job.employer_id);
            return {
                ...job,
                company_display_name: employer ? employer.company_display_name : null,
                company_logo: employer ? employer.company_logo : null
            };
        });

        return jobsWithCompany;
    } catch (error) {
        console.error("Error fetching jobs:", error.message);
        return [];
    }
};

export const getjobsdetailsbyid = async(job_id) => {
    try {
        const { data, error } = await supabase
            .from("jobs")
            .select("*, employer_id")
            .eq("job_id", job_id)
            .single();

        if (error) throw error;
        if (!data) return null;

        const employers = await getEmployerDetails([data.employer_id]);
        // console.log(employerIds, "employer id");
        const employerData = employers.length > 0 ? employers[0] : null;

        const jobWithCompany = {
            ...data,
            company_display_name: employerData ? employerData.company_display_name : null,
            company_logo: employerData ? employerData.company_logo : null
        };

        console.log("Job details with company info for job_id", job_id, jobWithCompany);
        return jobWithCompany;
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
    employer_id // Accept employer_id here
) => {
    try {
        const { data, error } = await supabase.from("jobs").insert([{
            job_title,
            job_description,
            employment_type,
            job_location,
            salary_range,
            job_experience_required,
            job_skills_required,
            industry,
            work_mode,
            employer_id, // Now inserting employer_id
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
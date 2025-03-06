import supabase from "../config/supabase-client.js";


export const Job_Post_external = async(
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
    employer_id, // Accept employer_id here
) => {
    try {
        const { data, error } = await supabase.from("jobs_external").insert([{
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
import supabase from "../config/supabase-client.js";

// Function to  the company in Supabase
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
// Function to register the company in Supabase
export const company_registration = async(company_display_name, company_website, company_logo, industry, description) => {
    try {
        const { data, error } = await supabase.from("employer_external").insert([{
            company_display_name,
            company_website,
            company_logo,
            industry,
            description
        }]).select("*").single();

        if (error) {
            console.error("Supabase Insert Error:", error.message);
            return [];
        }

        console.log("Company created successfully:", data);
        return data;
    } catch (error) {
        console.error("Error inserting company:", error.message);
        return [];
    }
};

export const all_companies_data = async() => {
    try {
        const { data, error } = await supabase
            .from("employer_external")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) throw error;

        console.log("Companies fetched successfully", data);
        return data;
    } catch (error) {
        console.error("Error fetching companies:", error.message);
        return [];
    }
};

export const all_external_jobs_data = async() => {
    try {
        const { data, error } = await supabase
            .from("jobs_external")
            .select("*")
            .order("posted_at", { ascending: false });

        if (error) throw error;

        console.log("Jobs fetched successfully", data);
        return data;
    } catch (error) {
        console.error("Error fetching Jobs_ext:", error.message);
        return [];
    }
}
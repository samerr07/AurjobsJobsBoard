import supabase from "../config/supabase-client.js";
// import { supabase } from "../supabaseClient"; // Ensure Supabase is imported

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
    employer_id
) => {
    try {
        // Check if job_link already exists
        const { data: jobdata, error: joberror } = await supabase
            .from("jobs_external")
            .select("*")
            .eq("job_link", job_link);

        if (joberror) throw new Error(joberror.message);

        if (jobdata.length > 0) {
            throw new Error("Job already exists");
        }

        // Insert the job posting
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
            employer_id,
            status: "active",
        }]).select("*");

        if (error) throw new Error(error.message);

        console.log("Job created successfully:", data);
        return data;
    } catch (error) {
        console.error("Error inserting job:", error.message);
        return { error: error.message };
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
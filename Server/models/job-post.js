import supabase from "../config/supabase-client.js";
console.log("in models job post");
export const alljobs = async() => {
    try {
        const { data, error } = await supabase.from("job_posts").select("*");
        if (error) throw error;
        return data; // Ensure the function returns the fetched data
    } catch (error) {
        console.error("Error fetching jobs:", error.message);
        return []; // Return an empty array instead of null
    }
};
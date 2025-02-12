import supabase from "../config/supabase-client.js";
//find a employer by employeremail
export const findByEmployerEmail = async(company_email) => {
    try {
        const { data, error } = await supabase
            .from("employers")
            .select("*")
            .eq("employer_email", company_email, )
            .single(); // Ensures only one row is returned

        if (error) throw error;

        console.log("jai mata di ", data); // This will now execute
        return data;
    } catch (error) {
        console.error("Error fetching employer:", error.message);
        return null; // Return null in case of error
    }
};

// create a  new employer
export const createEmployer = async(
    company_name,
    company_email,
    company_password
) => {
    try {
        // Insert employer into the "employers" table
        const { data, error } = await supabase.from("employers").insert([{
            employer_email: company_email,
            employer_password_hash: company_password, // Make sure to hash the password before storing!
            company_display_name: company_name,
            // Ensure the column name matches your DB
        }, ]).select("*"); // Returns inserted data

        if (error) throw error;

        console.log("employer created successfully:", data);
        return data; // Return inserted candidate data
    } catch (error) {
        console.error("Error inserting employer:", error.message);
        return null; // Return null in case of error
    }
};
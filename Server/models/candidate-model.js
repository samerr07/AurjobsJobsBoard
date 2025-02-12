//here function of how candidates data will be created and all candidate related functions
import supabase from "../config/supabase-client.js";

//find a candidate by candidateemail
export const findByCandidateEmail = async(email) => {
    try {
        const { data, error } = await supabase
            .from("candidates")
            .select("*")
            .eq("candidate_email", email)
            .single(); // Ensures only one row is returned

        if (error) throw error;

        console.log("jai mata di ", data); // This will now execute
        return data;
    } catch (error) {
        console.error("Error fetching candidate:", error.message);
        return null; // Return null in case of error
    }
};

// create a  new candidate
export const createCandidate = async(
    email,
    password,
    firstname,
    lastname,
    phone,
    location,
    resume_url
) => {
    try {
        // Insert candidate into the "candidates" table
        const { data, error } = await supabase.from("candidates").insert([{
            candidate_email: email,
            candidate_password: password, // Make sure to hash the password before storing!
            candidate_first_name: firstname,
            candidate_last_name: lastname,
            candidate_phone: phone,
            candidate_location: location, // Ensure the column name matches your DB
            candidate_resume_link: resume_url,
        }, ]).select("*"); // Returns inserted data

        if (error) throw error;

        console.log("Candidate created successfully:", data);
        return data; // Return inserted candidate data
    } catch (error) {
        console.error("Error inserting candidate:", error.message);
        return null; // Return null in case of error
    }
};
export const findByCandidateID = async(candidateID) => {
    try {
        const { data, error } = await supabase
            .from("candidates")
            .select("*")
            .eq("candidate_id", candidateID)
            .single(); // Ensures only one row is returned

        if (error) {
            console.error("Supabase Error:", error.message);
            return null;
        }

        console.log("Candidate details fetched:", data);
        return data;
    } catch (error) {
        console.error("Error fetching candidate:", error.message);
        return null;
    }
};

// export const addsomething = async() => {
//     try {
//         const candidate = await findsomething(); // Get candidate details

//         if (!candidate) {
//             console.error("Candidate not found. Update aborted.");
//             return;
//         }

//         const { candidate_id } = candidate; // Extract candidate ID
//         const candidateGender = "Male"; // Replace with actual gender value

//         const { data, error } = await supabase
//             .from("candidates")
//             .update({ candidate_gender: candidateGender })
//             .eq("candidate_id", candidate_id);

//         if (error) throw error;

//         console.log("Update successful:", data);
//     } catch (error) {
//         console.error("Error updating candidate gender:", error.message);
//     }
// };

// // Run the function
// // addsomething();s

console.log("hey im in candidate- model.js file")
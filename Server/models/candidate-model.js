//here function of how candidates data will be created and all candidate related functions
import supabase from "../config/supabase-client.js";

import crypto from "crypto";

const getISTTimestamp = () => {
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
    return new Date(now.getTime() + istOffset).toISOString().replace("Z", "+05:30");
};

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
        // Fetch candidate details and related tables in parallel
        const [
            candidate,
            experiences,
            skills,
            languages,
            education,
            certifications,
        ] = await Promise.all([
            supabase.from("candidates").select("*").eq("candidate_id", candidateID).single(),
            supabase.from("candidate_experiences").select("*").eq("candidate_id", candidateID),
            supabase.from("candidate_skills").select("*").eq("candidate_id", candidateID),
            supabase.from("candidate_languages").select("*").eq("candidate_id", candidateID),
            supabase.from("candidate_education").select("*").eq("candidate_id", candidateID),
            supabase.from("candidate_certifications").select("*").eq("candidate_id", candidateID)
        ]);

        // Check for errors
        if (candidate.error) {
            console.error("Supabase Error (Candidate):", candidate.error.message);
            return null;
        }

        // Returning structured JSON response
        return {
            ...candidate.data,
            experiences: experiences.data || [],
            skills: skills.data || [],
            languages: languages.data || [],
            education: education.data || [],
            certifications: certifications.data || []
        };

    } catch (error) {
        console.error("Error fetching candidate details:", error.message);
        return null;
    }
};
export const updateCandidate = async(candidateID, candidateData) => {
    try {
        const {
            candidate = {},
                skills = [],
                experiences = [],
                languages = [],
                education = [],
                certifications = [],
                addresses = []
        } = candidateData;

        console.log("Received candidateData:", candidate);
        console.log("Received candidateSkill:", skills);
        console.log("Received candidateLanguages:", languages);
        console.log("Received candidateExperiences:", experiences);
        console.log("Received candidateEducation:", education);
        console.log("Received candidateCertification:", certifications);
        console.log("Received candidateAddress:", addresses);

        // Getting timestamp
        const istTimestamp = getISTTimestamp();

        // 1️⃣ Update candidate details
        const { data: updatedCandidate, error: candidateError } = await supabase
            .from("candidates")
            .update({
                ...candidate,
                candidate_updated_at: istTimestamp
            })
            .eq("candidate_id", candidateID)
            .select()
            .single();

        if (candidateError) throw candidateError;

        // 2️⃣ Prepare candidate skills data
        const candidateSkillsData = skills.map(skill => ({
            candidate_id: candidateID,
            skill_id: isValidUUID(skill.skill_id) ? skill.skill_id : crypto.randomUUID(),
            candidate_skill: skill.candidate_skill,
            updated_at: istTimestamp,
        }));

        const candidateLanguagesData = languages.map(lang => ({
            candidate_id: candidateID,
            language_id: isValidUUID(lang.language_id) ? lang.language_id : crypto.randomUUID(),
            candidate_language: lang.candidate_language,
            candidate_proficiency: lang.candidate_proficiency,
            updated_at: istTimestamp,
        }));

        const candidateExperiencesData = experiences.map(exp => ({
            candidate_id: candidateID,
            experience_id: isValidUUID(exp.experience_id) ? exp.experience_id : crypto.randomUUID(),
            candidate_job_role: exp.candidate_job_role,
            candidate_company: exp.candidate_company,
            candidate_start_date: exp.candidate_start_date,
            candidate_end_date: exp.candidate_end_date,
            candidate_job_type: exp.candidate_job_type,
            candidate_industry: exp.candidate_industry,
            updated_at: istTimestamp,
        }));

        const candidateEducationData = education.map(edu => ({
            candidate_id: candidateID,
            education_id: isValidUUID(edu.education_id) ? edu.education_id : crypto.randomUUID(),
            candidate_education_level: edu.candidate_education_level,
            candidate_degree: edu.candidate_degree,
            candidate_institute: edu.candidate_institute,
            candidate_start_year: edu.candidate_start_year,
            candidate_end_year: edu.candidate_end_year,
            candidate_score: edu.candidate_score,
            updated_at: istTimestamp,
        }));

        const candidateAddressData = addresses.map(addr => ({
            candidate_id: candidateID,
            address_id: isValidUUID(addr.address_id) ? addr.address_id : crypto.randomUUID(),
            candidate_address_line_1: addr.candidate_address_line_1,
            candidate_address_line_2: addr.candidate_address_line_2,
            candidate_city: addr.candidate_city,
            candidate_state: addr.candidate_state,
            candidate_country: addr.candidate_country,
            candidate_postal_code: addr.candidate_postal_code,
            updated_at: istTimestamp,
        }));

        console.log("Candidate Central Data for Upsert:", updatedCandidate);
        console.log("Candidate Skills Data for Upsert:", candidateSkillsData);
        console.log("Candidate Languages Data for Upsert:", candidateLanguagesData);
        console.log("Candidate Experiences Data for Upsert:", candidateExperiencesData);
        console.log("Candidate Education Data for Upsert:", candidateEducationData);
        console.log("Candidate Address Data for Upsert:", candidateAddressData);

        // 3️⃣ Handle candidate certifications separately to avoid unique constraint errors
        for (const cert of certifications) {
            const { data: existingCert } = await supabase
                .from("candidate_certifications")
                .select("certification_id")
                .eq("candidate_certificate_number", cert.candidate_certificate_number)
                .single();

            if (existingCert) {
                // Update existing certification
                await supabase
                    .from("candidate_certifications")
                    .update({
                        candidate_certificate_name: cert.candidate_certificate_name,
                        certificate_issue_date: cert.certificate_issue_date,
                        certificate_issuing_organization: cert.certificate_issuing_organization,
                        updated_at: istTimestamp,
                    })
                    .eq("certification_id", existingCert.certification_id);
            } else {
                // Insert new certification
                await supabase.from("candidate_certifications").insert({
                    candidate_id: candidateID,
                    certification_id: isValidUUID(cert.certification_id) ? cert.certification_id : crypto.randomUUID(),
                    candidate_certificate_name: cert.candidate_certificate_name,
                    candidate_certificate_number: cert.candidate_certificate_number,
                    certificate_issue_date: cert.certificate_issue_date,
                    certificate_issuing_organization: cert.certificate_issuing_organization,
                    created_at: istTimestamp,
                    updated_at: istTimestamp,
                });
            }
        }

        // 4️⃣ Perform parallel upserts for other tables
        const upsertPromises = [
            supabase.from("candidate_skills").upsert(candidateSkillsData).select(),
            supabase.from("candidate_languages").upsert(candidateLanguagesData).select(),
            supabase.from("candidate_education").upsert(candidateEducationData).select(),
            supabase.from("candidate_experience").upsert(candidateExperiencesData).select(),
            supabase.from("candidate_address").upsert(candidateAddressData).select(),
        ];

        const responses = await Promise.all(upsertPromises);
        console.log("Upsert Responses:", JSON.stringify(responses, null, 2));

        return {
            success: true,
            message: "Candidate and related data updated successfully",
            candidate: updatedCandidate,
            updatedCandidateN: responses
        };

    } catch (error) {
        console.error("Error updating candidate data:", error);
        return { success: false, error: error.message || "Internal Server Error" };
    }
};

// ✅ Validate UUID Format
const isValidUUID = (id) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

console.log("hey im in candidate- model.js file");
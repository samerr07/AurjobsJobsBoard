import supabase from "../config/supabase-client.js";
import { employerDetails } from "./employer-model.js";
console.log("in models job post"); // Ensure supabase is properly imported

// const getEmployerDetails = async(employerIds) => {
//     if (employerIds.length === 0) return [];

//     const { data: employers, error } = await supabase
//         .from("employers")
//         .select("employer_id, company_display_name, company_logo")
//         .in("employer_id", employerIds);
//     if (error) throw error;
//     return employers;
// };
// export const alljobs = async() => { //copy
//     try {
//         // Step 1: Fetch all jobs sorted by 'posted_at' in descending order
//         const { data, error } = await supabase
//             .from("jobs")
//             .select("*")
//             .order("posted_at", { ascending: false }); // Sorting using Supabase
//         const { data1, error1 } = await supabase.
//         from("jobs_external").
//         select("*").
//         order("posted_at", { ascending: false })

//         if (error) throw error;

//         // Step 2: Get employer IDs and their details
//         const employerIds = data.map(job => job.employer_id).filter(id => id);
//         const employers = await getEmployerDetails(employerIds);

//         // Step 3: Combine job details with employer info
//         const jobsWithCompany = data.map(job => {
//             const employer = employers.find(emp => emp.employer_id === job.employer_id);
//             return {
//                 ...job,
//                 company_display_name: employer ? employer.company_display_name : null,
//                 company_logo: employer ? employer.company_logo : null
//             };
//         });

//         return jobsWithCompany; //spread opearator
//     } catch (error) {
//         console.error("Error fetching jobs:", error.message);
//         return [];
//     }
// };



const getEmployerDetails = async(employerIDs, tableName) => {
    try {
        if (employerIDs.length === 0) return [];

        const { data: employers, error } = await supabase
            .from(tableName)
            .select("employer_id, company_display_name, company_logo,description")
            .in("employer_id", employerIDs);

        if (error) throw error;

        return employers;
    } catch (error) {
        console.error("Error fetching employers from", tableName, ":", error.message);
        return [];
    }
};

export const alljobs = async() => {
    try {
        // Step 1: Fetch jobs from both tables
        const { data: internalJobs, error: internalError } = await supabase
            .from("jobs")
            .select("*")
            .order("posted_at", { ascending: false });

        const { data: externalJobs, error: externalError } = await supabase
            .from("jobs_external")
            .select("*")
            .order("posted_at", { ascending: false });

        if (internalError) throw internalError;
        if (externalError) throw externalError;
        // Merge and sort the jobs together
        const allJobsList = [...externalJobs, ...internalJobs, ].sort(
            (a, b) => new Date(b.posted_at) - new Date(a.posted_at)
        );

        // Extract unique employer IDs for both employer tables
        const employerIdsInternal = [...new Set(internalJobs.map(job => job.employer_id).filter(id => id))];
        const employerIdsExternal = [...new Set(externalJobs.map(job => job.employer_id).filter(id => id))];

        // Fetch employer details from both employer tables
        const employersInternal = await getEmployerDetails(employerIdsInternal, "employers");

        const employersExternal = await getEmployerDetails(employerIdsExternal, "employer_external");

        // Merge employer details into one list
        const allEmployers = [...employersInternal, ...employersExternal];

        // Attach employer details to jobs
        const jobsWithCompany = allJobsList.map(job => {
            const employer = allEmployers.find(emp => emp.employer_id === job.employer_id);
            return {
                ...job,
                company_display_name: employer ? employer.company_display_name : null,
                company_logo: employer ? employer.company_logo : null,
                description: employer ? employer.description : null
            };
        });
        console.log(jobsWithCompany.length);
        return jobsWithCompany;
    } catch (error) {
        console.error("Error fetching jobs:", error.message);
        return [];
    }
};
export const employer_Jobs = async(employer_id) => {
    try {
        // Check if the employer exists in jobs table
        const { data: jobs, error: jobsError } = await supabase
            .from("jobs")
            .select("*")
            .eq("employer_id", employer_id);

        if (jobsError) {
            throw new Error(jobsError.message);
        }

        if (jobs && jobs.length > 0) return jobs;

        // Checking if the employer exists in jobs_external table
        const { data: externalJobs, error: externalError } = await supabase
            .from("jobs_external")
            .select("*")
            .eq("employer_id", employer_id);

        if (externalError) {
            throw new Error(externalError.message);
        }

        if (externalJobs && externalJobs.length > 0) return externalJobs;

        // If no jobs are found in either table
        throw new Error("No jobs found for this employer in any table");
    } catch (error) {
        throw new Error(`Error fetching jobs: ${error.message}`);
    }
};


//this job details for user

export const getJobDetailsByJobId = async(job_id) => {
    try {
        let isExternal = false;
        let jobData = null;
        let error = null;

        // Try fetching from "jobs" table first
        ({ data: jobData, error } = await supabase
            .from("jobs")
            .select("*, employer_id")
            .eq("job_id", job_id)
            .single());

        // If not found, check "jobs_external" table
        if (error || !jobData) {
            ({ data: jobData, error } = await supabase
                .from("jobs_external")
                .select("*, employer_id")
                .eq("job_id", job_id)
                .single());

            if (!error && jobData) {
                isExternal = true;
            }
        }

        if (error) throw error;
        if (!jobData) return null;

        // Determine employer table based on job source
        const employerTable = isExternal ? "employer_external" : "employers";

        // Fetch employer details
        const employers = await getEmployerDetails([jobData.employer_id], employerTable);

        const employerData = employers.length > 0 ? employers[0] : null;

        // Combine job details with employer details
        const jobWithCompany = {
            ...jobData,
            company_display_name: employerData ? employerData.company_display_name : null,
            company_logo: employerData ? employerData.company_logo : null,
            description: employerData ? employerData.description : null
        };

        // console.log("Job details with company info for job_id", job_id, jobWithCompany);
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
export const createJobApplication = async(
    job_id,
    candidate_id,
    screening_score = null // Optional parameter
) => {
    try {
        const { data, error } = await supabase.from("applications").insert([{
            job_id,
            candidate_id,
            status: "pending",
            screening_score,
            applied_at: new Date().toISOString(),
        }, ]).select("*");

        if (error) throw error;

        console.log("Job application created successfully:", data);
        return data;
    } catch (error) {
        console.error("Error creating job application:", error.message);
        throw error;
    }
};

// Fetch applications by candidate ID
export const getApplicationsByCandidateId = async(candidate_id) => {
    try {
        const { data, error } = await supabase
            .from("applications")
            .select(`*, jobs (*, employer_id (company_display_name, company_logo))`)
            .eq("candidate_id", candidate_id);

        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Error fetching applications by candidate ID:", error.message);
        throw error;
    }
};

// Fetch job by job_id
export const Job_application = async(job_id) => {
    try {
        const { data: job, error } = await supabase
            .from("jobs")
            .select("*")
            .eq("job_id", job_id)
            .single();

        if (error) throw error;
        if (!job) throw new Error("No job found with this job_id");

        return job;
    } catch (error) {
        console.error("Error fetching job application:", error.message);
        throw error;
    }
};

// Fetch candidates who applied for a job
export const getCandidatesForJob = async(job_id) => {
    try {
        const { data: applications, error: applicationError } = await supabase
            .from("applications")
            .select("candidate_id, screening_score")
            .eq("job_id", job_id);

        if (applicationError) throw applicationError;
        if (!applications || applications.length === 0) {
            return { message: "No candidates have applied for this job." };
        }

        const candidateMap = applications.reduce((acc, app) => {
            acc[app.candidate_id] = app.screening_score;
            return acc;
        }, {});

        const candidateIds = Object.keys(candidateMap);

        const candidateDetailsPromises = candidateIds.map(async(candidateID) => {
            const [
                candidate,
                experiences,
                skills,
                languages,
                education,
                certifications,
                addresses
            ] = await Promise.all([
                supabase.from("candidates").select("*").eq("candidate_id", candidateID).single(),
                supabase.from("candidate_experience").select("*").eq("candidate_id", candidateID),
                supabase.from("candidate_skills").select("*").eq("candidate_id", candidateID),
                supabase.from("candidate_languages").select("*").eq("candidate_id", candidateID),
                supabase.from("candidate_education").select("*").eq("candidate_id", candidateID),
                supabase.from("candidate_certifications").select("*").eq("candidate_id", candidateID),
                supabase.from("candidate_address").select("*").eq("candidate_id", candidateID)
            ]);

            if (candidate.error) {
                console.error(`Error fetching candidate ${candidateID}:`, candidate.error.message);
                return null;
            }

            return {
                ...candidate.data,
                job_id,
                screening_score: candidateMap[candidateID],
                experiences: experiences.data || [],
                skills: skills.data || [],
                languages: languages.data || [],
                education: education.data || [],
                certifications: certifications.data || [],
                addresses: addresses.data || []
            };
        });

        const candidates = await Promise.all(candidateDetailsPromises);
        const validCandidates = candidates.filter((candidate) => candidate !== null);

        return validCandidates.length > 0 ? validCandidates : { message: "No detailed candidate information found." };
    } catch (error) {
        console.error("Error fetching candidates for job:", error.message);
        return { error: error.message };
    }
};

export const delete_Job_FromDB = async(job_id) => {
    try {
        let jobData = null;
        let error = null;
        let isExternal = false;

        // Try to find the job in "jobs" table
        ({ data: jobData, error } = await supabase
            .from("jobs")
            .select("*")
            .eq("job_id", job_id)
            .single());

        // If not found, check "jobs_external" table
        if (error || !jobData) {
            ({ data: jobData, error } = await supabase
                .from("jobs_external")
                .select("*")
                .eq("job_id", job_id)
                .single());

            if (!error && jobData) {
                isExternal = true;
            }
        }

        // If job doesn't exist in both tables
        if (!jobData) {
            return { error: "Job not found" };
        }

        // Delete from the appropriate table
        const tableName = isExternal ? "jobs_external" : "jobs";
        const { data: deleteData, error: deleteError } = await supabase
            .from(tableName)
            .delete()
            .eq("job_id", job_id);

        if (deleteError) {
            throw deleteError;
        }

        return { success: true, deletedJob: deleteData };

    } catch (error) {
        console.error("Supabase error:", error);
        return { error };
    }
};

//apply job


// export const createJobApplication = async(
//         job_id,
//         candidate_id,
//         screening_score
//     ) => {
//         try {
//             const { data, error } = await supabase
//                 .from("applications")
//                 .insert([{
//                     job_id,
//                     candidate_id,
//                     status: 'pending',
//                     screening_score,
//                     applied_at: new Date().toISOString(),
//                 }])
//                 .select("*"); ===
//             ===
//             =
//             export const createJobApplication = async(
//                 job_id,
//                 candidate_id
//             ) => {
//                 try {
//                     const { data, error } = await supabase
//                         .from("applications")
//                         .insert([{
//                             job_id,
//                             candidate_id,
//                             status: 'pending',
//                             applied_at: new Date().toISOString(),
//                         }])
//                         .select("*"); >>>
//                     >>>
//                     >
//                     Stashed changes

//                     if (error) throw error;

//                     console.log("Job application created successfully:", data);
//                     return data;
//                 } catch (error) {
//                     console.error("Error creating job application:", error.message);
//                     throw error;
//                 }
//             };


//             //applied jobs of candidate

//             export const getApplicationsByCandidateId = async(candidate_id) => {
//                 try {
//                     const { data, error } = await supabase
//                         .from("applications")
//                         .select(`
//           *,
//           jobs (
//             *,
//             employer_id (
//               company_display_name,
//               company_logo
//             )
//           )
//         `)
//                         .eq("candidate_id", candidate_id);

//                     if (error) throw error;
//                     return data;
//                 } catch (error) {
//                     console.error("Error fetching applications by candidate ID:", error.message);
//                     throw error;
//                 }
//             };

//             export const Job_application = async(job_id) => {
//                 try {
//                     // Fetch the job with the specific job_id
//                     const { data: job, error } = await supabase
//                         .from("jobs")
//                         .select("*")
//                         .eq("job_id", job_id) // Filtering by job_id
//                         .single(); // Ensures only one job is returned
//                     if (error) {
//                         console.log(error.message);
//                         throw new Error(error.message);
//                     }

//                     if (!job) {
//                         throw new Error("No job found with this job_id");
//                     }

//                     return job;
//                 } catch (error) {
//                     throw new Error(`Error fetching job application: ${error.message}`);
//                 }
//             };
//             export const getCandidatesForJob = async(job_id) => {
//                 try {
//                     // Step 1: Fetch all applications for the given job_id, including screening_score
//                     const { data: applications, error: applicationError } = await supabase
//                         .from("applications")
//                         .select("candidate_id, screening_score")
//                         .eq("job_id", job_id);

//                     <<
//                     <<
//                     <<
//                     < Updated upstream
//                     export const getCandidatesForJob = async(job_id) => {

//                         try {

//                             // Step 1: Fetch all applications for the given job_id, including screening_score

//                             const { data: applications, error: applicationError } = await supabase

//                                 .from("applications")

//                             .select("candidate_id, screening_score")

//                             .eq("job_id", job_id);



//                             if (applicationError) throw applicationError;



//                             if (!applications || applications.length === 0) {

//                                 return { message: "No candidates have applied for this job." };

//                             }



//                             // Step 2: Extract candidate_ids and their screening_scores

//                             const candidateMap = applications.reduce((acc, app) => {

//                                 acc[app.candidate_id] = app.screening_score;

//                                 return acc;

//                             }, {});



//                             const candidateIds = Object.keys(candidateMap);



//                             // Step 3: Fetch all candidate details in parallel

//                             const candidateDetailsPromises = candidateIds.map(async(candidateID) => {

//                                 const [

//                                     candidate,

//                                     experiences,

//                                     skills,

//                                     languages,

//                                     education,

//                                     certifications,

//                                     addresses

//                                 ] = await Promise.all([

//                                     supabase.from("candidates").select("*").eq("candidate_id", candidateID).single(),

//                                     supabase.from("candidate_experience").select("*").eq("candidate_id", candidateID),

//                                     supabase.from("candidate_skills").select("*").eq("candidate_id", candidateID),

//                                     supabase.from("candidate_languages").select("*").eq("candidate_id", candidateID),

//                                     supabase.from("candidate_education").select("*").eq("candidate_id", candidateID),

//                                     supabase.from("candidate_certifications").select("*").eq("candidate_id", candidateID),

//                                     supabase.from("candidate_address").select("*").eq("candidate_id", candidateID)

//                                 ]);



//                                 if (candidate.error) {

//                                     console.error(`Error fetching candidate ${candidateID}:`, candidate.error.message);

//                                     return null;

//                                 }



//                                 return {

//                                     ...candidate.data,

//                                     job_id,

//                                     screening_score: candidateMap[candidateID], // Include screening_score

//                                     experiences: experiences.data || [],

//                                     skills: skills.data || [],

//                                     languages: languages.data || [],

//                                     education: education.data || [],

//                                     certifications: certifications.data || [],

//                                     addresses: addresses.data || []

//                                 };

//                             });



//                             // Wait for all candidate details to resolve

//                             const candidates = await Promise.all(candidateDetailsPromises);



//                             // Filter out any null results (in case of errors)

//                             const validCandidates = candidates.filter((candidate) => candidate !== null);



//                             if (validCandidates.length === 0) {

//                                 return { message: "No detailed candidate information found." };

//                             }



//                             return validCandidates;

//                         } catch (error) {

//                             console.error("Error fetching candidates for job:", error.message);

//                             return { error: error.message };

//                         }

//                     };
//                     if (applicationError) throw applicationError;

//                     if (!applications || applications.length === 0) {
//                         return { message: "No candidates have applied for this job." };
//                     }

//                     // Step 2: Extract candidate_ids and their screening_scores
//                     const candidateMap = applications.reduce((acc, app) => {
//                         acc[app.candidate_id] = app.screening_score;
//                         return acc;
//                     }, {});

//                     const candidateIds = Object.keys(candidateMap);

//                     // Step 3: Fetch all candidate details in parallel
//                     const candidateDetailsPromises = candidateIds.map(async(candidateID) => {
//                         const [
//                             candidate,
//                             experiences,
//                             skills,
//                             languages,
//                             education,
//                             certifications,
//                             addresses
//                         ] = await Promise.all([
//                             supabase.from("candidates").select("*").eq("candidate_id", candidateID).single(),
//                             supabase.from("candidate_experience").select("*").eq("candidate_id", candidateID),
//                             supabase.from("candidate_skills").select("*").eq("candidate_id", candidateID),
//                             supabase.from("candidate_languages").select("*").eq("candidate_id", candidateID),
//                             supabase.from("candidate_education").select("*").eq("candidate_id", candidateID),
//                             supabase.from("candidate_certifications").select("*").eq("candidate_id", candidateID),
//                             supabase.from("candidate_address").select("*").eq("candidate_id", candidateID)
//                         ]);

//                         if (candidate.error) {
//                             console.error(`Error fetching candidate ${candidateID}:`, candidate.error.message);
//                             return null;
//                         }

//                         return {
//                             ...candidate.data,
//                             job_id,
//                             screening_score: candidateMap[candidateID], // Include screening_score
//                             experiences: experiences.data || [],
//                             skills: skills.data || [],
//                             languages: languages.data || [],
//                             education: education.data || [],
//                             certifications: certifications.data || [],
//                             addresses: addresses.data || []
//                         };
//                     });

//                     // Wait for all candidate details to resolve
//                     const candidates = await Promise.all(candidateDetailsPromises);

//                     // Filter out any null results (in case of errors)
//                     const validCandidates = candidates.filter((candidate) => candidate !== null);

//                     if (validCandidates.length === 0) {
//                         return { message: "No detailed candidate information found." };
//                     }

//                     return validCandidates;
//                 } catch (error) {
//                     console.error("Error fetching candidates for job:", error.message);
//                     return { error: error.message };
//                 }
//             };
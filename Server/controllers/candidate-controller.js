import supabase from "../config/supabase-client.js";
import { createCandidate, findByCandidateEmail } from "../models/candidate-model.js";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

export const SignUpCandidate = async(req, res) => {
    try {
        const { email, password, firstname, lastname, phone, location, resume_url } = req.body;

        // Check if the candidate already exists
        const candidate = await findByCandidateEmail(email);
        if (candidate) {
            return res.status(400).json({ error: "Candidate already exists" });
        }

        // Hash the password before storing
        bcrypt.hash(password, 10, async(err, hash) => {
            if (err) {
                console.error("Error hashing password:", err);
                return res.status(500).json({ error: "Error processing password" });
            }

            // Create a new candidate
            const newCandidate = await createCandidate(email, hash, firstname, lastname, phone, location, resume_url);

            if (!newCandidate) {
                return res.status(500).json({ error: "Failed to create Candidate" });
            }

            return res.status(201).json({ success: true, message: "Candidate created successfully" });
        });
    } catch (error) {
        console.error("Signup Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


export const loginCandidate = async(req, res) => {
    const { email, password } = req.body;

    try {
        // Checking if the candidate exists
        const candidate = await findByCandidateEmail(email);
        if (!candidate) {
            return res.status(401).json({ error: "Invalid email or password", success: false });
        }

        // Comparing the password
        const isMatch = await bcrypt.compare(password, candidate.candidate_password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password", success: false });
        }

        // Creating a JWT token
        console.log("-------", candidate.candidate_id);
        const token = jwt.sign({ id: candidate.candidate_id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        // Setting the token in the cookie
        res.cookie("authToken", token, { httpOnly: true });

        // Sending a success response
        return res.status(200).json({ message: "Login successful", token, candidate, success: true });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


console.log("hey im in candidate- controller.js file")
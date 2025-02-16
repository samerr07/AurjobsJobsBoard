import { alljobs } from "../models/job-post.js";

console.log("in controllers job post");
export const getalljobs = async(req, res) => {
    try {
        const jobs = await alljobs();
        return res.status(200).json(jobs);
    } catch (error) {
        return res.status(500).json({ error: "Failed to fetch jobs" });
    }
};
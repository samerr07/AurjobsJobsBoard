import dotenv from "dotenv";
import { jobs_Posted_Today } from "../models/job-post.js";
import { createTransporter } from "../config/helper.js";
dotenv.config();

export const otp_verification = async(req, res) => {
    try {
        const { email, otp } = req.body;
        console.log(otp);
        console.log("Reset password request for:", email);

        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }
        const transporter = createTransporter();


        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "OTP Requested from Aurjobs",
            text: `Here is your OTP: ${otp}`
        };


        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info);

        return res.status(200).json({ success: true, message: "Password reset email sent successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
};

export const job_sender = async(req, res) => {
    try {
        // Fetch job data
        const jobs = await jobs_Posted_Today(); // ✅ Use `await` to get job data
        if (!jobs || jobs.length === 0) {
            return res.status(500).json({ success: false, error: "No jobs found before sending email" });
        }
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }
        console.log(`Sending job details to: ${email}`);
        // Generate job list HTML dynamically
        const jobList = jobs.map(job => `
            <tr>
                <td style="padding: 15px; background: #F9F9F9; border-radius: 5px; margin-bottom: 10px;">
                    <h3 style="margin: 0; color: #007BFF;">${job.job_title}</h3>
                    <p style="margin: 5px 0; font-size: 14px; color: #555;">
                         <b>Location:</b> ${job.job_location} <br>
                         <b>Salary:</b> ${job.salary_range}
                    </p>
                    <a href="https://jobs.aurjobs.com/jobs/${job.job_id}"
                       style="display:inline-block; background-color: #007BFF; color: white;
                              text-decoration: none; padding: 10px 15px; border-radius: 4px; font-size: 14px; font-weight: bold;">
                        Apply Now
                    </a>
                </td>
            </tr>
        `).join("");
        const emailBody = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <title>Latest Job Postings - Aurjobs</title>
            </head>
            <body style="margin: 0; padding: 0; background-color: #F4F4F4; font-family: Arial, sans-serif;">
                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #F4F4F4; padding: 20px;">
                    <tr>
                        <td align="center">
                            <table width="600px" border="0" cellspacing="0" cellpadding="0" style="background: #FFFFFF; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                                <!-- Header with Logo -->
                                <tr>
                                    <td align="center" style="padding: 10px 0;">
                                        <img src="https://media.licdn.com/dms/image/v2/D560BAQFZpLxqmDX2pw/company-logo_200_200/company-logo_200_200/0/1719256452115?e=2147483647&v=beta&t=L97auZZc20dvzYkKJ6BQG-UONiydOlRZuz6nGVolmig" alt="Aurjobs Logo" width="150" style="display: block;">
                                    </td>
                                </tr>
                                <!-- Title -->
                                <tr>
                                    <td align="center" style="background: #007BFF; color: white; padding: 15px; border-radius: 8px 8px 0 0; font-size: 20px; font-weight: bold;">
                                       Latest Job & Internship Openings
                                    </td>
                                </tr>
                                <!-- Introduction -->
                                <tr>
                                    <td style="padding: 15px; font-size: 16px; color: #333;">
                                        <p>Hello,</p>
                                        <p>Here are the latest job postings from <b>Aurjobs</b>. Apply now and find your dream job!</p>
                                    </td>
                                </tr>
                                <!-- Job Listings -->
                                ${jobList}
                                <!-- Footer -->
                                <tr>
                                    <td align="center" style="padding: 20px; font-size: 14px; color: #666;">
                                        <p>Best regards,</p>
                                        <p><b>Aurjobs Team</b></p>
                                       
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </body>
            </html>
        `;
        // Configure email
        const transporter = createTransporter();
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Latest Job Postings from Aurjobs",
            html: emailBody,
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info);

        return res.status(200).json({ success: true, message: "Job details sent successfully via email" });
    } catch (error) {
        console.error("Error sending job details:", error);
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
};
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
                <td style="padding: 0 0 16px 0;">
                    <table width="100%" cellspacing="0" cellpadding="0" style="background: #FFFFFF; border-radius: 14px; overflow: hidden; box-shadow: 0 5px 14px rgba(15, 23, 42, 0.05); border: 1px solid #E2E8F0;">
                        <!-- Top colored banner -->
                        <tr>
                            <td style="background: linear-gradient(90deg, #2563EB 0%, #3B82F6 50%, #60A5FA 100%); height: 5px; line-height: 0; font-size: 0;">&nbsp;</td>
                        </tr>
                        
                        <tr>
                            <td>
                                <!-- Main content area -->
                                <table width="100%" cellspacing="0" cellpadding="0">
                                    <tr>
                                        <!-- Left column - Company info -->
                                        <td width="80" style="vertical-align: top; padding: 16px 0 16px 14px;">
                                            <div style="width: 50px; height: 50px; border-radius: 10px; overflow: hidden; background-color: #F8FAFC; border: 1px solid #E2E8F0; display: flex; align-items: center; justify-content: center;">
                                                ${job.company_logo ? 
                                                `<img src="${job.company_logo}" alt="${job.company_display_name || 'Company'}" width="50" height="50" style="object-fit: cover; display: block;">` : 
                                                `<div style="width: 50px; height: 50px; background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 22px;">${job.company_display_name ? job.company_display_name.charAt(0) : 'C'}</div>`}
                                            </div>
                                            
                                            <div style="margin-top: 6px;">
                                                <p style="margin: 0; font-size: 11px; font-weight: 600; color: #334155; letter-spacing: 0.01em; line-height: 1.3; word-break: break-word; max-width: 64px;">${job.company_display_name || 'Company'}</p>
                                            </div>
                                        </td>
                                        
                                        <!-- Right column - Job details -->
                                        <td style="vertical-align: top; padding: 16px 16px 16px 0;">
                                            <!-- Job Title -->
                                            <h3 style="margin: 0 0 8px 0; color: #1E293B; font-size: 16px; font-weight: 700; line-height: 1.3;">${job.job_title}</h3>
                                            
                                            <!-- Job Meta -->
                                            <table width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 12px;">
                                                <tr>
                                                    <!-- Location -->
                                                    <td style="padding-right: 8px;">
                                                        <span style="display: inline-block; background-color: #F1F5F9; padding: 4px 8px; border-radius: 100px; margin-bottom: 4px;">
                                                            <img src="https://cdn-icons-png.flaticon.com/512/484/484167.png" alt="Location" width="10" height="10" style="vertical-align: middle; margin-right: 4px; opacity: 0.7;">
                                                            <span style="vertical-align: middle; font-size: 11px; color: #475569;">${job.job_location}</span>
                                                        </span>
                                                    </td>
                                                    <td style="padding-right: 8px;">
                                                        <span style="display: inline-block; background-color: #F1F5F9; padding: 4px 8px; border-radius: 100px; margin-bottom: 4px;">
                                                            <img src="https://cdn-icons-png.flaticon.com/512/484/484167.png" alt="Work Mode" width="10" height="10" style="vertical-align: middle; margin-right: 4px; opacity: 0.7;">
                                                            <span style="vertical-align: middle; font-size: 11px; color: #475569;">${job.work_mode}</span>
                                                        </span>
                                                    </td>
                                                    <!-- Salary -->
                                                    <td>
                                                        <span style="display: inline-block; background-color: #F1F5F9; padding: 4px 8px; border-radius: 100px; margin-bottom: 4px;">
                                                            <img src="https://cdn-icons-png.flaticon.com/512/639/639365.png" alt="Salary" width="10" height="10" style="vertical-align: middle; margin-right: 4px; opacity: 0.7;">
                                                            <span style="vertical-align: middle; font-size: 11px; color: #475569;">${job.salary_range}</span>
                                                        </span>
                                                    </td>
                                                </tr>
                                            </table>
                                            
                                            <!-- Apply Button -->
                                            <table width="100%" cellspacing="0" cellpadding="0">
                                                <tr>
                                                    <td>
                                                        <a href="https://jobs.aurjobs.com/jobs/${job.job_id}" 
                                                        style="display: inline-block; background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%); color: white; text-decoration: none; padding: 6px 16px; border-radius: 6px; font-size: 12px; font-weight: 600; transition: all 0.3s ease; box-shadow: 0 2px 8px rgba(29, 78, 216, 0.15);">
                                                            Apply Now <span style="margin-left: 3px; font-size: 13px;">→</span>
                                                        </a>
                                                        <span style="display: inline-block; margin-left: 10px; font-size: 10px; color: #64748B;">
                                                            Posted: ${job.posted_date || 'Recently'}
                                                        </span>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
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
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        </head>
        <body style="margin: 0; padding: 0; background-color: #F8FAFC; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #334155;">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #F8FAFC; padding: 24px;">
                <tr>
                    <td align="center">
                        <table width="600px" border="0" cellspacing="0" cellpadding="0" style="background: #FFFFFF; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);">
                            <!-- Title Banner with Logo -->
                            <tr>
                                <td>
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td align="center" style="background: linear-gradient(135deg, #2563EB, #1E40AF); color: white; padding: 36px 24px; text-align: center;">
                                                <img src="https://media.licdn.com/dms/image/v2/D560BAQFZpLxqmDX2pw/company-logo_200_200/company-logo_200_200/0/1719256452115?e=2147483647&v=beta&t=L97auZZc20dvzYkKJ6BQG-UONiydOlRZuz6nGVolmig" alt="Aurjobs" width="40" style="display: block; margin: 0 auto 16px auto;">
                                                <h1 style="margin: 0; font-size: 26px; font-weight: 700; letter-spacing: -0.5px;">Latest Job & Internship Openings</h1>
                                                <p style="margin: 12px 0 0 0; font-size: 16px; font-weight: 400; opacity: 0.9;">Discover new opportunities that match your skills</p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            
                            <!-- Introduction -->
                            <tr>
                                <td style="padding: 36px 32px 24px 32px; font-size: 16px; color: #334155;">
                                    <p style="margin: 0 0 14px 0;">Hello,</p>
                                    <p style="margin: 0 0 5px 0;">We've curated the latest job opportunities from top companies just for you. These positions are fresh on the market and seeking candidates with your qualifications.</p>
                                </td>
                            </tr>
                            
                            <!-- Job Listings -->
                            <tr>
                                <td style="padding: 0 32px 24px 32px;">
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        ${jobList}
                                    </table>
                                </td>
                            </tr>
                            
                            <!-- View All Jobs Button -->
                            <tr>
                                <td align="center" style="padding: 0 32px 40px 32px;">
                                    <a href="https://jobs.aurjobs.com" style="display: inline-block; background-color: #F1F5F9; border: 1px solid #E2E8F0; color: #334155; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-size: 15px; font-weight: 600; transition: all 0.3s ease;">
                                        View All Jobs
                                    </a>
                                </td>
                            </tr>
                            
                            <!-- Footer -->
                            <tr>
                                <td style="background-color: #F8FAFC; border-top: 1px solid #E2E8F0;">
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td align="center" style="padding: 32px 32px 20px 32px; font-size: 15px; color: #64748B;">
                                                <p style="margin: 0 0 16px 0;">Best regards,</p>
                                                <p style="margin: 0; font-weight: 600; color: #334155;">The Aurjobs Team</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="center" style="padding: 0 32px 16px 32px;">
                                                <table border="0" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                        <td style="padding: 0 10px;">
                                                            <a href="https://linkedin.com/company/aurjobs" style="text-decoration: none;">
                                                                <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" width="28" height="28" style="opacity: 0.85;">
                                                            </a>
                                                        </td>
                                                        <td style="padding: 0 10px;">
                                                            <a href="https://twitter.com/aurjobs" style="text-decoration: none;">
                                                                <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" width="28" height="28" style="opacity: 0.85;">
                                                            </a>
                                                        </td>
                                                        <td style="padding: 0 10px;">
                                                            <a href="https://instagram.com/aurjobs" style="text-decoration: none;">
                                                                <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram" width="28" height="28" style="opacity: 0.85;">
                                                            </a>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="center" style="padding: 16px 32px 32px 32px; font-size: 13px; color: #94A3B8;">
                                                <p style="margin: 0;">© 2025 Aurjobs. All rights reserved.</p>
                                                <p style="margin: 8px 0 0 0;">
                                                    <a href="https://aurjobs.com/privacy" style="color: #2563EB; text-decoration: none; font-weight: 500;">Privacy Policy</a> &nbsp;•&nbsp; 
                                                    <a href="https://aurjobs.com/terms" style="color: #2563EB; text-decoration: none; font-weight: 500;">Terms of Service</a> &nbsp;•&nbsp; 
                                                    <a href="https://aurjobs.com/unsubscribe" style="color: #2563EB; text-decoration: none; font-weight: 500;">Unsubscribe</a>
                                                </p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                        <!-- Small text below email -->
                        <p style="text-align: center; margin: 16px 0 0 0; font-size: 12px; color: #94A3B8;">
                            This email was sent because you subscribed to job alerts from Aurjobs.
                        </p>
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
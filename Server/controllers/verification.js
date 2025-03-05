import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
export const otp_verification = async(req, res) => {
    try {
        const { email, otp } = req.body;
        console.log("Reset password request for:", email);

        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }

        const transporter = nodemailer.createTransport({
            host: "smtp.zoho.in",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });

        const mailOptions = {
            from: "abhijeet1312@zohomail.in",
            to: email,
            subject: "OTP Requested from Aurjobs",
            text: `Here is your OTP: ${otp}`
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info);

        return res.status(200).json({ message: "Password reset email sent successfully" });
    } catch (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
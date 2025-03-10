import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
export const otp_verification = async(req, res) => {
    try {
        const { email, otp } = req.body;
        console.log(otp)
        console.log("Reset password request for:", email);

        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });

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
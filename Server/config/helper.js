import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const getISTTimestamp = () => {
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
    return new Date(now.getTime() + istOffset).toISOString().replace("Z", "+05:30");
};

export const isValidUUID = (id) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);


// export const createTransporter = () => {
//     return nodemailer.createTransport({
//         host: "smtp.zoho.in",
//         port: 587,
//         secure: false,
//         auth: {
//             user: process.env.EMAIL,
//             pass: process.env.PASSWORD,
//         },
//     });
// };

export const createTransporter = () => {
    return nodemailer.createTransport({
        host: "smtp.zoho.in",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    });
};
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { findByCandidateEmail, createCandidate } from "../models/candidate-model.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
// ✅ Google OAuth Strategy
export function configurePassport() {
    passport.use(
        new GoogleStrategy({
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: "http://localhost:3000/candidates/auth/google/callback",
            },
            async(accessToken, refreshToken, profile, done) => {
                try {
                    console.log('profile', profile);
                    const email = profile.emails[0].value;
                    console.log(email, "ssss");
                    let candidate = await findByCandidateEmail(email);

                    if (!candidate) {
                        // ✅ Creating a new candidate if not found
                        candidate = await createCandidate(
                            email,
                            "google", // No password for OAuth users
                            profile.name.givenName || "", // First Name
                            profile.name.familyName || "", // Last Name
                            null, // No phone number initially
                            null, // No location initially
                            null // No resume initially
                        );
                    }

                    // ✅ Generate JWT Token
                    const token = jwt.sign({ candidate_id: candidate.candidate_id },
                        process.env.JWT_SECRET, { expiresIn: "72h" }
                    );

                    candidate.token = token; // Attach token to candidate object
                    return done(null, candidate);
                } catch (error) {
                    console.error("Google OAuth Error:", error);
                    return done(error, null);
                }
            }
        )
    );
}

// Exporting passport instance
export { passport };
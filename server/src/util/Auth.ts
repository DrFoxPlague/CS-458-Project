import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import type { Request, Response, NextFunction } from "express";
import UserModel from "../schemas/User";

// Configure Google OAuth strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL: "/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // find user
                let user = await UserModel.findById({ _id: profile.id });

                // if they don't exist, create one
                if (!user) {
                    user = new UserModel({
                        _id: profile.id,
                        name: profile.displayName,
                        email: profile.emails?.[0].value,
                        bdg_coll: [],
                        is_staff: false,
                        prof_pic: profile.photos?.[0]?.value || ""
                    });

                    await user.save();
                }

                // check if user has changed profile picture
                if (user.prof_pic !== profile.photos?.[0]?.value) {
                    user.prof_pic = profile.photos?.[0]?.value || "";
                    await user.save();
                }

                return done(null, user); // Pass user data to serializeUser

            } catch (err) {
                throw err;
            }
        }
    )
);

// Serialize user into session
passport.serializeUser((user: any, done) => {
    // on new session, store some information in the session 
    // we probably only want to store user.id to keep it lightweight and not store things like passwords in the session
    done(null, user._id);
});

// Deserialize user from session
passport.deserializeUser(async (_id: string, done) => {
    // this function is used to get the full user details from the database using the details stored in the session
    // this function might need to be async / have an async database call

    // use an incoming user id to fetch relevant information and build a user object to return

    try {
        const user = await UserModel.findById(_id);

        if (!user) {
            return done(new Error("User not found!"));
        }

        done(null, user);
    } catch (err) {
        done(err);
    }

    
});

// Middleware to check if a user is authenticated
export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) return next();
    res.status(401).json({ error: "Unauthorized. Please log in." });
};

// Export route handlers for Google authentication
export const googleAuth = passport.authenticate("google", { scope: ["profile", "email"] });
export const googleCallback = passport.authenticate("google", {
    successRedirect: "http://localhost:5173/home", // Redirect to the frontend
    failureRedirect: "http://localhost:5173/login", // Redirect to the frontend login page
});

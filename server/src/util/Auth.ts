import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import type { Request, Response, NextFunction } from "express";

// Configure Google OAuth strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL: "/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            const user = {
                googleId: profile.id,
                displayName: profile.displayName,
                email: profile.emails?.[0].value,
            };
            return done(null, user); // Pass user data to serializeUser
        }
    )
);

// Serialize user into session
passport.serializeUser((user: any, done) => {
    // on new session, store some information in the session 
    // we probably only want to store user.id to keep it lightweight and not store things like passwords in the session
    done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser((user: any, done) => {
    // this function is used to get the full user details from the database using the details stored in the session
    // this function might need to be async / have an async database call

    // use an incoming user id to fetch relevant information and build a user object to return

    done(null, user);
});

// Middleware to check if a user is authenticated
export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) return next();
    res.redirect("/login");
};

// Export route handlers for Google authentication
export const googleAuth = passport.authenticate("google", { scope: ["profile", "email"] });
export const googleCallback = passport.authenticate("google", {
    successRedirect: "/graphql",
    failureRedirect: "/login",
});

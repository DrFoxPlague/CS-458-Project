import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import type { Request, Response, NextFunction } from "express";
import UserModel from "../schemas/User";
import jwt from "jsonwebtoken";
import { decrypt, encrypt } from "./Crypt";
import { OAuth2Client } from "google-auth-library";

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
                // let user = await UserModel.findById({ _id: profile.id }); // this is wrong, findById expects a string
                let user = await UserModel.findById(profile.id);

                // if they don't exist, create one
                if (!user) {
                    user = new UserModel({
                        _id: profile.id,
                        name: profile.displayName,
                        email: profile.emails?.[0].value,
                        badges: [],
                        staff: false,
                        profilePicture: profile.photos?.[0]?.value || "",
                    });

                    await user.save();
                }

                // check if user has changed profile picture
                if (user.profilePicture !== profile.photos?.[0]?.value) {
                    user.profilePicture = profile.photos?.[0]?.value || "";

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
export const isAuthenticated = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (req.isAuthenticated()) return next();
    res.status(401).json({ error: "Unauthorized. Please log in." });
};

// Export route handlers for Google authentication
export const googleAuth = passport.authenticate("google", {
    scope: ["profile", "email"],
});
export const googleCallback = (req: any, res: Response) => {
    return passport.authenticate(
        "google",
        async function (err: any, user: any, info: any, status: any) {
            if (err) return res.redirect("http://localhost:5173/login");
            if (!user) return res.redirect("http://localhost:5173/login");
            res.redirect(`http://localhost:5173/login?token=${user._id}`);
            const userDoc = await UserModel.findById(user._id);
            if (!userDoc) return res.redirect("http://localhost:5173/login");
            req.user = userDoc;
        }
    )(req, res);
};

export const getUser = async (jwtData: any) => {
    if (!jwtData) throw new Error("You must be logged in");
    const user = await UserModel.findById(jwtData.user.id);
    if (!user) throw new Error("User not found");

    return user;
};

export const checkToken = async (req: Request) => {
    const header = req.headers.authorization;
    if (!header) throw new Error("You must be logged in");
    const token = header.split(" ")[1];
    if (!token) throw new Error("You must be logged in");

    try {
        const jwtData = jwt.verify(decrypt(token), process.env.JWT_SECRET!);
        return await getUser(jwtData);
    } catch (err) {
        console.error(err);
        throw new Error("Error checking token");
    }
};

export const googleOAuthClient = new OAuth2Client({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    apiKey: process.env.GOOGLE_API_KEY!,
    redirectUri: "http://localhost:5173/login",
});

export const generateGoogleUrl = () => {
    const url = googleOAuthClient.generateAuthUrl({
        access_type: "offline",
        scope: ["profile", "email"],
        prompt: "consent",
    });
    return url;
};

export const authUser = async (code: any) => {
    const decryptedCode = Buffer.from(code, "base64").toString("ascii");

    try {
        const { tokens } = await googleOAuthClient.getToken(decryptedCode);

        if (!tokens.access_token) throw new Error("Error generating token");

        const url =
            "https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses,photos";
        googleOAuthClient.setCredentials(tokens);
        const { data: userInfo } = await googleOAuthClient.request<any>({
            url,
        });

        const userId = userInfo.resourceName?.split("/")[1];

        let user =
            (await UserModel.findById(userId)) ||
            (await UserModel.findById(userId));

        if (!user) {
            user = new UserModel({
                _id: userId,
                name: userInfo.names?.[0].displayName,
                email: userInfo.emailAddresses?.[0].value,
                bdg_coll: [],
                is_staff: false,
                profilePicture: userInfo.photos?.[0]?.url || "",
            });

            await user.save();
        }

        const jwtToken = encrypt(
            jwt.sign({ token: tokens, user }, process.env.JWT_SECRET!)
        );

        return {
            token: jwtToken,
            ...user.toJSON(),
        };
    } catch (error: any) {
        console.error(error);
        throw new Error("Error generating token");
    }
};

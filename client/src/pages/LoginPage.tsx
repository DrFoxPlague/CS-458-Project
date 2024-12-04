import image from "../assets/cits-logo.png";
import {
    Card,
    Stack,
    Button,
    InputLabel,
    Select,
    FormControl,
    MenuItem,
} from "@mui/material";
import { useMutation } from "@apollo/client";
import { Buffer } from "buffer";
import { CreateOrUpdateUser } from "../gql/user";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/Auth.store";
import { GenerateGoogleUrl, LoginUser } from "../gql/auth";

export const LoginPage = () => {
    const successCode = new URLSearchParams(window.location.search).get("code");

    const { user, setUser } = useAuthStore();

    const [loginUser, { loading }] = useMutation(LoginUser, {
        onCompleted: ({ login: loginData }) => {
            const { token, ...rest } = loginData;
            localStorage.setItem("token", token);
            setUser(rest);
        },
    });

    const [genGoogleUrl] = useMutation(GenerateGoogleUrl, {
        onCompleted: ({ generateGoogleAuthURL }) => {
            window.location.href = generateGoogleAuthURL;
        },
    });

    useEffect(() => {
        if (successCode) {
            loginUser({
                variables: {
                    code: Buffer.from(successCode).toString("base64"),
                },
            });
        }
    }, [successCode, loginUser]);

    if (loading) return <></>;
    if (user && !user.grade && !user.dob) return <Navigate to="/signup" />;
    if (user) return <Navigate to="/" />;

    return (
        <Stack className="w-full max-w-xl mx-auto p-4 space-y-4">
            <Card className="rounded-lg shadow-md overflow-hidden">
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img
                            alt="CPH Logo"
                            src={image}
                            className="mx-auto h-15 w-15"
                        />
                        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                            Sign in to Google
                        </h2>

                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={
                                    <img
                                        src="https://cdn.freebiesupply.com/logos/large/2x/google-icon-logo-png-transparent.png"
                                        alt="Google"
                                        className="h-5 w-5"
                                    />
                                }
                                onClick={() => genGoogleUrl()}
                                className="w-full !bg-green-800 hover:bg-indigo-500 text-white"
                            >
                                Continue with Google
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        </Stack>
    );
};

export const FollowUpPage = () => {
    const user = useAuthStore((state) => state.user);
    const setUser = useAuthStore((state) => state.setUser);

    const [signUpData, setSignUpData] = useState({
        dob: "",
        grade: "",
    });

    const [createOrUpdateUser, { loading }] = useMutation(CreateOrUpdateUser, {
        onCompleted: ({ createOrUpdateUser: newUserData }) => {
            const newUser = { ...user, ...newUserData };
            setUser(newUser);
        },
    });

    if (!user) return <Navigate to="/login" />;
    if (user.grade && user.dob) return <Navigate to="/" />;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!signUpData.dob || !signUpData.grade)
            return toast.error("Please fill out ALL fields!");

        createOrUpdateUser({
            variables: {
                input: {
                    grade: signUpData.grade,
                    dob: signUpData.dob,
                },
            },
        });
    };

    return (
        <Stack className="w-full max-w-xl mx-auto p-4 space-y-4">
            <Card className="rounded-lg shadow-md overflow-hidden">
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img
                            alt="CPH Logo"
                            src={image}
                            className="mx-auto h-15 w-15"
                        />
                        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                            Finish Signing Up
                        </h2>

                        <form
                            onSubmit={handleSubmit}
                            className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-6"
                        >
                            <div>
                                <InputLabel
                                    id="grade-label"
                                    className="block text-sm font-bold text-gray-900"
                                >
                                    Grade
                                </InputLabel>
                                <FormControl fullWidth>
                                    <Select
                                        labelId="grade-label"
                                        name="grade"
                                        value={signUpData.grade}
                                        onChange={(e) =>
                                            setSignUpData({
                                                ...signUpData,
                                                grade: e.target.value,
                                            })
                                        }
                                        label="Grade"
                                        className="mt-2 w-full py-1.5 rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                    >
                                        <MenuItem value="Elementary">
                                            Elementary
                                        </MenuItem>
                                        <MenuItem value="HighSchool">
                                            High School
                                        </MenuItem>
                                        <MenuItem value="College">
                                            College
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </div>

                            <div>
                                <InputLabel
                                    id="dob-label"
                                    className="block text-sm font-bold text-gray-900"
                                >
                                    Date of Birth
                                </InputLabel>
                                <input
                                    type="date"
                                    id="dob"
                                    name="dob"
                                    value={signUpData.dob}
                                    onChange={(e) =>
                                        setSignUpData({
                                            ...signUpData,
                                            dob: e.target.value,
                                        })
                                    }
                                    className="bg-white mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                />
                            </div>

                            {/* Submit Button */}
                            <div>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className="w-full !bg-green-800 hover:bg-indigo-500 text-white"
                                    disabled={loading}
                                >
                                    {loading
                                        ? "Submitting..."
                                        : "Finish Signup"}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </Card>
        </Stack>
    );
};

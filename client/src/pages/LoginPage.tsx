import image from "../assets/cits-logo.png"
import { Card, Stack, Button, InputLabel, Select, FormControl, MenuItem } from "@mui/material"
import { useMutation } from "@apollo/client";
import { CreateOrUpdateUser } from "../gql/user";
import { useState } from "react";
import toast from "react-hot-toast";

export const LoginPage = () => {

    const googleAuthURL = "http://localhost:4000/auth/google";

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
                            onClick={() => window.location.href = googleAuthURL}
                            className="w-full !bg-green-800 hover:bg-indigo-500 text-white"
                        >
                            Continue with Google
                        </Button>
                    </div>

                </div>
            </div>
        </Card>
      </Stack>
    )
}

export const FollowUpPage = () => {
    const [signUpData, setSignUpData] = useState({
        dob: "",
        grade: "",
    });

    const [createUser, { loading }] = useMutation(CreateOrUpdateUser);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!signUpData.dob || !signUpData.grade) return toast.error("Please fill out ALL fields!");

        try {
            await createUser({
                variables: {
                    input: signUpData
                }
            });
            
        } catch (err) {
            console.error("Error logging in:", err);
        }
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

                        <form onSubmit={handleSubmit} className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
                            <div>
                                <InputLabel id="grade-label" className="block text-sm font-bold text-gray-900">Grade</InputLabel>
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
                                        <MenuItem value="Elementary">Elementary</MenuItem>
                                        <MenuItem value="HighSchool">High School</MenuItem>
                                        <MenuItem value="College">College</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>

                            <div>
                                <InputLabel id="dob-label" className="block text-sm font-bold text-gray-900">Date of Birth</InputLabel>
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
                                    {loading ? "Submitting..." : "Finish Signup"}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </Card>
      </Stack>
    )
}
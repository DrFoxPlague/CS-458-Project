import image from "../assets/cits-logo.png"
import { Card, Stack, Button } from "@mui/material"

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
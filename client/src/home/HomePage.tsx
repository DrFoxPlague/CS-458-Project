import { Stack, Typography, Button, Paper, Avatar } from "@mui/material";
import { useAuthStore } from "../stores/Auth.store";
import { Navigate } from "react-router-dom";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useState } from "react";

export const HomePage = () => {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const [showScanner, setShowScanner] = useState(true);

    if(!user) return <Navigate to="/login" />
    if(user && !user.dob || !user.grade) return <Navigate to="/signup" />

    const toggleScanner = () => setShowScanner(!showScanner);

    return (
        <Stack className="w-full max-w-xl p-4 h-full gap-2">
            <Stack className="bg-neutral-200 p-2 flex flex-col justify-center items-center rounded-lg shadow-md overflow-hidden">
                <Typography variant="h4" className="font-bold text-gray-800">
                    Welcome,
                </Typography>
                <Typography variant="h4" className="font-bold text-gray-800 underline">
                    {user?.name}
                </Typography>
                <Avatar 
                    alt={user?.name} 
                    src={user?.profilePicture}
                    sx={{ width: 56, height: 56 }} 
                />
                <Button onClick={logout} variant="contained" className="!mx-2" color="success">
                    Logout
                    </Button>
            </Stack>
            <Stack justifyContent="center" alignItems="center" className="bg-neutral-200 p-2 rounded-lg shadow-md overflow-hidden">
                <Typography variant="h6" className="text-gray-600 !mx-2 text-center">
                    Badge Collection:
                </Typography>
                <Stack direction="row" justifyContent="center" alignItems="center">
                    <Paper className="p-2 rounded-lg">
                        <Typography variant="h6" className="text-gray-600 !mx-2 text-center">
                            1
                        </Typography>
                    </Paper>
                    <Paper className="p-2 rounded-lg">
                        <Typography variant="h6" className="text-gray-600 !mx-2 text-center">
                            2
                        </Typography>
                    </Paper>
                    <Paper className="p-2 rounded-lg">
                        <Typography variant="h6" className="text-gray-600 !mx-2 text-center">
                            3
                        </Typography>
                    </Paper>
                </Stack>
            </Stack>
            <Stack flexGrow={1} alignItems="center" className="bg-neutral-200 rounded-lg shadow-md overflow-hidden">
                <Typography variant="h5" className="text-gray-600 !mx-2 pt-2 text-center">
                    Ready to Begin Your Journey?
                </Typography>
                <Button onClick={toggleScanner} variant="contained" color="primary">
                    {showScanner ? "Cancel" : "Begin"}
                </Button>
                {showScanner && (
                    <Scanner onScan={(result) => console.log(result)} />
                )}
            </Stack>
        </Stack>
    )
}
import { Stack, Card, CardContent, CardMedia, Typography, Button, Paper, Avatar } from "@mui/material";
import { useAuthStore } from "../stores/Auth.store";
import { Navigate } from "react-router-dom";

export const HomePage = () => {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    if(!user) return <Navigate to="/login" />
    if(user && !user.dob || !user.grade) return <Navigate to="/signup" />

    return (
        <Stack className="w-full max-w-xl mx-auto p-4 space-y-4">
            <Stack className="bg-neutral-200 p-2 flex flex-col justify-center items-center rounded-lg shadow-md overflow-hidden">
                <Typography variant="h4" className="font-bold text-gray-800">
                    Welcome, {user?.name}
                </Typography>
                <Avatar 
                    alt={user?.name} 
                    src={user?.profilePicture}
                    sx={{ width: 56, height: 56 }} 
                />
                <Button onClick={logout} variant="contained" className="!mx-2 !my-0.5" color="success">
                    Logout
                    </Button>
            </Stack>
            <Stack justifyContent="center" alignItems="center" className="bg-neutral-200 p-2 rounded-lg shadow-md overflow-hidden">
                <Typography variant="h6" className="text-gray-600 !mx-2 text-center">
                    Badge Collection:
                </Typography>
                <Stack direction="row" justifyContent="center" alignItems="center" className="space-x-2">
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
        </Stack>
    )
}
import { Stack, Typography, Button, Paper, Avatar } from "@mui/material";
import { useAuthStore } from "../stores/Auth.store";
import { Navigate } from "react-router-dom";
import { QrScanner } from "./components/QrScanner";
import { Badge } from "./components/Badge.component";

export const HomePage = () => {
    const { user, logout } = useAuthStore();

    if (!user) return <Navigate to="/login" />;
    if ((user && !user.dob) || !user.grade) return <Navigate to="/signup" />;

    return (
        <Stack className="w-full max-w-xl p-4 h-full gap-2">
            <Stack className="bg-neutral-200 p-2 flex flex-col justify-center items-center rounded-lg shadow-md overflow-hidden">
                <Typography variant="h4" className="font-bold text-gray-800">
                    Welcome,
                </Typography>
                <Typography
                    variant="h4"
                    className="font-bold text-gray-800 underline"
                >
                    {user?.name}
                </Typography>
                <Avatar
                    alt={user?.name}
                    src={user?.profilePicture}
                    sx={{ width: 56, height: 56 }}
                />
                <Button
                    onClick={logout}
                    variant="contained"
                    className="!mx-2"
                    color="success"
                >
                    Logout
                </Button>
            </Stack>
            <Stack
                justifyContent="center"
                alignItems="center"
                className="bg-neutral-200 p-2 rounded-lg shadow-md overflow-hidden"
            >
                <Typography
                    variant="h6"
                    className="text-gray-600 !mx-2 text-center"
                >
                    Badge Collection:
                </Typography>
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    {user?.badges.length === 0 && (
                        <Paper className="p-2 rounded-lg">
                            <Typography className="text-gray-600 text-sm">
                                No badges yet
                            </Typography>
                        </Paper>
                    )}
                    {user?.badges.map((badge) => (
                        <Badge key={badge.id} badge={badge} />
                    ))}
                </Stack>
            </Stack>
            <QrScanner />
        </Stack>
    );
};

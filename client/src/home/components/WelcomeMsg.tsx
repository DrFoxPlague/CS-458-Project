import { Typography } from "@mui/material";
import { useAuthStore } from "../../stores/Auth.store";


export const WelcMsg = () => {
    const user = useAuthStore((state) => state.user);

    return (
        <Typography variant="h4" className="font-bold text-gray-800">
            Welcome, {user?.name}
        </Typography>
    )
}
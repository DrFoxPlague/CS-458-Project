import { Paper } from "@mui/material";
import { useAuthStore } from "../../stores/Auth.store";

export const BadgeDisplay = () => {
    const user = useAuthStore((state) => state.user);
    
}
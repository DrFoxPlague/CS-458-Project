import { Paper } from "@mui/material";
import { useAuthStore } from "../../stores/Auth.store";

export const Badge = () => {
    const user = useAuthStore((state) => state.user);
    
}
import { Avatar } from "@mui/material";
import { useAuthStore } from "../../stores/Auth.store";


export const DisplayPFP = () => {
    const user = useAuthStore((state) => state.user);

    return (
        <Avatar 
            alt={user?.name} 
            src={user?.prof_pic}
            sx={{ width: 56, height: 56 }} 
        />
    )
}
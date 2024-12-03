import { useQuery } from "@apollo/client";
import { GetUser } from "../../gql/user";
import { Avatar } from "@mui/material";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "../../stores/useAuthStore";

export const DisplayPFP = () => {
    const setUser = useAuthStore((state) => state.setUser);
    const user = useAuthStore((state) => state.user);

    useEffect(() => {
        setUser();
    }, [setUser]);

    const { data, loading, error } = useQuery(GetUser, {
        variables: { id: user?.id }, // Pass user ID to the query
        skip: !user, // Skip query if user is not authenticated
    });

    if (!user) return toast.error("Please log in to see your profile.");

    if (loading) return <p>loading...</p>

    if (error) {
        console.error("Error fetching profile!: ", error);
        return toast.error("Error fetching profile!");
    }

    const userProfile = data.getUser;

    return (
        //<Avatar alt={user.name} src={user.prof_pic}/>

        <p>{userProfile.id}</p>
    )
}
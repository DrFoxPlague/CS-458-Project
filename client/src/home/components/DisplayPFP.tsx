import { useQuery } from "@apollo/client";
import { GetUser } from "../../gql/user";
import { Avatar, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const DisplayPFP = () => {
    const [userId, setUserId] = useState(null);
    
    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const response = await fetch("http://localhost:4000/auth/me", {
                    credentials: "include", // Ensure cookies are sent
                });

                if (response.ok) {
                    //const data = await response.json();
                    setUserId(data._id);
                } else {
                    console.error("Failed to fetch user ID. Please log in.");
                    // Redirect to login page or handle unauthenticated state
                }
            } catch (err) {
                console.error("Error fetching user ID:", err);
            }
        };

        fetchUserId();
    }, []);

    const { data, loading, error } = useQuery(GetUser, {
        variables: { id: userId },
        skip: !userId, // Skip query until userId is set
    });

    if (loading) return toast.loading("Retrieving user info...");
    if (error) {
        console.error("Error retrieving information: ", error);
        return toast.error("Error retrieving information!")
    }

    const user = data?.getUser;
    
    return (
        <Avatar alt={user.name} src={user.prof_pic}/>
    )
}
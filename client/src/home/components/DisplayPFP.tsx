import { useQuery } from "@apollo/client";
import { GetUser } from "../../gql/user";
import { Avatar, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const DisplayPFP = () => {
    const [userId, setUserId] = useState(null);
    
    // SCRAPPED CODE, REMAKING
    
    return (
        //<Avatar alt={user.name} src={user.prof_pic}/>

        console.log(userId)
    )
}
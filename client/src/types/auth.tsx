export type User = {
    id: string;
    name: string;
    email: string;
    grade: string;
    dob: Date | null;
    bdg_coll: string[]; 
    is_staff: boolean;
    prof_pic: string;
}

export type UserWithToken = User & {
    token: string;
};

export type AuthState = {
    user: User | null;
    isLoggedIn: boolean;
    setUser: (user: User) => void;
}
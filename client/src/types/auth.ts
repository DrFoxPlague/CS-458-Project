export type User = {
    id: string;
    name: string;
    email: string;
    grade: string;
    dob: Date | null;
    badges: Badge[];
    staff: boolean;
    profilePicture: string;
};

export type Badge = {
    id: string;
    name: string;
    description: string;
    type: string;
};

export type UserWithToken = User & {
    token: string;
};

export type AuthState = {
    user: User | null;
    isLoggedIn: boolean;
    setUser: (user: User) => void;
};

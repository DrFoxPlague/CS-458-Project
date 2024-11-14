export type User = {
    id: string;
    name: string;
    email: string;
    grade: string;
    dob: Date | null;
    bdg_coll: string[]; 
    is_staff: boolean;
}
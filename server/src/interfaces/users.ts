import { IMindmap } from "./mindmaps";

export interface IUser {
    id: number;
    username: string;
    password: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    mindmaps: IMindmap[];
}
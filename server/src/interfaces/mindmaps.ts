import { INode } from './nodes';
import { IUser } from './users';

export interface IMindmap {
    id: number;
    name: string;
    userId: number;
    user: IUser;
    createdAt: Date;
    updatedAt: Date;
    nodes: INode[];
}

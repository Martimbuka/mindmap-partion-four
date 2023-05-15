import { INode } from "./nodes";

export interface IConnection {
    id: number;
    label: string;
    sourceNodeId: number;
    targetNodeId: number;
    target: INode;
    createdAt: Date;
    updatedAt: Date;
}

export interface IConnectionData {
    connections: IConnection[];
}
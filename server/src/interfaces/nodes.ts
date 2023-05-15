import { IConnection } from "./connections";

export interface INode {
    id: number;
    label: string;
    xPos: number;
    yPos: number;
    mindmapId: number;
    parentId: number;
    parent: INode | null;
    children: INode[] | null;
    createdAt: Date;
    updatedAt: Date;
    SourceConnectionNode: IConnection[] | null;
    TargetConnectionNode: IConnection[] | null;
}

export interface INodeData {
    nodes: INode[];
}
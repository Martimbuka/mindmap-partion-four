import { INode } from "../interfaces/nodes";
import fs from 'fs';

const nodesJSON: string = '../../resources/nodes.json';

export class NodeController {
    private nodes: INode[];

    constructor() {}

    public async init() {
        try {
            const nodes = await fs.readFileSync(nodesJSON, 'utf-8');
            this.nodes = JSON.parse(nodes);
        } catch (error) {
            throw error;
        }
    }

    public getNodes() {
        return this.nodes;
    }

    public getNodeById(id: number): INode | undefined {
        const node = this.nodes.find((node: INode) => node.id === id);

        if (node) {
            return node;
        } else {
            return undefined;
        }
    }


    public async addNode(node: INode) {
        this.nodes.push(node);
        await fs.writeFileSync(nodesJSON, JSON.stringify(this.nodes));
    }

    public async updateNode(id: number, node: INode) {
        const nodeIndex = this.nodes.findIndex((node: INode) => node.id === id);

        if (nodeIndex !== -1) {
            this.nodes[nodeIndex] = node;
            await fs.writeFileSync(nodesJSON, JSON.stringify(this.nodes));
        } else {
            throw new Error('Node not found');
        }
    }

    public async deleteNode(id: number) {
        const nodeIndex = this.nodes.findIndex((node: INode) => node.id === id);

        if (nodeIndex !== -1) {
            this.nodes.splice(nodeIndex, 1);
            await fs.writeFileSync(nodesJSON, JSON.stringify(this.nodes));
        } else {
            throw new Error('Node not found');
        }
    }
}
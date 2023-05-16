import { INode, INodeData } from "../interfaces/nodes";
import fs from 'fs';

const nodesJSON: string = '../../resources/nodes.json';

export class NodeController {
    private nodesData: INodeData;

    constructor() {
        this.nodesData = {
            nodes: []
        };
    }

    public async init() {
        try {
            const nodes = await fs.readFileSync(nodesJSON, 'utf-8');
            this.nodesData = JSON.parse(nodes);
        } catch (error) {
            throw error;
        }
    }

    public getNodes() {
        return this.nodesData.nodes;
    }

    public getNodeById(id: number): INode | undefined {
        const node = this.nodesData.nodes.find((node: INode) => node.id === id);

        if (node) {
            return node;
        } else {
            return undefined;
        }
    }


    public async addNode(node: INode) {
        this.nodesData.nodes.push(node);
        await fs.writeFileSync(nodesJSON, JSON.stringify(this.nodesData.nodes));
    }

    public async updateNode(id: number, node: INode) {
        const nodeIndex = this.nodesData.nodes.findIndex((node: INode) => node.id === id);

        if (nodeIndex !== -1) {
            this.nodesData.nodes[nodeIndex] = node;
            await fs.writeFileSync(nodesJSON, JSON.stringify(this.nodesData.nodes));
        } else {
            throw new Error('Node not found');
        }
    }

    public async deleteNode(id: number) {
        const nodeIndex = this.nodesData.nodes.findIndex((node: INode) => node.id === id);

        if (nodeIndex !== -1) {
            this.nodesData.nodes.splice(nodeIndex, 1);
            await fs.writeFileSync(nodesJSON, JSON.stringify(this.nodesData.nodes));
        } else {
            throw new Error('Node not found');
        }
    }
}
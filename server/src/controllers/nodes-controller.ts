import { INode, INodeData } from "../interfaces/nodes";
import { read, write } from "../utils/file-system"

const nodesJSON: string = 'resources/nodes.json';

export class NodeController {
    private nodesData: INodeData;

    constructor() {
        this.nodesData = {
            nodes: []
        };
    }

    public async init(): Promise<void> {
        try {
            const nodes = await read(nodesJSON);
            this.nodesData = JSON.parse(nodes);
        } catch (err) {
            console.log(err);
        }
    }

    public getNodes() {
        return this.nodesData;
    }

    public getNodeById(id: number): INode | undefined {
        const node = this.nodesData.nodes.find((node: INode) => node.id === id);

        if (node) {
            return node;
        } else {
            return undefined;
        }
    }

    public async addNode(node: INode): Promise<void> {
        const nodeIndex = this.nodesData.nodes.findIndex((node: INode) => node.id === node.id);

        if (nodeIndex !== -1) {
            throw 'Node already exists';
        }

        this.nodesData.nodes.push(node);
        await write(nodesJSON, JSON.stringify(this.nodesData));
    }

    public async updateNode(index: number, node: INode): Promise<void> {
        this.nodesData.nodes[index] = node;
        await write(nodesJSON, JSON.stringify(this.nodesData));
    }

    public async deleteNode(index: number): Promise<void> {
        this.nodesData.nodes.splice(index, 1);
        await write(nodesJSON, JSON.stringify(this.nodesData));
    }
}
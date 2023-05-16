import { Router, Request, Response } from 'express';
import { INode } from '../interfaces/nodes';
import { NodeController } from '../controllers/nodes-controller';

const router = Router();

let nodesController: NodeController;

const getNodesController = async (request: Request, response: Response, next: () => void) => {
    try {
        nodesController = new NodeController();
        await nodesController.init();

        next();
    } catch (error) {
        response.status(500).json({ message: error });
    }
}

router.use(getNodesController);

router.get('/', (request: Request, response: Response) => {
    try {
        const nodes = nodesController.getNodes();

        response.status(200).json(nodes);
    } catch (error) {
        response.status(500).json({ message: "Internal server error" });
    }
});

router.get('/nodes', (req: Request, res: Response) => {
    const nodes = nodesController.getNodes();

    res.json(nodes);
});

router.post('/nodes', async (req: Request, res: Response) => {
    const { id, label, xPos, yPos, mindmapId, parentId } = req.body;
    // TO BE IMPLEMENTED:
    const parent = null;
    const children = null;
    const SourceConnectionNode = null;
    const TargetConnectionNode = null;

    const newNode : INode = {
        id,
        label,
        xPos,
        yPos,
        mindmapId,
        parentId,
        parent,
        children,
        createdAt: new Date(),
        updatedAt: new Date(),
        SourceConnectionNode,
        TargetConnectionNode
    };

    try {
        await nodesController.addNode(newNode);        
        res.status(201).json(newNode);
    } catch (error) {
        res.status(500).json({ message: "/Internal server error" });
    }
});

router.put('/nodes/:id', async (req: Request, res: Response) => {
    const nodeId = parseInt(req.params.id);
    const { id, label, xPos, yPos, mindmapId, parentId } = req.body;
    // TO BE IMPLEMENTED:
    const parent = null;
    const children = null;
    const SourceConnectionNode = null;
    const TargetConnectionNode = null;

    const nodes = nodesController.getNodes();
    const nodeIndex = nodes.nodes.findIndex(node => node.id === nodeId);

    if (nodeIndex >= 0) {
        const updatedNode : INode = {
            id,
            label,
            xPos,
            yPos,
            mindmapId,
            parentId,
            parent,
            children,
            createdAt: new Date(),
            updatedAt: new Date(),
            SourceConnectionNode,
            TargetConnectionNode
        };

        try {
            await nodesController.updateNode(nodeIndex, updatedNode);
            res.status(200).json(updatedNode);
        } catch (error) {
            res.status(500).json({ message: "/Internal server error" });
        }
    } else {
        res.status(404).json({ message: "Node not found" });
    }
});

router.delete('/nodes/:id', async (req: Request, res: Response) => {
    const nodeId = parseInt(req.params.id);

    const nodes = nodesController.getNodes();
    const nodeIndex = nodes.nodes.findIndex(node => node.id === nodeId);

    if (nodeIndex >= 0) {
        try {
            await nodesController.deleteNode(nodeIndex);
            res.status(200).json({ message: "Node deleted" });
        } catch (error) {
            res.status(500).json({ message: "/Internal server error" });
        }
    } else {
        res.status(404).json({ message: "Node not found" });
    }
});

export default router;

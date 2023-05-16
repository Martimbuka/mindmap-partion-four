import { Router, Request, Response } from 'express';
import { IConnection } from '../interfaces/connections';
import { ConnectionController } from '../controllers/connections-controller';

const router = Router();

let connectionsController: ConnectionController;

const getConnectionsController = async (request: Request, response: Response, next: () => void) => {
    try {
        connectionsController = new ConnectionController();
        await connectionsController.init();

        next();
    } catch (error) {
        response.status(500).json({ message: "/Internal server error" });
    }
};

router.use(getConnectionsController);

router.get('/', (request: Request, response: Response) => {
    try {
        const connections = connectionsController.getConnections();

        response.status(200).json(connections);
    } catch (error) {
        response.status(500).json({ message: + "/Internal server error" });
    }
});


router.get('/connections', (req: Request, res: Response) => {
    const connections = connectionsController.getConnections();

    res.json(connections);
});

router.post('/connections', async (req: Request, res: Response) => {
    const { id, label, target, sourceNodeId, targetNodeId } = req.body;
    
    const newConnection: IConnection = {
        id,
        label,
        sourceNodeId,
        targetNodeId,
        target,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    try {
        await connectionsController.addConnection(newConnection);
            
        res.status(201).json(newConnection);
    } catch (error) {
        res.status(500).json({ message: + "/Internal server error" });
    }
});


router.put('/connections/:id', async (req: Request, res: Response) => {
    const connectionId = parseInt(req.params.id);
    const { label } = req.body;

    const connections = connectionsController.getConnections().connections;

    const connectionIndex = connections.findIndex((connection: IConnection) => connection.id === connectionId);

    if (connectionIndex !== -1) {
        const updatedConnection = {
            ...connections[connectionIndex],
            label,
            updatedAt: new Date()
        };

        connections[connectionIndex] = updatedConnection;
        
        await connectionsController.updateConnection(connectionId, updatedConnection);

        res.json(updatedConnection);
        } else {
            res.status(404).json({ message: 'Connection not found' });
        }
    });

router.delete('/connections/:id', async (req: Request, res: Response) => {
    const connectionId = parseInt(req.params.id);

    const connections = connectionsController.getConnections().connections;

    const connectionIndex = connections.findIndex((connection: IConnection) => connection.id === connectionId);

    if (connectionIndex !== -1) {
        connections.splice(connectionIndex, 1);
        await connectionsController.deleteConnection(connectionId);

        res.status(204).json({ message: 'Connection deleted' });
    } else {
        res.status(404).json({ message: 'Connection not found' });
    }
});
    
export default router;

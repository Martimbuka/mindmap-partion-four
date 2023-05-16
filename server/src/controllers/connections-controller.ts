import { IConnection, IConnectionData } from "../interfaces/connections";
import fs from 'fs';

const connectionsJSON: string = '../../resources/connections.json';

export class ConnectionController {
    private connectionsData: IConnectionData;

    constructor() {
        this.connectionsData = {
            connections: []
        };
    }
    

    public async init() {
        const connections = await fs.readFileSync(connectionsJSON, 'utf-8');
        this.connectionsData = JSON.parse(connections);
    }

    public getConnections() {
        return this.connectionsData;
    }

    public getConnectionsById(id: number): IConnection | undefined {
        const connection = this.connectionsData.connections.find((connection: IConnection) => connection.id === id);


        if (connection) {
            return connection;
        } else {
            return undefined;
        }
    }

    public async addConnection(connection: IConnection) {
        this.connectionsData.connections.push(connection);
        await fs.writeFileSync(connectionsJSON, JSON.stringify(this.connectionsData));
    }

    public async updateConnection(id: number, connection: IConnection) {
        const connectionIndex = this.connectionsData.connections.findIndex((connection: IConnection) => connection.id === id);

        if (connectionIndex !== -1) {
            this.connectionsData.connections[connectionIndex] = connection;
            await fs.writeFileSync(connectionsJSON, JSON.stringify(this.connectionsData.connections));
        } else {
            throw new Error('Connection not found');
        }
    }

    public async deleteConnection(id: number) {
        const connectionIndex = this.connectionsData.connections.findIndex((connection: IConnection) => connection.id === id);

        if (connectionIndex !== -1) {
            this.connectionsData.connections.splice(connectionIndex, 1);
            await fs.writeFileSync(connectionsJSON, JSON.stringify(this.connectionsData.connections));
        } else {
            throw new Error('Connection not found');
        }
    }
}
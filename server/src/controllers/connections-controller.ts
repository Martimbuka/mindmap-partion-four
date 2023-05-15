import { IConnection, IConnectionData } from "../interfaces/connections";
import fs from 'fs';

const connectionsJSON: string = '../../resources/connections.json';

export class ConnectionController {
    private connections: IConnection[];

    constructor() {}
    

    public async init() {
        const connections = await fs.readFileSync(connectionsJSON, 'utf-8');
        this.connections = JSON.parse(connections);
    }

    public getConnections() {
        return this.connections;
    }

    public getConnectionsById(id: number): IConnection | undefined {
        const connection = this.connections.find((connection: IConnection) => connection.id === id);

        if (connection) {
            return connection;
        } else {
            return undefined;
        }
    }

    public async addConnection(connection: IConnection) {
        this.connections.push(connection);
        await fs.writeFileSync(connectionsJSON, JSON.stringify(this.connections));
    }

    public async updateConnection(id: number, connection: IConnection) {
        const connectionIndex = this.connections.findIndex((connection: IConnection) => connection.id === id);

        if (connectionIndex !== -1) {
            this.connections[connectionIndex] = connection;
            await fs.writeFileSync(connectionsJSON, JSON.stringify(this.connections));
        } else {
            throw new Error('Connection not found');
        }
    }

    public async deleteConnection(id: number) {
        const connectionIndex = this.connections.findIndex((connection: IConnection) => connection.id === id);

        if (connectionIndex !== -1) {
            this.connections.splice(connectionIndex, 1);
            await fs.writeFileSync(connectionsJSON, JSON.stringify(this.connections));
        } else {
            throw new Error('Connection not found');
        }
    }
}
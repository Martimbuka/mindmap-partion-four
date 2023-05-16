import { IConnection, IConnectionData } from "../interfaces/connections";
import { read, write } from "../utils/file-system";

const connectionsJSON: string = 'resources/connections.json';

export class ConnectionController {
    private connectionsData: IConnectionData;

    constructor() {
        this.connectionsData = {
            connections: []
        };
    }


    public async init(): Promise<void> {
        try {
            const connections = await read(connectionsJSON);
            this.connectionsData = JSON.parse(connections);
        } catch (err) {
            console.log(err);
        }
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

    public async addConnection(connection: IConnection): Promise<void> {
        const connectionIndex = this.connectionsData.connections.findIndex((connection: IConnection) => connection.id === connection.id);

        if (connectionIndex !== -1) {
            throw 'Connection already exists';
        }

        this.connectionsData.connections.push(connection);
        await write(connectionsJSON, JSON.stringify(this.connectionsData.connections));
    }

    public async updateConnection(index: number, connection: IConnection): Promise<void> {
        this.connectionsData.connections[index] = connection;
        await write(connectionsJSON, JSON.stringify(this.connectionsData.connections));
    }

    public async deleteConnection(index: number): Promise<void> {
        this.connectionsData.connections.splice(index, 1);
        await write(connectionsJSON, JSON.stringify(this.connectionsData.connections));
    }
}
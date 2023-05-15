import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connections from './routes/connections';
import nodes from './routes/nodes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); // parse to JSON

app.use('/connections', connections);
app.use('/nodes', nodes);

app.listen(process.env.APP_PORT, () => {
    console.log(`Server running on port ${process.env.APP_PORT}`);
});

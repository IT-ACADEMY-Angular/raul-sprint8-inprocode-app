import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import routesProducto from '../routes/producto'
import locationRoutes from '../routes/locationRoutes';
import db from '../db/connection'

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Application working on port ${this.port}`);
        })
    }

    routes() {
        this.app.get('/', (req: Request, res: Response) => {
            res.json({
                msg: 'API Working'
            })
        })
        this.app.use('/api/productos', routesProducto);

        this.app.use('/api/locations', locationRoutes);
    }

    midlewares() {
        this.app.use(express.json());
        this.app.use(cors());
    }

    async dbConnect() {
        try {
            await db.authenticate();
            console.log('Conectados a la BBDD.');

            await db.sync({ force: false });
            console.log('Modelos sincronizados con la base de datos.');
        } catch (error) {
            console.log(error);
            console.log('Error al conectarse a la BBDD.');
        }
    }
}

export default Server;
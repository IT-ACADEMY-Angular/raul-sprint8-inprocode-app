import express, { Application, Request, Response } from "express";
import cors from "cors";
import routesProducto from "../routes/productoRoutes";
import locationRoutes from "../routes/locationRoutes";
import eventRoutes from "../routes/eventRoutes";
import chartRoutes from "../routes/chartRoutes";
import seedChartData from "../scripts/seedData";
import { Sequelize } from "sequelize";
import { initializeModels, models } from "../models";

class Server {
  private app: Application;
  private port: string;
  private db: Sequelize;

  constructor(sequelize: Sequelize) {
    this.app = express();
    this.port = process.env.PORT || "3001";
    this.db = sequelize;

    initializeModels(this.db);

    this.middlewares();
    this.routes();
    this.dbConnect();
  }

  public getApp(): Application {
    return this.app;
  }

  listen() {
    const server = this.app.listen(this.port, () => {
      console.log(`Aplicación funcionando en el puerto ${this.port}`);
    });

    server.on("error", (err: NodeJS.ErrnoException) => {
      if (err.code === "EADDRINUSE") {
        console.error(
          `El puerto ${this.port} está en uso. Intentando con otro puerto...`
        );
        this.port = (parseInt(this.port) + 1).toString();
        this.listen();
      } else {
        console.error("Error no manejado:", err);
      }
    });
  }

  routes() {
    this.app.get("/", (req: Request, res: Response) => {
      res.json({
        msg: "API Funcionando",
      });
    });

    this.app.use("/api/productos", routesProducto);
    this.app.use("/api/locations", locationRoutes);
    this.app.use("/api/events", eventRoutes);
    this.app.use("/api/charts", chartRoutes);

    this.app.get("/api/config", (req: Request, res: Response) => {
      res.json({
        port: this.port,
        host: req.hostname,
      });
    });
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  async dbConnect() {
    try {
      await this.db.authenticate();
      console.log("Conectados a la base de datos.");

      await this.db.sync({ force: false });
      console.log("Modelos sincronizados con la base de datos.");

      if (process.env.NODE_ENV !== "production") {
        await seedChartData();
        console.log("Datos de seed insertados en charts.");
      }
    } catch (error) {
      console.error("Error al conectarse a la base de datos:", error);
    }
  }
}

export default Server;

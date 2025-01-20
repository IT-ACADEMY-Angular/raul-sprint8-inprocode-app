import express, { Application, Request, Response } from "express";
import cors from "cors";
import routesProducto from "../routes/productoRoutes";
import locationRoutes from "../routes/locationRoutes";
import eventRoutes from "../routes/eventRoutes";
import db from "../db/connection";
import chartRoutes from "../routes/chartRoutes";
import seedChartData from "../scripts/seedData";

class Server {
  private app: Application;
  private port: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3001";
    this.midlewares();
    this.routes();
    this.dbConnect();
  }

  public getApp(): Application {
    return this.app;
  }

  listen() {
    const server = this.app.listen(this.port, () => {
      console.log(`Application working on port ${this.port}`);
    });

    server.on("error", (err: NodeJS.ErrnoException) => {
      if (err.code === "EADDRINUSE") {
        console.error(`Port ${this.port} is in use. Trying another port...`);
        this.port = (parseInt(this.port) + 1).toString();
        this.listen();
      } else {
        console.error("Unhandled error:", err);
      }
    });
  }

  routes() {
    this.app.get("/", (req: Request, res: Response) => {
      res.json({
        msg: "API Working",
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

  midlewares() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  async dbConnect() {
    try {
      await db.authenticate();
      console.log("Conectados a la BBDD.");

      await db.sync({ force: false });
      console.log("Modelos sincronizados con la base de datos.");

      if (process.env.NODE_ENV !== "production") {
        await seedChartData();
      }
    } catch (error) {
      console.error("Error al conectarse a la base de datos:", error);
    }
  }
}

export default Server;

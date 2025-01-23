import Server from "./models/server";
import dotenv from "dotenv";
import { ensureDatabaseExists, createSequelize } from "./db/connection";

dotenv.config();

(async () => {
  try {
    await ensureDatabaseExists();

    const sequelize = createSequelize();

    const server = new Server(sequelize);
    server.listen();
  } catch (error) {
    console.error("Fallo al inicializar el servidor:", error);
    process.exit(1);
  }
})();

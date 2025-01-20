import { Sequelize } from "sequelize";
import mysql from "mysql2/promise";

const dbName = "almacen";
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "root",
  dialect: "mysql",
};

const ensureDatabaseExists = async () => {
  try {
    const connection = await mysql.createConnection({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password,
    });

    const [databases]: [any[], any] = await connection.query(
      "SHOW DATABASES LIKE ?",
      [dbName]
    );
    if (databases.length === 0) {
      console.log(`La base de datos '${dbName}' no existe. Creándola...`);
      await connection.query(`CREATE DATABASE ${dbName}`);
      console.log(`Base de datos '${dbName}' creada exitosamente.`);
    } else {
      console.log(`La base de datos '${dbName}' ya existe.`);
    }

    await connection.end();
  } catch (error) {
    console.error("Error al verificar/crear la base de datos:", error);
    throw error;
  }
};

(async () => {
  await ensureDatabaseExists();
})();

const sequelize = new Sequelize(dbName, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect as "mysql",
  logging: false,
});

export default sequelize;

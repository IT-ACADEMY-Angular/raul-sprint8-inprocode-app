import { Sequelize } from "sequelize";
import { initChartData, ChartData } from "./chart";
import { initEventModel, Event } from "./event";
import { initLocationModel, Location } from "./location";
import { initProductoModel, Producto } from "./producto";

export const initializeModels = (sequelize: Sequelize) => {
  initChartData(sequelize);
  initEventModel(sequelize);
  initLocationModel(sequelize);
  initProductoModel(sequelize);
};

export const models = {
  ChartData,
  Event,
  Location,
  Producto,
};

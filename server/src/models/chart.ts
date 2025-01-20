import { DataTypes, Model } from "sequelize";
import sequelize from "../db/connection";

class ChartData extends Model {
  public id!: number;
  public month!: string;
  public sales!: number;
  public product!: string;
  public quantity!: number;
  public category!: string;
  public percentage!: number;
}

ChartData.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    month: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sales: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    product: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    percentage: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "ChartData",
    tableName: "chart_data",
  }
);

export default ChartData;
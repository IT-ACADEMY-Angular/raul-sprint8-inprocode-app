import { DataTypes, Model, Sequelize } from "sequelize";

export class ChartData extends Model {
  public id!: number;
  public month!: string;
  public sales!: number;
  public product!: string;
  public quantity!: number;
  public category!: string;
  public percentage!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initChartData = (sequelize: Sequelize) => {
  ChartData.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
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
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ["month", "product"],
          name: "unique_month_product",
        },
      ],
    }
  );
};

import { DataTypes, Model, Optional, Sequelize } from "sequelize";

interface LocationAttributes {
  id: number;
  lat: number;
  lng: number;
  category: string;
  subcategory: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface LocationCreationAttributes
  extends Optional<LocationAttributes, "id"> {}

export class Location
  extends Model<LocationAttributes, LocationCreationAttributes>
  implements LocationAttributes
{
  public id!: number;
  public lat!: number;
  public lng!: number;
  public category!: string;
  public subcategory!: string;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initLocationModel = (sequelize: Sequelize) => {
  Location.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      lat: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      lng: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subcategory: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 20],
        },
      },
    },
    {
      sequelize,
      modelName: "Location",
      tableName: "locations",
      timestamps: true,
    }
  );
};

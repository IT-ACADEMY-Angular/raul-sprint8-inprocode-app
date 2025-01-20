import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db/connection";

interface LocationAttributes {
  id: number;
  lat: number;
  lng: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface LocationCreationAttributes
  extends Optional<LocationAttributes, "id"> {}

class Location
  extends Model<LocationAttributes, LocationCreationAttributes>
  implements LocationAttributes
{
  public id!: number;
  public lat!: number;
  public lng!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Location.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    lat: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    lng: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Location",
    tableName: "locations",
    timestamps: true,
  }
);

export default Location;

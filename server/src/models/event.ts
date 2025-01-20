import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db/connection";

interface EventAttributes {
  id: number;
  title: string;
  start: Date;
}

interface EventCreationAttributes extends Optional<EventAttributes, "id"> {}

class Event
  extends Model<EventAttributes, EventCreationAttributes>
  implements EventAttributes
{
  public id!: number;
  public title!: string;
  public start!: Date;
}

Event.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Event",
  }
);

export default Event;

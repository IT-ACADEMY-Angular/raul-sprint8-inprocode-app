import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db/connection";

interface EventAttributes {
  id: number;
  title: string;
  start: Date;
  allDay: boolean;
  end?: Date | null;
}

interface EventCreationAttributes
  extends Optional<EventAttributes, "id" | "end"> {}

class Event
  extends Model<EventAttributes, EventCreationAttributes>
  implements EventAttributes
{
  public id!: number;
  public title!: string;
  public start!: Date;
  public allDay!: boolean;
  public end!: Date | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Event.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    start: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    allDay: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    end: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "events",
    sequelize,
  }
);

export default Event;

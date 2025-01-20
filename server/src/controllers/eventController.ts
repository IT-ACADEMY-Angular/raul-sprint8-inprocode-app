import { Request, Response } from "express";
import Event from "../models/event";

export const getEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    await Event.sync();
    const events = await Event.findAll({
      attributes: ["id", "title", "start"],
    });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener eventos" });
  }
};

export const createEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await Event.sync();
    const { title, start } = req.body;
    const newEvent = await Event.create({ title, start });

    res.status(201).json({
      id: newEvent.id,
      title: newEvent.title,
      start: newEvent.start,
    });
  } catch (error) {
    console.error("Error al crear el evento:", error);
    res.status(500).json({ error: "Error al crear el evento" });
  }
};

export const deleteEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await Event.sync();
    const { id } = req.params;
    const rowsDeleted = await Event.destroy({ where: { id } });

    if (rowsDeleted > 0) {
      res.status(200).json({ message: "Evento eliminado correctamente" });
    } else {
      res.status(404).json({ message: "Evento no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el evento" });
  }
};

import { Request, Response } from "express";
import Event from "../models/event";

export const getEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    await Event.sync();
    const events = await Event.findAll({
      attributes: ["id", "title", "start", "allDay", "end"],
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
    const { title, start, allDay } = req.body;

    if (!title || !start) {
      res
        .status(400)
        .json({ error: "Título y fecha de inicio son requeridos" });
      return;
    }

    const newEvent = await Event.create({ title, start, allDay, end: null });

    res.status(201).json({
      id: newEvent.id,
      title: newEvent.title,
      start: newEvent.start,
      allDay: newEvent.allDay,
      end: newEvent.end,
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

export const updateEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await Event.sync();
    const { id } = req.params;
    const { title, start, allDay, end } = req.body;

    if (!title && !start && allDay === undefined && end === undefined) {
      res
        .status(400)
        .json({
          error:
            "Se debe proporcionar al menos un campo para actualizar (title, start, allDay o end)",
        });
      return;
    }

    const event = await Event.findByPk(id);
    if (!event) {
      res.status(404).json({ error: "Evento no encontrado" });
      return;
    }

    if (title !== undefined) event.title = title;
    if (start !== undefined) event.start = start;
    if (allDay !== undefined) event.allDay = allDay;
    if (end !== undefined) event.end = end;

    await event.save();

    res.status(200).json({
      id: event.id,
      title: event.title,
      start: event.start,
      allDay: event.allDay,
      end: event.end,
    });
  } catch (error) {
    console.error("Error al actualizar el evento:", error);
    res.status(500).json({ error: "Error al actualizar el evento" });
  }
};

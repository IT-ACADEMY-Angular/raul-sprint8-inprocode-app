import { Request, Response } from "express";
import Location from "../models/location";

export const getLocations = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const locations = await Location.findAll();
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const saveLocation = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { lat, lng, category, subcategory, name } = req.body;

    if (!name || typeof name !== "string" || name.length > 20) {
      res.status(400).json({
        message:
          "El nombre del sitio es requerido y debe tener máximo 20 caracteres",
      });
      return;
    }

    if (!lat || !lng || !category || !subcategory) {
      res.status(400).json({
        message:
          "Latitud, longitud, categoría, subcategoría y nombre son requeridas",
      });
      return;
    }

    const location = await Location.create({
      lat,
      lng,
      category,
      subcategory,
      name,
    });
    res.status(201).json(location);
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

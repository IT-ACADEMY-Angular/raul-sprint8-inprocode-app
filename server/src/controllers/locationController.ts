import { Request, Response } from 'express';
import Location from '../models/location';

export const getLocations = async (req: Request, res: Response): Promise<void> => {
  try {
    const locations = await Location.findAll();
    res.status(200).json(locations);
  } catch (error) {
    console.error('Error al obtener las localizaciones:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const saveLocation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { lat, lng } = req.body;

    if (!lat || !lng) {
      res.status(400).json({ message: 'Latitud y longitud son requeridas' });
      return;
    }

    const location = await Location.create({ lat, lng });
    res.status(201).json(location);
  } catch (error) {
    console.error('Error al guardar la localización:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

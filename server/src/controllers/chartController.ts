import { Request, Response } from "express";
import { ChartData } from "../models/chart";

export const getChartData = async (req: Request, res: Response) => {
  try {
    const data = await ChartData.findAll();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error al obtener datos del gráfico:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const createChartData = async (req: Request, res: Response) => {
  try {
    const { month, sales, product, quantity, category, percentage } = req.body;

    const newData = await ChartData.create({
      month,
      sales,
      product,
      quantity,
      category,
      percentage,
    });

    res.status(201).json(newData);
  } catch (error) {
    console.error("Error al crear datos del gráfico:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

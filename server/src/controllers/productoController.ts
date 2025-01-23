import { Request, Response } from "express";
import { Producto } from "../models/producto";

export const getProducts = async (req: Request, res: Response) => {
  try {
    await Producto.sync();
    const listProducts = await Producto.findAll();
    res.json(listProducts);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    await Producto.sync();
    const { id } = req.params;
    const product = await Producto.findByPk(id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({
        msg: `No existe un producto con el id ${id}`,
      });
    }
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    await Producto.sync();
    const { id } = req.params;
    const product = await Producto.findByPk(id);

    if (!product) {
      res.status(404).json({
        msg: `No existe un producto con el id ${id}`,
      });
    } else {
      await product.destroy();
      res.json({
        msg: `El producto ${id} fue eliminado con éxito.`,
      });
    }
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const postProduct = async (req: Request, res: Response) => {
  try {
    await Producto.sync();
    const { body } = req;
    const product = await Producto.create(body);

    res.json({
      msg: `El producto fue agregado con éxito!`,
      product,
    });
  } catch (error) {
    console.error("Error al agregar el producto:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    await Producto.sync();
    const { body } = req;
    const { id } = req.params;

    const product = await Producto.findByPk(id);

    if (product) {
      await product.update(body);
      res.json({
        msg: "El producto fue actualizado con éxito!",
      });
    } else {
      res.status(404).json({
        msg: `No existe un producto con el id ${id}`,
      });
    }
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

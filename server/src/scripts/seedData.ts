import { models } from "../models";

const seedChartData = async () => {
  try {
    const data = [
      {
        month: "Enero",
        sales: 500,
        product: "Producto A",
        quantity: 120,
        category: "Electrónica",
        percentage: 40,
      },
      {
        month: "Febrero",
        sales: 650,
        product: "Producto B",
        quantity: 85,
        category: "Hogar",
        percentage: 30,
      },
      {
        month: "Marzo",
        sales: 440,
        product: "Producto C",
        quantity: 150,
        category: "Ropa",
        percentage: 20,
      },
      {
        month: "Abril",
        sales: 900,
        product: "Producto D",
        quantity: 199,
        category: "Limpieza",
        percentage: 10,
      },
    ];

    await models.ChartData.bulkCreate(data, { ignoreDuplicates: true });
    console.log("Datos de seed insertados en chart_data.");
  } catch (error) {
    console.error("Error al insertar datos de seed en chart_data:", error);
    throw error;
  }
};

export default seedChartData;

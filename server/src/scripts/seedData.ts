import ChartData from "../models/chart";

const seedChartData = async () => {
  try {
    console.log("Verificando y actualizando datos iniciales...");

    const initialData = [
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

    const existingData = await ChartData.findAll();

    for (const data of initialData) {
      const existingEntry = existingData.find(
        (item) => item.month === data.month
      );

      if (existingEntry) {
        const isDifferent =
          existingEntry.sales !== data.sales ||
          existingEntry.product !== data.product ||
          existingEntry.quantity !== data.quantity ||
          existingEntry.category !== data.category ||
          existingEntry.percentage !== data.percentage;

        if (isDifferent) {
          await existingEntry.update(data);
          console.log(`Datos del mes '${data.month}' actualizados.`);
        } else {
          console.log(`Datos del mes '${data.month}' ya están actualizados.`);
        }
      } else {
        await ChartData.create(data);
        console.log(`Datos del mes '${data.month}' insertados.`);
      }
    }
  } catch (error) {
    console.error("Error al poblar o actualizar datos iniciales:", error);
  }
};

export default seedChartData;

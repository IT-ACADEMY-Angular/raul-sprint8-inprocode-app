import { Injectable } from '@angular/core';

export interface Category {
  name: string;
  subcategories: string[];
}

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private categories: Category[] = [
    {
      name: 'Comida y Bebidas',
      subcategories: [
        'Restaurante',
        'Cafetería',
        'Bar',
        'Pastelería',
        'Comida rápida',
      ],
    },
    {
      name: 'Transporte y Estacionamiento',
      subcategories: [
        'Estación de servicio',
        'Estación de tren',
        'Aeropuerto',
        'Parada de autobús',
        'Estacionamiento',
      ],
    },
    {
      name: 'Compras',
      subcategories: [
        'Supermercado',
        'Centro comercial',
        'Tienda de ropa',
        'Tienda de electrónica',
        'Mercado',
      ],
    },
    {
      name: 'Salud',
      subcategories: [
        'Hospital',
        'Clínica',
        'Farmacia',
        'Dentista',
        'Gimnasio',
      ],
    },
    {
      name: 'Entretenimiento y Ocio',
      subcategories: [
        'Cine',
        'Teatro',
        'Museo',
        'Parques de diversiones',
        'Casino',
        'Discoteca',
      ],
    },
    {
      name: 'Educación',
      subcategories: ['Escuela', 'Universidad', 'Biblioteca'],
    },
    {
      name: 'Naturaleza y Recreación',
      subcategories: [
        'Parque',
        'Playa',
        'Ruta de senderismo',
        'Reserva natural',
      ],
    },
    {
      name: 'Religión',
      subcategories: ['Iglesia', 'Mezquita', 'Templo', 'Sinagoga'],
    },
    {
      name: 'Alojamiento',
      subcategories: ['Hotel', 'Hostal', 'Camping'],
    },
    {
      name: 'Servicios Públicos y Oficinas',
      subcategories: [
        'Oficina de correos',
        'Estación de policía',
        'Banco',
        'Oficina gubernamental',
      ],
    },
    {
      name: 'Atracciones Turísticas',
      subcategories: [
        'Monumento histórico',
        'Mirador',
        'Lugar emblemático',
        'Zona arqueológica',
      ],
    },
  ];

  constructor() {}

  getCategories(): Category[] {
    return this.categories;
  }
}

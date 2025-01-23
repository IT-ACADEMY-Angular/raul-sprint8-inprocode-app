import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import mapboxgl, {
  FullscreenControl,
  GeolocateControl,
  NavigationControl,
  ScaleControl,
} from 'mapbox-gl';
import { environment } from '../../../environments/environment';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Category, CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'map-component',
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent {
  tittle: string = 'MAPA';
  map!: mapboxgl.Map;
  markers: {
    marker: mapboxgl.Marker;
    category: string;
    subcategory: string;
  }[] = [];
  visibleCategories: Set<string> = new Set();
  categories: Category[] = [];

  selectedCategory: string | null = null;
  selectedSubcategory: string | null = null;
  siteName: string = '';
  isCategorySelectorOpen = false;
  clickedCoordinates: { lng: number; lat: number } | null = null;

  categoryCounts: { [key: string]: number } = {};

  private iconMapping: { [key: string]: string } = {
    'Comida y Bebidas': 'restaurant',
    'Transporte y Estacionamiento': 'car',
    Compras: 'shop',
    Salud: 'hospital',
    'Entretenimiento y Ocio': 'theatre',
    Educación: 'school',
    'Naturaleza y Recreación': 'park',
    Religión: 'religious-christian',
    Alojamiento: 'lodging',
    'Servicios Públicos y Oficinas': 'police',
    'Atracciones Turísticas': 'town-hall',
  };

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    (mapboxgl as any).accessToken = environment.mapboxToken;

    this.categories = this.categoriesService.getCategories();

    this.categories.forEach((category) => {
      this.visibleCategories.add(category.name);
      this.categoryCounts[category.name] = 0;
    });

    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [2.1734, 41.3851],
      zoom: 12,
    });

    this.addMapControls();

    this.map.on('click', (event) => this.onMapClick(event));
    this.loadLocations();

    this.map.on('load', () => {
      this.updateVisibleMarkers();
    });
  }

  addMapControls(): void {
    this.map.addControl(new NavigationControl(), 'top-right');

    this.map.addControl(
      new GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      }),
      'top-right'
    );

    this.map.addControl(new FullscreenControl(), 'top-right');

    this.map.addControl(
      new ScaleControl({
        maxWidth: 80,
        unit: 'metric',
      }),
      'bottom-left'
    );
  }

  areAllCategoriesSelected(): boolean {
    return this.visibleCategories.size === this.categories.length;
  }

  isIndeterminate(): boolean {
    return (
      this.visibleCategories.size > 0 &&
      this.visibleCategories.size < this.categories.length
    );
  }

  toggleSelectAll(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.categories.forEach((category) =>
        this.visibleCategories.add(category.name)
      );
    } else {
      this.visibleCategories.clear();
    }

    this.visibleCategories = new Set(this.visibleCategories);
    this.updateVisibleMarkers();
  }

  toggleCategoryFilter(category: string): void {
    if (this.visibleCategories.has(category)) {
      this.visibleCategories.delete(category);
    } else {
      this.visibleCategories.add(category);
    }

    this.visibleCategories = new Set(this.visibleCategories);
    this.updateVisibleMarkers();
  }

  updateVisibleMarkers(): void {
    if (this.visibleCategories.size === 0) {
      this.markers.forEach(({ marker }) => {
        marker.getElement().style.display = 'none';
      });
      return;
    }

    this.markers.forEach(({ marker, category }) => {
      const isVisible = this.visibleCategories.has(category);
      marker.getElement().style.display = isVisible ? 'block' : 'none';
    });
  }

  onMapClick(event: mapboxgl.MapMouseEvent): void {
    const target = event.originalEvent.target as HTMLElement;

    if (target.classList.contains('custom-marker')) {
      return;
    }

    const { lng, lat } = event.lngLat;
    this.clickedCoordinates = { lng, lat };
    this.openCategorySelector();
  }

  openCategorySelector(): void {
    this.isCategorySelectorOpen = true;
  }

  closeCategorySelector(): void {
    this.isCategorySelectorOpen = false;
    this.selectedCategory = null;
    this.selectedSubcategory = null;
    this.siteName = '';
  }

  getSubcategoriesForSelectedCategory(): string[] {
    const category = this.categories.find(
      (c) => c.name === this.selectedCategory
    );
    return category ? category.subcategories : [];
  }

  addMarker(form: any): void {
    if (!this.selectedCategory || !this.selectedSubcategory || !this.siteName) {
      alert(
        'Por favor, seleccione una categoría, una subcategoría y proporcione el nombre del sitio.'
      );
      return;
    }

    const { lng, lat } = this.clickedCoordinates!;
    const marker = new mapboxgl.Marker({
      element: this.createCustomMarker(this.selectedCategory),
    })
      .setLngLat([lng, lat])
      .setPopup(
        new mapboxgl.Popup().setHTML(
          `<strong>${this.siteName}</strong><br>${this.selectedCategory} - ${this.selectedSubcategory}`
        )
      )
      .addTo(this.map);

    this.markers.push({
      marker,
      category: this.selectedCategory,
      subcategory: this.selectedSubcategory,
    });

    this.saveLocation({
      lat,
      lng,
      category: this.selectedCategory,
      subcategory: this.selectedSubcategory,
      name: this.siteName,
    });

    if (this.categoryCounts[this.selectedCategory] !== undefined) {
      this.categoryCounts[this.selectedCategory]++;
    } else {
      this.categoryCounts[this.selectedCategory] = 1;
    }

    this.categoryCounts = { ...this.categoryCounts };

    this.cdr.detectChanges();

    if (!this.visibleCategories.has(this.selectedCategory)) {
      this.visibleCategories.add(this.selectedCategory);
      this.visibleCategories = new Set(this.visibleCategories);
    }

    this.updateVisibleMarkers();

    this.closeCategorySelector();
  }

  createCustomMarker(category: string): HTMLElement {
    const el = document.createElement('div');
    el.className = 'custom-marker';

    const iconName = this.iconMapping[category] || 'marker';

    el.style.backgroundImage = `url(https://raw.githubusercontent.com/mapbox/maki/main/icons/${iconName}.svg)`;
    el.style.backgroundSize = 'contain';
    el.style.width = '40px';
    el.style.height = '40px';

    el.style.cursor = 'pointer';

    return el;
  }

  saveLocation(location: {
    lat: number;
    lng: number;
    category: string;
    subcategory: string;
    name: string;
  }): void {
    const baseUrl = `${environment.endpoint}`.replace(/\/$/, '');
    this.http.post(`${baseUrl}/api/locations`, location).subscribe(
      (response) => {},
      (error) => {
        console.error('Error al guardar localización:', error);
      }
    );
  }

  loadLocations(): void {
    const baseUrl = `${environment.endpoint}`.replace(/\/$/, '');
    this.http
      .get<
        {
          lat: number;
          lng: number;
          category: string;
          subcategory: string;
          name: string;
        }[]
      >(`${baseUrl}/api/locations`)
      .subscribe((data) => {
        data.forEach((loc) => {
          const marker = new mapboxgl.Marker({
            element: this.createCustomMarker(loc.category),
          })
            .setLngLat([loc.lng, loc.lat])
            .setPopup(
              new mapboxgl.Popup().setHTML(
                `<strong>${loc.name}</strong><br>${loc.category} - ${loc.subcategory}`
              )
            )
            .addTo(this.map);

          this.markers.push({
            marker,
            category: loc.category,
            subcategory: loc.subcategory,
          });

          if (this.categoryCounts[loc.category] !== undefined) {
            this.categoryCounts[loc.category]++;
          } else {
            this.categoryCounts[loc.category] = 1;
          }
        });

        this.categoryCounts = { ...this.categoryCounts };

        this.cdr.detectChanges();

        this.updateVisibleMarkers();
      });
  }

  trackByCategoryName(index: number, category: any): string {
    return category.name;
  }
}

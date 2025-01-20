import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'map-component',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent {
  map!: mapboxgl.Map;
  markers: mapboxgl.Marker[] = [];
  locations: { lat: number; lng: number }[] = [];
  tittle: string = 'MAPA';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    (mapboxgl as any).accessToken = environment.mapboxToken;

    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-3.7038, 40.4168],
      zoom: 9,
    });

    this.map.on('click', (event) => {
      const { lng, lat } = event.lngLat;
      this.addMarker(lng, lat);
    });

    this.loadLocations();
  }

  addMarker(lng: number, lat: number): void {
    const marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(this.map);
    this.markers.push(marker);

    this.saveLocation({ lat, lng });
  }

  saveLocation(location: { lat: number; lng: number }): void {
    this.http.post(`${environment.endpoint}api/locations`, location).subscribe(
      () => console.log('Localización guardada con éxito'),
      (error) => console.error('Error al guardar localización:', error)
    );
  }

  loadLocations(): void {
    this.http
      .get<{ lat: number; lng: number }[]>(
        `${environment.endpoint}api/locations`
      )
      .subscribe(
        (data) => {
          this.locations = data;

          this.locations.forEach((loc) => {
            const marker = new mapboxgl.Marker()
              .setLngLat([loc.lng, loc.lat])
              .addTo(this.map);
            this.markers.push(marker);
          });
        },
        (error) => console.error('Error al cargar localizaciones:', error)
      );
  }
}
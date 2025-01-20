import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'; // Importa la configuración

@Component({
  selector: 'calendar-component',
  standalone: true,
  imports: [CommonModule, FullCalendarModule, HttpClientModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    editable: true,
    selectable: true,
    plugins: [interactionPlugin, dayGridPlugin],
    events: [],
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventContent: (eventInfo) => {
      const formattedTitle = this.capitalizeFirstLetter(eventInfo.event.title);
      return {
        html: `<div style="white-space:normal; word-wrap:break-word; text-align:center;"><b>${formattedTitle}</b></div>`,
      };
    },
    dayMaxEventRows: true,
    dayMaxEvents: 3,
  };

  backendUrl: string = environment.endpoint.replace(/\/$/, '');

  constructor(private http: HttpClient) {}

  capitalizeFirstLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  loadEvents() {
    this.http.get<any[]>(`${this.backendUrl}/api/events`).subscribe(
      (events) => {
        console.log('Eventos cargados del backend:', events);
        this.calendarOptions = {
          ...this.calendarOptions,
          events: events.map((event) => ({
            id: event.id.toString(),
            title: this.capitalizeFirstLetter(event.title),
            start: event.start,
          })),
        };
      },
      (error) => {
        console.error('Error al cargar los eventos:', error);
      }
    );
  }

  handleDateClick(info: any) {
    const title = prompt('Ingrese el título del evento:');
    if (title) {
      const formattedTitle = this.capitalizeFirstLetter(title);
      this.http
        .post(`${this.backendUrl}/api/events`, {
          title: formattedTitle,
          start: info.dateStr,
        })
        .subscribe(
          (newEvent: any) => {
            console.log('Evento recibido del backend:', newEvent);
            const addedEvent = {
              id: newEvent.id.toString(),
              title: this.capitalizeFirstLetter(newEvent.title),
              start: newEvent.start,
            };
            this.calendarOptions = {
              ...this.calendarOptions,
              events: [...(this.calendarOptions.events as any[]), addedEvent],
            };
          },
          (error) => {
            console.error('Error al agregar el evento:', error);
          }
        );
    }
  }

  handleEventClick(info: any) {
    if (confirm('¿Desea eliminar este evento?')) {
      this.http
        .delete<{ message: string }>(
          `${this.backendUrl}/api/events/${info.event.id}`
        )
        .subscribe(
          (response) => {
            console.log(response.message);
            this.calendarOptions = {
              ...this.calendarOptions,
              events: (this.calendarOptions.events as any[]).filter(
                (event) => event.id !== info.event.id
              ),
            };
          },
          (error) => {
            console.error('Error al eliminar el evento:', error);
          }
        );
    }
  }

  ngOnInit() {
    console.log('Backend URL configurada:', this.backendUrl);
    this.loadEvents();
  }
}

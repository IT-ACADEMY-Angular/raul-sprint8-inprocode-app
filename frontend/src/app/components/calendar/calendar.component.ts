import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'calendar-component',
  standalone: true,
  imports: [CommonModule, FullCalendarModule, HttpClientModule, FormsModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  tittle: string = 'CALENDAR';

  @ViewChild('editEventModal') editEventModal!: TemplateRef<any>;
  @ViewChild('deleteConfirmModal') deleteConfirmModal!: TemplateRef<any>;
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    editable: true,
    selectable: true,
    plugins: [interactionPlugin, dayGridPlugin],
    events: [],

    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventDrop: this.handleEventDrop.bind(this),
    eventResize: this.handleEventResize.bind(this),
    eventContent: (eventInfo) => {
      const formattedTitle = this.capitalizeFirstLetter(eventInfo.event.title);
      return {
        html: `<div style="white-space:normal; word-wrap:break-word; text-align:center; color: #46176d;"><b>${formattedTitle}</b></div>`,
      };
    },
    firstDay: 1,
    dayMaxEventRows: true,
    dayMaxEvents: 9,
  };

  backendUrl: string = environment.endpoint.replace(/\/$/, '');

  editableEventId: string | null = null;
  editableEventTitle: string = '';
  editableEventDate: string = '';

  constructor(private http: HttpClient, private modalService: NgbModal) {}

  ngOnInit() {
    this.loadEvents();
  }

  capitalizeFirstLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  loadEvents() {
    this.http.get<any[]>(`${this.backendUrl}/api/events`).subscribe(
      (events) => {
        this.calendarOptions = {
          ...this.calendarOptions,
          events: events.map((event) => ({
            id: event.id.toString(),
            title: this.capitalizeFirstLetter(event.title),
            start: event.start,
            allDay: event.allDay || true,
            end: event.end || null,
          })),
        };
      },
      (error) => {
        console.error('Error al cargar los eventos:', error);
      }
    );
  }

  handleDateClick(info: any) {
    const title = prompt(
      'Ingrese el título del evento (máximo 20 caracteres):'
    );
    if (title) {
      if (title.length > 20) {
        alert('El título del evento no puede exceder los 20 caracteres.');
        return;
      }
      const formattedTitle = this.capitalizeFirstLetter(title);
      this.http
        .post(`${this.backendUrl}/api/events`, {
          title: formattedTitle,
          start: info.dateStr,
        })
        .subscribe(
          (newEvent: any) => {
            const addedEvent = {
              id: newEvent.id.toString(),
              title: this.capitalizeFirstLetter(newEvent.title),
              start: newEvent.start,
              allDay: true,
            };

            const calendarApi = this.calendarComponent.getApi();
            calendarApi.addEvent(addedEvent);
          },
          (error) => {
            console.error('Error al agregar el evento:', error);
          }
        );
    }
  }

  handleEventClick(info: any) {
    this.editableEventId = info.event.id;
    this.editableEventTitle = info.event.title;

    const startDate = new Date(info.event.start);
    const year = startDate.getFullYear();
    const month = ('0' + (startDate.getMonth() + 1)).slice(-2);
    const day = ('0' + startDate.getDate()).slice(-2);
    this.editableEventDate = `${year}-${month}-${day}`;
    this.openEditModal();
  }

  handleEventDrop(info: any) {
    const updatedStart = info.event.start.toISOString();

    this.http
      .put(`${this.backendUrl}/api/events/${info.event.id}`, {
        start: updatedStart,
        allDay: true,
        end: null,
      })
      .subscribe(
        (updatedEvent: any) => {
          const calendarApi = this.calendarComponent.getApi();
          const event = calendarApi.getEventById(this.editableEventId!);
          if (event) {
            event.setStart(updatedEvent.start);
            event.setAllDay(updatedEvent.allDay);
            if (updatedEvent.end) {
              event.setEnd(updatedEvent.end);
            } else {
              event.setEnd(null);
            }
            event.setProp('title', event.title);
          }
        },
        (error) => {
          console.error('Error al actualizar la fecha del evento:', error);
          info.revert();
        }
      );
  }

  handleEventResize(info: any) {}

  openEditModal() {
    this.modalService.open(this.editEventModal, {
      ariaLabelledBy: 'editEventModalLabel',
    });
  }

  closeModals() {
    this.modalService.dismissAll();
    this.editableEventId = null;
    this.editableEventTitle = '';
    this.editableEventDate = '';
  }

  submitEditEvent() {
    if (this.editableEventId) {
      const updatedTitle = this.editableEventTitle.trim();
      const updatedStart = this.editableEventDate;

      if (updatedTitle.length === 0) {
        alert('El título del evento no puede estar vacío.');
        return;
      }

      this.http
        .put(`${this.backendUrl}/api/events/${this.editableEventId}`, {
          title: this.capitalizeFirstLetter(updatedTitle),
          start: updatedStart,
          allDay: true,
          end: null,
        })
        .subscribe(
          (updatedEvent: any) => {
            const calendarApi = this.calendarComponent.getApi();
            const event = calendarApi.getEventById(this.editableEventId!);
            if (event) {
              event.setProp(
                'title',
                this.capitalizeFirstLetter(updatedEvent.title)
              );
              event.setStart(updatedEvent.start);
              event.setAllDay(updatedEvent.allDay);
              event.setEnd(updatedEvent.end);
            }
            this.closeModals();
          },
          (error) => {
            console.error('Error al actualizar el evento:', error);
            alert(
              'Hubo un error al actualizar el evento. Por favor, inténtalo de nuevo.'
            );
          }
        );
    }
  }

  openDeleteConfirmModal() {
    this.modalService.open(this.deleteConfirmModal, {
      ariaLabelledBy: 'deleteConfirmModalLabel',
      windowClass: 'modal-position-lower',
    });
  }

  confirmDeleteEvent() {
    if (this.editableEventId) {
      this.http
        .delete(`${this.backendUrl}/api/events/${this.editableEventId}`)
        .subscribe(
          (response: any) => {
            const calendarApi = this.calendarComponent.getApi();
            const event = calendarApi.getEventById(this.editableEventId!);
            if (event) {
              event.remove();
            }
            this.closeModals();
          },
          (error) => {
            console.error('Error al eliminar el evento:', error);
            alert(
              'Hubo un error al eliminar el evento. Por favor, inténtalo de nuevo.'
            );
          }
        );
    }
  }
}

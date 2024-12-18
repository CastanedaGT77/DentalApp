import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectionStrategy } from '@angular/core';
import { endOfDay, isSameDay, isSameMonth, startOfDay } from 'date-fns';
import { Subject } from 'rxjs';
import { CalendarEvent, CalendarView, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { DateService } from '../date.service';
import { CitaModel } from '../models/CitaExample';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentDetailsDialog } from '../view-date/view-date.component';

const colors: Record<string, any> = {
  red: {
    primary: '#FF5252',
    secondary: '#FFCDD2',
  },
  blue: {
    primary: '#2196F3',
    secondary: '#BBDEFB',
  },
  green: {
    primary: '#4CAF50',
    secondary: '#C8E6C9',
  },
  yellow: {
    primary: '#FFC107',
    secondary: '#FFECB3',
  },
};

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe]
})
export class CalendarComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  locale: string = 'es';  // Configurar la localización a español
  viewDate: Date = new Date();
  modalData?: {
    action: string;
    event: CalendarEvent;
  };
  refresh = new Subject<void>();
  events: CalendarEvent[] = [];
  activeDayIsOpen: boolean = true;
  appointments: CitaModel[] = [];

  constructor(
    private readonly dateService: DateService,
    private readonly _router: Router,
    private readonly datePipe: DatePipe,
    public dialog: MatDialog
  ) {}

  async ngOnInit() {
    try {
      this.appointments = await this.dateService.getAppointment();
      console.log('dates', this.appointments);
      await this.createCalendarEvents();
    } catch (error) {
      console.error('Error al obtener citas:', error);
    }
  }

  redirectCreate() {
    this._router.navigateByUrl('/date/create');
  }

  async createCalendarEvents() {
    let tempEvents: CalendarEvent[] = [];
    this.appointments.forEach(a => {
      try {
        if (!a.appointmentDate || !a.startHour || !a.endHour) {
          throw new Error('Missing appointment date or time');
        }

        // Usar appointmentDate directamente
        const appointmentStart = new Date(`${a.appointmentDate.split('T')[0]}T${a.startHour}:00Z`);
        const appointmentEnd = new Date(`${a.appointmentDate.split('T')[0]}T${a.endHour}:00Z`);

        console.log('Parsed Event Times:', appointmentStart, appointmentEnd);

        // Asignar color según el estado
        let eventColor;
        switch (a.status) {
          case 0: // Pendiente
            eventColor = colors['blue'];
            break;
          case 1: // Finalizada
            eventColor = colors['green'];
            break;
          case 2: // Cancelada
            eventColor = colors['red'];
            break;
          case 3: // No asistió
            eventColor = colors['yellow'];
            break;
          default:
            eventColor = colors['blue']; // Color por defecto
        }

        tempEvents.push({
          id: a.id,
          start: appointmentStart,
          end: appointmentEnd,
          title: `${a.patientId.firstName + ' ' + a.patientId.lastName} - ${a.reason}`,
          color: eventColor,
          meta: a // Almacenar el objeto de la cita completa en la propiedad meta
        });
      } catch (error) {
        console.error('Error parsing date for appointment:', a, error);
      }
    });

    this.events = this.ensureNoOverlap(tempEvents);
    this.refresh.next();
  }

  ensureNoOverlap(events: CalendarEvent[]): CalendarEvent[] {
    // Sort events by start time
    events.sort((a, b) => a.start.getTime() - b.start.getTime());

    for (let i = 0; i < events.length - 1; i++) {
      const currentEvent = events[i];
      const nextEvent = events[i + 1];
      if (currentEvent.end && nextEvent.start && currentEvent.end > nextEvent.start) {
        // Adjust next event start and end to ensure no overlap
        nextEvent.start = new Date(currentEvent.end.getTime());
        if (nextEvent.end) {
          nextEvent.end = new Date(nextEvent.start.getTime() + (nextEvent.end.getTime() - nextEvent.start.getTime()));
        }
      }
    }

    return events;
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    if (action === 'Clicked') {
      // Abrir modal donde muestre información de la cita
      this.modalData = { event, action };
      this.openAppointmentDetails(event.meta);
    }
  }

  openAppointmentDetails(appointment: CitaModel): void {
    this.dialog.open(AppointmentDetailsDialog, {
      width: '600px',
      data: appointment
    });
    console.log('data cita', appointment);
  }

  openNewAppointmentModal() {
    // Abrir modal para cita y obtener respuesta de modal
    // Llamar a servicio para agregar en bd y en componente
    this.addAppointment();
  }

  private addAppointment(): void {
    // Servicio para agregar en bd, validar que respuesta es correcta para agregar a componente
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors['red'],
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent): void {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView): void {
    this.view = view;
  }

  closeOpenMonthViewDay(): void {
    this.activeDayIsOpen = false;
  }
}

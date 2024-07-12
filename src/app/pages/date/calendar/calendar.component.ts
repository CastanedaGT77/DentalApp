import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectionStrategy } from '@angular/core';
import { startOfDay, endOfDay, isSameDay, isSameMonth, addMinutes } from 'date-fns';
import { Subject } from 'rxjs';
import { CalendarEvent, CalendarView, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { DateService } from '../date.service';
import { CitaModel } from '../models/CitaExample';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

const colors: Record<string, any> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
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
    private readonly datePipe: DatePipe
  ) {}

  async ngOnInit() {
    this.appointments = await this.dateService.getAppointment();
    await this.createCalendarEvents();
  }

  redirectCreate() {
    this._router.navigateByUrl("/date/create");
  }

  async createCalendarEvents() {
    let tempEvents: CalendarEvent[] = [];
    this.appointments.forEach(a => {
      try {
        const appointmentDate = this.parseDate(a.appointmentDate, a.hour);
        tempEvents.push({
          id: a.id,
          start: appointmentDate,
          end: addMinutes(appointmentDate, 30), // Duración de 30 minutos
          title: `${a.patient} - ${a.description}`,
          color: { ...colors['red'] }
        });
      } catch (error) {
        console.error('Error parsing date for appointment:', a, error);
      }
    });
    this.events = tempEvents;
    this.refresh.next();
  }

  parseDate(dateString: string, hourString: string): Date {
    const [day, month, year] = dateString.split('/').map(part => parseInt(part, 10));
    const [hour, minute] = hourString.split(':').map(part => parseInt(part, 10));
    return new Date(year, month - 1, day, hour, minute);
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
    if (action === "Clicked") {
      // Abrir modal donde muestre información de la cita y también los botones para poder editar y eliminar
      this.modalData = { event, action };
      alert(JSON.stringify(event));
    }
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

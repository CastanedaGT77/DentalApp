import {
    Component,
    ChangeDetectionStrategy,
    ViewChild,
    TemplateRef,
    OnInit,
  } from '@angular/core';
  import {
    startOfDay,
    endOfDay,
    subDays,
    addDays,
    endOfMonth,
    isSameDay,
    isSameMonth,
    addHours,
  } from 'date-fns';
  import { Subject } from 'rxjs';
  import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
  import {
    CalendarEvent,
    CalendarEventAction,
    CalendarEventTimesChangedEvent,
    CalendarView,
  } from 'angular-calendar';
  import { EventColor } from 'calendar-utils';
import { DateService } from '../date.service';
import { CitaModel } from '../models/CitaExample';
import { Pipe, PipeTransform } from '@angular/core';

  
  const colors: Record<string, EventColor> = {
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
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [
      `
        h3 {
          margin: 0 0 10px;
        }
  
        pre {
          background-color: #f5f5f5;
          padding: 15px;
        }
      `,
    ],
    templateUrl: './calendar.component.html',
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
    events: CalendarEvent[];
    activeDayIsOpen: boolean = true;
    // Appointments
    appointments: CitaModel[];


    constructor(
      private readonly dateService: DateService
    ) {
    }
  
    async ngOnInit() {
      this.appointments = await this.dateService.getAppointment();
      await this.createCalendarEvents();
    }

    async createCalendarEvents(){
      let tempEvents: CalendarEvent[] = [];
      this.appointments.forEach(a => {
        try {
          tempEvents.push({
            id: a.id,
            start: new Date(),
            end: new Date(),
            title: `${a.patient} - ${a.description}`,
            color: { ...colors['red'] }
          });
        } catch(error){}
      });
      this.events = tempEvents;
      this.refresh.next();
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
  
    eventTimesChanged({
      event,
      newStart,
      newEnd,
    }: CalendarEventTimesChangedEvent): void {
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
      if(action === "Clicked"){
        // Abrir modal donde muestre información de la cita y también los botones para poder editar y eliminar
        this.modalData = { event, action };
        alert(JSON.stringify(event));
      }
    }
  
    openNewAppointmentModal(){
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
  
    // Método para obtener un color seguro
    getColor(event: CalendarEvent): EventColor {
      return event.color || { primary: '#000000', secondary: '#FFFFFF' }; // Colores por defecto
    }
  
    // Método para actualizar el color secundario de un evento
    updateSecondaryColor(event: CalendarEvent, color: string): void {
      if (!event.color) {
        event.color = { primary: '#000000', secondary: '#FFFFFF' };
      }
      event.color.secondaryText = color;
      this.refresh.next();
    }
    
  }
  
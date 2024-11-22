import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/pages/authentication/authentication.service';
import { DateService } from 'src/app/pages/date/date.service'; // Servicio para obtener citas
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [DatePipe], // Proveedor del DatePipe para uso en el componente
})
export class HeaderComponent implements OnInit {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  showFiller = false;
  userName = localStorage.getItem('name');
  notifications: any[] = []; // Lista de notificaciones de citas
  hasNotifications: boolean = false; // Indicador de notificaciones

  constructor(
    public dialog: MatDialog,
    private authService: AuthenticationService,
    private dateService: DateService,
    private router: Router,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.loadNotifications();
  }

  async loadNotifications() {
    try {
      const today = new Date();
      const startOfWeek = new Date(
        today.setDate(today.getDate() - today.getDay())
      );
      const endOfWeek = new Date(
        today.setDate(today.getDate() + (6 - today.getDay()))
      );

      const citas = await this.dateService.getAppointment();
      this.notifications = citas.filter((cita: any) => {
        const appointmentDate = new Date(cita.appointmentDate);
        return (
          appointmentDate >= startOfWeek && appointmentDate <= endOfWeek
        );
      });

      this.hasNotifications = this.notifications.length > 0;
    } catch (error) {
      console.error('Error al cargar notificaciones:', error);
    }
  }

  getFormattedDate(date: string): string {
    // Ajustar la fecha para corregir la zona horaria
    const adjustedDate = new Date(date);
    adjustedDate.setMinutes(adjustedDate.getMinutes() + adjustedDate.getTimezoneOffset());
    return this.datePipe.transform(adjustedDate, 'dd/MM/yyyy') || '';
  }

  getStatusColor(status: number): { [key: string]: boolean } {
    return {
      'bg-blue-500': status === 0, // Pendiente
      'bg-green-500': status === 1, // Finalizada
      'bg-red-500': status === 2, // Cancelada
      'bg-gray-500': status === 3, // No asistió
    };
  }
  
  logout() {
    this.authService.logout();
    this.router.navigate(['/authentication/login']);
  }
}

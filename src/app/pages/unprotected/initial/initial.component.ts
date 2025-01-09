import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { InitialService } from './initial.service';
import { ScheduleAppointmentModalComponent } from '../new-appointment/schedule-appointment-modal.component';

interface Appointment {
  codCita: string;
  fecha: string;
  hora: string;
}

interface News {
  title: string;
  description: string;
  date: string;
  image: string;
}

@Component({
  selector: 'app-initial',
  templateUrl: './initial.component.html',
})
export class InitialComponent implements OnInit {
  userForm: FormGroup;
  dataSource = new MatTableDataSource<Appointment>([]);
  appointments: Appointment[] = [];
  errorMessage: string = '';
  successMessage: string = '';
  valid: boolean = false;

  dummyData: { [key: string]: Appointment[] } = {
    USR001: [
      { codCita: 'CITA001', fecha: '2024-12-11', hora: '10:00 AM' },
      { codCita: 'CITA002', fecha: '2024-12-12', hora: '11:30 AM' },
    ],
  };

  displayedColumns: string[] = ['codCita', 'fecha', 'hora'];

  // Noticias desde el backend
  newsData: News[] = [];
  currentIndex: number = 0; // Índice actual del carrusel

  // Propiedades de la compañía
  companyProperties: any = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private initialService: InitialService // Servicio para obtener las noticias y propiedades
  ) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userCode: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadNews(); // Cargar noticias desde el backend
    this.loadCompanyProperties(); // Cargar propiedades de la compañía
  }

  // Cargar noticias desde el backend
  async loadNews(): Promise<void> {
    try {
      const response = await this.initialService.getNews();
      if (response && response.code === 200 && response.data.length > 0) {
        this.newsData = response.data.map((news: any) => ({
          title: news.title,
          description: news.description,
          date: news.created_at, // Usamos `created_at` para la fecha
          image: news.image, // Asumimos que `image` es Base64 o una URL válida
        }));
      } else {
        console.error('No se encontraron noticias.');
      }
    } catch (error) {
      console.error('Error al cargar las noticias:', error);
    }
  }

  // Cargar propiedades de la compañía
  async loadCompanyProperties(): Promise<void> {
    try {
      const response = await this.initialService.getCompanyProperties();
      if (response && response.code === 200) {
        this.companyProperties = response.data.data;
      } else {
        console.error('No se encontraron propiedades de la compañía.');
      }
    } catch (error) {
      console.error('Error al cargar las propiedades de la compañía:', error);
    }
  }

  // Funciones para el carrusel
  nextSlide(): void {
    if (this.currentIndex < this.newsData.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0; // Regresar al inicio
    }
  }

  prevSlide(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.newsData.length - 1; // Ir al último slide
    }
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
  }

  onLoadUserAppointments(): void {
    if (this.userForm.invalid) {
      this.errorMessage = 'Todos los campos son obligatorios.';
      this.successMessage = '';
      this.valid = false;
      this.appointments = [];
      this.dataSource.data = [];
      return;
    }

    const { userCode } = this.userForm.value;

    if (userCode in this.dummyData) {
      this.appointments = this.dummyData[userCode];
      this.dataSource.data = this.appointments;
      this.valid = true;
      this.successMessage = 'Citas cargadas correctamente.';
      this.errorMessage = '';
    } else {
      this.errorMessage = 'No se encontraron citas para el código ingresado.';
      this.successMessage = '';
      this.valid = false;
      this.appointments = [];
      this.dataSource.data = [];
    }
  }

  onScheduleAppointment(): void {
    const dialogRef = this.dialog.open(ScheduleAppointmentModalComponent, {
      width: '500px',
      data: { userCode: 'USR001' }, // Pasar el código del usuario
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        console.log('Cita creada exitosamente');
      } else {
        console.log('El usuario canceló la acción');
      }
    });
  }
}

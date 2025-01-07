import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ScheduleAppointmentModalComponent } from '../new-appointment/schedule-appointment-modal.component';
import { MatDialog } from '@angular/material/dialog';

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

  newsData: News[] = [
    {
      title: 'Nueva Clínica Inaugurada',
      description: 'Apertura de nuestra nueva clínica en el centro de la ciudad.',
      date: '2024-12-10',
      image: './assets/images/products/s5.jpg',
    },
    {
      title: 'Promoción Especial',
      description: 'Consulta gratuita durante diciembre.',
      date: '2024-12-05',
      image: './assets/images/products/s7.jpg',
    },
    {
      title: 'Nuevo Horario',
      description: 'Extendimos el horario de atención los fines de semana.',
      date: '2024-12-01',
      image: './assets/images/products/s4.jpg',
    },
  ];
  currentIndex: number = 0; // Índice actual del carrusel

  // Funciones para el carrusel
  nextSlide() {
    if (this.currentIndex < this.newsData.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0; // Regresar al inicio
    }
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.newsData.length - 1; // Ir al último slide
    }
  }

  goToSlide(index: number) {
    this.currentIndex = index;
  }

  constructor(private fb: FormBuilder, private router: Router,  private dialog: MatDialog,) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userCode: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

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

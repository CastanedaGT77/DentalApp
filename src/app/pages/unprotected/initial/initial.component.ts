import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

interface Appointment {
  codCita: string;
  fecha: string;
  hora: string;
  doctor: string;
}

interface News {
  title: string;
  description: string;
  date: string;
  image: string;
}

@Component({
  selector: 'initial-test',
  templateUrl: './initial.component.html',
})
export class InitialComponent implements OnInit, AfterViewInit {
  userForm: FormGroup;
  dataSource = new MatTableDataSource<Appointment>([]);
  errorMessage: string = '';
  appointments: Appointment[] = [];

  dummyData: { [key: string]: Appointment[] } = {
    USR001: [
      { codCita: 'CITA001', fecha: '2024-12-11', hora: '10:00 AM', doctor: 'Dr. Pérez' },
      { codCita: 'CITA002', fecha: '2024-12-12', hora: '11:30 AM', doctor: 'Dr. Martínez' },
    ],
  };

  displayedColumns: string[] = ['codCita', 'fecha', 'hora', 'doctor'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Noticias
  newsData: News[] = [
    {
      title: 'Nueva Clínica Inaugurada',
      description: 'Apertura de nuestra nueva clínica en el centro de la ciudad.',
      date: '2024-12-10',
      image: 'https://via.placeholder.com/400x200.png?text=Nueva+Clinica',
    },
    {
      title: 'Promoción Especial',
      description: 'Consulta gratuita durante diciembre.',
      date: '2024-12-05',
      image: 'https://via.placeholder.com/400x200.png?text=Promocion+Especial',
    },
    {
      title: 'Nuevo Horario',
      description: 'Extendimos el horario de atención los fines de semana.',
      date: '2024-12-01',
      image: 'https://via.placeholder.com/400x200.png?text=Nuevo+Horario',
    },
  ];

  paginatedNews: News[] = [];
  pageSize = 3;
  pageIndex = 0;

  constructor(private fb: FormBuilder, private router: Router) {
    this.userForm = this.fb.group({
      userCode: [''],
    });
  }

  ngOnInit(): void {
    this.loadPaginatedNews();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  onLoadUserAppointments(): void {
    const userCode = this.userForm.get('userCode')?.value;
    this.errorMessage = '';

    if (userCode && this.dummyData[userCode]) {
      this.appointments = this.dummyData[userCode];
      this.dataSource.data = this.appointments;
    } else {
      this.errorMessage = 'No se encontraron citas para el código ingresado.';
      this.appointments = [];
      this.dataSource.data = [];
    }
  }

  applyGlobalFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  redirectToLogin(): void {
    this.router.navigate(['/authentication/login']);
  }

  loadPaginatedNews(): void {
    const startIndex = this.pageIndex * this.pageSize;
    this.paginatedNews = this.newsData.slice(startIndex, startIndex + this.pageSize);
  }

  onNewsPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadPaginatedNews();
  }
}

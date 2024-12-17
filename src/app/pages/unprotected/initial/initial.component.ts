import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

interface Appointment {
  codCita: string;
  fecha: string;
  hora: string;
  doctor: string;
}

@Component({
  selector: 'initial-test',
  templateUrl: './initial.component.html',
})
export class InitialComponent implements OnInit, AfterViewInit {
  userForm: FormGroup; // Formulario para el código de usuario
  dataSource = new MatTableDataSource<Appointment>([]); // Fuente de datos para la tabla
  errorMessage: string = '';
  appointments: Appointment[] = [];

  dummyData: { [key: string]: Appointment[] } = {
    USR001: [
      { codCita: 'CITA001', fecha: '2024-12-11', hora: '10:00 AM', doctor: 'Dr. Pérez' },
      { codCita: 'CITA002', fecha: '2024-12-12', hora: '11:30 AM', doctor: 'Dr. Martínez' },
    ],
    USR002: [
      { codCita: 'CITA003', fecha: '2024-12-13', hora: '01:00 PM', doctor: 'Dr. Rodríguez' },
    ],
  };

  displayedColumns: string[] = ['codCita', 'fecha', 'hora', 'doctor'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private fb: FormBuilder, private router: Router) {
    this.userForm = this.fb.group({
      userCode: [''],
    });
  }

  ngOnInit(): void {}

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
    this.router.navigate(['/login']);
  }
}

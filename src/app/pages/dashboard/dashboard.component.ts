import { Component, OnInit } from '@angular/core';
import { ChartType } from 'ng-apexcharts';
import { DashboardService } from './dashboard.service';

interface DashboardData {
  active: number;
  inactive: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class AppDashboardComponent implements OnInit {
  usersData: DashboardData = { active: 0, inactive: 0 };
  patientsData: DashboardData = { active: 0, inactive: 0 };
  branchsData: DashboardData = { active: 0, inactive: 0 };

  public usersChartOptions: any;
  public patientsChartOptions: any;
  public branchsChartOptions: any;

  constructor(private dashboardService: DashboardService) {}

  async ngOnInit() {
    // Obtener los datos de los endpoints
    this.usersData = await this.dashboardService.getUsers() || { active: 0, inactive: 0 };
    this.patientsData = await this.dashboardService.getPatients() || { active: 0, inactive: 0 };
    this.branchsData = await this.dashboardService.getBranchs() || { active: 0, inactive: 0 };

    console.log('datos users', this.usersData);
    console.log('datos patients', this.patientsData);
    console.log('datos branches', this.branchsData);

    // Configuración del gráfico para usuarios
    this.usersChartOptions = {
      series: [this.usersData.active, this.usersData.inactive],
      chart: { type: 'pie' as ChartType, height: 200 },
      labels: ['Active', 'Inactive'],
      colors: ['#4caf50', '#f44336'],
      legend: { position: 'bottom' as 'bottom' | 'top' | 'right' | 'left' },
    };

    // Configuración del gráfico para pacientes
    this.patientsChartOptions = {
      series: [this.patientsData.active, this.patientsData.inactive],
      chart: { type: 'pie' as ChartType, height: 200 },
      labels: ['Active', 'Inactive'],
      colors: ['#2196f3', '#ff5722'],
      legend: { position: 'bottom' as 'bottom' | 'top' | 'right' | 'left' },
    };

    // Configuración del gráfico para sucursales
    this.branchsChartOptions = {
      series: [this.branchsData.active, this.branchsData.inactive],
      chart: { type: 'pie' as ChartType, height: 200 },
      labels: ['Active', 'Inactive'],
      colors: ['#3f51b5', '#ff9800'],
      legend: { position: 'bottom' as 'bottom' | 'top' | 'right' | 'left' },
    };
  }
}

import {
  Component,
  OnInit,
  ViewChildren,
  QueryList,
  ChangeDetectorRef,
} from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'chart-component',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
  standalone: true,
  imports: [CommonModule, NgChartsModule],
})
export class ChartComponent implements OnInit {
  @ViewChildren(BaseChartDirective) charts?: QueryList<BaseChartDirective>;
  tittle: string = 'GRÁFICAS DE VENTAS';

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Ventas Mensuales',
        borderColor: '#42A5F5',
        backgroundColor: 'rgba(66, 165, 245, 0.4)',
      },
    ],
  };

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      { data: [], label: 'Productos Vendidos', backgroundColor: '#FF6384' },
    ],
  };

  public pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#45b39d'],
      },
    ],
  };

  public radarChartData: ChartConfiguration<'radar'>['data'] = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
    datasets: [
      {
        data: [65, 59, 90, 81, 56],
        label: 'Desempeño A',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
      },
      {
        data: [28, 48, 40, 19, 96],
        label: 'Desempeño B',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
      },
    ],
  };

  public chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  private dataLoaded = false;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.http
      .get<any[]>(
        `${environment.endpoint}/api/charts`.replace(/([^:]\/)\/+/g, '$1')
      )
      .subscribe(
        (data) => {
          if (data && Array.isArray(data)) {
            this.lineChartData.labels = data.map((item) => item.month);
            this.lineChartData.datasets[0].data = data.map(
              (item) => item.sales
            );

            this.barChartData.labels = data.map((item) => item.product);
            this.barChartData.datasets[0].data = data.map(
              (item) => item.quantity
            );

            this.pieChartData.labels = data.map((item) => item.category);
            this.pieChartData.datasets[0].data = data.map(
              (item) => item.percentage
            );

            console.log('Datos cargados:', data);

            this.dataLoaded = true;

            this.updateCharts();
            this.cdr.detectChanges();
          } else {
            console.error('Datos del backend no válidos:', data);
          }
        },
        (error) => {
          console.error('Error al cargar datos del gráfico:', error);
        }
      );
  }

  private updateCharts(): void {
    setTimeout(() => {
      if (this.charts) {
        this.charts.forEach((chart) => {
          chart.update();
          chart.chart?.resize();
        });
      }
    }, 100);
  }
}

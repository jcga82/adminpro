import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-grafico-mensual',
  templateUrl: './grafico-mensual.component.html',
  styleUrls: []
})
export class GraficoMensualComponent implements OnInit {

  @Input() titulo: string = "Sin titulo";
  @Input() label: string = "Sin label";
  @Input() data: any = [];

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    title: {
      text: ""
    },
    credits: {
      enabled: false
    },
    xAxis: {
      categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    },
    yAxis: [
      {
        labels: {
          format: '{value:,.0f}'
        },  
        title: {
          text: 'Consumo kWh'
        }
      },
      {
        labels: {
          format: '{value:,.0f}'
        },  
        title: {
          text: 'kWh/m2'
        },
        opposite: true
      }
    ],
    legend: {
      enabled: false
    }
  };

  constructor() { }

  ngOnInit(): void {
    // console.log(this.data);
    this.chartOptions.series = [
      {
        name: 'Consumo',
        color: '#FF6600',
        pointWidth: 25,
        data: [
          this.data["1"].total, 
          this.data["2"].total,
          this.data["3"].total, 
          this.data["4"].total,
          this.data["5"].total, 
          this.data["6"].total,
          this.data["7"].total, 
          this.data["8"].total,
          this.data["9"].total, 
          this.data["10"].total,
          this.data["11"].total, 
          this.data["12"].total,
        ],
        type: 'column',
      },
      {
        name: 'kWh/m2',
        color: '#0000ff',
        pointWidth: 15,
        data: [
          this.data["1"].total_m2, 
          this.data["2"].total_m2,
          this.data["3"].total_m2, 
          this.data["4"].total_m2,
          this.data["5"].total_m2, 
          this.data["6"].total_m2,
          this.data["7"].total_m2, 
          this.data["8"].total_m2,
          this.data["9"].total_m2, 
          this.data["10"].total_m2,
          this.data["11"].total_m2, 
          this.data["12"].total_m2,
        ],
        yAxis: 1,
        type: 'line'
      }
  ];
  
  }

}

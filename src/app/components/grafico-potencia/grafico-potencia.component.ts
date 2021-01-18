import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-grafico-potencia',
  templateUrl: './grafico-potencia.component.html',
  styleUrls: []
})
export class GraficoPotenciaComponent implements OnInit {

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
      type: 'datetime',
      title: {
        text: "Fecha"
      },
      minTickInterval: 3600*24*30*1000,//time in milliseconds
    minRange: 3600*24*30*1000,
    ordinal: false, //this sets the fixed time formats   
      // tickPositions: []
      // startOnTick: false,
      // endOnTick: false,
      // showLastLabel: true,
      // showFirstLabel: true,
      labels: {
        formatter: function() {
          return Highcharts.dateFormat('%e-%m-%y',this.value);
        }
      },
    },
    yAxis: {
      endOnTick: false,
      startOnTick: false,
      labels: {
        format: '{value:,.0f}'
      },  
      title: {
        text: 'Potencia W'
      },
      tickPositions: [0]
    },
    legend: {
      enabled: false
    }
  };

  constructor() { }

  ngOnInit(): void {
    const datos: any = [];
    const potencias: any = [];
    if (this.data) {
      console.log('Hay datos de potnecia:', this.data);
      this.data.forEach((element: any) => {
        datos.push([element.timestamp, element.value4])
        potencias.push([element.timestamp, element.value1])
      });
      console.log(datos);
      this.chartOptions.series = [
        {
          name: 'Potencia',
          color: '#FF6600',
          pointWidth: 25,
          pointStart: Date.now() - (1000 * 60 * 60 * 24 * 30 * 5),
          pointInterval: 3600 * 1000 * 24 * 30,
          data: datos,
          type: 'column'
        },
        {
          name: 'Pot. Contratada',
          color: '#008F39',
          pointWidth: 15,
          pointStart: Date.UTC(2020, 7, 1), 
          pointInterval: 3600 * 1000 * 24 * 30,
          data: potencias,
          type: 'line'
        }
      ];
    } 
    // else {
    //   console.log('NO hay datos de potencia.'
    // };
  
  }

}

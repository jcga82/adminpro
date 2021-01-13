import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-grafico-consumo',
  templateUrl: './grafico-consumo.component.html',
  styleUrls: ['./grafico-consumo.component.scss']
})
export class GraficoConsumoComponent implements OnInit {

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
      // tickPositions: []
      startOnTick: false,
      endOnTick: false,
      showLastLabel: true,
      showFirstLabel: true,
      labels: {
        format: '{value:%e-%m-%y}'
        // formatter: function() {
        //   return Highcharts.dateFormat('dd/mm/YY', this.value);
        // }
      }
    },
    yAxis: {
      endOnTick: false,
      startOnTick: false,
      labels: {
        format: '{value:,.0f}'
      },  
      title: {
        text: 'Consumo kWh'
      },
      tickPositions: [0]
    },
    legend: {
      enabled: false
    }
  };

  constructor() { }

  ngOnInit(): void {
    console.log(this.data);
    const datos: any = [];
    this.data.forEach((element: any) => {
      datos.push([element.timestamp, element.value0])
    });
    console.log(datos);
    this.chartOptions.series = [
      {
        name: 'Consumo',
        color: '#FF6600',
        pointWidth: 15,
        data: datos,
        type: 'column'
      }
  ];
  
  }

}

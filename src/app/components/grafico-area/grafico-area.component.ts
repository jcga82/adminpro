import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-grafico-area',
  templateUrl: './grafico-area.component.html',
  styles: [
  ]
})
export class GraficoAreaComponent implements OnInit {

  @Input() titulo: string = "Sin titulo";
  @Input() label: string = "Sin label";
  @Input() data: any[] = [];

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    title: {
      text: ""
    },
    credits: {
      enabled: false
    },
    xAxis: {
      labels: {
        formatter: function() {
          return Highcharts.dateFormat('%b \'%y',this.value);
        }
      },
      title: {
        text: "Mes"
      },
      type: 'datetime', 
    },
    yAxis: {
      endOnTick: false,
      startOnTick: false,
      labels: {
        enabled: false
      },
      title: {
        text: "% calidad"
      },
      tickPositions: [0]
    },
    legend: {
      enabled: false
    }
  };

  constructor() { }

  ngOnInit(): void {
    this.chartOptions.series = [{
      name: '% Correcto',
      data: this.data,
      pointStart: Date.UTC(2020, 0, 1), 
      pointInterval: 3600 * 1000 * 24 * 30,
      type: 'area'
    }];

  }

}

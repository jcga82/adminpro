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
  @Input() data: number[] = [];

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    title: {
      text: ""
    },
    xAxis: {
      labels: {
        enabled: true
      },
      title: {
        text: "Mes"
      },
      startOnTick: false,
      endOnTick: false,
      tickPositions: []
    },
    yAxis: {
      endOnTick: false,
      startOnTick: false,
      labels: {
        enabled: false
      },
      title: {
        text: null
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
      data: this.data,
      type: 'area'
    }];
  
  }

}

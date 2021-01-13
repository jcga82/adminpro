import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective, Label } from 'ng2-charts';
import { ConsumoAnualKalea } from 'src/app/interfaces/interfaces';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-agrupada-tarifas-chart',
  templateUrl: './agrupada-tarifas-chart.component.html',
  styleUrls: ['./agrupada-tarifas-chart.component.scss'],
  providers: [DecimalPipe]
})

export class AgrupadaTarifasChartComponent implements OnInit {

  public consumosAnual: ConsumoAnualKalea[] = [];

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    // plugins: {
    //   datalabels: {
    //     formatter: (value, ctx) => {
    //       const label = ctx.chart.data.labels[ctx.dataIndex];
    //       return label;
    //     },
    //   },
    // }
  };
  public pieChartLabels: Label[] = ['2.0A', '2.0DHA', '2.1A', '2.1DHA', '3.0A'];
  public pieChartData: number[] = [11, 5, 1, 3, 2, 3];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  // public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['#6857E6', '#009FEE', '#F02059', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];

  @ViewChild(BaseChartDirective, { static: true }) chart: any; //BaseChartDirective;

  constructor(
    private decimalPipe: DecimalPipe
  ) {}

  ngOnInit() {
    console.log('hola');
  }

  public getImageBase64() {
    let listaContainers = document.getElementsByTagName('canvas');
    const image = listaContainers[0].toDataURL('base64');

    return image;
  }

}

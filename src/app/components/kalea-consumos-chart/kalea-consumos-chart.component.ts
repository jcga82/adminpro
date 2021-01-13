import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { ConsumoAnualKalea, Usuario } from 'src/app/interfaces/interfaces';
import { DecimalPipe } from '@angular/common';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-kalea-consumos-chart',
  templateUrl: './kalea-consumos-chart.component.html',
  styleUrls: [],
  providers: [DecimalPipe]
})
export class KaleaConsumosChartComponent implements OnInit {

  @Input() consumo19 = 0;
  @Input() consumo20 = 0;

  public consumosAnual: ConsumoAnualKalea[] = [];

  public barChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top'
    },
    plugins: {
      datalabels: {
        color: 'white',
        font: {
          size: 15
        },
        formatter: function(value: number, context: any) {
          var sValue = value.toString();
          var raw = sValue.split('.')[0];
          raw = raw.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
          return `${raw} kWh`;
        }
      }
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            callback: function(value, index, values) {
              return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + ' kWh';
            }
          }
        }
      ]
    }
  };
  public barChartLabels: Label[] = ['Consumos acumulados (kWh)'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartColors: Color[] = [
    {
      // gold
      backgroundColor: 'rgba(186, 53, 26,1)',
      borderColor: 'rgba(186, 53, 26,1)',
      pointBackgroundColor: 'rgba(186, 53, 26,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(186, 53, 26,1)'
    },
    {
      // green
      backgroundColor: 'rgba(47, 156, 76,1)',
      borderColor: 'rgba(47, 156, 76,1)',
      pointBackgroundColor: 'rgba(47, 156, 76,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(47, 156, 76,1)'
    }
  ];
  public barChartPlugins: any[] = [pluginDataLabels];

  public barChartData: any = [
    { data: [2012121], label: 'Año 2019' },
    { data: [43123123], label: 'Año 2020' }
  ];

  @ViewChild(BaseChartDirective, { static: true }) chart: any; //BaseChartDirective;

  constructor(
    private decimalPipe: DecimalPipe
  ) {}

  ngOnInit() {
    console.log(this.consumo19);
    console.log(this.decimalPipe.transform(this.consumo19, '1.2-2'));
    this.barChartData[0].data[0] = this.consumo19;//this.decimalPipe.transform(this.consumo19 / 1000, '1.2-2');
    this.barChartData[1].data[0] = this.consumo20//this.decimalPipe.transform(this.consumo20 / 1000, '1.2-2');

    // this.consumos_anuales.forEach((consumo: ConsumoAnualKalea) => {
      // const yearConsumo = new Date(consumo.year);
      // console.log(consumo);
      // if (yearConsumo.getFullYear() == 2018) {
      //   this.barChartData[0].data[0] = parseFloat(
      //     this.decimalPipe.transform(consumo.consumoWh / 1000, '1.2-2').replace(',', '')
      //   );
      // } else {
      //   this.barChartData[1].data[0] = parseFloat(
      //     this.decimalPipe.transform(consumo.consumoWh / 1000, '1.2-2').replace(',', '')
      //   );
      // }
   // });

    // Cambiar el color de los consumos
    if (this.barChartData[1].data[0] > this.barChartData[0].data[0]) {
      let auxColor: Color = this.barChartColors[0];
      this.barChartColors[0] = this.barChartColors[1];
      this.barChartColors[1] = auxColor;
    }

  }

  public getImageBase64() {
    let listaContainers = document.getElementsByTagName('canvas');
    const image = listaContainers[0].toDataURL('base64');

    return image;
  }

}

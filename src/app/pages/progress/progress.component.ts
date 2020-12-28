import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  // Grafico Donuts
  labelsDonuts: string[] = ['Parte Vieja', 'Altza', 'Sancho El Sabio'];
  dataDonuts: any = [[35, 28, 12, 1],];

  // Grafico Area
  dataArea: number[] = [20,40,40,60,80,50,60,40,80,60,60,80];

  // Gauge Calidad del dato
  gaugeType = "full";
  gaugeCap = "round";
  gaugeValue = 48.3;
  gaugeLabel = "Calidad";
  gaugeAppendText = "%";
  thresholdConfig = {
    '0': {color: 'red'},
    '50': {color: 'orange'},
    '75.5': {color: 'green'}
  };

  // Datos básicos
  dataBasico = [
    {
      icon: 'income',
      name: 'TOTAL',
      quantity: 88 
    }, {
      icon: 'staff',
      name: 'VIVIENDAS',
      quantity: 20 

    },{
      icon: 'assets',
      name: 'COMERCIOS',
      quantity: 68 
    },{
      icon: 'expense',
      name: 'AGRUPADA',
      quantity: 27 
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}

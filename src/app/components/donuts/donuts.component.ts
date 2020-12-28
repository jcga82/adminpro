import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color} from 'ng2-charts';

@Component({
  selector: 'app-donuts',
  templateUrl: './donuts.component.html',
  styles: [
  ]
})
export class DonutsComponent implements OnInit {

  @Input() titulo: string = "Sin titulo";
  @Input('labelDonuts') doughnutChartLabels: Label[] = ['Parte Vieja', 'Altza', 'Sancho El Sabio'];
  @Input('dataDonuts') doughnutChartData: MultiDataSet = [[35, 28, 12, 1],];
  
  public colors: Color[] = [
    { backgroundColor: [ '#6857E6', '#009FEE', '#F02059' ]}
  ];
  public doughnutChartType: ChartType = 'doughnut';

  constructor() { }

  ngOnInit(): void {
  }

}

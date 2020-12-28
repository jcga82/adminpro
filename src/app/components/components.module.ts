import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonutsComponent } from './donuts/donuts.component';
import { ChartsModule } from 'ng2-charts';
import { GraficoAreaComponent } from './grafico-area/grafico-area.component';
import { NgxGaugeModule } from 'ngx-gauge';
import { HighchartsChartModule } from 'highcharts-angular';


@NgModule({
  declarations: [
    DonutsComponent, 
    GraficoAreaComponent
  ],
  exports: [
    DonutsComponent,
    GraficoAreaComponent
],
imports: [
  CommonModule,
  ChartsModule,
  NgxGaugeModule,
  HighchartsChartModule,
]
})
export class ComponentsModule { }

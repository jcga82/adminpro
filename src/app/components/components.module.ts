import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonutsComponent } from './donuts/donuts.component';
import { ChartsModule } from 'ng2-charts';
import { GraficoAreaComponent } from './grafico-area/grafico-area.component';
import { NgxGaugeModule } from 'ngx-gauge';
import { HighchartsChartModule } from 'highcharts-angular';
import { GraficoConsumoComponent } from './grafico-consumo/grafico-consumo.component';
import { KaleaConsumosChartComponent } from './kalea-consumos-chart/kalea-consumos-chart.component';
import { AgrupadaTarifasChartComponent } from './agrupada-tarifas-chart/agrupada-tarifas-chart.component';
import { ComentarioComponent } from './comentario/comentario.component';
import { FormsModule } from '@angular/forms';
import { MejoraComponent } from './mejora/mejora.component';


@NgModule({
  declarations: [
    DonutsComponent, 
    GraficoAreaComponent, 
    GraficoConsumoComponent, 
    KaleaConsumosChartComponent,
    AgrupadaTarifasChartComponent,
    ComentarioComponent,
    MejoraComponent
  ],
  exports: [
    DonutsComponent,
    GraficoAreaComponent,
    GraficoConsumoComponent,
    KaleaConsumosChartComponent,
    AgrupadaTarifasChartComponent,
    ComentarioComponent,
    MejoraComponent
],
imports: [
  CommonModule,
  ChartsModule,
  NgxGaugeModule,
  HighchartsChartModule,
  FormsModule
],
bootstrap: [ComentarioComponent, MejoraComponent],
entryComponents: [ComentarioComponent, MejoraComponent],
})
export class ComponentsModule { }

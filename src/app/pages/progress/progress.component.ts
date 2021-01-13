import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AgrupadaTarifasChartComponent } from 'src/app/components/agrupada-tarifas-chart/agrupada-tarifas-chart.component';
import { PdfInformeAgrupadaService } from 'src/app/services/pdf-informe-agrupada.service';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit, AfterViewInit {

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

  @ViewChild(AgrupadaTarifasChartComponent, { static: true }) tarifasChartAgrupada: any;

  constructor(
    private pdfInformeAgrupada: PdfInformeAgrupadaService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    console.log('Recuperando elemento: ', this.tarifasChartAgrupada);
  }

  generarInformeAgrupada() {
    const resumen = {
      grafico: this.tarifasChartAgrupada.getImageBase64(),
      ahorro: 'La agrupación de consumidores eléctricos impulsada por el programa SmartKalea permitrá a sus 26 integrantes reducir el gasto anual en electricidad. \n La mayoría de los comercios tienen una tarifa 2.0 sin discriminación horaria, hay un pequeño porcentaje con tarifa 2.1 y solo dos de ellos tienen la tarifa 3.0A',
      nexus: 'Nexus Energía ha sido la empresa con la oferta más ventajosa para la agrupación de consumidores. Han optado al proceso de compra agrupada un total de 5 comercializadoras durante el proceso de recepción de ofertas.',
      comercios: 'En este proceso han participado \n un total de 26 comercios. La \n mayoría de ellos pertenecen \n al sector moda y complementos, \n aunque también hay comercios \n de alimentación y otras tipologías. \n De los 26 comercios, 15 \n ya pertenecían a este sistema, \n mientras que 11 son nuevos.',
      tarifas: 'El consumo total de todos los comercios en la compra de energía agrupada asciende a 195.937 kWh/año con un ahorro anual esperado de 7.254 €, lo supondrá un ahorro total de un 19,3% con respecto a lo que pagaban hasta ahora.'
    }
    this.pdfInformeAgrupada.generatePdf(resumen);
  }

}

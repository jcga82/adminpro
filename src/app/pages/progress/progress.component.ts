import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { AgrupadaTarifasChartComponent } from 'src/app/components/agrupada-tarifas-chart/agrupada-tarifas-chart.component';
import { PdfInformeAgrupadaService } from 'src/app/services/pdf-informe-agrupada.service';
import { PdfInformeSemestralService } from 'src/app/services/pdf-informe-semestral.service';
import { CalidadDatoTotal } from 'src/assets/querys/querysGraphql';

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
    private pdfInformeAgrupada: PdfInformeAgrupadaService,
    private pdfInformeSemestral: PdfInformeSemestralService,
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

  generarInformeAsesorias() {
    const resumen = {
      comercios: 'En este estudio han participado \n un total de 25 comercios. \n La mayoría de ellos pertenecen \n al sector moda y estética, aunque \n también hay comercios de \n  restauración y otras tipologías. \n De los 25 comercios, 7 \n pertenecen al barrio de Altza, \n 11 se encuentran en la Parte \nVieja y 7 en el barrio de Sancho \n el Sabio.',
      agrupada: 'En 19 de los 25 comercios se \n ha detectado un ahorro al incluirse \n en la compra agrupada de energía. \n Tan solo uno de los comercios no \nobtendría ahorro económico al \n acogerse a esta medida y en los 5 \n restantes no se dispone de los datos. \nEl ahorro total estimado \nes de 7.137 €',
      consumo: 'Consumo anual por comercio. \n Es interesante para comparar\n consumos de comercios\n del estudio.',
      tarifas: 'El 77,3 % de los comercios \ntiene una tarifa 2.0A (5 de \nestos comercios tienen \ndiscriminación horaria), el \n 18,2 % tiene una tarifa 2.1A (sólo 2 \ncomercios tienen discriminación \nhoraria) y el 4,5% tiene la \ntarifa 3.0A',
      intro: 'Este informe describe las diversas medidas de eficiencia energética propuestas a los comercios participantes en el proyecto Smartkalea una vez se ha realizado la campaña de auditorías energéticas y se han identificado las posibles mejoras de ahorro en las instalaciones de los diversos comercios.',
      medidas: 'En todos los comercios participantes en el programa se han identificado posibles medidas de eficiencia energética en sus instalaciones, principalmente relacionadas con la renovación tecnológica de la iluminación (interior y/o exterior) a LED, proponiéndose este tipo de medida en 18 de los 25 comercios.\n\n El 28% de los comercios ya cuentan con iluminación LED',
      optimizacion: '',
      evolucion: '',
      observaciones: 'En la mayoría de los comercios al menos se ha propuesto una medida de ahorro energético. Es recomendable continuar con la labor informativa sobre el positivo impacto que estas medidas tienen en la competitividad de los negocios a través de la reducción del gasto energético. \n\n Utilizar ejemplos de buenas prácticas de otros comercios cercanos y sus datos de ahorro económico pueden tener mayor repercusión a la hora de estimular la inversión en medidas de eficiencia energética. Las de mayor impacto suelen ser en los sistemas de iluminación y climatización.'
      }
    this.pdfInformeSemestral.generatePdf(resumen);
  }

}

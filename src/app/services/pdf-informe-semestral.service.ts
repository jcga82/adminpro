import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import { logos, logo, dibujo } from './imagenes';


@Injectable({
  providedIn: 'root'
})
export class PdfInformeSemestralService {

  constructor() { }

  generatePdf(resumen: any) {

    let contentRaw: any[] = [
      {
        columns: [
          {
            canvas: [
              {
                type: 'rect',
                x: 20,
                y: 55,
                w: 540,
                h: 80,
                r: 5,
                color: '#689f38'
              },
              {
                type: 'rect',
                x: 20,
                y: 150,
                w: 195,
                h: 610,
                r: 5,
                color: '#d9d9d9'
              },
            ]
          },
          {
            image: logo,
            width: 350,
            absolutePosition: { x: 230, y: 170 }
          },
          [
            {
              text: 'INFORME DE EFICIENCIA ENERGÉTICA',
              style: 'titulo',
              absolutePosition: { x: 50, y: 90 }
            },
            {
              text: 'Enero 2021',
              style: 'header',
              alignment: 'right',
              absolutePosition: { x: 60, y: 130 }
            },
            {
              text: 'Comercios',
              style: 'mediumHeader',
              absolutePosition: { x: 40, y: 200 }
            },
            {
              text: resumen.comercios,
              margin: [0, 0, 0, 0],
              style: 'fontBarraGris',
              absolutePosition: { x: 40, y: 225 }
            },
            {
              text: 'Compra Agrupada',
              style: 'mediumHeader',
              absolutePosition: { x: 40, y: 390 }
            },
            {
              text: resumen.agrupada,
              margin: [0, 0, 0, 0],
              style: 'fontBarraGris',
              absolutePosition: { x: 40, y: 415 }
            },
            {
              text: 'Consumo anual medio',
              style: 'mediumHeader',
              absolutePosition: { x: 40, y: 555 }
            },
            {
              text: resumen.consumo,
              margin: [0, 0, 0, 0],
              style: 'fontBarraGris',
              absolutePosition: { x: 40, y: 585 }
            },
            {
              text: 'Tarifa Contratada',
              style: 'mediumHeader',
              absolutePosition: { x: 40, y: 620 }
            },
            {
              text: [
              { text: resumen.tarifas }],
              style: 'fontBarraGris',
              absolutePosition: { x: 40, y: 650 }
            },
            {
              text: 'Eficiencia Energética',
              style: 'greatHeader',
              absolutePosition: { x: 240, y: 250 }
            },
            {
              text: [
              { text: resumen.intro }],
              absolutePosition: { x: 240, y: 280 }
            },
            {
              text: 'Medidas de ahorro',
              style: 'greatHeader',
              absolutePosition: { x: 240, y: 380 }
            },
            {
              text: [
              { text: resumen.medidas }],
              absolutePosition: { x: 240, y: 410 }
            },
            {
              image: dibujo,
              fit: [260, 220],
              absolutePosition: { x: 295, y: 550 }
            },
          ]
        ]
      },
      {
        text: [
        { text: 'Letter Ingenieros SL' }],
        style: 'mediumHeader',
        pageBreak: 'after',
        absolutePosition: { x: 380, y: 790 }
      },

      [
        {
          text: 'Cuadro resumen de ahorros',
          style: 'greatHeader',
          absolutePosition: { x: 50, y: 120 }
        },
        {
          layout: 'lightHorizontalLines',
          absolutePosition: { x: 90, y: 165 },
          table: {
            widths: [ 180, 100, 100 ],
            body: [
              [ 'Tipo de Medida', 'Núm. Comercios', 'Ahorro estimado'],
              [ 'Iluminación LED', 18, '13%'],
              [ 'Optimización de tarifa', 15, '7%'],
              [ 'Compra agrupada de energía', 19, '26%'],
              [ 'Buenas prácticas', 25, '20%'],
            ]
          }
        },
        {
          text: 'Optimización de potencia contratada',
          style: 'greatHeader',
          absolutePosition: { x: 50, y: 290 }
        },
        {
          text: resumen.optimizacion,
          absolutePosition: { x: 50, y: 315 }
        },
        {
          text: 'Evolución del consumo y potencia',
          style: 'greatHeader',
          absolutePosition: { x: 50, y: 400 }
        },
        {
          text: resumen.evolucion,
          absolutePosition: { x: 50, y: 430 }
        },
        {
          text: 'Observaciones y opciones a futuro',
          style: 'greatHeader',
          absolutePosition: { x: 50, y: 500 }
        },
        {
          text: resumen.observaciones,
          absolutePosition: { x: 50, y: 530 }
        },

        { text: 'Letter Ingenieros SL',
          style: 'mediumHeader',
          absolutePosition: { x: 380, y: 780 }
        }
      ],

    ];

    const documentDefinition = {
      header: {
        image: logos,
        width: 555,
        absolutePosition: { x: 20, y: 20 }
      },
      footer: {
        columns: [
          'Letter Ingenieros SL',
          { text: 'Right part', alignment: 'right' }
        ]
      },
      pageMargins: [10, 30, 30, 10],
      content: contentRaw,
      pageBreakBefore: function(currentNode: any, followingNodesOnPage: any) {
        return currentNode.headlineLevel === 1 && followingNodesOnPage.length === 0;
      },
      styles: {
        centerme: {
          alignment: 'center'
        },
        titulo: {
          fontSize: 28,
          color: '#ffffff',
          margin: [0, 10, 0, 10],
          bold: true
        },
        greatHeader: {
          fontSize: 20,
          color: '#cb222b',
          margin: [0, 10, 0, 10],
          bold: true
        },
        fontBarraGris: {
          fontSize: 11
        },
        fontTable: {
          fontSize: 10
        },
        mediumHeader: {
          fontSize: 14,
          color: '#cb222b',
          margin: [0, 10, 0, 10],
          bold: true
        },
        header: {
          fontSize: 24,
          color: '#ffffff',
          alignment: 'center',
          margin: [0, 10, 0, 10],
          bold: true
        }
      }
    };
    pdfMake.createPdf(documentDefinition).open();

  }

}

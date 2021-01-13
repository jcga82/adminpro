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
                h: 600,
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
              text: 'INFORME DE COMPRA AGRUPADA DE ENERGÍA ELÉCTRICA',
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
              text: 'COMERCIOS',
              style: 'mediumHeader',
              absolutePosition: { x: 40, y: 200 }
            },
            {
              text: resumen.comercios,
              margin: [0, 0, 0, 0],
              absolutePosition: { x: 40, y: 225 }
            },
            {
              text: 'TARIFAS',
              style: 'mediumHeader',
              absolutePosition: { x: 40, y: 390 }
            },
            {
              image: resumen.grafico,
              width: 280,
              absolutePosition: { x: -10, y: 420 }
            },
            {
              text: 'PRECIOS',
              style: 'mediumHeader',
              absolutePosition: { x: 40, y: 600 }
            },
            // { canvas: [{ type: 'line', x1: 390, y1: -1, x2: 510, y2: -150, lineWidth: 2 }] },

            {
              text: 'Compra Agrupada',
              style: 'greatHeader',
              absolutePosition: { x: 240, y: 250 }
            },
            {
              text: [
              { text: resumen.ahorro }],
              absolutePosition: { x: 240, y: 280 }
            },
            {
              text: 'Nexus Energía',
              style: 'greatHeader',
              absolutePosition: { x: 240, y: 380 }
            },
            {
              text: [
              { text: resumen.nexus }],
              absolutePosition: { x: 240, y: 410 }
            },
            {
              text: 'Conclusiones',
              style: 'greatHeader',
              absolutePosition: { x: 240, y: 490 }
            },
            {
              text: [
              { text: resumen.tarifas }],
              absolutePosition: { x: 240, y: 520 }
            },
            {
              image: dibujo,
              fit: [210, 190],
              absolutePosition: { x: 295, y: 595 }
            },
          ]
        ]
      },

      {
        layout: 'lightHorizontalLines', // optional
        absolutePosition: { x: 40, y: 630 },
        style: 'fontTable',
        table: {
          widths: [ 35, 32, 32, 32 ],
          body: [
            [ 'Tarifa', 'P1', 'P2', 'P3'],
            [ '2.0A', 0.1144, '', '' ],
            [ '2.0DHA', 0.1342, 0.0636, '' ],
            [ '2.1A', 0.1271, '', '' ],
            [ '2.1DHA', 0.1481, 0.074, '' ],
            [ '3.0A', 0.0949, 0.0822, 0.063],
            // [ { text: '100', bold: true }, { text: '200', bold: true } ]
          ]
        }
      },
      {
        text: [
        { text: 'Letter Ingenieros SL' }],
        style: 'mediumHeader',
        absolutePosition: { x: 380, y: 790 }
      },

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

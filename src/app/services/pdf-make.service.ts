import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Comentario, MejoraPropuesta, Usuario } from '../interfaces/interfaces';
import { fondo, logo, moda, alimentacion, otros, is_trending_up, is_trending_down } from './imagenes';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class PdfMakeService {

  constructor() {}

  generatePdf(cuenta: Usuario, _image: any, consumo2019: number, consumo2020: number, potencia: string, tarifa: string) {
    // mapeo que mejoras son de potencia y cuales no    
    let mejorasPotencia: MejoraPropuesta[] = [];
    let mejorasNormales: MejoraPropuesta[] = [];

    cuenta.mejoras.map(mejora => {
      if (mejora.tag !== null) {
        if (mejora.tag === 'potencia') {
          mejorasPotencia.push(mejora);
        }
      } else {
        mejorasNormales.push(mejora);
      }
    });

    // Calculo del %
    let trending_image = is_trending_up;
    let porcentaje_ahorro = 0;
    porcentaje_ahorro =
       100 - (consumo2020 / consumo2019) * 100;

    if (consumo2019 >= consumo2020) {
      console.log('Ha disminuido el consumo');
      trending_image = is_trending_down;
      porcentaje_ahorro = porcentaje_ahorro * -1.0;
    } else {
      console.log('Aumentó el consumo');
      trending_image = is_trending_up;
      porcentaje_ahorro = Math.abs(porcentaje_ahorro);
    }

    let contentRaw: any[] = [
      {
        columns: [
          {
            image: logo,
            width: 270,
            absolutePosition: { x: 15, y: 70 }
          },
          [
            {
              text: cuenta.tituloInforme ? cuenta.tituloInforme.toUpperCase() : cuenta.usuario.toUpperCase(),
              style: 'titulo',
              absolutePosition: { x: 50, y: 130 }
            },
            {
              text: 'Abril 2020',
              style: 'header',
              alignment: 'right',
              absolutePosition: { x: 480, y: 150 }
            },
            { canvas: [{ type: 'line', x1: 390, y1: -1, x2: 510, y2: -150, lineWidth: 2 }] },

            {
              text: cuenta.descripcion,
              margin: [0, 0, 0, 0],
              absolutePosition: { x: 30, y: 200 }
            },
            {
              text: [{ text: 'Zona: ', bold: true }, { text: cuenta.zona }],
              absolutePosition: { x: 300, y: 350 }
            },
            {
              text: [{ text: 'Superficie (m2): ', bold: true }, { text: cuenta.superficie }],
              absolutePosition: { x: 450, y: 350 }
            },
            {
              text: [{ text: 'Potencia cont. (kW): ', bold: true }, { text: potencia }],
              absolutePosition: { x: 300, y: 370 }
            },
            {
              text: [{ text: 'Tarifa: ', bold: true }, { text: tarifa }],
              absolutePosition: { x: 450, y: 370 }
            },
            {
              text: mejorasPotencia.length === 0 ? '' : mejorasPotencia[mejorasPotencia.length - 1].descripcion,
              absolutePosition: { x: 310, y: 410 }
            },
            {
              image: _image ? _image : logo,
              fit: [225, 225],
              absolutePosition: { x: 35, y: 295 }
            },
            {
              image: trending_image,
              fit: [70, 70],
              absolutePosition: { x: 420, y: 270 }
            },
            {
              image: cuenta.actividad === 'Otros' ? otros : moda,
              fit: [50, 50],
              absolutePosition: { x: 430, y: 130 }
            },
            {
              canvas: [
                {
                  type: 'rect',
                  x: -260,
                  y: 120,
                  w: 550,
                  h: 60,
                  r: 5,
                  lineColor: '#cb222b'
                },
                {
                  type: 'rect',
                  x: 20,
                  y: 330,
                  w: 270,
                  h: 100,
                  r: 5,
                  lineColor: '#cb222b'
                },
                {
                  type: 'rect',
                  x: -260,
                  y: 490,
                  w: 550,
                  h: 80,
                  r: 5,
                  lineColor: '#cb222b'
                },
                {
                  type: 'rect',
                  x: -260,
                  y: 610,
                  w: 550,
                  h: 65,
                  r: 5,
                  lineColor: '#cb222b'
                }
              ]
            }
          ]
        ]
      },

      {
        text: mejorasNormales.length === 0 ? '' : mejorasNormales[mejorasNormales.length - 1].descripcion,
        margin: [0, 0, 0, 25],
        absolutePosition: { x: 30, y: 565 }
      },
      {
        text:
          cuenta.comentarios.length === 0 ? '' : cuenta.comentarios[cuenta.comentarios.length - 1].comentario,
        margin: [0, 0, 0, 25],
        absolutePosition: { x: 30, y: 685 }
      },
      // {
      //   text: 'El comercio no forma parte de la Agrupación de Consumidores impulsada por Smartkalea. En su caso, el ahorro por precio Agrupado sería del 32% en el término de energía.',
      //   margin: [0, 0, 0, 25],
      //   absolutePosition: { x: 30, y: 685 }
      // },
      {
        text: 'Evolución',
        style: 'greatHeader',
        absolutePosition: { x: 300, y: 300 }
      },
      {
        text: [{ text: porcentaje_ahorro.toFixed(0) }, { text: ' %' }],
        style: 'header',
        absolutePosition: { x: 500, y: 295 }
      },
      {
        text: 'Datos de consumo',
        style: 'greatHeader',
        absolutePosition: { x: 30, y: 270 }
      },

      {
        text: 'Medidas a implementar',
        style: 'greatHeader',
        absolutePosition: { x: 30, y: 530 }
      },

      {
        text: 'Comentarios',
        style: 'greatHeader',
        absolutePosition: { x: 30, y: 650 }
      },

      // {
      //   text: cuenta.mejoras[0].descripcion,
      //   absolutePosition: { x: 30, y: 640 }
      // },
      // {
      //   text: cuenta.comentarios[0].comentario,
      //   absolutePosition: { x: 30, y: 680 }
      // }
    ];
    
    

    // cuenta.mejoras.forEach((mejora: MejoraPropuesta, pos: number) => {
    //   contentRaw.push({
    //     text: [
    //       {
    //         text: mejora.descripcion,
    //         absolutePosition: { x: 30, y: 640 }
    //       }
    //     ]
    //   });
    // });

    // cuenta.comentarios.forEach((comentario: Comentario, pos: number) => {
    //   contentRaw.push({
    //     text: [
    //       {
    //         text: comentario.comentario,
    //         absolutePosition: { x: 30, y: 680 }
    //       }
    //     ]
    //   });
    // });

    const documentDefinition = {
      background: {
        image: fondo,
        width: 595
      },
      pageMargins: [10, 30, 30, 10],
      content: contentRaw,
      styles: {
        centerme: {
          alignment: 'center'
        },
        titulo: {
          fontSize: 37,
          margin: [0, 10, 0, 10],
          bold: true
        },
        greatHeader: {
          fontSize: 22,
          color: '#cb222b',
          margin: [0, 10, 0, 10],
          bold: true
        },
        header: {
          fontSize: 18,
          margin: [0, 10, 0, 10],
          bold: true
        }
      }
    };
    pdfMake.createPdf(documentDefinition).open();
  }

}

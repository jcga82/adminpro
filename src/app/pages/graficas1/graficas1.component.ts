import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { CalidadDatoTotal } from 'src/assets/querys/querysGraphql';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-graficas1',
  templateUrl: './graficas1.component.html',
  styles: [],
  providers: [DecimalPipe]
})
export class Graficas1Component implements OnInit {

  calidad: any = [];
  valor = `${50}%`;

  constructor(
    private apollo: Apollo,
    private decimalPipe: DecimalPipe
  ) { }

  ngOnInit() {
    this.apollo.watchQuery(
      { query: CalidadDatoTotal,
        variables: {
          initDate: "2020-12-10",
          endDate: "2021-01-09"
        } })
      .valueChanges.subscribe((result: any) => {
        console.log(result.data.analisisEst);
        result.data.analisisEst.forEach((element: any) => {
          this.calidad.push(
            {
              nombrePerfil: element.nombrePerfil,
              numDias: element.numDias,
              porcentajeCorrecto: this.decimalPipe.transform(element.porcentajeCorrecto, '1.2-2'),
              porcentajeEstimado: this.decimalPipe.transform(element.porcentajeEstimado, '1.2-2'),
              totalCorrecto: element.totalCorrecto,
              totalEstimado: element.totalEstimado,
              totalFallo: element.totalFallo,
              totalNulo: element.totalNulo,
              totalZero: element.totalZero
            }
          );
        });
        console.log(this.calidad);
        // this.calidad.numDias = result.data.analisis[0].numDias;
        // this.calidad2020[0].porcentajeCorrecto = result.data.analisis[0].porcentajeCorrecto;
        // this.calidad2020[0].totalEstimado = result.data.analisis[0].totalEstimado;
    });
  }

}

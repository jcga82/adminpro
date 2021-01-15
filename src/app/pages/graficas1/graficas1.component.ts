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
  cargando = true;
  fechaFin = new Date();
  fechaInicioString = '';
  fechaFinString = '';
  

  constructor(
    private apollo: Apollo,
    private decimalPipe: DecimalPipe
  ) { }

  ngOnInit() {
    this.cargando = true;
    this.fechaFinString = this.getFechaString(this.fechaFin);
    const fechaInicio = new Date(this.fechaFin.setDate(this.fechaFin.getDate() - 30));
    this.fechaInicioString = this.getFechaString(fechaInicio);
    this.apollo.watchQuery(
      { query: CalidadDatoTotal,
        variables: {
          initDate: this.fechaInicioString,
          endDate: this.fechaFinString
        } })
      .valueChanges.subscribe((result: any) => {
        console.log(result);
        this.cargando = result.loading;
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
    });
  }

  getFechaString(fecha: Date){
    let day = ("0" + fecha.getDate()).slice(-2);
    let month = ("0" + (fecha.getMonth() + 1)).slice(-2);
    let year = fecha.getFullYear()
    return `${year}-${month}-${day}`;
  }

}

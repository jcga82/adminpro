import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { CalidadDatoTotal, CalidadDatoZonas } from 'src/assets/querys/querysGraphql';
import { DecimalPipe } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-graficas1',
  templateUrl: './graficas1.component.html',
  styles: [],
  providers: [DecimalPipe]
})
export class Graficas1Component implements OnInit {

  calidad: any = [];
  promedio: any;
  total: any;
  cargando = false;
  fechaFin = new Date();
  fechaInicioString = '';
  fechaFinString = '';
  listaTiempos:string[] = ["No disponible", "Últimos 30 días"];
  listaZonas:string[] = ["Alde zaharra", "Altza", "Sancho el Sabio", "Txomin", "Otros"];
  listaAlcance:string[] = ["completo", "comercios", "viviendas"];
  rango = true;

  filtrosForm = this.fb.group({
    zona: ['Alde zaharra', [Validators.required]],
    alcance: ['completo', [Validators.required]],
    tiempo: ['Últimos 30 días', [Validators.required]]
  })
  

  constructor(
    private apollo: Apollo,
    private decimalPipe: DecimalPipe,
    public fb: FormBuilder
  ) { }

  ngOnInit() {
    this.cargarCalidadDatoTotal();
  }

  cargarCalidadDatoTotal() {
    this.filtrosForm.controls['zona'].setValue('Todos');
    this.filtrosForm.controls['alcance'].setValue('completo');
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
        this.total = result.data.analisisEst.lenght;
        this.cargando = result.loading;
        result.data.analisisEst.forEach((element: any) => {
          const objeto = {
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
          this.calidad.push(objeto);
        });
        this.total = Object.keys(this.calidad).length;
        const media = this.calidad.reduce( (total: any, next: any ) => total + Number(next.porcentajeCorrecto), 0) / Object.keys(this.calidad).length;
        this.promedio = this.decimalPipe.transform(media, '1.2-2')
        localStorage.setItem('Enero', JSON.stringify(media));
        console.log(this.promedio);
    });
  }

  cargarCalidadDatoZonas() {
    this.calidad = [];
    console.log(this.filtrosForm.value);
    this.cargando = true;
    this.fechaFinString = this.getFechaString(this.fechaFin);
    const fechaInicio = new Date(this.fechaFin.setDate(this.fechaFin.getDate() - 30));
    this.fechaInicioString = this.getFechaString(fechaInicio);
    this.apollo.watchQuery(
      { query: CalidadDatoZonas,
        variables: {
          initDate: this.fechaInicioString,
          endDate: this.fechaFinString,
          zona: this.filtrosForm.value.zona,
          alcance: this.filtrosForm.value.alcance
        } })
      .valueChanges.subscribe((result: any) => {
        console.log(result);
        this.total = result.data.analisisZona[0].individuales.lenght;
        this.cargando = result.loading;
        result.data.analisisZona[0].individuales.forEach((element: any) => {
          const objeto = {
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
          this.calidad.push(objeto);
        });
        this.total = Object.keys(this.calidad).length;
        const media = this.calidad.reduce( (total: any, next: any ) => total + Number(next.porcentajeCorrecto), 0) / Object.keys(this.calidad).length;
        this.promedio = this.decimalPipe.transform(media, '1.2-2')
        localStorage.setItem('Enero', JSON.stringify(media));
        console.log(this.promedio);
    });
  }

  onRangoChange() {
    console.log('Cambió el rango seleccionado');
  }

  getFechaString(fecha: Date){
    let day = ("0" + fecha.getDate()).slice(-2);
    let month = ("0" + (fecha.getMonth() + 1)).slice(-2);
    let year = fecha.getFullYear()
    return `${year}-${month}-${day}`;
  }

}

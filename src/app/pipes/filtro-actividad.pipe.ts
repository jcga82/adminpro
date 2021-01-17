import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroActividad',
  pure: false
})
export class FiltroActividadPipe implements PipeTransform {

  transform(array: any[], esVivienda: boolean, esComercio: boolean, columna: string = 'actividad'): any[] {

    if (!array) {
      return array;
    }

    if (!esVivienda) {
      console.log('filtro quita viviendas');
      return array.filter(
        item => !item[columna].includes('Vivienda')
      );
    }
    else if (!esComercio) {
      console.log('filtro quita comercios');
      return array.filter(
        item => item[columna].includes('Vivienda')
      );
    } else {
      return array;
    }


  }

}

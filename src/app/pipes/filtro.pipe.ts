import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro',
  pure: true
})
export class FiltroPipe implements PipeTransform {

  transform(array: any[], texto: string = '' , columna: string = 'usuario'): any[] {
    if (texto === '') {
      return array;
    }

    if (!array) {
      return array;
    }

    texto = texto.toLocaleLowerCase();

    return array.filter(( item => {
      return item[columna].toLowerCase().includes(texto);
    })
      // item => item[columna].toLowerCase().includes(texto)
    );
  }

}

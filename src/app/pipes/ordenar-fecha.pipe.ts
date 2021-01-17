import { Pipe, PipeTransform } from '@angular/core';
import { orderBy } from 'lodash';

@Pipe({
  name: 'sortBy'
})
export class OrdenarFechaPipe implements PipeTransform {

  transform(value: any[], order: boolean , column: string = 'date'): any[] {
    // if (!value || !order) { 
    //   console.log("no array");
    //   return value; 
    // }
    // if (value.length <= 1) { 
    //   console.log('array with only one item');
    //   return value; 
    // }
    value = orderBy(value, item => item.date, ['desc'])
    if (order) {
      value = value.slice(0, 3);
    }
    return value;
  }

}

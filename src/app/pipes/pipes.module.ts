import { NgModule } from '@angular/core';
import { FiltroPipe } from './filtro.pipe';
import { FiltroActividadPipe } from './filtro-actividad.pipe';
import { OrdenarFechaPipe } from './ordenar-fecha.pipe';



@NgModule({
  declarations: [FiltroPipe, FiltroActividadPipe, OrdenarFechaPipe],
  exports: [FiltroPipe, FiltroActividadPipe, OrdenarFechaPipe]
})
export class PipesModule { }

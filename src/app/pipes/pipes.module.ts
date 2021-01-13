import { NgModule } from '@angular/core';
import { FiltroPipe } from './filtro.pipe';
import { FiltroActividadPipe } from './filtro-actividad.pipe';



@NgModule({
  declarations: [FiltroPipe, FiltroActividadPipe],
  exports: [FiltroPipe, FiltroActividadPipe]
})
export class PipesModule { }

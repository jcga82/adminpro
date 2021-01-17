import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { CalidadDatoTotal } from 'src/assets/querys/querysGraphql';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit, AfterContentInit {

  data: any[] = [];
  textoBuscar = '';
  zonaComercio = '';
  tipoComercio = '';
  comerciosOn = true;
  viviendasOn = false;
  calidadPorMes: any[] = [];

  zonas = ['Alde Zaharra', 'Altza', 'Sancho el Sabio', 'Otros'];
  actividades = ['', 'Alimentacion', ];

  constructor(
    private usuariosServices: UsuariosService,
    private apollo: Apollo,
  ) { }

  ngOnInit() {
    this.usuariosServices.cargarPerfiles()
    .subscribe((result: any) => {
      console.log(result);
      this.data = result.data.profiles;
    });
    // this.getCalidadDatoPorMes();
  }

  toggleVisibility(e: any){
    this.comerciosOn = e.target.checked;
  }

  ngAfterContentInit() {
    this.apollo.watchQuery(
      { query: CalidadDatoTotal,
        variables: {
          initDate: '2020-12-01',
          endDate: '2020-12-31'
        } })
      .valueChanges.subscribe((result: any) => {
        const analisis = result.data.analisisEst;
        const media = analisis.reduce( (total: any, next: any ) => total + Number(next.porcentajeCorrecto), 0) / Object.keys(analisis).length;
        localStorage.setItem('Diciembre', JSON.stringify(media));
      });
    this.apollo.watchQuery(
        { query: CalidadDatoTotal,
          variables: {
            initDate: '2020-11-01',
            endDate: '2020-11-30'
          } })
        .valueChanges.subscribe((result: any) => {
          const analisis = result.data.analisisEst;
          const media = analisis.reduce( (total: any, next: any ) => total + Number(next.porcentajeCorrecto), 0) / Object.keys(analisis).length;
          localStorage.setItem('Noviembre', JSON.stringify(media));
        });
      this.apollo.watchQuery(
          { query: CalidadDatoTotal,
            variables: {
              initDate: '2020-10-01',
              endDate: '2020-10-31'
            } })
          .valueChanges.subscribe((result: any) => {
            const analisis = result.data.analisisEst;
            const media = analisis.reduce( (total: any, next: any ) => total + Number(next.porcentajeCorrecto), 0) / Object.keys(analisis).length;
            localStorage.setItem('Octubre', JSON.stringify(media));
          });
  }

}

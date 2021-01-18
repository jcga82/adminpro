import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit, AfterViewInit {

  data: any[] = [];
  textoBuscar = '';
  zonaComercio = '';
  tipoComercio = '';
  comerciosOn = true;
  viviendasOn = true;
  calidadPorMes: any[] = [];

  zonas = ['Alde Zaharra', 'Altza', 'Sancho el Sabio', 'Otros'];
  actividades = ['', 'Alimentacion', ];

  constructor(
    private usuariosServices: UsuariosService
  ) { }

  ngOnInit() {
    this.usuariosServices.cargarPerfiles()
    .subscribe((result: any) => {
      console.log(result);
      this.data = result.data.profiles;
    });
    // this.getCalidadDatoPorMes();
  }

  toggleComercios(e: any){
    // console.log(e.target.checked);
    this.comerciosOn = e.target.checked;
  }

  toggleViviendas(e: any){
    this.viviendasOn = e.target.checked;
  }

  ngAfterViewInit() {
    
  }

}

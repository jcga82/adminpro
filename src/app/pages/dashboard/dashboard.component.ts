import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  data: any[] = [];
  textoBuscar = '';
  zonaComercio = '';
  tipoComercio = '';
  comerciosOn = true;
  viviendasOn = false;

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
  }

  toggleVisibility(e: any){
    this.comerciosOn = e.target.checked;
  }

}

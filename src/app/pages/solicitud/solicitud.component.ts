import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: []
})
export class SolicitudComponent implements OnInit {

  data: any;

  constructor(
    private usuariosServices: UsuariosService
  ) { }

  ngOnInit(): void {
    this.usuariosServices.cargarSolicitudes()
      .subscribe((result: any) => {
        console.log(result);
        this.data = result.data.solicitud;
      });
  }

}

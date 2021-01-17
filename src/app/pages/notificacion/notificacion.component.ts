import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';


@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: []
})
export class NotificacionComponent {

  data: any;

  constructor(
    private usuariosServices: UsuariosService
  ) { }

  ngOnInit(): void {
    this.usuariosServices.cargarPerfiles()
      .subscribe((result: any) => {
        console.log(result);
        const array:any[] = [];
        result.data.profiles
          .map( (result: any) => {
            if (result.comentarios.length > 0) {
              result.comentarios.forEach((comentario: any) => {
                const objeto = {
                  usuario: result.usuario,
                  date: comentario.date || null,
                  comentario: comentario.comentario || null
                }
                array.push(objeto);
              });
              this.data = array;
            }
          });
      });
  }

}

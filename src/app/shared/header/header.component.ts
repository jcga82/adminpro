import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  data: any;

  constructor(
    public usuarioService: UsuariosService
  ) { }

  ngOnInit() {
    this.usuarioService.cargarPerfiles()
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

  logout() {
    this.usuarioService.logout();
  }

}

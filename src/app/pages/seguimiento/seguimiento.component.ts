import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrls: []
})
export class SeguimientoComponent implements OnInit {

  data: any;

  constructor(
    private usuariosServices: UsuariosService
  ) { }

  ngOnInit(): void {
    this.usuariosServices.cargarSeguimientosTotal()
      .subscribe((result: any) => {
        console.log(result);
        this.data = result.data.seguimiento;
      });
  }

  deleteSeguimiento(seguimiento: any) {
    console.log(seguimiento.id);
    Swal.fire({
      title: '¿Está seguro de borrar el seguimiento?',
      text: 'El seguimiento será borrado.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar'
    })
    .then( ok => {
      console.log(ok);
      if (ok.value) {
        this.usuariosServices.deleteSeguimiento(seguimiento.id)
          .subscribe( (seg: any) => {
            console.log(seg);
            window.location.reload();
            //this.data = seg.data.deleteSeguimiento.seguimientos;
            Swal.fire({
              title: 'Seguimiento',
              text: 'El seguimiento ha sido borrado correctamente.',
              icon: 'success',
              confirmButtonText: 'OK'
            })
          },(error: any) => {
            Swal.fire({
              title: 'Error Seguimiento',
              text: error,
              icon: 'error',
              confirmButtonText: 'OK'
            })
          });

      }
    });
  }


}

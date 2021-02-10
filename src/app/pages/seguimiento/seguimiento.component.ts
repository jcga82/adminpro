import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

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
    this.usuariosServices.cargarSeguimientos()
      .subscribe((result: any) => {
        console.log(result);
        this.data = result.data.seguimiento;
      });
  }
}

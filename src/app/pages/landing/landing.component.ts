import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  public registerForm = this.fb.group({
    nombre: ['', [ Validators.required ]],
    email: ['', [ Validators.required ]],
    telefono: ['', [ ]],
    nombre_negocio: ['', [ ]],
    direccion_negocio: ['', [ ]],
    adjunto: [],
    tiene_iberdrola: [false]
  });

  constructor(
    public usuarioService: UsuariosService,
    private fb: FormBuilder,
    private apollo: Apollo
  ) { }

  ngOnInit(): void {
  }

  register() {
    console.log(this.registerForm.value);
    this.usuarioService.login(this.registerForm.value.username, this.registerForm.value)
      .subscribe((resp: any) => {
        this.usuarioService.guardarToken(resp.token);
      }, (err) => {
        Swal.fire('Error', 'Hay algunos campos requeridos o no válidos ' + err.error.msg, 'error');
      });
  }

}

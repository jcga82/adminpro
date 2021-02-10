import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  public registerForm = this.fb.group({
    nombreCompleto: ['', [ Validators.required ]],
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
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  register() {
    console.log(this.registerForm.value);
    this.usuarioService.addSolicitud(this.registerForm.value)
      .subscribe((resp: any) => {
        console.log(resp);
        Swal.fire({
          title: 'Solicitud',
          text: 'La solicitud ha sido añadida correctamente. Nos pondremos en contacto con usted. Por favor, espera a que la revisemos',
          icon: 'success',
          confirmButtonText: 'Vale'
        })
        this.router.navigateByUrl('/login');
      }, (err) => {
        Swal.fire('Error', 'Hay algunos campos requeridos o no válidos ' + err.error.msg, 'error');
      });
  }

}

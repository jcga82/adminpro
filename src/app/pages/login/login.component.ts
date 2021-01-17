import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm = this.fb.group({
    username: ['admin', [ Validators.required ]],
    password: ['lettering', [ Validators.required ]],
  });

  constructor(
    public usuarioService: UsuariosService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() { 
    this.usuarioService.loginKE("fomentoss", "fomentoss");
  }

  login() {
    this.usuarioService.login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe((resp: any) => {
        this.usuarioService.guardarToken(resp.token);
        this.router.navigateByUrl('/dashboard');
      }, (err) => {
        Swal.fire('Error', 'usuario o clave no válidos ' + err.error.msg, 'error');
      });
  }

}

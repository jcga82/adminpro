import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';
import { CalidadDatoTotal } from 'src/assets/querys/querysGraphql';

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
    private router: Router,
    private apollo: Apollo,
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

  ngOnDestroy() {
    this.apollo.watchQuery(
      { query: CalidadDatoTotal,
        variables: {
          initDate: '2020-12-01',
          endDate: '2020-12-31'
        } })
      .valueChanges.subscribe((result: any) => {
        const analisis = result.data.analisisEst;
        const media = analisis.reduce( (total: any, next: any ) => total + Number(next.porcentajeCorrecto), 0) / Object.keys(analisis).length;
        localStorage.setItem('Diciembre', JSON.stringify(media));
      });
    this.apollo.watchQuery(
        { query: CalidadDatoTotal,
          variables: {
            initDate: '2020-11-01',
            endDate: '2020-11-30'
          } })
        .valueChanges.subscribe((result: any) => {
          const analisis = result.data.analisisEst;
          const media = analisis.reduce( (total: any, next: any ) => total + Number(next.porcentajeCorrecto), 0) / Object.keys(analisis).length;
          localStorage.setItem('Noviembre', JSON.stringify(media));
        });
    //   this.apollo.watchQuery(
    //       { query: CalidadDatoTotal,
    //         variables: {
    //           initDate: '2020-10-01',
    //           endDate: '2020-10-31'
    //         } })
    //       .valueChanges.subscribe((result: any) => {
    //         const analisis = result.data.analisisEst;
    //         const media = analisis.reduce( (total: any, next: any ) => total + Number(next.porcentajeCorrecto), 0) / Object.keys(analisis).length;
    //         localStorage.setItem('Octubre', JSON.stringify(media));
    //       });
  }

}

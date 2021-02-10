import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { MutateCambiarBooleanos, MutatePerfil, MutateLocalizacion, MutateAddComentario, MutateEditComentario, MutateDeleteComentario, MutateAddMejora, MutateEditMejora, MutateDeleteMejora, MutateAddSeguimiento, MutateDeleteSeguimiento, MutateAddSolicitud, MutateDeleteSolicitud, Solicitudes, Seguimientos } from 'src/assets/querys/querysGraphql';

import { Users } from 'src/assets/querys/querysGraphql';
import { environment } from 'src/environments/environment';
import { Comentario, MejoraPropuesta, RespuestaGetMyData, Usuario } from '../interfaces/interfaces';
import Swal from 'sweetalert2'
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  token: any = '';
  tokenKE = '';
  dataPotencias: any;
  respuestaGetMyData: RespuestaGetMyData = {};

  constructor(
    private http: HttpClient,
    private apollo: Apollo,
    private datePipe: DatePipe,
    private router: Router
  ) { }


  loginKE( username: string, password: string ){

    const body = {
        username,
        password
    };

    return new Promise ( resolve => {

      this.http.post('https://smartkaleaenergia.com/es/api-token-auth/', body)
        .subscribe((resp: any) => {
          // console.log(resp);
          this.guardarTokenKE(resp.token);
          resolve(true);
        }, (err: HttpErrorResponse) => {
          console.log(err);
          this.token = null;
          localStorage.clear();
          resolve(false);
        }
        );
    });
  }

  login( username: string, password: string ){
    const body = {
      'username': username,
      'password': password
    };
    return this.http.post('https://gesletter.es:7388/api/v1/login', body)
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  registro( username: string, password: string ){
    const body = {
      'username': username,
      'password': password
    };
    return this.http.post('https://gesletter.es:7388/api/v1/registro', body)
    .subscribe((resp: any) => {
      console.log(resp);
    });
  }

  // getUsuario() {
  //   return { ...this.respuestaGetMyData };
  // }

  async guardarToken( token: string) {
    this.token = token;
    await localStorage.setItem('token', token);
  }

  async guardarTokenKE( tokenKE: string) {
    this.tokenKE = tokenKE;
    await localStorage.setItem('tokenKE', tokenKE);
  }

  async cargarToken() {
    console.log('llega al cargarToken');
    this.token = await localStorage.getItem('token') || null;
  }

  async cargarTokenInformes() {
    return  await localStorage.get('tokenInformes') || null;
  }


  async validaToken(): Promise<boolean> {;
    
    if (!localStorage.getItem('token')) {
      console.log('no hay token almacenado')
      this.router.navigateByUrl('/login');
      return Promise.resolve(false);
    }

    console.log('Cargado token del storage...', this.token);

    return new Promise<boolean>( resolve => {
      console.log('entro al resolve')
      this.cargarPerfiles()
        .subscribe((result: any) => {
          console.log(result);
          if (result) {
            resolve(true);
          } else {
            this.router.navigateByUrl('/login');
            resolve(false);
          }
        },
        error => {
          console.log(error);
          this.router.navigateByUrl('/login');
          resolve(false);
        },
        );

      });
  }

  getDataConsumos(user: string, contrato: string) {
      const headers = {headers: {
        'Authorization': 'JWT ' + this.tokenKE,
        'Content-Type': 'application/json'
      }};
      const granularity = 'Days';
      const fromDate = '1606777200';
      const toDate = '1609455599';
      const toDate2 = Date.now();
      const fromDate2 = toDate2 - (1000 * 60 * 60 * 24 * 30);

      // if (user !== 'fomentoss') {
      //   return this.http.get<RespuestaGetMyData>(URL + '/datastream/get_my_data.json?fromDate=' + fromDate + '&endDate=' + toDate + '&granularity='
      //   + granularity + '&contrato_id=' + contrato + '&var_type=Consumo', headers);
      // } else {
      //   return this.http.get<RespuestaGetMyData>(URL + '/datastream/get_my_data.json?fromDate=' + fromDate + '&endDate=' + toDate + '&granularity='
      //   + granularity + '&contrato_id=' + contrato + '&var_type=Consumo&as_user=' + user, headers);
      // }
      return this.http.get<RespuestaGetMyData>(URL + '/datastream/get_my_data.json?fromDate=' + fromDate2/1000 + '&endDate=' + toDate2/1000 + '&granularity='
        + granularity + '&contrato_id=' + contrato + '&var_type=Consumo&as_user=' + user, headers);
  }

  // getDataPotencias(user: string, contrato: string) {
  //     const headers = {headers: {
  //       'Authorization': 'JWT ' + this.tokenKE,
  //       'Content-Type': 'application/json'
  //     }};
  //     const fromDate = '1530529200';
  //     const toDate = '1606777199.999';
  //     const toDate2 = Date.now();
  //     const fromDate2 = toDate2 - (1000 * 60 * 60 * 24 * 365);

  //     return this.http.get<RespuestaGetMyData>(URL + '/datastream/get_my_data.json?fromDate=' + fromDate2/1000 + '&endDate=' + toDate2/1000 + '&granularity=Months' + '&contrato_id=' + contrato + '&as_user=' + user, headers);
  // }

  public cargarPerfiles() {
    return this.apollo.watchQuery({ query: Users })
      .valueChanges
  }

  public cambiarBooleanos(cuenta: any) {
    console.log(cuenta);
    this.apollo.mutate(
      { mutation: MutateCambiarBooleanos,
        variables: {
          identificador: cuenta.identifier,
          valorAgrupada: cuenta.agrupada,
          valorActivo: cuenta.acctivo
        } 
      })
      .subscribe((result: any) => {
        console.log(result);
        Swal.fire({
          title: 'Checks Agrupada/Activo',
          text: 'Los checks han sido actualizados correctamente.',
          icon: 'success',
          confirmButtonText: 'OK'
        })
    });
  }

  public cambiarLocalizacion(cuenta: any) {
    console.log(cuenta);
    this.apollo.mutate(
      { mutation: MutateLocalizacion,
        variables: {
          identificador: cuenta.identifier,
          valorLongitud: Number(cuenta.longitud),
          valorLatitud: Number(cuenta.latitud)
        } 
      })
      .subscribe((result: any) => {
        console.log(result);
        Swal.fire({
          title: 'Localización',
          text: 'La localización ha sido añadida/actualizada correctamente.',
          icon: 'success',
          confirmButtonText: 'OK'
        })
      },(error) => {
        console.log('Hay un error', error);
        Swal.fire({
          title: 'Error Localización',
          text: error,
          icon: 'error',
          confirmButtonText: 'OK'
        })
      });
    }

  public cambiarPerfil(cuenta: any) {
    console.log(cuenta);
    this.apollo.mutate(
      { mutation: MutatePerfil, //cambiar el resto de propiedades del mutate ANTONIO unir con cambiar nombreInforme
        variables: {
          identifier: cuenta.identifier,
          descripcion: cuenta.descripcion
        } 
      })
      .subscribe((result: any) => {
        console.log(result);
        Swal.fire({
          title: 'Perfil',
          text: 'El perfil ha sido actualizado correctamente.',
          icon: 'success',
          confirmButtonText: 'OK'
        })
      },(error) => {
        console.log('Hay un error', error);
        Swal.fire({
          title: 'Error al actualizar',
          text: error,
          icon: 'error',
          confirmButtonText: 'OK'
        })
      });
    }

    // Comentarios y Mejoras

    public addComentario(identifier: string, comentario: Comentario) {
      return this.apollo.mutate(
        { mutation: MutateAddComentario,
          variables: {
            profileId: identifier,
            date: this.datePipe.transform(comentario.date, 'yyyy-MM-dd'),
            comentario: comentario.comentario
          } 
        })
    }

    public editComentario(identifier: string, comentarioPrev: Comentario, comentarioPost: Comentario) {
      console.log(identifier, comentarioPrev, comentarioPost);
      return this.apollo.mutate(
        { mutation: MutateEditComentario,
          variables: {
            profileId: identifier,
            oldDate: this.datePipe.transform(comentarioPrev.date, 'yyyy-MM-dd'),
            oldComentario: comentarioPrev.comentario,
            newDate: this.datePipe.transform(comentarioPost.date, 'yyyy-MM-dd'),
            newComentario: comentarioPost.comentario
          } 
        })
    }

    public deleteComentario(identifier: string, comentario: Comentario) {
      return this.apollo.mutate(
        { mutation: MutateDeleteComentario,
          variables: {
            profileId: identifier,
            date: this.datePipe.transform(comentario.date, 'yyyy-MM-dd'),
            comentario: comentario.comentario
          } 
        })
    }

    public addMejora(identifier: string, mejora: MejoraPropuesta) {
      console.log(identifier, mejora);
      return this.apollo.mutate(
        { mutation: MutateAddMejora,
          variables: {
            profileId: identifier,
            date: this.datePipe.transform(mejora.date, 'yyyy-MM-dd'),
            titulo: mejora.titulo,
            tag: mejora.tag,
            descripcion: mejora.descripcion
          } 
        })
    }

    public editMejora(identifier: string, mejoraPrev: MejoraPropuesta, mejoraPost: MejoraPropuesta) {
      return this.apollo.mutate(
        { mutation: MutateEditMejora,
          variables: {
            profileId: identifier,
            oldDate: this.datePipe.transform(mejoraPrev.date, 'yyyy-MM-dd'),
            oldDescripcion: mejoraPrev.descripcion,
            oldTitulo: mejoraPrev.titulo,
            newDate: this.datePipe.transform(mejoraPost.date, 'yyyy-MM-dd'),
            newDescripcion: mejoraPost.descripcion,
            newTitulo: mejoraPost.titulo,
            tag: mejoraPrev.tag
          } 
        })
    }

    public deleteMejora(identifier: string, mejora: MejoraPropuesta) {
      return this.apollo.mutate(
        { mutation: MutateDeleteMejora,
          variables: {
            profileId: identifier,
            date: this.datePipe.transform(mejora.date, 'yyyy-MM-dd'),
            // tag: mejora.tag,
            titulo: mejora.titulo,
            descripcion: mejora.descripcion
          } 
        })
    }

    // Seguimientos y sus comentarios

    public cargarSeguimientos() {
      return this.apollo.watchQuery({ query: Seguimientos })
        .valueChanges
    }

    public addSeguimiento(identifier: string, seguimiento: any) {
      console.log(seguimiento);
      return this.apollo.mutate(
        { mutation: MutateAddSeguimiento,
          variables: {
            profile: identifier,
            fechaVisita: this.datePipe.transform(seguimiento.date, 'yyyy-MM-dd'),
            empresa: seguimiento.empresa
          } 
        })
    }

    public deleteSeguimiento(id: string) {
      return this.apollo.mutate(
        { mutation: MutateDeleteSeguimiento,
          variables: {
            id: id
          } 
        })
    }

    // Solicitudes

    public cargarSolicitudes() {
      return this.apollo.watchQuery({ query: Solicitudes })
        .valueChanges
    }

    public addSolicitud(solicitud: any) {
      console.log(solicitud);
      return this.apollo.mutate(
        { mutation: MutateAddSolicitud,
          variables: {
            email: solicitud.email,
            nombreCompleto: solicitud.nombreCompleto
          } 
        })
    }

    public deleteSolicitud(id: string) {
      return this.apollo.mutate(
        { mutation: MutateDeleteSolicitud,
          variables: {
            id: id
          } 
        })
    }


}

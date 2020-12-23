import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { RespuestaGetMyData } from '../interfaces/interfaces';


const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  token: any = '';
  dataPotencias: any;
  respuestaGetMyData: RespuestaGetMyData = {};

  constructor(
    private http: HttpClient,
    private storage: Storage,
  ) { }


  login( username: string, password: string ){

    const body = {
        username,
        password
    };

    return new Promise ( resolve => {

      this.http.post(URL + '/api-token-auth/', body)
        .subscribe((resp: any) => {
          console.log(resp);
          this.guardarToken(resp.token);
          resolve(true);
        }, (err: HttpErrorResponse) => {
          console.log(err);
          this.token = null;
          this.storage.clear();
          resolve(false);
        }
        );
    });
  }

  logout() {
    this.storage.clear();
    // this.navCrtl.navigateRoot('/login', {animated: true});
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
    // this.tokenInformes = token;
    // this.storage.clear();
    await this.storage.set('token', token);
  }

  async cargarToken() {
    console.log('llega al cargarToken');
    this.token = await this.storage.get('token') || null;
  }

  async cargarTokenInformes() {
    return  await this.storage.get('tokenInformes') || null;
  }


  async validaToken(): Promise<boolean> {
    console.log('Cargado token del storage...', this.token);
    if (!this.token) {
      // this.navCrtl.navigateRoot('/login');
      return Promise.resolve(false);
    }

    return new Promise<boolean>( resolve => {
      const headers = {
        headers: {
            'Authorization': 'JWT ' + this.token,
            'Content-Type': 'application/json'
        }
      };

      const user = 'MariaJesusForcada';
      const contrato = 'ES0021000003411460EM';
      const granularity = 'Days';
      const fromDate = '1601503200';
      const toDate = '1604185199.999';
      this.http.get<RespuestaGetMyData>(URL + '/datastream/get_my_data.json?fromDate=' + fromDate + '&endDate=' + toDate + '&granularity='
        + granularity + '&contrato_id=' + contrato + '&var_type=Consumo&as_user=' + user, headers)

          .subscribe( (data: RespuestaGetMyData) => {
          console.log('aquiii', data);
          if (data) {
            this.respuestaGetMyData = data;
            resolve(true);
          } else {
            // this.navCrtl.navigateRoot('/login');
            resolve(false);
          }
        });

      });
  }

  getDataConsumos(user: string, contrato: string) {
      const headers = {headers: {
        'Authorization': 'JWT ' + this.token,
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

  getDataPotencias(user: string, contrato: string) {
      const headers = {headers: {
        'Authorization': 'JWT ' + this.token,
        'Content-Type': 'application/json'
      }};
      const fromDate = '1530529200';
      const toDate = '1606777199.999';
      const toDate2 = Date.now();
      const fromDate2 = toDate2 - (1000 * 60 * 60 * 24 * 365);

      return this.http.get<RespuestaGetMyData>(URL + '/datastream/get_my_data.json?fromDate=' + fromDate2/1000 + '&endDate=' + toDate2/1000 + '&granularity=Months' + '&contrato_id=' + contrato + '&as_user=' + user, headers);
  }


}

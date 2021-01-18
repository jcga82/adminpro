import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RespuestaGetMyData } from '../interfaces/interfaces';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ConsumosService {

  token: string = '';

  constructor(
    private http: HttpClient
  ) { }

  getToken(username: string, password: string) {
    const body = {
      username,
      password
    };
    return this.http.post(URL + '/api-token-auth/', body)
  }

  getDataConsumos(user: string, contrato: string, token: string) {
    const headers = {headers: {
      'Authorization': 'JWT ' + token,
      'Content-Type': 'application/json'
    }};
    const granularity = 'Days';
    const fromDate = '1606777200';
    const toDate = '1609455599';
    const toDate2 = Date.now();
    const fromDate2 = toDate2 - (1000 * 60 * 60 * 24 * 30);

    return this.http.get<RespuestaGetMyData>(URL + '/datastream/get_my_data.json?fromDate=' + fromDate2/1000 + '&endDate=' + toDate2/1000 + '&granularity='
      + granularity + '&contrato_id=' + contrato + '&var_type=Consumo&as_user=' + user, headers);
}

getDataPotencias(user: string, contrato: string) {
    const headers = {headers: {
      'Authorization': 'JWT ' + localStorage.getItem('tokenKE'),
      'Content-Type': 'application/json'
    }};
    const toDate = Date.now();
    const fromDate = toDate - (1000 * 60 * 60 * 24 * 30 * 5);

    return this.http.get<RespuestaGetMyData>(URL + '/datastream/get_my_data.json?fromDate=' + fromDate/1000 + '&endDate=' + toDate/1000 + '&granularity=Months' + '&contrato_id=' + contrato + '&as_user=' + user, headers);
}

getDataMensual(user: string) {
  const headers = {headers: {
    'Authorization': 'JWT ' + localStorage.getItem('tokenKE'),
    'Content-Type': 'application/json'
  }};

  return this.http.get(URL + '/appapi/user_monthly_data.json?as_user=' + user, headers);
}

}

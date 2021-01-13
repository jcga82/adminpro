import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public usuarioService: UsuariosService
  ) { }

  ngOnInit() {
    this.usuarioService.login("fomentoss", "fomentoss");
  }

}

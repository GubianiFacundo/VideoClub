import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/Services/user-service.service';
import { Usuario } from 'src/app/Clases/usuario';

@Component({
  selector: 'app-alta-user',
  templateUrl: './alta-user.component.html',
  styleUrls: ['./alta-user.component.css']
})
export class AltaUserComponent implements OnInit {

  constructor(private _service: UserServiceService) { }
  user: Usuario = {
    id: null,
    nombre: '',
    apellido: '',
    usuario: '',
    contrasena: '',
    telefono: '',
    correo: '',
    estado: '',
    histPeliculas: []

  };
  error: Boolean = false;

  ngOnInit() {
  }

  registerUser() {

    // tslint:disable-next-line:no-unused-expression
    const searchUser = this._service.usuarios2.filter(fil => {fil.usuario === this.user.usuario; });

    if (searchUser.length !== 0) {
      this.error = true;
      return;
    }
    this.error = false;

    this._service.addUsuario(this.user).subscribe(response => {
      this._service.usuarios2 = this._service.usuarios2.concat(response);
      alert('Register Successfull');
    });
  }

}

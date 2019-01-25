import { Injectable } from '@angular/core';
import { AlertController, ToastController } from 'ionic-angular';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { direcciones } from '../../assets/direcciones';



@Injectable()
export class LoginProvider {

  private entrar: boolean = false;
  private activarMenu: boolean = false;
  private objUsuario: any;
  private id_carrito:any;
  private direccion : any = "";
  constructor(private alerta: AlertController, private toasCtrl: ToastController,private http:HttpClient) {
    this.direccion = direcciones.login;
  }


  //Establece si aparece la pantalla número uno....
  public getEntrar(): boolean {
    return this.entrar;
  }
  public setEntrar(parametro: boolean): void {
    this.entrar = parametro;
  }

  public setActivaMenu(activa: boolean) {
    this.activarMenu = activa;
  }
  public getActivaMenu(): boolean {

    return this.activarMenu;
  }

  //Para logearse al sistema....
  public entrarSistema(obj):Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    let json = JSON.stringify(obj);
    return this.http.post(this.direccion,json,httpOptions);
  }

  public guardaUsuario(): any {
    return this.objUsuario;
  }


 



}

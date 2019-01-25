import { Component } from '@angular/core';
import { NavController, NavParams,ToastController,AlertController  } from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';



@Component({
  selector: 'page-paginaentrar',
  templateUrl: 'paginaentrar.html',
})
export class PaginaentrarPage {

  
  constructor(public navCtrl: NavController, public navParams: NavParams,private loginprovider:LoginProvider,
  private toasCtrl:ToastController,private alertCtrl:AlertController) {
  }

  ionViewDidEnter() {
          
  }

  public ingresar():any{
      
    let alerta1 = this.alertCtrl.create({
      title: 'Ingresar al sistema',
      message: 'Ingresa al sistema',
      inputs: [{
        name: 'usuario',
        placeholder: 'Ingresar No. de control'
      },
      {
        name: 'password',
        placeholder: 'Ingresar contraseña',
        type: 'password'
      }],
      buttons: [{
        text: "Ingresar",
        handler: datos => {
          let obj = {
            codigo:datos.usuario,
            password:datos.password
          };
          this.loginprovider.entrarSistema(obj).subscribe(datos => {
            if(datos.acceso){
               this.loginprovider.setEntrar(true);  
               this.loginprovider.setActivaMenu(true);
            }else{
              let toas = this.toasCtrl.create({message:"Usuario y/o Constraseña invalidos",duration:1500});
              toas.present();
            }
          });  
        }
      }]

    });
    alerta1.present();  
  }

}

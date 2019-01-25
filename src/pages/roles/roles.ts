import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController,FabContainer } from 'ionic-angular';
import { RolesProvider } from '../../providers/roles/roles';
import { RolesAddPage } from '../roles-add/roles-add';


/**
 * Generated class for the RolesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-roles',
  templateUrl: 'roles.html',
})
export class RolesPage {
  public arreglo: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private rolesPrd: RolesProvider, private alertCtrl: AlertController,
    private toasCtrl: ToastController) {
  }

  ionViewDidEnter() {
    this.rolesPrd.gets().subscribe(datos => {
      this.arreglo = datos;
      for (let item of this.arreglo) {
        if (item.rango == 1) {
          item.nombre_rango = "Todos los permisos";
        } else {
          item.nombre_rango = "Permisos limitados";
        }
      }
    });
  }

  public agregar(fab: FabContainer){
    fab.close();
    this.navCtrl.push(RolesAddPage,{boton:"Agregar"})
  }

  public actualizar(obj): any {

    this.navCtrl.push(RolesAddPage,{parametro:obj,boton:"Actualizar"});
  }

  public eliminar(obj): any {
    let alerta = this.alertCtrl.create({
      title: "Aviso",
      message: "¿Desea eliminar el registro?",
      buttons: [{
        text: "Si",
        handler: () => {
          this.rolesPrd.eliminar(obj.id).subscribe(datos => {
            let toas = this.toasCtrl.create({
              message: datos.respuesta, duration: 1500
            });
            toas.present();
            this.ionViewDidEnter();
          });
        }
      },
      {
        text: "No"
      }]
    });
    alerta.present();
  }

  public actualizando(refresher): any {
    this.rolesPrd.gets().subscribe(datos => {
      this.arreglo = datos;
      for (let item of this.arreglo) {
        if (item.rango == 1) {
          item.nombre_rango = "Todos los permisos";
        } else {
          item.nombre_rango = "Permisos limitados";
        }
      }
      refresher.complete();
    });
  }

}

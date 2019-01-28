import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController,FabContainer } from 'ionic-angular';
import { GenerosProvider } from '../../providers/generos/generos';
import { GeneroAddPage } from '../genero-add/genero-add';

/**
 * Generated class for the GeneroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-genero',
  templateUrl: 'genero.html',
})
export class GeneroPage {
  public arreglo: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,private generosPrd:GenerosProvider, private alertCtrl: AlertController,
    private toasCtrl: ToastController) {
  }

  ionViewDidEnter() {
    this.generosPrd.gets().subscribe(datos => {
      this.arreglo = datos;
    });
  }

  public agregar(fab: FabContainer){
    fab.close();
    this.navCtrl.push(GeneroAddPage,{boton:"Agregar"})
  }

  public actualizar(obj): any {

    this.navCtrl.push(GeneroAddPage,{parametro:obj,boton:"Actualizar"});
  }

  public eliminar(obj): any {
    let alerta = this.alertCtrl.create({
      title: "Aviso",
      message: "¿Desea eliminar el registro?",
      buttons: [{
        text: "Si",
        handler: () => {
          this.generosPrd.eliminar(obj.id).subscribe(datos => {
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
    this.generosPrd.gets().subscribe(datos => {
      this.arreglo = datos;
      refresher.complete();
    });
  }

}

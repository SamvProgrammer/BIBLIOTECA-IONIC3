import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController,FabContainer } from 'ionic-angular';
import { LibrosAddPage } from '../../pages/libros-add/libros-add';
import { LibrosProvider } from '../../providers/libros/libros';

/**
 * Generated class for the LibrosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-libros',
  templateUrl: 'libros.html',
})
export class LibrosPage {
  public arreglo: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,private librosPrd:LibrosProvider, private alertCtrl: AlertController,
    private toasCtrl: ToastController) {
  }

  ionViewDidEnter() {
    this.librosPrd.gets().subscribe(datos => {
      this.arreglo = datos;
    });
  }

  public agregar(fab: FabContainer){
    fab.close();
    this.navCtrl.push(LibrosAddPage,{boton:"Agregar"})
  }

  public actualizar(obj): any {

    this.navCtrl.push(LibrosAddPage,{parametro:obj,boton:"Actualizar"});
  }

  public eliminar(obj): any {
    let alerta = this.alertCtrl.create({
      title: "Aviso",
      message: "¿Desea eliminar el registro?",
      buttons: [{
        text: "Si",
        handler: () => {
          this.librosPrd.eliminar(obj.id).subscribe(datos => {
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
    this.librosPrd.gets().subscribe(datos => {
      this.arreglo = datos;
      refresher.complete();
    });
  }


}

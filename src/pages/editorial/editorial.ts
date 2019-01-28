import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController,FabContainer } from 'ionic-angular';
import { EditorialAddPage } from '../editorial-add/editorial-add';
import { EditorialProvider } from '../../providers/editorial/editorial';

/**
 * Generated class for the EditorialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-editorial',
  templateUrl: 'editorial.html',
})
export class EditorialPage {

  public arreglo: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,private editorialPrd:EditorialProvider, private alertCtrl: AlertController,
    private toasCtrl: ToastController) {
  }

  ionViewDidEnter() {
    this.editorialPrd.gets().subscribe(datos => {
      this.arreglo = datos;
    });
  }

  public agregar(fab: FabContainer){
    fab.close();
    this.navCtrl.push(EditorialAddPage,{boton:"Agregar"})
  }

  public actualizar(obj): any {

    this.navCtrl.push(EditorialAddPage,{parametro:obj,boton:"Actualizar"});
  }

  public eliminar(obj): any {
    let alerta = this.alertCtrl.create({
      title: "Aviso",
      message: "¿Desea eliminar el registro?",
      buttons: [{
        text: "Si",
        handler: () => {
          this.editorialPrd.eliminar(obj.id).subscribe(datos => {
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
    this.editorialPrd.gets().subscribe(datos => {
      this.arreglo = datos;
      refresher.complete();
    });
  }
}

import { Component } from '@angular/core';
import { Platform, MenuController, AlertController, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AndroidPermissions } from '@ionic-native/android-permissions';

import { PaginainicioPage } from '../pages/paginainicio/paginainicio';
import { PaginaentrarPage } from '../pages/paginaentrar/paginaentrar';
import { ConfiguracionPage } from '../pages/configuracion/configuracion';
import { UsuariosPage } from '../pages/usuarios/usuarios';
import { RolesPage } from '../pages/roles/roles';
import { LibrosPage } from '../pages/libros/libros';
import { EditorialPage } from '../pages/editorial/editorial';
import { GeneroPage } from '../pages/genero/genero';

import { LoginProvider } from '../providers/login/login';






@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = PaginaentrarPage;
  rootPage2: any = PaginainicioPage;

  inicio: any = PaginainicioPage;
  configuracion: any = ConfiguracionPage;
  usuarios:any = UsuariosPage;
  roles:any = RolesPage;
  libros:any = LibrosPage;
  editorial:any = EditorialPage;
  genero:any = GeneroPage;

  constructor(platform: Platform, public androidPermissions: AndroidPermissions, statusBar: StatusBar, splashScreen: SplashScreen,
    private prdVerificaEntrar: LoginProvider, private menuCtrl: MenuController, private alerta: AlertController,
    private toasCtrl: ToastController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      if (platform.is('cordova')) {
        this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_SMS)
          .then(success => {

          },
            err => {

            });

        this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.READ_SMS]);
      }
    });

  }

  public verificaEntrar(): boolean {
    return this.prdVerificaEntrar.getEntrar();
  }

  public verificaRol(): boolean {
    return this.prdVerificaEntrar.getActivaMenu();
  }

  public openPage(pagina) {
    this.menuCtrl.close();
    this.rootPage2 = pagina;
  }

  public salir() {

    let ms1 = this.alerta.create({
      title: 'Aviso',
      subTitle: '¿Desea salir del menú?',
      buttons: [{
        text: "Aceptar",
        handler: () => {
          this.menuCtrl.close();
          this.rootPage2 = this.inicio;
          const toast = this.toasCtrl.create({
            message: 'Se cerro sesión con exito',
            duration: 3000
          });
          toast.present();
          setTimeout(o => {
            this.prdVerificaEntrar.setActivaMenu(false);
          }, 100);
        }
      }, {
        text: "Cancelar",
        handler: () => { }
      }]

    });

    ms1.present();
  }
}

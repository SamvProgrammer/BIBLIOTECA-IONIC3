import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { Vibration } from '@ionic-native/vibration';
import { SMS } from '@ionic-native/sms';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { CurrencyPipe } from '@angular/common';



import { PaginaentrarPage } from '../pages/paginaentrar/paginaentrar';
import { ConfiguracionPage } from '../pages/configuracion/configuracion';
import { PaginainicioPage } from '../pages/paginainicio/paginainicio';
import { UsuariosPage } from '../pages/usuarios/usuarios';
import { RolesPage } from '../pages/roles/roles';
import { LibrosPage } from '../pages/libros/libros';
import { EditorialPage } from '../pages/editorial/editorial';
import { GeneroPage } from '../pages/genero/genero';
import { UsuariosAddPage } from '../pages/usuarios-add/usuarios-add';
import { RolesAddPage } from '../pages/roles-add/roles-add';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginProvider } from '../providers/login/login';
import { RolesProvider } from '../providers/roles/roles';


@NgModule({
  declarations: [
    MyApp,
    PaginaentrarPage,
    ConfiguracionPage,
    PaginainicioPage,
    UsuariosPage,
    RolesPage,
    LibrosPage,
    EditorialPage,
    GeneroPage,
    UsuariosAddPage,
    RolesAddPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PaginaentrarPage,
    ConfiguracionPage,
    PaginainicioPage,
    UsuariosPage,
    RolesPage,
    LibrosPage,
    EditorialPage,
    GeneroPage,
    UsuariosAddPage,
    RolesAddPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AndroidPermissions,
    LoginProvider,
    Vibration,
    SMS,
    CurrencyPipe,
    RolesProvider,
  ]
})
export class AppModule {}

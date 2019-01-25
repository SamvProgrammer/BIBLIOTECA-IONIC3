import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RolesProvider } from '../../providers/roles/roles';

/**
 * Generated class for the RolesAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-roles-add',
  templateUrl: 'roles-add.html',
})
export class RolesAddPage {
  myForm: FormGroup;
  public boton: string = "";
  private id;
  public arregloRoles: any = [];
  public arregloCarrito: any = [];
  private variable;
  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder: FormBuilder,
              private rolesPrd:RolesProvider,private toasCtrl:ToastController) {

    this.variable = this.navParams.get("parametro");
    this.boton = navParams.get("boton");

    if (this.variable == undefined) {
      const obj = { nombre: "", descripcion: "", precio: 0 }
      this.myForm = this.createMyForm(obj);
    } else {

      this.id = this.variable.id;
      this.myForm = this.createMyForm(this.variable);
    }
  }

  private createMyForm(obj) {
    return this.formBuilder.group({
      rol: [obj.rol, Validators.required],
      rango: [obj.rango, Validators.required]
    });
  }

  saveData() {
    let obj = this.myForm.value;
    let rol = obj.rol;
    let rango = obj.rango;

    obj = {
      rol: rol,
      rango: rango
    }
    
    if (this.boton == "Actualizar") {
        obj.id = this.variable.id;      
        this.rolesPrd.modificar(obj).subscribe(datos => {
        let toas = this.toasCtrl.create({message:"Registro actualizado correctamente",duration:1500});
        toas.present();
        });
    } else {
       this.rolesPrd.insertar(obj).subscribe(datos => {

         let toas = this.toasCtrl.create({message:"Registro insertado correctamente",duration:1500});
         toas.present();
       });
    }

    this.navCtrl.pop();
  }

}

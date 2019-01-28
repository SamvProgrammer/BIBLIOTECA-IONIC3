import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenerosProvider } from '../../providers/generos/generos';

/**
 * Generated class for the GeneroAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-genero-add',
  templateUrl: 'genero-add.html',
})
export class GeneroAddPage {

  myForm: FormGroup;
  public boton: string = "";
  private id;
  public arregloRoles: any = [];
  public arregloCarrito: any = [];
  private variable;
  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder: FormBuilder,
              private generosPrd:GenerosProvider,private toasCtrl:ToastController) {

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
      genero: [obj.genero, Validators.required]
    });
  }

  saveData() {
    let obj = this.myForm.value;
    let genero = obj.genero;

    obj = {
       genero:genero
    }
    
    if (this.boton == "Actualizar") {
        
        obj.id = this.variable.id;      
        this.generosPrd.modificar(obj).subscribe(datos => {
        let toas = this.toasCtrl.create({message:"Registro actualizado correctamente",duration:1500});
        toas.present();
        });
    } else {
       this.generosPrd.insertar(obj).subscribe(datos => {

         let toas = this.toasCtrl.create({message:"Registro insertado correctamente",duration:1500});
         toas.present();
       });
    }

    this.navCtrl.pop();
  }


}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditorialProvider } from '../../providers/editorial/editorial';

/**
 * Generated class for the EditorialAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-editorial-add',
  templateUrl: 'editorial-add.html',
})
export class EditorialAddPage {

  myForm: FormGroup;
  public boton: string = "";
  private id;
  public arregloRoles: any = [];
  public arregloCarrito: any = [];
  private variable;
  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder: FormBuilder,
              private editorialPrd:EditorialProvider,private toasCtrl:ToastController) {

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
      editorial: [obj.editorial, Validators.required]
    });
  }

  saveData() {
    let obj = this.myForm.value;
    let editorial = obj.editorial;

    obj = {
       editorial:editorial
    }
    
    if (this.boton == "Actualizar") {
        
        obj.id = this.variable.id;      
        this.editorialPrd.modificar(obj).subscribe(datos => {
        let toas = this.toasCtrl.create({message:"Registro actualizado correctamente",duration:1500});
        toas.present();
        });
    } else {
       this.editorialPrd.insertar(obj).subscribe(datos => {

         let toas = this.toasCtrl.create({message:"Registro insertado correctamente",duration:1500});
         toas.present();
       });
    }

    this.navCtrl.pop();
  }


}

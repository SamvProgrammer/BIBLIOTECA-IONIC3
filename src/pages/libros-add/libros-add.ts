import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LibrosProvider } from '../../providers/libros/libros';
import { GenerosProvider } from '../../providers/generos/generos';
import { EditorialProvider } from '../../providers/editorial/editorial';

/**
 * Generated class for the LibrosAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-libros-add',
  templateUrl: 'libros-add.html',
})
export class LibrosAddPage {

  myForm: FormGroup;
  public boton: string = "";
  private id;
  public arreglogenero: any = [];
  public arregloeditorial: any = [];
  private variable;
  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder: FormBuilder,
              private librosPrd:LibrosProvider,private toasCtrl:ToastController,
              private editorialPrd:EditorialProvider,private generoPrd:GenerosProvider) {

    this.variable = this.navParams.get("parametro");
    this.boton = navParams.get("boton");

    if (this.variable == undefined) {
      const obj = { nombre: "", descripcion: "", precio: 0 }
      this.myForm = this.createMyForm(obj);
    } else {

      this.id = this.variable.codigo;
      this.myForm = this.createMyForm(this.variable);
    }

    this.generoPrd.gets().subscribe(datos => {
      this.arreglogenero = datos;
    });

    this.editorialPrd.gets().subscribe(datos => {
      this.arregloeditorial = datos;
    });

  }

  private createMyForm(obj) {
    return this.formBuilder.group({
      codigo: [obj.codigo, Validators.required],
      nombre: [obj.nombre, Validators.required],
      total: [obj.total, Validators.required],
      cantidad: [obj.cantidad, Validators.required],
      autor: [obj.autor, Validators.required],
      genero:[obj.idGenero, Validators.required],
      editorial:[obj.idEditorial, Validators.required]
    });
  }

  saveData() {
    let obj = this.myForm.value;
    let codigo = obj.codigo;
    let nombre = obj.nombre;
    let total = obj.total;
    let cantidad = obj.cantidad;
    let autor = obj.autor;
    let genero = obj.genero;
    let editorial = obj.editorial;

    obj = {
       codigo:codigo,
       nombre:nombre,
       total:total,
       cantidad:cantidad,
       autor:autor,
       idEditorial:editorial,
       idGenero:genero
    }
    console.log(obj);
    if (this.boton == "Actualizar") {
        
        obj.id = this.variable.codigo;      
        this.librosPrd.modificar(obj).subscribe(datos => {
        let toas = this.toasCtrl.create({message:"Registro actualizado correctamente",duration:1500});
        toas.present();
        });
    } else {
       this.librosPrd.insertar(obj).subscribe(datos => {

         let toas = this.toasCtrl.create({message:"Registro insertado correctamente",duration:1500});
         toas.present();
       });
    }

    this.navCtrl.pop();
  }


}

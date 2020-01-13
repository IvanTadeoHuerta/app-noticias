import { Injectable } from '@angular/core';
import { Article } from '../interfaces/interfaces';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias: Article[] =[];

  constructor( private storage: Storage , public toastController: ToastController) { 
    this.cargarFavoritos();
  }

  guardarNoticia( noticia: Article){

    const existe = this.noticias.find( noti => noti.title === noticia.title );

    if( !existe){
      this.noticias.unshift( noticia );
      this.storage.set('favoritos', this.noticias );
    }

  }

  async cargarFavoritos(){

    // this.storage.get('favoritos')
    //   .then( favoritos =>{

    //     console.log('favoritos', favoritos )

    //   });

    const favoritos =  await this.storage.get('favoritos');

    if( favoritos ){
      this.noticias = favoritos;
    }

    this.presentToast( 'Agregado a favoritos');


  }

  borrarNoticia( noticia: Article ){

    this.noticias = this.noticias.filter( noti => noti.title != noticia.title);
    this.storage.set('favoritos', this.noticias );
    this.presentToast( 'Eliminado de favoritos');

  }


  async presentToast( mensaje: string ) {
    const toast = await this.toastController.create({
      message: mensaje ,
      duration: 1500
    });
    toast.present();
  }

}

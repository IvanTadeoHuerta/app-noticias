import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController, Platform } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from 'src/app/services/data-local.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() indice: number;
  @Input() enFavorito = false;

  constructor(private iab: InAppBrowser,
    private actionSheetController: ActionSheetController,
    private socialSharing: SocialSharing,
    private service: DataLocalService,
    private platform: Platform) { }

  ngOnInit() { }

  abrirNoticia() {

    const browser = this.iab.create(this.noticia.url, '_system');

  }

  async lanzarMenu() {

    let guardarBorrarBtn;

    if (this.enFavorito) {
      // Borrar de favoritos
      guardarBorrarBtn = {
        text: 'Borrar Favorito',
        cssClass: 'action-dark',
        icon: 'trash',
        handler: () => {
          console.log('Favortios borrar clicked');
          this.service.borrarNoticia(this.noticia);
        }
      };

    } else {

      guardarBorrarBtn = {
        text: 'Favoritos',
        cssClass: 'action-dark',
        icon: 'arrow-dropright-circle',
        handler: () => {
          console.log('Favortios clicked');
          this.service.guardarNoticia(this.noticia);
        }
      };

    }

    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'Compartir',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Share clicked');
          this.compartirNoticia();
        }
      },
        guardarBorrarBtn
        , {
        text: 'Cancelar',
        cssClass: 'action-dark',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

  }

  compartirNoticia() {

    if (this.platform.is('cordova')) {

      this.socialSharing.share(
        this.noticia.title,
        this.noticia.source.name,
        '',
        this.noticia.url
      );

    } else {

      if (navigator['share']) {

        navigator['share']({
          title:  this.noticia.title,
          text: this.noticia.description,
          url: this.noticia.url,
        })
          .then(() => console.log('Successful share'))
          .catch((error) => console.log('Error sharing', error));
      }else{
        alert('Funcion no soportada')
      }

    }


  }


}

import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Article } from 'src/app/interfaces/interfaces';
// import { Article } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild(IonSegment, null) segment: IonSegment;

  categorias: Array<string> =[
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology'
  ];

  noticias: Article[] = [];


  constructor( private service: NoticiasService) {}

  ngOnInit():void{

   

    this.cargarNoticias( this.categorias[0] );

  }

  cambioCategoria( event ){

    this.noticias = [];
    this.cargarNoticias( event.detail.value  );

  }


  cargarNoticias( categoria: string , evento?){

    this.service.getTopHeadLinesCategoria( categoria )
    .subscribe((resp ) =>{


      this.noticias.push( ...resp.articles );

      
      if( evento ){
        evento.target.complete();
      }

    });

  }

  loadData( event) {

    this.cargarNoticias( this.segment.value, event );

  }

}

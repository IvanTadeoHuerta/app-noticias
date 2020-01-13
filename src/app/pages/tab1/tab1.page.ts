import { Component, OnInit } from '@angular/core';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Article, RespuestaTopHeadlines } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {


  noticias: Article[] = [];

  constructor(private service: NoticiasService) { }

  ngOnInit(): void {

    this.cargarNoticias();

  }

  loadData(event) {

    this.cargarNoticias(event);

  }

  cargarNoticias(event?) {

    this.service.getTopHeadlines()
      .subscribe((resp) => {

        if( resp.articles.length === 0){
          
          event.target.disabled = true;
          event.target.complete();

          return;
        }

        this.noticias.push(...resp.articles);

        if (event) {
          event.target.complete();
        }

      });

  }

}

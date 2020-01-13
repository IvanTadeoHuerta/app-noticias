import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadlines, Article } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';

const apikey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-key': apikey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  private headLinePage = 0;


  private categoriaActual = '';
  private categoriaPage = 0;

  private ejecutarQuery<T>(query: string) {

    query = apiUrl + query;

    return this.http.get<T>(query, { headers });

  }

  constructor(private http: HttpClient) { }

  getTopHeadlines() {

    this.headLinePage++;

    return this.ejecutarQuery<RespuestaTopHeadlines>('/everything?q=bitcoin&from=2019-12-13&sortBy=publishedAt&page=' + this.headLinePage);

    //return this.http.get<RespuestaTopHeadlines>(`https://newsapi.org/v2/everything?q=bitcoin&from=2019-12-10&sortBy=publishedAt&apiKey=ff6cac1b5b3b40ababc0210cf1080029`);
  }

  getTopHeadLinesCategoria(cateogira: string) {


    if (this.categoriaActual == cateogira) {
      this.categoriaPage++;
    } else {
      this.categoriaPage = 1;
      this.categoriaActual = cateogira;
    }
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=mx&category=${cateogira}&page${ this.categoriaPage}`);
    // return this.http.get(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=ff6cac1b5b3b40ababc0210cf1080029`);
  }



}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { newResponse } from '../interfaces';

const apiKey= environment.apikey;
const url=environment.url;

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor( private http:HttpClient) { }

  getTopHeadLines(page:number, category:string){
    return this.http.get<newResponse>(`${url}/top-headlines`,{
   params : {
      apikey:apiKey,
      category: category,
      country:'us',
      page:page
   }

    })
  }
}

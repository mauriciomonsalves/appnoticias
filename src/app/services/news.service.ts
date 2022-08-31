import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { newResponse } from '../interfaces';

const apiKey= environment.apikey;

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor( private http:HttpClient) { }

  getTopHeadLines(){
    return this.http.get<newResponse>(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}`)
  }
}

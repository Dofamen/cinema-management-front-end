import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {

  private host:String = "http://localhost:8080/"

  constructor(private http:HttpClient) { }

  public getVilles(){
    return this.http.get(this.host+"villes");
  }

  getCinemas(ville: any) {
      return  this.http.get(ville._links.cinemas.href);
  }

  getSalles(cinema: any) {
    return  this.http.get(cinema._links.salles.href);
  }
}

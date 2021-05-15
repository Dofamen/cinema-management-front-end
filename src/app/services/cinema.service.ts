import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {

  public host:String = "http://localhost:8080/"

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

  getProjections(salle) {
    //http://localhost:8080/projections/1?projection=f1
    let url = salle._links.projections.href.replace("{?projection}", "");
    return this.http.get(url+"?projection=f1");
  }

  getTicketsPlaces(p: any) {
    let url = p._links.tickets.href.replace("{?projection}", "");
    return this.http.get(url+"?projection=ticketProj");
  }

  payerTickets(dataForm) {
    return this.http.post(this.host + "/payerTickets", dataForm);
  }
}

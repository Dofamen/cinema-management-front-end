import { Component, OnInit } from '@angular/core';
import {CinemaService} from '../services/cinema.service';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {

  public villes:any;
  public cinemas:any;
  public salles:any;
  public currentVille;
  public currentCinema;
  public currentProjection: any;
  public selectedTickets: any[] = [];

  constructor(public cinemaService:CinemaService) { }

  ngOnInit(): void {
      this.cinemaService.getVilles()
        .subscribe(data =>{
          this.villes = data;
        }, error => {
          console.log(error);
        });
  }

  onGetCinemas(ville: any) {
    this.currentVille = ville;
    this.currentCinema= undefined
    this.salles = undefined;
    this.cinemaService.getCinemas(ville)
      .subscribe(data => {
        this.cinemas = data;
      }, error => {
        console.log(error);
      });
  }

  onGetSalles(cinema: any) {
    this.currentCinema = cinema;
    this.currentProjection = undefined;
    this.cinemaService.getSalles(cinema)
      .subscribe(data => {
        this.salles = data;
        this.salles._embedded.salles.forEach(salle =>{
          this.cinemaService.getProjections(salle)
            .subscribe(result =>{
              salle.projections=result;
            }, err =>{
              console.log(err);
            })
        });
      }, error => {
        console.log(error);
      });
  }

  onGetTickersPlaces(p: any) {
    this.currentProjection = p;
    this.cinemaService.getTicketsPlaces(p)
      .subscribe(data => {
       this.currentProjection.tickets = data;
      }, error => {
        console.log(error);
      });

  }

  onSelectTicket(t) {
    if (!t.selected){
      t.selected=true;
      this.selectedTickets.push(t);
    }else {
      t.selected=false;
      this.selectedTickets.splice(this.selectedTickets.indexOf(t), 1);
    }

  }

  getTicketClass(t: any) {
    let clas = "btn m-1 ";
    if (t.selected){
      clas+="btn-warning"
    }else {
      clas+="btn-outline-success"
    }
    return clas;
  }

  onPayTickets(dataForm) {
    let ticket_id = [];
    this.selectedTickets.forEach(v => {
      ticket_id.push(v.id);
    });

    dataForm.ticket_id = ticket_id;
    this.cinemaService.payerTickets(dataForm)
      .subscribe(data => {
          alert('succeeded');
          this.selectedTickets = [];
          this.onGetTickersPlaces(this.currentProjection);
        }
        , error => {
          alert("Failed");
        });
  }

}

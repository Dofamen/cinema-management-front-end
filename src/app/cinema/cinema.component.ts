import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
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

  constructor(private cinemaService:CinemaService) { }

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
    this.cinemaService.getCinemas(ville)
      .subscribe(data => {
        this.cinemas = data;
      }, error => {
        console.log(error);
      });
  }

  onGetSalles(cinema: any) {
    this.currentCinema = cinema;
    this.cinemaService.getSalles(cinema)
      .subscribe(data => {
        this.salles = data;
      }, error => {
        console.log(error);
      });

  }
}

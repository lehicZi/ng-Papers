import { VideoService } from './../../../video/video.service';
import { reducers } from './../../../app-reducer';
import { Component, OnInit, NgModule } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../app-reducer'
import { take } from 'rxjs';

@Component({
  selector: 'app-infos',
  templateUrl: './infos.component.html',
  styleUrls: ['./infos.component.scss']
})
export class InfosComponent implements OnInit{

  currentTab! : string
  
  nbFilms!: number
  nbSeries!: number
  nbTotalVideos!: number

  message!: string

  constructor(private store: Store<fromRoot.State>, private videoService: VideoService){}

  ngOnInit(){

    this.store.select(fromRoot.getCurrentState).pipe(take(1)).subscribe(

      tab => this.store.select(fromRoot.getList(tab)).pipe(take(1)).subscribe(

        list => {

          this.nbFilms = list.filter( video => video.type == "FILM").length
          this.nbSeries = list.filter( video => video.type == "SERIES").length
          
          this.nbTotalVideos = this.nbFilms + this.nbSeries

          this.setMessage(tab)

        }

      )

    )

  }

  setMessage(tab: string){

    switch(tab) {

      case "TOADD" :
        this.message = `Il reste ${this.nbTotalVideos} vidéos à ajouter :\n${this.nbFilms} films et ${this.nbSeries} séries.`
        break

      case "ADDED" :
        this.message = `Il reste ${this.nbTotalVideos} vidéos à voir :\n${this.nbFilms} films et ${this.nbSeries} séries.`
        break

      case "TOSEE" :
        this.message = `On a tiré ${this.nbTotalVideos} vidéos :\n${this.nbFilms} films et ${this.nbSeries} séries.`
        break

      case "SEEN":
        this.message = `On a vu ${this.nbTotalVideos} vidéos :\n${this.nbFilms} films et ${this.nbSeries} séries.`
        break

      default:
        throw Error("This tab does not exist !")
    }
  }

}

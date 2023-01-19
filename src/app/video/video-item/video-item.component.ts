import { DeleteVideoComponent } from './delete-video/delete-video.component';
import { VideoService } from './../video.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Video } from './../model/video.model';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, EventEmitter, Output, HostListener } from '@angular/core';
import * as fromRoot from '../../app-reducer'
import { outputAst } from '@angular/compiler';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-item',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.scss']
})
export class VideoItemComponent implements OnInit{

  @Input()
  video!: Video
  @Input()
  currentSate!: string

  btnLabel = "BOUTON"
  typeLabel = "type"

  dispo!: boolean

  constructor(private dialog: MatDialog, 
      private store: Store<fromRoot.State>, 
      private videoService: VideoService,
      private router: Router){}

  ngOnInit(): void {

    this.dispo = this.video.dispo

    switch(this.currentSate){

      case "TOADD" :
        this.btnLabel = "Ajouté"
        break
      case "ADDED" :
        this.btnLabel = "Tiré"
        break
      case "TOSEE" :
        this.btnLabel = "Vu"
        break
      case "SEEN" :
        break
      default:
        throw Error("This state does not exist !")
    }

    switch(this.video.type){
      case "FILM":
        this.typeLabel = "Film"
        break
      case "SERIES":
        this.typeLabel = "Série"
        break
    }

  }

  changeStatus(event: Event){
    this.videoService.changeVideoStatus(this.video)
    event.stopPropagation()
  }

  DeleteVideo(event: Event){
    const dialogRef = this.dialog.open(DeleteVideoComponent, 
      {data : {
        title : this.video.title
      }})

    event.stopPropagation()

    dialogRef.afterClosed().subscribe(v => {
      if(v){
        this.videoService.deleteVideo(this.video)
      }
    })
    
  }

  getTypeClass(){
    switch(this.video.type){
      case "FILM":
        return 'type-film'
      case "SERIES":
        return 'type-series'
    }
  }

  changeVideoDispo(event: Event){
    this.videoService.updateVideoDispo({
      ...this.video,
      dispo : this.dispo
    })
    event.stopPropagation()
  }

  @HostListener('click')
  openDetails(){
    this.router.navigateByUrl(`/videoDetails/${this.video.id}`)
  }

}

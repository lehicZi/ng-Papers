import { VideoService } from './../video.service';
import { Component, Input, OnInit } from '@angular/core';
import { Video } from '../model/video.model';
import * as fromRoot from '../../app-reducer'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as VideoActions from '../video.actions'

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent implements OnInit {

  constructor(private store: Store<fromRoot.State>,private videoService: VideoService){}

  @Input()
  currentTab!: string

  videoList$!: Observable<Video[]>


  ngOnInit(): void {

    this.getVideoList()

    this.store.select(fromRoot.getIsFiltered).subscribe(
      filtered => {
        if (filtered) {
          this.getFilteredVideoList()
        }
        else{
          this.getVideoList()
        }
      }
    )
  }

  getVideoList() {
    this.videoList$ = this.store.select(fromRoot.getList(this.currentTab))
  }

  getFilteredVideoList(){
    this.videoList$ = this.store.select(fromRoot.getFilteredList(this.currentTab))
  }

}

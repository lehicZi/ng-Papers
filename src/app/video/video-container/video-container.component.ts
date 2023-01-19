import { VideoService } from './../video.service';
import { Store } from '@ngrx/store';
import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import * as video from '../video.actions'
import * as fromApp from '../../app-reducer'
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { take } from 'rxjs';

@Component({
  selector: 'app-video-container',
  templateUrl: './video-container.component.html',
  styleUrls: ['./video-container.component.scss']
})
export class VideoContainerComponent implements OnInit, AfterViewInit{

  public currentTab = 0
  
  @ViewChild("tabGroup", { static: false }) 
  tabGroup!: MatTabGroup;

  constructor(private store: Store<fromApp.State>, private videoSerice: VideoService){}

  ngOnInit(): void {

    this.videoSerice.getVideoLists()
    
  }

  ngAfterViewInit() {

    this.store.select(fromApp.getCurrentState).pipe(take(1)).subscribe(
      tab => {
        switch (tab) {
          case "TOADD" :
            this.currentTab = 0
            break
          case "ADDED" :
            this.currentTab = 1
            break
          case "TOSEE":
            this.currentTab = 2
            break
          case "SEEN":
            this.currentTab = 3
            break
        }

        this.tabGroup.selectedIndex = this.currentTab
      }
    )
    
  }

  changeState(change: MatTabChangeEvent){

    switch(change.index){

      case 0 :
        this.store.dispatch(new video.SetCurrentSate("TOADD"))
        break
      case 1 :
        this.store.dispatch(new video.SetCurrentSate("ADDED"))
        break
      case 2 :
        this.store.dispatch(new video.SetCurrentSate("TOSEE"))
        break
      case 3 :
        this.store.dispatch(new video.SetCurrentSate("SEEN"))
        break
      default:
        throw Error("This tab does not exist")

    }
    
  }
}

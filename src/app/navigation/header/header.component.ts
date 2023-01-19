import { InfosComponent } from './infos/infos.component';

import { VideoService } from './../../video/video.service';
import { Store } from '@ngrx/store';
import { Component, ElementRef, EventEmitter, Output, ViewChild, OnInit } from '@angular/core';
import * as fromRoot from "../../app-reducer"
import * as VideoActions from "../../video/video.actions"
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  @Output() sideNavToggle = new EventEmitter<void>()

  @ViewChild('searchInput') searchInput!: ElementRef;
  @ViewChild('searchField', {read: ElementRef}) searchField!: ElementRef;

  search = false
  currentTab = "TOADD"
  searchQuerry!: string

  constructor(private store: Store<fromRoot.State>, private videoService: VideoService, private dialog: MatDialog){}

  ngOnInit(): void {

    this.store.select(fromRoot.getCurrentState).subscribe(
      tab =>{
        
        this.currentTab = tab

        if (this.search){
          this.onWordTyped()
        }
        
      } 
    )
    
  }

  onToggleSidenav(){
    this.sideNavToggle.emit()
  }

  onSearchClick(){

    this.search = !this.search

    if(this.search){

      this.searchField.nativeElement.style.display = "block"
      this.searchInput.nativeElement.focus()
      this.store.dispatch(new VideoActions.SetIsFiltered)
      
    }

    else{
      
      this.searchField.nativeElement.style.display = "none"
      this.searchInput.nativeElement.value = ''
      this.videoService.unFilter(this.currentTab)
      this.store.dispatch(new VideoActions.SetIsUnfiltered)
    }
  }

  onWordTyped(){
    
    this.videoService.searchOn(this.currentTab, this.searchQuerry)
  }

  openInfos(){
    this.dialog.open(InfosComponent)
  }
}

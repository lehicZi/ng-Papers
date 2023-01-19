import { VideoService } from './../video.service';
import { Store } from '@ngrx/store';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as fromRoot from '../../app-reducer'
import * as VideoActions from '../video.actions'
import { TitleStrategy } from '@angular/router';

@Component({
  selector: 'app-add-video',
  templateUrl: './add-video.component.html',
  styleUrls: ['./add-video.component.scss']
})
export class AddVideoComponent implements OnInit {

  @Input()
  currentTab!: string  

  addVideoForm!: FormGroup

  @ViewChild('titleInput') titleInput!: ElementRef;

  constructor(private store: Store<fromRoot.State>, private videoService: VideoService){}

  ngOnInit(): void {
    
    this.addVideoForm = new FormGroup({
      title: new FormControl('', {validators: [Validators.required]}),
      type: new FormControl('', {validators: [Validators.required]}),
      dispo: new FormControl('true'),
    })

  }

  onSubmit() {
    const videoToadd = {
      ...this.addVideoForm.value,
      status: this.currentTab,
    }
    
    this.videoService.addVideo(videoToadd)

    this.titleInput.nativeElement.value =''
    
  }
}

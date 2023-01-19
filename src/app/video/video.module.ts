import { UIModule } from './../UI/ui.module';
import { HourMinPipe } from './../pipe/hour.pipe';
import { PipePipe } from './../pipe/pipe.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoListComponent } from './video-list/video-list.component';
import { VideoItemComponent } from './video-item/video-item.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { VideoContainerComponent } from './video-container/video-container.component';
import {MatTabsModule} from '@angular/material/tabs';
import { AddVideoComponent } from './add-video/add-video.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import { DeleteVideoComponent } from './video-item/delete-video/delete-video.component';
import {MatDialogModule} from '@angular/material/dialog'
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { HttpClientModule } from '@angular/common/http';
import { VideodetailsComponent } from './detail/videodetails/videodetails.component';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    VideoListComponent,
    VideoItemComponent,
    VideoContainerComponent,
    AddVideoComponent,
    PipePipe,
    DeleteVideoComponent,
    VideodetailsComponent,
    HourMinPipe
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatTabsModule,
    MatExpansionModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatRadioModule,
    MatDialogModule,
    MatSlideToggleModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    MatProgressSpinnerModule,
    UIModule
  ],
  exports: [
    VideoListComponent,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatRadioModule,
    MatExpansionModule
  ]
})
export class VideoModule { }

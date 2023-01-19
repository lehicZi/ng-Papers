import { VideoContainerComponent } from './video/video-container/video-container.component';



import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideodetailsComponent } from './video/detail/videodetails/videodetails.component';

const routes: Routes = [
    {path: '', component:VideoContainerComponent, pathMatch: 'full', data: {
        reuseRoute: true
    }},
    {path: 'videoDetails/:videoId', component:VideodetailsComponent},
]

@NgModule({
    imports:[
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule],
})
export class AppRoutingModule{}
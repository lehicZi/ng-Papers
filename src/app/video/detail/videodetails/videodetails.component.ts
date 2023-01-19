import { DetailedSeries } from './../model/detailed-series.model';
import { DetailedFilm } from './../model/detailed-film.model';
import { VideoService } from './../../video.service';
import { VideoDetailService } from './../video-detail.service';
import { Video } from './../../model/video.model';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteVideoComponent } from '../../video-item/delete-video/delete-video.component';

@Component({
  selector: 'app-videodetails',
  templateUrl: './videodetails.component.html',
  styleUrls: ['./videodetails.component.scss']
})
export class VideodetailsComponent implements OnInit{

  videoId!: string | null
  video!: Video

  filmDetail!: DetailedFilm
  seriesDetail!: DetailedSeries

  @ViewChild('renameDiv') 
  renameDiv!: ElementRef;
  @ViewChild('searchInput') searchInput!: ElementRef;
  rename = false

  isLoading = true

  notFound = false

  constructor(private detailService: VideoDetailService, 
    private route: ActivatedRoute, 
    private router: Router,
    private videoService: VideoService,
    private dialog: MatDialog){}

  ngOnInit(): void {

    this.videoId = this.route.snapshot.paramMap.get("videoId")

    if (this.videoId){
      
      this.videoService.getVideoById(this.videoId as string).pipe(take(1)).subscribe(

        video => {
            this.video = {
            ...video,
            id : this.videoId as string
            
          }

          //console.log(this.video);
          

          this.detailService.getVideoid(this.video).pipe(take(1)).subscribe(

            result => {
      
              if (result.results.length > 0) {
      
                //console.log(result.results[0].id);
                this.detailService.getVideoDetails(this.video, result.results[0].id).pipe(take(1)).subscribe(
                  details => {

                    if (this.video.type == "FILM") {

                      this.filmDetail = details as DetailedFilm
                      this.filmDetail = {
                        ...this.filmDetail,
                        poster_path : `https://image.tmdb.org/t/p/w500${this.filmDetail.poster_path}`
                      }

                      this.isLoading = false

                    }

                    else if (this.video.type == "SERIES") {

                      this.seriesDetail = details as DetailedSeries
                      this.seriesDetail = {
                        ...this.seriesDetail,
                        poster_path : `https://image.tmdb.org/t/p/w500${this.seriesDetail.poster_path}`
                      }

                      this.seriesDetail.networks.forEach(network => {
                        network.logo_path = `https://image.tmdb.org/t/p/w500${network.logo_path}`
                      })
                      this.isLoading = false
                      
                    }

                  }
                )
      
              }
      
              else {

                this.notFound = true
                this.isLoading = false
      
              }
      
            }
      
          )

          
        }
        
      )
    }
    
  }

  deleteVideo(){
    const dialogRef = this.dialog.open(DeleteVideoComponent, 
      {data : {
        title : this.video.title
      }})


    dialogRef.afterClosed().subscribe(v => {
      if(v){
        this.videoService.deleteVideo(this.video)
        this.router.navigateByUrl('')
      }
    })
    
  }

  renameVideo(){
    this.rename = !this.rename

    if(this.rename){

      this.renameDiv.nativeElement.style.display = "flex"
      this.searchInput.nativeElement.focus()
      
    }

    else{
      
      this.renameDiv.nativeElement.style.display = "none"
    }

    
  }

  okRename(){
    this.videoService.updateVideoName(this.video).then(() => {
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate([`/videoDetails/${this.videoId}`]));
    })
  }

  goBack(){
    this.router.navigateByUrl('')
  }

  changeVideoDispo(){
    this.videoService.updateVideoDispo(this.video)
  }
}

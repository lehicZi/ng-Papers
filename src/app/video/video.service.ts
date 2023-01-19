import { UIService } from './../UI/ui.service';
import { Video } from './model/video.model';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import * as fromRoot from '../app-reducer'
import * as VideoActions from './video.actions'
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  dbSub!: Subscription

  constructor(private store: Store<fromRoot.State>, private db: AngularFirestore, private uiService: UIService) { }

  getVideoLists(){

    this.dbSub = this.db.collection('videos')
    .snapshotChanges()
    .pipe(
      map(docData => {
      return docData.map(data => {
        return {
          id : data.payload.doc.id,
          ...(data.payload.doc.data() as object)
        } as Video
      })
    }))
    .subscribe({
      
      next :
        videos => {
          this.store.dispatch(new VideoActions.SetList({list: "TOADD", videos: videos.filter(video => video.status == "TOADD")}))
          this.store.dispatch(new VideoActions.SetList({list: "ADDED", videos: videos.filter(video => video.status == "ADDED")}))
          this.store.dispatch(new VideoActions.SetList({list: "TOSEE", videos: videos.filter(video => video.status == "TOSEE")}))
          this.store.dispatch(new VideoActions.SetList({list: "SEEN", videos: videos.filter(video => video.status == "SEEN")}))
        },
      
      error :
          e => {
            this.uiService.openSnackBar("Impossible de récupérer les données", "OK :(")
          }
      
    })
  }

  getVideoById(id: string) : Observable<Video>{
    return this.db.collection('videos').doc(id).valueChanges() as Observable<Video>
  }

  addVideo(videoToadd: any){
    this.db.collection('videos').add(videoToadd)
  }

  deleteVideo(video: Video){

    this.db.collection('videos').doc(video.id).delete().then(() =>{

      this.store.dispatch(new VideoActions.PopVideo(video))
    })

  }

  changeVideoStatus(video: Video){

    let newStatus: string

    switch(video.status) {

      case "TOADD" :
        newStatus = "ADDED"
        break

      case "ADDED" :
        newStatus = "TOSEE"
        break

      case "TOSEE" :
        newStatus = "SEEN"
        break

      default:
        throw Error("This tab does not exist !")
    }

    this.db.collection('videos').doc(video.id).update({status: newStatus})
  }

  searchOn(tab: string, query: string){
    this.store.dispatch(new VideoActions.FilterList({list: tab, query: query}))
  }

  unFilter(tab: string){

    this.searchOn(tab, '')

  }

  updateVideoDispo(video: Video){
    this.db.collection('videos').doc(video.id).update({dispo : video.dispo})
  }

  updateVideoName(video: Video){
    return this.db.collection('videos').doc(video.id).update({title : video.title})
  }
}

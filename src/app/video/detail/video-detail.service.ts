import { DetailedSeries } from './model/detailed-series.model';
import { DetailedFilm } from './model/detailed-film.model';
import { Observable } from 'rxjs';
import { SearchVideoResult } from './model/search-video-result.model';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Video } from '../model/video.model';

@Injectable({
  providedIn: 'root'
})
export class VideoDetailService {

  constructor(private http: HttpClient) { }

  getVideoid(video: Video): Observable<SearchVideoResult>{

    if (video.type == "FILM"){

      return this.http.get<SearchVideoResult>(`${environment.movieDB.url}search/movie?api_key=${environment.movieDB.apiKey}&query=${video.title}&language=fr`)

    }

    else {

      return this.http.get<SearchVideoResult>(`${environment.movieDB.url}search/tv?api_key=${environment.movieDB.apiKey}&query=${video.title}&language=fr`)
    }
  }

  getVideoDetails(video: Video, id: number): Observable<DetailedFilm | DetailedSeries>{

    if (video.type == "FILM"){

      return this.http.get<DetailedFilm>(`${environment.movieDB.url}movie/${id}?api_key=${environment.movieDB.apiKey}&query=${video.title}&language=fr`)

    }

    else {

      return this.http.get<DetailedSeries>(`${environment.movieDB.url}tv/${id}?api_key=${environment.movieDB.apiKey}&query=${video.title}&language=fr`)
    }

  }


}

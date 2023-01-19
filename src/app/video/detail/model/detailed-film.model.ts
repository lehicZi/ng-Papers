import { Country } from './country.model';
import { Genre } from './genre.model';
export interface DetailedFilm{
    id : number,
    genres: Genre[],
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    runtime: number,
    vote_average: number,
    title: string,
    status: string,
    production_countries: Country[]
}
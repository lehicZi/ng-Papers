import { Network } from './network.model';
import { Country } from './country.model';
import { Genre } from './genre.model';
export interface DetailedSeries{
    id : number,
    genres: Genre[],
    first_air_date: string,
    name: string,
    number_of_episodes: number,
    number_of_seasons: number,
    original_name: string,
    original_language: string,
    overview: string,
    popularity: number,
    poster_path: string,
    production_countries: Country[]
    vote_average: number,
    status: string,
    in_production: boolean,
    last_air_date: string,
    networks: Network[]
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from './movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apiUrl = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  public getMovies(): Observable<Movie[]> {
     return this.http.get<Movie[]>(`${this.apiUrl}/movie/all`);
  }
  
  public addMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(`${this.apiUrl}/movie/add`, movie);
  }
  
  public updateMovie(movie: Movie): Observable<Movie> {
    return this.http.put<Movie>(`${this.apiUrl}/movie/update`, movie);
  }

  public deleteMovie(movieId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/movie/delete/${movieId}`);
  }

}

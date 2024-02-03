import { Component, OnInit, ViewChild } from '@angular/core';
import { Movie } from './movie';
import { MovieService } from './movie.service';;
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  
  public movies: Movie[] = [];
  public editMovie: Movie;
  public deleteMovie: Movie;

  constructor(private movieService: MovieService){}
  
  ngOnInit(): void {
    this.getMovies();
  }

  public getMovies(): void {
      this.movieService.getMovies().subscribe(
        (response: Movie[]) => {
          this.movies = response;
        },
        (error: HttpErrorResponse) =>{
          alert(error.message);
        }
      )
          
  }

  public onAddMovie(addForm: NgForm): void {
    document.getElementById('add-movie-form').click();
    this.movieService.addMovie(addForm.value).subscribe(
        (response: Movie) =>{
          console.log(response);
          this.getMovies();
          addForm.reset();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
          addForm.reset();
        }
    )

  }

  public onEditMovie(movie: Movie): void {
    this.movieService.updateMovie(movie).subscribe(
        (response: Movie) =>{
          this.getMovies();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
    )

  }

  public onDeleteMovie(movieId: number): void {
    this.movieService.deleteMovie(movieId).subscribe(
        (response: void) =>{
          console.log(response);
          this.movieService.getMovies();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
    )

  }

  public searchMovie(key: string): void {
    const results : Movie[] = [];

    for (const movie of this.movies) {
      if (movie.title.toLowerCase().indexOf(key.toLowerCase()) !== -1 || movie.genre.toLowerCase().indexOf(key.toLowerCase()) !== -1 || movie.premiere.toLowerCase().indexOf(key.toLowerCase()) !== -1){
          results.push(movie);
      }
    }

    this.movies = results;
    if(results.length === 0 || !key){
      this.getMovies();
    }
  
  }



  public onOpenModal(movie: Movie, mode:string): void {
        const container = document.getElementById('main-container');
        const button = document.createElement('button');
        

        button.type = 'button';
        button.style.display = 'none';
        button.setAttribute('data-toggle', 'modal');
        if (mode === 'add') {
          button.setAttribute('data-target',"#addMovieModal");        
        }
        if (mode === 'edit') {
          this.editMovie = movie;
          button.setAttribute('data-target',"#editMovieModal");
        }
        if (mode === 'delete') {
            this.deleteMovie = movie;
            button.setAttribute('data-target',"#deleteMovieModal");
        }

        container?.appendChild(button);
        button.click();

  }

  public reloadCurrentPage(){

      window.location.reload();

  }

}

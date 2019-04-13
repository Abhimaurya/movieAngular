import { Component, ViewEncapsulation, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { movieList } from '../constants.js';

const convertToDate: any = (str)=>{
    const parts = str.split("-");
    return new Date(parts[2],parts[1],parts[0]);
}

@Component({
  selector: 'movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class MovieListComponent implements OnInit {
  movies: Array<{Title: string, Date: string, Rating: number, UserRating:number}>;
  titleOrder: String;
  dateOrder: String;
  ratingOrder: String;
  userRatingOrder: String;
  startMovieIndex:number;
  moviesCount:number;
  isLogin:boolean = false;
  sub:any;

  constructor(private route: ActivatedRoute) {
    this.startMovieIndex = 0;
    this.isLogin = Boolean(window.sessionStorage.getItem('isLogin'));  
    this.titleOrder = this.dateOrder = this.ratingOrder = this.userRatingOrder = 'asc';
  }

  getArray(num){
    return new Array(num);
  }

  ngOnInit(){
    const endIndex = this.startMovieIndex + 11;
    let movieListParsed = JSON.parse(window.sessionStorage.getItem('movieList')) || movieList;  
    this.movies = movieListParsed.slice(this.startMovieIndex,endIndex);
    this.moviesCount = movieListParsed.length;
  }

  login(){
    this.isLogin = true;
    window.sessionStorage.setItem('isLogin',"true");
  }

  setRating(movIndex,rating){
    movieList[this.startMovieIndex+movIndex].UserRating = rating;
    window.sessionStorage.setItem('movieList',JSON.stringify(movieList)); 
  }


  loadMoreMovies(prevOrnext){
    if(prevOrnext == 'next'){
      if(this.startMovieIndex+11 > this.moviesCount - 1){
        return;
      }
      this.startMovieIndex += 11;
    }
    else if(prevOrnext == 'prev'){
      if(this.startMovieIndex-11 < 0){
        return;
      }
      this.startMovieIndex -= 11;
    }
    this.movies = movieList.slice(this.startMovieIndex,this.startMovieIndex+11);
  }

  sort(para){
      const movies = this.movies;
      let titleOrder = this.titleOrder;
      let dateOrder =  this.dateOrder;
      let ratingOrder =  this.ratingOrder;
      let userRatingOrder = this.userRatingOrder
      if(para == 'name'){
        movies.sort((a,b)=>{
          if(titleOrder == 'asc'){
            return a.Title.charCodeAt(0) - b.Title.charCodeAt(0)
          }

          return b.Title.charCodeAt(0) - a.Title.charCodeAt(0)
        })
        titleOrder = titleOrder == 'asc' ? 'dsc' : 'asc';
      }
      else if(para == 'date'){
        movies.sort((a,b)=>{
          if(dateOrder == 'asc'){
            return convertToDate(a.Date) - convertToDate(b.Date)
          }

          return convertToDate(b.Date) - convertToDate(a.Date);
        })
        dateOrder = dateOrder == 'asc' ? 'dsc' : 'asc';
      }
      else if(para == 'rating'){
        movies.sort((a,b)=>{
          if(ratingOrder == 'asc'){
            return a.Rating - b.Rating
          }

          return b.Rating - a.Rating;
        })
        ratingOrder = ratingOrder == 'asc' ? 'dsc' : 'asc';
      }
      else if(para == 'userRating'){
        movies.sort((a,b)=>{
          if(userRatingOrder == 'asc'){
            return a.UserRating - b.UserRating
          }

          return b.UserRating - a.UserRating;
        })
        ratingOrder = ratingOrder == 'asc' ? 'dsc' : 'asc';
      }


      this.movies = movies;
      this.titleOrder = titleOrder;
      this.dateOrder = dateOrder;
      this.ratingOrder = ratingOrder;
      this.userRatingOrder = userRatingOrder;
  }

}

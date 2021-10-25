import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject, throwError } from 'rxjs';
import {
  catchError,
  delay,
  mergeMap,
  repeat,
  retry,
} from 'rxjs/operators';
import { Joke } from 'src/app/models/Joke';

@Injectable({
  providedIn: 'root',
})
export class GetJokeService {
  private URL: string;
  private DELAY: number;

  private jokeSubjectLike!: Subject<Joke>;
  private jokeSubjectDislike!: Subject<Joke>;
  public jokeLike$!: Observable<Joke>;
  public jokeDislike$!: Observable<Joke>;


  constructor(private http: HttpClient) {
    this.URL = 'https://v2.jokeapi.dev/joke/any';
    this.DELAY = 5000;

    this.jokeSubjectLike = new Subject<Joke>();
    this.jokeSubjectDislike = new Subject<Joke>();
    this.jokeLike$ = this.jokeSubjectLike.asObservable();
    this.jokeDislike$ = this.jokeSubjectDislike.asObservable();

  }

  /**
   * get() - Get jokes from API
   */
  public get(): Observable<Joke> {
    return this.http.get<any>(this.URL).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  /**
   * getLike() - Get jokes from API
   */
   public getAll(preference: string): Observable<Joke[]> {
    return this.http.get<Joke[]>(`http://localhost:3000/${preference}`).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  /**
   * add()
   */
  add(joke: Joke, preference: 'like' | 'dislike'): Observable<Joke> {
    preference === 'like'
      ? this.jokeSubjectLike.next(joke)
      : this.jokeSubjectDislike.next(joke)

    return this.http.post<Joke>(`http://localhost:3000/${preference}`, joke).pipe(
      retry(3),
      catchError(this.handleError)
    )
  }

  /**
   * poll() - Executes get()
   */
  public poll(): Observable<Joke> {
    return of({}).pipe(
      mergeMap((_) => this.get()),
      delay(this.DELAY),
      repeat()
    );
  }

  /**
   * handlerError()
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}
        body was: ${error.error}`
      );
    }

    return throwError('Something bad happen; please try again later.');
  }
}

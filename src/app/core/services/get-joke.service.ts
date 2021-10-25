import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import {
  catchError,
  delay,
  mergeMap,
  repeat,
  retry,
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GetJokeService {
  private URL: string;
  private DELAY: number;

  constructor(private http: HttpClient) {
    this.URL = 'https://v2.jokeapi.dev/joke/any';
    this.DELAY = 5000;
  }

  /**
   * get() - Get jokes from API
   */
  public get(): Observable<any> {
    return this.http.get<any>(this.URL).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  /**
   * poll() - Executes get()
   */
  public poll(): Observable<any> {
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

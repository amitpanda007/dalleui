import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DalleService {
  constructor(private http: HttpClient) {}

  apiHome() {
    return this.http
      .get('http://localhost:80/')
      .pipe(catchError(this.errorMgmt));
  }

  createRandomImageFromText(text: string) {
    return this.http
      .get(`http://localhost:80/generate-image/?text=${text}`)
      .pipe(catchError(this.errorMgmt));
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}

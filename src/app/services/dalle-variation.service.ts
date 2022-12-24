import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DalleVariationService {
  constructor(private http: HttpClient) {}

  imageVariation(file: File, imageCount: number) {
    var arr: any[] = [];
    var formData = new FormData();
    arr.push(file);

    arr[0].forEach((item: any, i: any) => {
      formData.append('file', arr[0][i]);
    });

    return this.http
      .post(
        `${environment.apiUrl}/generate-variation/${imageCount}`,
        formData,
        {
          reportProgress: true,
          observe: 'events',
        }
      )
      .pipe(catchError(this.errorMgmt));
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error`
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}

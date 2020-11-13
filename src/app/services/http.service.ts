import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private API: string = 'https://synchronous-shopping.herokuapp.com/api/v1';

  constructor(private httpClient: HttpClient) { }

  public sendData(data) {
    const body = new HttpParams({ fromObject: 
        { ...data, 
            username: 'taximo_api_user',
            checksum: 'cd7ced88fb72ee862940b1064555251f9ba044d8478a71a7b70b04bd708c2796' 
        }});
    console.log(body.toString());
    return this.httpClient.post(`${this.API}/synchronous_shopping`, body.toString(), {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }).pipe(catchError(this.handleError))
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown Error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }


}

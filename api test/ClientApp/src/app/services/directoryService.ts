import { Injectable, Inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Directory } from '../interfaces/directoryInterface';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DirectoryService {
  private baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  getDirectories(): Observable<Directory[]> {
    return this.http.get<Directory[]>(this.baseUrl + 'api/directory')
      .pipe(
        tap(data => console.log('get items : ', data)),
        catchError(error => throwError(error))
      );

  }
}

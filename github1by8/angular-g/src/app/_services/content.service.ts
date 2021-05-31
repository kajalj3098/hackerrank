import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  get(path: string): Observable<any> {
    return this.http.get(`${this.baseUrl}${path}`);
  }
}

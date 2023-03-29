import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const URL = 'https://url/input/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', "responseType": 'application/json' }), //this describes the type of Data that will be send
};

@Injectable({
  providedIn: 'root',
})
export class InputService {
  constructor(private http: HttpClient) {}

  data_input_transfer(data: any): Observable<any> {
    return this.http.post(URL, { data }, httpOptions);
  }

  return_input_transfer(data: any): Observable<any> {
    return this.http.post(URL + 'return/', { data }, httpOptions);
  }

  //check(data: any, boarding : string): Observable<any> {
  //  return this.http.post('https://url/duplicate', { data, boarding }, httpOptions);
  //}
}

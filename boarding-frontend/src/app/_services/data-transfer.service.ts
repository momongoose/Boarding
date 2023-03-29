import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const URL = 'https://url/data'; //ip/api bzw. localhost:8080 bzw. https://url/

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'}), //this describes the type of Data that will be send
};

@Injectable({
  providedIn: 'root',
})
export class DataTransferService {
  constructor(private http: HttpClient) {}
  //hier wird ein empty post gemacht, damit im backend die EInteilung neu in die DB eingespielt werden
  data_transfer_on(data: any): Observable<any> {
    return this.http.post(URL + 'on', { data }, httpOptions);
  }
  data_transfer_off(data: any): Observable<any> {
    return this.http.post('https://url/dataoff2', { data }, httpOptions);
  }
  get_file(): Observable<any> {
    return this.http.get('https://url/download', {
      responseType: 'text',
    });
  }
  get_data(): Observable<any> {
    return this.http.get('https://url/getdata', {
      responseType: 'text',
    });
  }
  get_all(): Observable<any> {
    return this.http.get('https://url/all', {
      responseType: 'text',
    });
  }
  sendRegi(user: any): Observable<any> {
    return this.http.post('https://url/regi', { user }, httpOptions);
  }
  sendLogi(user: any): Observable<any> {
    return this.http.post('https://url/logi', { user }, httpOptions);
  }
  sendName(name:any) : Observable<any> {
    return this.http.post('https://url/name', { name }, httpOptions);
  }
  sendMail(mail:any) : Observable<any> {
    return this.http.post('https://url/mail', { mail }, httpOptions);
  }
  XlsxUploadOn(formData: any): Observable<any> {
    return this.http.post('https://url/xlsxon', formData);
  }

  XlsxUploadOff(formData: any): Observable<any> {
    return this.http.post('https://url/xlsxoff', formData);
  }
}

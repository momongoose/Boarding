import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { HttpClient, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataTransferService } from '../_services/data-transfer.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
})
export class FileUploadComponent implements OnInit {
  constructor(
    private app: AppComponent,
    private http: HttpClient,
    private data: DataTransferService,
  ) {}

  ngOnInit(): void {}

  loading: boolean = false; // Flag variable
  file: any;
  fin = false;
  count = 0;
  on = this.app.on;
  off = this.app.off;
  fileName = '';
  daten = ""
  dayta = ""
  mail = this.app.mail
  delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  async onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;

      const formData = new FormData();

      formData.append('file', file);
      if (
        this.on == 2 &&
        file.type ==
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ) {
        this.data.sendName(this.app.name).subscribe(async (data) => {
          return data;
        });
        this.data.sendMail(this.mail).subscribe(async (data) => {
          return data;
        });
        await new Promise((resolve) => {
          this.data.XlsxUploadOn(formData).subscribe(async (data) => {
            this.dayta = data.message
            resolve(this.dayta);
          });
        });
        if(this.dayta == "Die Excel Datei hat das falsche Format"){
          return alert(this.dayta)
        }
        this.fin = true;
      } else if (
        this.off == 2 &&
        file.type ==
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ) {
        this.data.sendName(this.app.name).subscribe(async (data) => {
          return data;
        });
        this.data.sendMail(this.mail).subscribe(async (data) => {
          return data;
        });
        await new Promise((resolve) => {
          this.data.XlsxUploadOff(formData).subscribe(async (data) => {
            this.daten = data.message
            resolve(this.daten);
          });
        });
        if(this.daten == "Die Excel Datei hat das falsche Format"){
          return alert(this.daten)
        }
        this.fin = true;
      } //else if (
      //  (this.on == 2 && file.type == 'application/vnd.ms-excel') ||
      //  file.type == 'text/csv'
      //) {
      //  this.data.sendName(this.app.name).subscribe(async data => {
      //    return data
      //  });
      //  const upload$ = this.http.post(
      //    'ip',
      //    formData
      //  );
      //  upload$.subscribe();
      //  this.fin = true;
      //} else if (
      //  (this.off == 2 && file.type == 'application/vnd.ms-excel') ||
      //  file.type == 'text/csv'
      //) {
      //  this.data.sendName(this.app.name).subscribe(async data => {
      //    return data
      //  });
      //  const upload$ = this.http.post(
      //    'ip',
      //    formData
      //  );
      //  upload$.subscribe();
      //  this.fin = true;
      //} else if (
      //  this.on == 4 &&
      //  file.type ==
      //    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      //) {
      //  const upload$ = this.http.post('ip', formData);
      //  upload$.subscribe();
      //  this.fin = true;
      /*}*/
      else if (this.off == 4 && file.type == 'application/pdf') {
        const upload$ = this.http.post('https://url/pdf/', formData);
        upload$.subscribe();
        this.fin = true;
      } else {
        alert('Der falsche Datei Typ wurde ausgewählt!');
      }
      for (this.count = 0; this.count < 100; this.count++) {
        await this.delay(50);
      }
      if (this.count == 100) {
        this.fin = false;
      }
    }
  }

  Undo3() {
    if (this.app.on == 2) {
      this.app.on = 1;
    }

    if (this.app.off == 2) {
      this.app.off = 1;
    }

    if (this.app.on == 4) {
      this.app.on = 0;
    }

    if (this.app.off == 4) {
      this.app.check = 1;
      this.app.on = 10;
      this.app.off = 10;
    }
  }
}

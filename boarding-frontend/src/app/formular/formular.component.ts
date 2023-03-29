import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { DataTransferService } from '../_services/data-transfer.service';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { InputService } from '../_services/input.service';
import { formatDate } from '@angular/common';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {FormControl} from '@angular/forms';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';

const moment = _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },

  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@Component({
  selector: 'app-formular',
  templateUrl: './formular.component.html',
  styleUrls: ['./formular.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class FormularComponent implements OnInit {
  constructor(private app: AppComponent, private data: DataTransferService, private input : InputService) {}

  Datum = new FormControl(moment());
  selected1: any = '';
  mail: string = '';
  handy: any = false;
  laptop: any = false;
  firstname: any = '';
  birthday: any = "";
  lastname: any = '';
  department: any = "";
  date: any = "";
  hardware: any = [];
  check: boolean = false;
  distribution: any = '';
  err: any;
  abt:string = "";
  errorMessage: any;
  checkV: any = '';
  checkN: any = '';
  checkB: any = "";
  checkH: any = '';
  checkA: any = '';
  checkD: any = '';
  checkVer: any = '';
  checkH2: any = '';
  checkO: any = "";
  checkM: any = "";
  fin: any = false;
  count: any = 0;
  mai = this.app.mail
  organisation: any = "";
  monitor: any = false;
  office: any = false;
  tablet: any = false;
  docking: any = false;
  headset: any = false;
  cloud:any = false;
  portal:any = false;
  OnB = this.app.on;
  OffB = this.app.off;
  c:any;

  Undo3() {
    if (this.app.on == 3) {
      this.app.on = 1;
    }

    if (this.app.off == 3) {
      this.app.off = 1;
    }
  }

  async SendFormData() {
    this.FormValidation();
    var data = {
      firstname: this.firstname,
      lastname: this.lastname,
      department: this.department,
      mail: this.mail,
      organisation: this.organisation,
      distribution: this.distribution,
      date: this.date,
      birthday: this.birthday,
      hardware: this.hardware,
      name : this.app.name,
      Email : this.mai
    };
    if (this.app.on == 3 && this.check == true) {
      await this.delay(1000);
      this.data.data_transfer_on(data).subscribe(() => {
        return data;
      });
      this.fin = true;
      for (this.count = 0; this.count < 100; this.count++) {
        await this.delay(50);
      }
      if (this.count == 100) {
        this.fin = false;
      }
    }

    if (this.app.off == 3 && this.check == true) {
      await this.delay(1000);
      this.data.data_transfer_off(data).subscribe(() => {
        return data;
      });
      this.fin = true;
      for (this.count = 0; this.count < 100; this.count++) {
        await this.delay(50);
      }
      if (this.count == 100) {
        this.fin = false;
      }
    }
  }

  events: string[] = [];

  minDate: Date = new Date (1940, 1, 1);
  maxDate: Date = new Date (2016, 12, 31);
  minDa: Date = new Date (2020, 1, 1);
  maxDa: Date = new Date (2025, 12, 31);

  addEventBirthday(event: MatDatepickerInputEvent<Date>) {
    this.birthday = event.value;
    this.birthday = formatDate(this.birthday, "dd.MM.yyyy", "en-US")
    this.FormValidation()
  }

  addEventDate(event: MatDatepickerInputEvent<Date>) {
    this.date = event.value;
    this.date = formatDate(this.date, "dd.MM.yyyy", "en-US")
    this.FormValidation()
  }

  delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  async BuildMail(){
    await this.delay(30)
    var Abteilung = ""
    if(this.abt == "department1"){
      Abteilung = "department1"
    } else if(this.abt == "department2"){
      Abteilung = "department2"
    }
    var regex1 = /[ä]/gm
    var regex2 = /[ö]/gm
    var regex3 = /[ü]/gm
    var Nam = this.firstname.toLowerCase() + "." + this.lastname.toLowerCase()
    Nam = Nam.replace(regex1, "ae")
    Nam = Nam.replace(regex2, "oe")
    Nam = Nam.replace(regex3, "ue")
    this.mail = Nam + "@lifebrain-" + Abteilung + ".at"
    this.FormValidation();
  }

  async FormValidation() {
    var inc = this.mail.includes('@lifebrain');
    this.checkV = true;
    this.checkN = true;
    this.checkH = true;
    this.checkA = true;
    this.checkD = true;
    this.checkVer = true;
    this.checkB = true;
    if (this.distribution == '') {
      this.checkVer = 'false';
    }
    if (this.abt == "department1") {
      this.checkO = true;
      this.organisation = "Lifebrain"
    } else if(this.abt == "department2") {
      this.checkO = true;
      this.organisation = "department2"
    } else{
      this.checkO = "false";
    }
    if (this.firstname == '') {
      //alert("Ungültiger Vorname!")
      this.checkV = 'false';
    }
    if(inc == true && this.firstname.length > 0 && this.lastname.length > 0){
      this.checkM = true
    } else {
      this.checkM = "false"
    }
    if (this.lastname == '') {
      //alert("Ungültiger Nachname!")
      this.checkN = 'false';
    }
    if (this.birthday == '') {
      this.checkB = 'false';
    }
    if (this.selected1 == '' || this.selected1 == "ja") {
      //alert("Bitte eine Hardware auswählen!")
      this.checkH = 'false';
    }
    if (this.department == '') {
      this.checkA = 'false';
    }
    if (this.date == '') {
      this.checkD = 'false';
    }
    this.hardware = [];
    if (this.handy == true) {
      this.hardware.push('handy');
    }
    if (this.laptop == true) {
      this.hardware.push('laptop');
    }
    if (this.headset == true) {
      this.hardware.push('headset');
    }
    if (this.docking == true) {
      this.hardware.push('docking');
    }
    if (this.office == true) {
      this.hardware.push('office');
    }
    if (this.tablet == true) {
      this.hardware.push('tablet');
    }
    if (this.monitor == true) {
      this.hardware.push('monitor');
    }
    if (this.portal == true) {
      this.hardware.push('portal');
    }
    if (this.cloud == true) {
      this.hardware.push('cloud');
    }
    if(this.selected1.length > 0 && this.hardware.length > 0){
      this.checkH = true;
    }
    if (
      this.checkV == true &&
      this.checkN == true &&
      this.checkH == true &&
      this.checkA == true &&
      this.checkD == true &&
      this.checkM == true &&
      this.checkO == true &&
      this.checkB == true &&
      this.abt == "department1" || this.abt == "department2"
    ) {
      //if(this.app.on == 3){
      //  this.c = await this.checkDuplicate("on")
      //} else if(this.app.off == 3){
      //  this.c = await this.checkDuplicate("off")
      //}
      //if(this.c == false && this.app.on == 3){
      //  this.checkM = false
      //  this.check = false
      //  alert("Von dieser Person wurde schon ein Onboarding Prozess gemacht!")
      //  return
      //} else if(this.c == false && this.app.off == 3){
      //  this.checkM = false
      //  this.check = false
      //  alert("Von dieser Person wurde schon ein Offboarding Prozess gemacht!")
      //  return
      //} else {
        this.check = true;
      //}
    }
  }
  dayta : any
  //async checkDuplicate(boarding : string) {
//
  //  return await new Promise(async (resolve, reject)=>{
  //    this.input.check(this.mail, boarding).subscribe(async (data) => {
  //      this.dayta = data.value
  //      if(this.dayta == "OK"){
  //        resolve(true)
  //        return true
  //      } else {
  //        resolve(false)
  //        return false
  //      }
  //  })
  //}).catch(() => {});
  //}

  reloadPage(): void {
    window.location.reload();
  }
  ngOnInit(): void {}
}

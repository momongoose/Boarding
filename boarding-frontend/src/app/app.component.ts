import { Component, OnInit } from '@angular/core';


interface jein {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(){}
  title = 'boarding-frontend';
  all:any;
  name = ""
  mail = ""
  role = 0
  on = 0;
  off = 0;
  check: any;
  login = false;
  register = false;
  history = false;

  ngOnInit(): void {
  }

  Onboarding() {
    this.on = 1;
    this.check = 0;
    this.selected1 = '';
    this.selected2 = '';
  }

  Offboarding() {
    this.off = 1;
    this.check = 0;
    this.selected1 = '';
    this.selected2 = '';
  }

  Undo1() {
    this.off = 0;
    this.on = 0;
    this.check = 0;
  }

  Csv1() {
    this.on = 2;
    this.check = 0;
  }

  Csv2() {
    this.off = 2;
    this.check = 0;
  }

  Einzel1() {
    this.on = 3;
    this.check = 0;
  }

  Einzel2() {
    this.off = 3;
    this.check = 0;
  }

  selected1: any;
  selected2: any;

  jein: jein[] = [
    { value: 'ja', viewValue: 'Ja' },
    { value: 'nein', viewValue: 'Nein' },
  ];
}

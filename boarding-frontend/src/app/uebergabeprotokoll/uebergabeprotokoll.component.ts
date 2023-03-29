import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-uebergabeprotokoll',
  templateUrl: './uebergabeprotokoll.component.html',
  styleUrls: ['./uebergabeprotokoll.component.css'],
})
export class UebergabeprotokollComponent implements OnInit {
  constructor(private app: AppComponent) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  Undo1() {
    this.app.off = 0;
    this.app.on = 0;
    this.app.check = 0;
  }

  Csv1() {
    this.app.off = 4;
    this.app.check = 0;
  }

  Csv2() {
    this.app.check = 2;
    this.app.selected1 = '';
    this.app.selected2 = '';
  }

  Einzel1() {
    this.app.on = 4;
    this.app.check = 0;
    this.app.selected1 = '';
    this.app.selected2 = '';
  }
}

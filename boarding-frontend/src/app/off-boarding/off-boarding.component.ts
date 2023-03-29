import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-off-boarding',
  templateUrl: './off-boarding.component.html',
  styleUrls: ['./off-boarding.component.css'],
})
export class OffBoardingComponent implements OnInit {
  constructor(private app: AppComponent) {}

  ngOnInit(): void {}

  Undo1() {
    this.app.off = 0;
    this.app.on = 0;
  }

  Csv2() {
    this.app.off = 2;
  }

  Einzel2() {
    this.app.off = 3;
  }
}

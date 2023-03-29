import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-on-boarding',
  templateUrl: './on-boarding.component.html',
  styleUrls: ['./on-boarding.component.css'],
})
export class OnBoardingComponent implements OnInit {
  constructor(private app: AppComponent) {}

  ngOnInit(): void {}

  Undo1() {
    this.app.off = 0;
    this.app.on = 0;
  }

  Csv1() {
    this.app.on = 2;
  }

  Einzel1() {
    this.app.on = 3;
  }
}

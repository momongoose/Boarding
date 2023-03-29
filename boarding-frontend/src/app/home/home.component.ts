import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { LoginComponent } from '../login/login.component';
import { DataTransferService } from '../_services/data-transfer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private app: AppComponent, private data : DataTransferService) {}

  async ngOnInit(): Promise<void> {
    this.app.all = await new Promise((resolve) => {
      this.data.get_all().subscribe(
        (data) => {
          resolve(JSON.parse(data));
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }

  role : any = this.app.role


  Onboarding() {
    if(this.role == 1 || this.role == 3){
      this.app.on = 1;
      this.app.check = 0;
      this.app.selected1 = '';
      this.app.selected2 = '';
    } else {
      alert("Es wird die Berechtigung AbteilungB benötigt!\nBitte melden Sie sich mit einem berechtigten Account an!")
    }
  }

  Personen() {
    this.app.on = 4;
    this.app.selected1 = '';
    this.app.selected2 = '';
  }

  Login() {
    this.app.login = true;
    this.app.register = false;
    this.app.on = 52;
    this.app.off = 52;
  }

  Verlauf(){
    this.app.history = true;
    this.app.on = 49;
    this.app.off = 49;
  }

  Register() {
    this.app.register = true;
    this.app.login = false;
    this.app.on = 52;
    this.app.off = 52;
  }

  Uebergabeprotokoll() {
    if(this.role == 2) {
      this.app.check = 1;
      this.app.on = 10;
      this.app.selected1 = '';
      this.app.selected2 = '';
    } else {
      alert("Es wird die Berechtigung AbteilungA benötigt!\nBitte melden Sie sich mit einem berechtigten Account an!")
    }
  }

  Search() {
    if(this.role == 2) {
    this.app.check = 3;
    this.app.on = 12;
    this.app.selected1 = '';
    this.app.selected2 = '';
    } else {
      alert("Es wird die Berechtigung AbteilungA benötigt!\nBitte melden Sie sich mit einem berechtigten Account an!")
    }
  }

  Offboarding() {
    if(this.role == 1 || this.role == 3){
      this.app.off = 1;
      this.app.check = 0;
      this.app.selected1 = '';
      this.app.selected2 = '';
    } else {
      alert("Es wird die Berechtigung AbteilungB benötigt!\nBitte melden Sie sich mit einem berechtigten Account an!")
    }
  }
}

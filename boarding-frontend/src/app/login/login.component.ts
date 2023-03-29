import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { DataTransferService } from '../_services/data-transfer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private app : AppComponent, private data : DataTransferService) { }

  mail = ""
  pas = ""
  complete = false
  count = 0
  dayta:any = ""

  Undo() {
    this.app.login = false
    this.app.register = false
    this.app.on = 0
    this.app.off = 0
  }

  async Submit() {
    var user = {
      mail : this.mail,
      password : this.pas
    }

    this.app.mail = this.mail

    await new Promise(async (resolve, reject)=>{
      this.data.sendLogi(user).subscribe(async data => {
        this.dayta = data
        if(this.dayta.User.length > 5){
          alert("Falsche Anmeldeinformation")
        } else {
          await this.Success(this.dayta.User.role, this.dayta.User.name)
          resolve(this.dayta)
          return
        }
        return this.dayta
      });
      reject()
      return this.dayta
    }).catch(() => {});
  }

  delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  async Success(role:any, name:any) {
    this.app.role = role
    this.app.name = name
    this.complete = true
    this.Undo();
    for (this.count = 0; this.count < 100; this.count++) {
      await this.delay(50);
    }
    if (this.count == 100) {
      this.complete = false
    }
  }


  ngOnInit(): void {
  }

}

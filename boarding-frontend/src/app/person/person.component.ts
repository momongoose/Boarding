import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { InputService } from '../_services/input.service';
import { DataTransferService } from '../_services/data-transfer.service';
import { jsPDF } from 'jspdf';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
})
export class PersonComponent implements OnInit {
  constructor(private app: AppComponent, private input: InputService) {}

  name: any = '';

  selected1: any = '';

  hardwareTyp : any = ""

  hardwareSn : any = ""

  hardwareName : any = ""

  hardwareTyp1 : any = ""

  hardwareSn1 : any = ""

  hardwareName1 : any = ""

  hardwareTyp2 : any = ""

  hardwareSn2 : any = ""

  hardwareName2 : any = ""

  hardwareTyp3 : any = ""

  hardwareSn3 : any = ""

  hardwareName3 : any = ""

  customDate: any = '';

  check: boolean = false;

  json: any;

  another1: any = false;

  another2: any = false;

  another3:any = false;

  delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  async addPage() {

  }

  async ArrowL() {
    if(this.another1 == true && this.another2 == false && this.another3 == false){
      this.another1 = false;
    }else if(this.another2 == true && this.another3 == false && this.another1 == false){
      this.another2 = false;
      this.another1 = true;
    }else if(this.another2 == false && this.another3 == true && this.another1 == false){
      this.another3 = false;
      this.another2 = true;
    }
  }

  async ArrowR(){
    if(this.another2 == false && this.another3 == false && this.another1 == false){
      this.another1 = true;
    }else if(this.another1 == true && this.another3 == false && this.another2 == false){
      this.another1 = false
      this.another2 = true;
    } else if(this.another2 == true && this.another3 == false && this.another1 == false){
      this.another2 = false
      this.another3 = true;
    }
  }

  async Submit() {
    if(this.hardwareName1 == "" && this.hardwareSn1 == "" && this.hardwareTyp1 == ""){
      this.json = {
        name: this.name,
        hardwareTyp: [this.hardwareTyp],
        hardwareSn: [this.hardwareSn],
        hardwareName: [this.hardwareName],
        date: this.customDate,
      };
    } else if(this.hardwareName1 !== "" && this.hardwareSn1 !== "" && this.hardwareTyp1 !== "" && this.hardwareName2 == "" && this.hardwareSn2 == "" && this.hardwareTyp2 == ""){
      this.json = {
        name: this.name,
        hardwareTyp: [this.hardwareTyp, this.hardwareTyp1],
        hardwareSn: [this.hardwareSn, this.hardwareSn1],
        hardwareName: [this.hardwareName, this.hardwareName1],
        date: this.customDate,
      };
    } else if(this.hardwareName1 !== "" && this.hardwareSn1 !== "" && this.hardwareTyp1 !== "" && this.hardwareName2 !== "" && this.hardwareSn2 !== "" && this.hardwareTyp2 !== "" && this.hardwareName3 == "" && this.hardwareSn3 == "" && this.hardwareTyp3 == ""){
      this.json = {
        name: this.name,
        hardwareTyp: [this.hardwareTyp, this.hardwareTyp1, this.hardwareTyp2],
        hardwareSn: [this.hardwareSn, this.hardwareSn1, this.hardwareSn2],
        hardwareName: [this.hardwareName, this.hardwareName1, this.hardwareName2],
        date: this.customDate,
      };
    } else if(this.hardwareName1 !== "" && this.hardwareSn1 !== "" && this.hardwareTyp1 !== "" && this.hardwareName2 !== "" && this.hardwareSn2 !== "" && this.hardwareTyp2 !== "" && this.hardwareName3 !== "" && this.hardwareSn3 !== "" && this.hardwareTyp3 !== ""){
      this.json = {
        name: this.name,
        hardwareTyp: [this.hardwareTyp, this.hardwareTyp1, this.hardwareTyp2, this.hardwareTyp3],
        hardwareSn: [this.hardwareSn, this.hardwareSn1, this.hardwareSn2, this.hardwareSn3],
        hardwareName: [this.hardwareName, this.hardwareName1, this.hardwareName2, this.hardwareName3],
        date: this.customDate,
      };
    } else {
      alert("Bitte die Eingabefelder überprüfen!")
      return
    }

    if (this.selected1 == 'ja') {
      await this.FormValidation();
      if (this.check2 == true) {
        this.input.data_input_transfer(this.json).subscribe(() => {
          return this.json;
        });
        this.check = true;
        this.fin = true;
        for (this.count = 0; this.count < 100; this.count++) {
          await this.delay(50);
        }
        if (this.count == 100) {
          this.fin = false;
        }
      }
    } else if (this.selected1 == 'nein') {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      this.json.date = dd + '.' + mm + '.' + yyyy;
      await this.FormValidation();
      if (this.check2 == true) {
        this.input.data_input_transfer(this.json).subscribe(() => {
          return this.json;
        });
        this.check = true;
        this.fin = true;
        for (this.count = 0; this.count < 100; this.count++) {
          await this.delay(50);
        }
        if (this.count == 100) {
          this.fin = false;
        }
      }
    } else {
      await this.FormValidation();
    }
  }

  doc = new jsPDF();
  getfile() {
    var imgData =
      'data:image/jpeg;base64,1234';
    this.doc.setFontSize(8);
    this.doc.addImage(imgData, 'JPEG', 15, 10, 180, 160);
    this.doc.text(String(this.json.name), 40, 40);
    this.doc.text(String(this.hardwareTyp), 30, 155);
    this.doc.text(String(this.hardwareSn), 30, 160);
    this.doc.text(String(this.hardwareName), 30, 165);
    this.doc.text(String(this.hardwareTyp1), 30, 175);
    this.doc.text(String(this.hardwareSn1), 30, 180);
    this.doc.text(String(this.hardwareName1), 30, 185);
    this.doc.text(String(this.hardwareTyp2), 30, 195);
    this.doc.text(String(this.hardwareSn2), 30, 200);
    this.doc.text(String(this.hardwareName2), 30, 205);
    this.doc.text(String(this.hardwareTyp3), 30, 215);
    this.doc.text(String(this.hardwareSn3), 30, 220);
    this.doc.text(String(this.hardwareName3), 30, 225);
    if (this.selected1 == 'ja') {
      this.doc.text(String(this.customDate), 85, 160);
    } else if (this.selected1 == 'nein') {
      this.doc.text(String(this.json.date), 85, 160);
    } else {
      alert('Datum ist nicht ausgewählt !');
    }
    var blob: any = new Blob([this.doc.output('blob')], {
      type: 'application/pdf',
    });
    const url = window.URL.createObjectURL(blob);
    //window.open(url);
    saveAs(blob, 'Übergabeprotokoll.pdf');
    this.check = false;
  }

  off = this.app.off;

  Undo3() {
    this.app.check = 1;
    this.app.on = 10;
    this.app.off = 10;
  }

  checkD: any = '';
  checkN: any = '';
  checkH1: any = '';
  checkH2: any = '';
  checkH3: any = '';
  checkD2: any = '';
  check2: any = '';
  fin: any = false;
  count: any = 0;

  async FormValidation() {
    var inc = this.json.date;
    var inc2 = inc.includes('2022');
    this.checkN = true;
    this.checkD = true;
    this.checkH1 = true;
    this.checkH2 = true;
    this.checkH3 = true;
    this.checkD2 = true;
    if (this.json.name == '') {
      //alert("Ungültiger Vorname!")
      this.checkN = 'false';
    }
    if (this.json.hardwareTyp == '') {
      //alert("Ungültiger Nachname!")
      this.checkH1 = 'false';
    }
    if (this.json.hardwareSn == '') {
      //alert("Ungültiger Nachname!")
      this.checkH2 = 'false';
    }
    if (this.json.hardwareName == '') {
      //alert("Ungültiger Nachname!")
      this.checkH3 = 'false';
    }
    if (this.selected1 == '') {
      this.checkD = 'false';
    }
    if (this.json.date == '' || inc2 == false) {
      //hier weiter
      //alert("Ungülte Email")
      this.checkD2 = 'false';
    }
    if (this.checkD == true && this.checkN == true && this.checkH1 == true && this.checkH2 == true && this.checkH3 == true) {
      if (this.selected1 == 'ja' && this.checkD2 == true) {
        this.check2 = true;
      } else if (this.selected1 == 'nein') {
        this.check2 = true;
      }
    }
  }

  ngOnInit(): void {
    this.another1 = false;

    this.another2 = false;

    this.another3 = false;
  }
}

import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DataTransferService } from '../_services/data-transfer.service';
import { InputService } from '../_services/input.service';
import { jsPDF } from 'jspdf';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-rueckgabe',
  templateUrl: './rueckgabe.component.html',
  styleUrls: ['./rueckgabe.component.css'],
})
export class RueckgabeComponent implements OnInit {
  constructor(
    private app: AppComponent,
    private data: DataTransferService,
    private input: InputService
  ) {}

  customDate: any = '';
  selected1: any = '';
  hardware: any = '';
  name: any = '';
  nameListDisplay: any = [];
  date: any = false;
  datas: any;
  nameList: any = [];
  hardwareList: any = [];
  hardwareListDisplayArray: any = [];
  list: any;
  check3: any = false;
  j: any;
  collection: any = [];

  delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  Undo3() {
    this.app.check = 1;
  }

  async Submit() {
    this.list = {
      name: this.name,
      hardware: this.hardware,
      date: this.customDate,
    };
    if (this.selected1 == 'ja') {
      await this.FormValidation();
      if (this.check2 == true) {
        this.input.return_input_transfer(this.list).subscribe(() => {
          return this.list;
        });
        this.check3 = true;
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
      this.list.date = dd + '.' + mm + '.' + yyyy;
      await this.FormValidation();
      if (this.check2 == true) {
        this.input.return_input_transfer(this.list).subscribe(() => {
          return this.list;
        });
        this.check3 = true;
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

  nam: any;
  controll = false;
  myControl = new FormControl();
  myControl2 = new FormControl();
  options: string[] = this.nameListDisplay;
  opt: string[] = [];
  options2: string[] = this.hardwareList;
  filteredOptions: Observable<string[]> | undefined;
  filteredOptions2: Observable<string[]> | undefined;

  async ngOnInit() {
    await new Promise((resolve) => {
      this.data.get_data().subscribe(
        (data) => {
          this.datas = JSON.parse(data);
          resolve(this.datas);
        },
        (err) => {
          this.datas = JSON.parse(err.error).message;
        }
      );
    });
    for (var i = 0; i < this.datas.length; i++) {
      if (this.datas[i].return_date == null) {
        if (this.nameList.includes(this.datas[i].name) == false) {
          this.nameListDisplay.push(this.datas[i].name);
        }
        this.nameList.push(this.datas[i].name);
        this.hardwareList.push(this.datas[i].hardwareName);
      }
    }

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
    this.filteredOptions2 = this.myControl2.valueChanges.pipe(
      startWith(''),
      map((value2) => this._filter2(value2))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  checkD: any = '';
  checkN: any = '';
  checkH: any = '';
  checkD2: any = '';
  check2: any = '';
  fin: any = false;
  count: any = 0;

  async FormValidation() {
    var inc = this.list.date;
    var inc2 = inc.includes('2022');
    this.checkN = true;
    this.checkD = true;
    this.checkH = true;
    this.checkD2 = true;
    this.date = true;

    if (
      this.list.name == '' ||
      this.nameList.includes(this.list.name) == false
    ) {
      //alert("Ungültiger Vorname!")
      this.checkN = 'false';
    }
    if (
      this.list.hardware == '' ||
      this.hardwareList.includes(this.list.hardware) == false
    ) {
      //alert("Ungültiger Nachname!")
      this.checkH = 'false';
    }
    if (this.selected1 == '') {
      this.checkD = 'false';
    }
    if (this.list.date == '' || inc2 == false) {
      //hier weiter
      //alert("Ungülte Email")
      this.checkD2 = 'false';
    }
    for (this.j = 0; this.j < this.datas.length; this.j++) {
      if (
        this.list.name == this.datas[this.j].name &&
        this.list.hardware == this.datas[this.j].hardware
      ) {
        this.date = this.datas[this.j].received;
        break;
      }
    }
    if (this.date == false) {
      alert('Diese Person, besitzt die ausgewählte Hardware nicht!');
    }
    if (
      this.checkD == true &&
      this.checkN == true &&
      this.checkH == true &&
      this.date !== false
    ) {
      if (this.selected1 == 'ja' && this.checkD2 == true) {
        this.check2 = true;
      } else if (this.selected1 == 'nein') {
        this.check2 = true;
      }
    }
  }

  private _filter2(value2: string): string[] {
    const filterValue2 = value2.toLowerCase();
    return this.options2.filter((option2) =>
      option2.toLowerCase().includes(filterValue2)
    );
  }

  doc = new jsPDF();
  async Download() {
    var imgData =
      'data:image/jpeg;base64,1234';
    this.doc.setFontSize(8);
    this.doc.addImage(imgData, 'JPEG', 15, 10, 180, 160);
    this.doc.text(String(this.datas[this.j].name), 40, 40);
    this.doc.text(String(this.datas[this.j].hardware), 30, 160);
    this.doc.text(String(this.datas[this.j].received), 85, 160);
    this.doc.text(String(this.list.date), 137, 160);
    var blob: any = new Blob([this.doc.output('blob')], {
      type: 'application/pdf',
    });
    const url = window.URL.createObjectURL(blob);
    //window.open(url);
    saveAs(blob, 'Übergabeprotokoll.pdf');
    this.check3 = false;
  }
}

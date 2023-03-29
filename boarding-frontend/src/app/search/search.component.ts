import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DataTransferService } from '../_services/data-transfer.service';
import { InputService } from '../_services/input.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  constructor(private app: AppComponent, private data: DataTransferService) {}

  displayedColumns: string[] = ['hardware'];
  ELEMENT_DATA: PeriodicElement[] = [];
  dataSource: any = [];

  Undo1() {
    this.app.off = 0;
    this.app.on = 0;
    this.app.check = 0;
  }

  name: any = '';
  checkN: any = '';
  nameList: any = [];
  nameListDisplay: any = [];
  hardwareList: any = [];
  hardwareList2: any = [];
  datas: any;
  myControl = new FormControl();
  myControl2 = new FormControl();
  options: string[] = this.nameListDisplay;
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
  }

  FormValidation() {
    this.checkN = true;
    var MyArrayLower = this.nameList.map((element: any) => {
      return element.toLowerCase();
    });
    if (
      MyArrayLower.includes(this.name.toLowerCase()) == false ||
      this.name == ''
    ) {
      //alert("Ungültiger Vorname!")
      this.checkN = 'false';
    }
    if (this.checkN == true) {
      this.Search();
    }
  }

  Search() {
    this.hardwareList2 = [];
    for (var i = 0; i < this.nameList.length; i++) {
      if (this.nameList[i].toLowerCase() == this.name.toLowerCase()) {
        this.hardwareList2.push(this.hardwareList[i]);
      }
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
}

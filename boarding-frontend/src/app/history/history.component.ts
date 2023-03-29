import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { AppComponent } from '../app.component';
import { DataTransferService } from '../_services/data-transfer.service';
import {MatTableDataSource} from '@angular/material/table';

export interface UserData {
  id: number;
  name: string;
  type: string;
  date: string;
  who: string;
}

var ArrayAll : any;

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements AfterViewInit, OnInit {

  constructor(private app : AppComponent, private data : DataTransferService) {ArrayAll = this.app.all
  console.log(ArrayAll[0])
  console.log("\n"+ ArrayAll[1])
  console.log("\n"+ ArrayAll[1][0].firstname)
  const users = Array.from({length: ArrayAll[0].length + ArrayAll[1].length}, (_, k) => createNewUser(k + 1));
  // Assign the data to the data source for the table to render
  this.dataSource = new MatTableDataSource(users);
}


  Undo() {
    this.app.history = false
    this.app.on = 0
    this.app.off = 0
  }
 displayedColumns: string[] = ['name', 'type', 'date', 'who'];
  dataSource: MatTableDataSource<UserData> = new MatTableDataSource;

  async ngOnInit(){
    setTimeout(() => this.dataSource.paginator = this.paginator);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  if(ArrayAll[0].length >= id){
    console.log(id-1)
    return {
      id: id,
      name: ArrayAll[0][id-1].firstname + " " + ArrayAll[0][id-1].lastname,
      type: "Onboarding",
      date: ArrayAll[0][id-1].date,
      who: ArrayAll[0][id-1].who,
    };
  } else {
    console.log((id-ArrayAll[0].length)-1)
    return {
      id: id,
      name: ArrayAll[1][(id-ArrayAll[0].length)-1].firstname + " " + ArrayAll[1][(id-ArrayAll[0].length)-1].lastname,
      type: "Offboarding",
      date: ArrayAll[1][(id-ArrayAll[0].length)-1].date,
      who: ArrayAll[1][(id-ArrayAll[0].length)-1].who,
    }
  }
}

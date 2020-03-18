import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { element } from 'protractor';
/**
 * @title Table dynamically changing the columns displayed
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  data: PeriodicElement[] = ELEMENT_DATA;
  title = 'aseapplication';
  rownum: number;
  colnum: number;
  textval: string;
  rowvalue:PeriodicElement;
  colname:string;
  aseform = new FormGroup({
    stringval: new FormControl(''),
    intval: new FormControl(''),
    dateval: new FormControl(''),
  });
  myfun(row:PeriodicElement, i: number,colname:string) {
    console.log( i, row,)
    this.colnum=i;
    this.rownum=row.position;
    this.colname=colname;
    this.rowvalue=row;
    this.aseform.controls['stringval'].setValue(Object.keys(row).map(function(key){return row[colname]})[0])  
  }

  ngOnInit(){
    this.aseform.controls['stringval'].valueChanges.subscribe(value => {
      this.rowvalue[this.colname] = value;
      for(let i=0;i<this.data.length;i++){
        if(this.data[i].position== this.rowvalue.position){
          this.data[i]=this.rowvalue
        }
      }
    });
  }
}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
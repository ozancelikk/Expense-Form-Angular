import { Injectable } from '@angular/core';
import { ColDef, ColGroupDef, SideBarDef } from 'ag-grid-community';


@Injectable({
  providedIn: 'root'
})
export class AgGridTableService {

  createTable(columnDefs: (ColDef | ColGroupDef)[],colDef:ColDef,sideBar: SideBarDef | string | string[] | boolean | null){

  }

}

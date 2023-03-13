import { Component, OnInit } from '@angular/core';
import { ColDef, ColGroupDef, GridReadyEvent, SideBarDef } from 'ag-grid-community';
import { ExpenceService } from 'src/app/services/expence/expence.service';
import { ILanguage } from 'src/assets/locales/ILanguage';
import { Languages } from 'src/assets/locales/languages';

@Component({
  selector: 'app-expence',
  templateUrl: './expence.component.html',
  styleUrls: ['./expence.component.css']
})
export class ExpenceComponent implements OnInit {
  lang:ILanguage = Languages.lngs.get(localStorage.getItem("lng"));


  /*-----------------------------------------------------------*/
  public columnDefs: (ColDef | ColGroupDef)[] = [
    {field:"employeeId",headerName:this.lang.documentdate,unSortIcon: true},
    {field:"date",headerName:this.lang.date,unSortIcon: true},
  ];
  public rowSelection = 'multiple';
  public defaultColDef: ColDef = {
    editable: false,
    sortable: true,
    minWidth: 100,
    filter: true,
    resizable: true,
    floatingFilter: true,
    flex: 1,
  };
  public sideBar: SideBarDef | string | string[] | boolean | null = {
    toolPanels: ['columns', 'filters'],
    defaultToolPanel: '',
  };
  public rowData!: any[];
  /*-----------------------------------------------------------*/

  constructor(private expenceService:ExpenceService) { }

  ngOnInit(): void {
  }
  onGridReady(params:GridReadyEvent){
    this.expenceService.getAll("Expence/GetAll").subscribe(response=>{
      if (response.success) {
        this.rowData=response.data
        console.log(response);
      }else{
        console.log(response)
      }
    },errorResponse =>{
        console.log(errorResponse);
    })
  }
}

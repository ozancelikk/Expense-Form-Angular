import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SystemLog } from 'src/app/models/systemLogs/systemLog';
import { SystemLogService } from 'src/app/services/systemLog/system-log.service';
import { ILanguage } from 'src/assets/locales/ILanguage';
import { Languages } from 'src/assets/locales/languages';
import {
  ColDef,
  ColGroupDef,
  GridReadyEvent,
  SideBarDef,
} from 'ag-grid-community';
import { param } from 'jquery';
@Component({
  selector: 'app-system-logs',
  templateUrl: './system-logs.component.html',
  styleUrls: ['./system-logs.component.css']
})
export class SystemLogsComponent implements OnInit {


  reorderable = true;
  loadingIndicator = true;
  filterText=""
  lang:ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  apiURLGetAllSystemLogs = "SystemInformationsLog/GetAll"
  public columnDefs: (ColDef | ColGroupDef)[] = [
    {field:"date",headerName:this.lang.date,unSortIcon: true},
    {field:"target",headerName:this.lang.target,unSortIcon: true},
    {field:"level",headerName:this.lang.level,unSortIcon: true,  cellStyle: {textAlign: 'center'}, 
    cellRenderer:(params) =>
    
     {
      return params.value == "Error" ? 
      '<mat-icon class="mat-icon material-icons" title="Error" style="color:red" font-size:20px;" aria-hidden="true" data-toggle="modal">warning_amber</mat-icon>'
      : params.value == "Info" ?
      '<mat-icon class="mat-icon material-icons" title="Info" style="color:#8484ad" font-size:20px;" aria-hidden="true" data-toggle="modal">info</mat-icon>'
      :
      '<mat-icon class="mat-icon material-icons" title="Success" style="color:green" font-size:20px;" aria-hidden="true" data-toggle="modal">done</mat-icon>'
    }},
    {field:"message",headerName:this.lang.message,unSortIcon: true},
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
  constructor(private systemLogService:SystemLogService,private toastrService:ToastrService) {
   
   }

  ngOnInit(): void {
  }
  onGridReady(params: GridReadyEvent) {
    this.systemLogService.getRequest(this.apiURLGetAllSystemLogs).subscribe(response => {
      if(response.success){
        this.rowData = response.data
        this.toastrService.success(response.message)
      }else{
        this.toastrService.info(response.message)
      }
    },errorResponse => {
      this.toastrService.error(errorResponse.error.message)
    })   
  }


}

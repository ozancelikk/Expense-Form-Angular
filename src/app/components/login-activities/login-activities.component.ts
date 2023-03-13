import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoginActivity } from 'src/app/models/loginActivities/loginActivity';
import { LoginActivitiesService } from 'src/app/services/loginActivities/login-activities.service';
import { ILanguage } from 'src/assets/locales/ILanguage';
import { Languages } from 'src/assets/locales/languages';
import {
  ColDef,
  ColGroupDef,
  GridReadyEvent,
  SideBarDef,
} from 'ag-grid-community';
@Component({
  selector: 'app-login-activities',
  templateUrl: './login-activities.component.html',
  styleUrls: ['./login-activities.component.css']
})
export class LoginActivitiesComponent implements OnInit {

  rows:LoginActivity[]
  columns:any[];
  reorderable = true;
  loadingIndicator = true;
  filterText=""
  lang:ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  
  public columnDefs: (ColDef | ColGroupDef)[] = [
    {field:"dateTime",headerName:this.lang.datetime,unSortIcon: true},
    {field:"user",headerName:this.lang.user,unSortIcon: true,   cellStyle: {textAlign: 'center'},  cellRenderer:(params) =>
    
    {
     return '<a style="font-weight: 600;background-color: #031c3214; border-radius: 15px;color: black;height: 32px;padding: 7px;">'+params.value+'</a>'
   }},
    {field:"type",headerName:this.lang.type,unSortIcon: true,  cellStyle: {textAlign: 'center'},
    cellRenderer:(params) =>
    
    {
     return params.value == "Login Success" ? 
     '<mat-icon class="mat-icon material-icons" title="Login success" style="color:green" font-size:20px;" aria-hidden="true" data-toggle="modal">done</mat-icon>'
     :'<mat-icon class="mat-icon material-icons" title="Login Failed" style="color:red" font-size:20px;" aria-hidden="true" data-toggle="modal">warning_amber</mat-icon>'
     
    
   }
  },
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
  
  apiURLGetAllLoginActivities = "LoginActivities/GetAll"
  constructor(private loginActivitiesService:LoginActivitiesService,private toastrService:ToastrService) { 
    this.lang = Languages.lngs.get(localStorage.getItem("lng"))
    this.columns = [{ name: this.lang.datetime,prop:"dateTime" }, { name: this.lang.user,prop:"user" },{name:this.lang.type,prop:"type"}];
  }

  ngOnInit(): void {
  
  }

  onGridReady(params: GridReadyEvent) {
    this.loginActivitiesService.getRequest(this.apiURLGetAllLoginActivities).subscribe(response => {
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

import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, ColGroupDef, ColumnApi, GridApi, GridReadyEvent, SideBarDef } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/models/employee/employee';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { ILanguage } from 'src/assets/locales/ILanguage';
import { Languages } from 'src/assets/locales/languages';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent  {
  @ViewChild('myTable') table: any;
  rows: Employee[];
  apiUrlGetAll = 'Employee/GetAll';
  apiUrlGetById = 'Employee/GetById?id=';
  apiUrlDeleteEmployee = 'Employee/Delete?id=';
  employee: Employee[];
  timeout: any;
  lang: ILanguage = Languages.lngs.get(localStorage.getItem('lng'));;
  
/* AG Grid Definations */
  gridApi : GridApi;
  public columnDefs: (ColDef | ColGroupDef)[] = [
    {field:"email",headerName:this.lang.email,width:40,unSortIcon: true},
    {field:"name",headerName:this.lang.firstname,width:40,unSortIcon: true},
    {field:"surname",headerName:this.lang.lastname,width:40,unSortIcon: true},
    {field:"department",headerName:this.lang.department,width:40,unSortIcon: true},
    {field:"Edit",width:10,headerName:this.lang.edit,filter:false, valueGetter: (params) => {return "Edit";},cellRenderer:() => {return '<mat-icon class="mat-icon material-icons" style="cursor:pointer;color:gray; font-size:20px;" aria-hidden="true" data-toggle="modal" data-target="#exampleModal">edit</mat-icon>'},onCellClicked:(event: CellClickedEvent) => this.userUpdateChangeRoute(event.data.id)},
    ];
  public rowSelection = 'multiple';
  public defaultColDef: ColDef = {
    
    flex: 1,
  };
  public sideBar: SideBarDef | string | string[] | boolean | null = {
    toolPanels: ['columns'],
    defaultToolPanel: '',
  };
  public rowData!: any[];
/* AG Grid Definations */
 
  constructor(private toastrService:ToastrService,private employeeService:EmployeeService,public dialog:MatDialog,private router:Router) { }

  ngOnInit(): void {
  }

  onGridReady(){     
    this.getByEmployeeId();
  }

  getByEmployeeId(){
      this.employeeService.getByEmployeeId(localStorage.getItem("employeeid")).subscribe(response => {
        if (response.success) {
          console.log(response)
          this.rowData = response.data
       
        }else{
          console.log(response)
        }
      },errorResponse => {
        console.log(errorResponse)
      })
  }

  userUpdateChangeRoute(params:any){
    this.router.navigate(["/employee/settings/update-employee/"+params])
  }
  
}


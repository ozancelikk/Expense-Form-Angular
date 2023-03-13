import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CellClickedEvent, ColDef, ColGroupDef, GridApi, SideBarDef } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/models/employee/employee';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { ILanguage } from 'src/assets/locales/ILanguage';
import { Languages } from 'src/assets/locales/languages';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
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
    {field:"Change Password",headerName:this.lang.changepassword,width:20,filter:false, valueGetter: (params) => {return "Edit";},cellRenderer:() => {return '<mat-icon class="mat-icon material-icons" style="cursor:pointer;color:gray; font-size:20px;" aria-hidden="true" data-toggle="modal" data-target="#exampleModal">lock_open</mat-icon>'},onCellClicked:(event: CellClickedEvent) => this.employeeChangePasswordChangeRoute(event.data.email)},
    {field:"Edit",width:10,headerName:this.lang.edit,filter:false, valueGetter: (params) => {return "Edit";},cellRenderer:() => {return '<mat-icon class="mat-icon material-icons" style="cursor:pointer;color:gray; font-size:20px;" aria-hidden="true" data-toggle="modal" data-target="#exampleModal">edit</mat-icon>'},onCellClicked:(event: CellClickedEvent) => this. employeeUpdateChangeRoute(event.data.id)},
    {field:"Delete",width:10,headerName:this.lang.delete,filter:false,valueGetter: (params) => {return "Delete";},cellRenderer:() => {return '<mat-icon class="mat-icon material-icons" style="cursor:pointer;color:gray; font-size:20px;" aria-hidden="true">delete_outline</mat-icon>'},onCellClicked:(event: CellClickedEvent) => this.deleteEmployee(event.data.id) },
  ];
  public rowSelection = 'multiple';
  public defaultColDef: ColDef = {
    editable: false,
    sortable: true,
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
/* AG Grid Definations */
 
  constructor(private toastrService:ToastrService,private employeeService:EmployeeService,public dialog:MatDialog,private router:Router) { }

  ngOnInit(): void {
  }

  onGridReady(){     
    this.getAllEmployees();
  }

  deleteEmployee(employeeId:string){
    var employee=this.rowData.filter((r)=>r.id==employeeId)[0];
    const dialogRef = this.dialog.open(EmployeeDeleteDialogTemplate,{
      width:'450px',
      data:employee,
    });

    dialogRef.afterClosed().subscribe((result)=> {
      if (result) {
        this.employeeService.getRequest(this.apiUrlDeleteEmployee + employeeId).subscribe(
          (response)=>{
            if (response.success) {
              this.toastrService.success(response.message);
              this.getAllEmployees();
            }else{
              this.toastrService.info(response.message);
            }
          },errorResponse =>{
            this.toastrService.error(errorResponse.error.message);
          }
        )
      }
    });
  }

  getAllEmployees(){
    this.employeeService.getRequest(this.apiUrlGetAll).subscribe(
      (response)=>{
        if (response.success) {
          this.rowData=response.data;
          console.log(this.rowData);
          this.rows=response.data;
        }else{
          this.toastrService.info(response.message);
        }
      },errorResponse =>{
        this.toastrService.error(errorResponse.error.message);
      })
  }

  employeeUpdateChangeRoute(params:any){
    this.router.navigate(["/admin/settings/update-employee/"+params])
  }
  employeeChangePasswordChangeRoute(params:any){
    this.router.navigate(["/admin/settings/change-password/"+params])
  }
}
@Component({
  selector: 'employee-delete-dialog-template',
  templateUrl: 'employee-delete-dialog-template.html',
})
export class EmployeeDeleteDialogTemplate {
  lang:ILanguage
  constructor(
    public dialogRef: MatDialogRef<EmployeeDeleteDialogTemplate>,
    @Inject(MAT_DIALOG_DATA) public data: Employee
  ) {
    this.lang = Languages.lngs.get(localStorage.getItem('lng'));
  }
}

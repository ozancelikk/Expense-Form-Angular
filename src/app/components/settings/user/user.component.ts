import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CellClickedEvent, ColDef, ColGroupDef, GridApi, GridReadyEvent, SideBarDef } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user/user';
import { UserService } from 'src/app/services/user/user.service';
import { ILanguage } from 'src/assets/locales/ILanguage';
import { Languages } from 'src/assets/locales/languages';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  @ViewChild('myTable') table: any;
  rows: User[];
  apiUrlGetAll = 'User/GetAll';
  apiUrlDeleteUser = 'User/Delete?id=';
  users: User[];
  timeout: any;
  lang: ILanguage = Languages.lngs.get(localStorage.getItem('lng'));;
  
/* AG Grid Definations */
  gridApi : GridApi;
  public columnDefs: (ColDef | ColGroupDef)[] = [
    {field:"email",headerName:this.lang.email,width:40,unSortIcon: true},
    {field:"firstName",headerName:this.lang.firstname,width:40,unSortIcon: true},
    {field:"lastName",headerName:this.lang.lastname,width:40,unSortIcon: true},
    {field:"Change Password",headerName:this.lang.changepassword,width:20,filter:false, valueGetter: (params) => {return "Edit";},cellRenderer:() => {return '<mat-icon class="mat-icon material-icons" style="cursor:pointer;color:gray; font-size:20px;" aria-hidden="true" data-toggle="modal" data-target="#exampleModal">lock_open</mat-icon>'},onCellClicked:(event: CellClickedEvent) => this.userChangePasswordChangeRoute(event.data.email)},
    {field:"Edit",width:10,headerName:this.lang.edit,filter:false, valueGetter: (params) => {return "Edit";},cellRenderer:() => {return '<mat-icon class="mat-icon material-icons" style="cursor:pointer;color:gray; font-size:20px;" aria-hidden="true" data-toggle="modal" data-target="#exampleModal">edit</mat-icon>'},onCellClicked:(event: CellClickedEvent) => this.userUpdateChangeRoute(event.data.id)},
    {field:"Delete",width:10,headerName:this.lang.delete,filter:false,valueGetter: (params) => {return "Delete";},cellRenderer:() => {return '<mat-icon class="mat-icon material-icons" style="cursor:pointer;color:gray; font-size:20px;" aria-hidden="true">delete_outline</mat-icon>'},onCellClicked:(event: CellClickedEvent) => this.deleteUser(event.data.id) },
  
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


  constructor(
    private userService: UserService,
    private toastrService: ToastrService,
    public dialog: MatDialog,
    private router:Router
  ) {
    
  }

  ngOnInit(): void {
   
  }

  deleteUser(userId: string) {
    var user = this.rowData.filter((r) => r.id == userId)[0];
    const dialogRef = this.dialog.open(UserDeleteDialogTemplate, {
      width: '450px',
      data: user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.getRequest(this.apiUrlDeleteUser + userId).subscribe(
          (response) => {
            if (response.success) {
              this.toastrService.success(response.message)
              this.getAllUsers();
            }else{
              this.toastrService.info(response.message)
            }
          },errorResponse => {
            this.toastrService.error(errorResponse.error.message)
          })
      }
    });
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api
    params.api.sizeColumnsToFit();
    this.getAllUsers()
  }
  getAllUsers() {
    this.userService.getRequest(this.apiUrlGetAll).subscribe(
      (response) => {
        if (response.success) {
          this.rowData = response.data;
          console.log(this.rowData)
          this.rows = response.data;
        }else{
          this.toastrService.info(response.message)
        }
      },errorResponse => {
        this.toastrService.error(errorResponse.error.message)
      })
  }

  toggleExpandRow(row: any) {
    this.table.rowDetail.toggleExpandRow(row);
  }
  userUpdateChangeRoute(params:any){
    this.router.navigate(["/admin/settings/update-user/"+params])
  }
  userChangePasswordChangeRoute(params:any){
    this.router.navigate(["/admin/settings/change-password/"+params])
}
}

@Component({
  selector: 'user-delete-dialog-template',
  templateUrl: 'user-delete-dialog-template.html',
})
export class UserDeleteDialogTemplate {
  lang:ILanguage
  constructor(
    public dialogRef: MatDialogRef<UserDeleteDialogTemplate>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {
    this.lang = Languages.lngs.get(localStorage.getItem('lng'));
  }
}

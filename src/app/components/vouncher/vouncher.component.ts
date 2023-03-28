import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { CellClickedEvent, ColDef, ColGroupDef, ColumnApi, GridApi, GridReadyEvent, ICellRendererParams, SideBarDef } from 'ag-grid-community';
import { VouncherService } from 'src/app/services/vouncher/vouncher.service';
import { ILanguage } from 'src/assets/locales/ILanguage';
import { Languages } from 'src/assets/locales/languages';
import { PDFExporter } from 'src/app/services/pdfExporter/pdf-exporter';
import { ExcelExporter } from 'src/app/services/excelExporter/excel-exporter';
import { Vouncher } from 'src/app/models/vouncher/vouncher';
import { VoucherImage } from 'src/app/models/vouncher/voucherImage';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vouncher',
  templateUrl: './vouncher.component.html',
  styleUrls: ['./vouncher.component.css']


  
})
export class VouncherComponent implements OnInit {
  @ViewChild('myTable') table: any;
  lang:ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  gridApi:GridApi;
  columnApi:ColumnApi;
  vouncherImage:VoucherImage[];
  vouncher:Vouncher[];
  apiUrlDeleteVouncher="Voucher/Delete?id="
  x=5;

  /*-----------------------------------------------------------*/
  public columnDefs: (ColDef | ColGroupDef)[] = [
    {field:"documentDate",headerName:this.lang.documentdate,unSortIcon: true},
    {field:"vouncherNo",headerName:this.lang.vouncherno,unSortIcon: true},
    {field:"company",headerName:this.lang.company,unSortIcon: true},
    {field:"vouncherType",headerName:this.lang.vounchertype,unSortIcon: true},
    {field:"taxRate",headerName:this.lang.taxrate,unSortIcon: true},
    {field:"total",headerName:this.lang.total,unSortIcon: true},
    {field:"taxTotal",headerName:this.lang.taxtotal,unSortIcon: true},
    {field:"taxSum:",headerName:this.lang.taxsum,unSortIcon: true, valueGetter: (param) => {
     return param.data.taxSum;
    }},
    // {field:"expenceId",unSortIcon: true},
    {field:"employee",headerName:this.lang.employeeId,unSortIcon: true,cellRenderer:(param) => { 
      console.log(param)
      return param.data.employee.passwordHash=null, param.data.employee.passwordSalt=null,param.data.employee.name
     }},
    {headerName:this.lang.vouncherimage,unSortIcon: true,cellRenderer: (param)=>{
      // console.log(window.location)
      return '<a class="btn btn-primary" href="'+window.location.href+'/vouncher-details/'+param.data.id+'">Fiş Görseli</a>'
    },},
    {field:"pay",headerName:this.lang.pay,unSortIcon: true, editable: true,},
    {field:"update",headerName:this.lang.update,unSortIcon: true,cellRenderer: (param)=>{
      return '<a class="btn btn-primary" href="/#/admin/vouncher-update/'+param+'">Update</a>'
    },},
    {field:"Delete",width:10,headerName:this.lang.delete,filter:false,valueGetter: (params) => {return "Delete";},cellRenderer:() => {return '<mat-icon class="mat-icon material-icons" style="cursor:pointer;color:gray; font-size:20px;" aria-hidden="true">delete_outline</mat-icon>'},onCellClicked:(event: CellClickedEvent) => this.deleteVouncher(event.data.id) },
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
  
  rowDatas:Vouncher[];
  constructor(
    private vouncherService:VouncherService, 
    private pdfExporter:PDFExporter,
    private excelExporter:ExcelExporter,
    private toastrService:ToastrService,
    private activatedRoute:ActivatedRoute,
    public dialog: MatDialog,) { }
  ngOnInit(): void {
    
  }


   onGridReady(params: GridReadyEvent){
    console.log(params)
    this.gridApi=params.api;
    this.columnApi=params.columnApi;
    params.api.sizeColumnsToFit();
    this.getall()
  }
  
getall(){
  if(localStorage.getItem("employeeid")){
    this.vouncherService.getDetailsByEmployeeId(localStorage.getItem("employeeid")).subscribe(response => {
      if (response.success) {

        this.rowData = response.data
        console.log(response)
      }else{
        console.log(response)
      }
    },errorResponse => {
      console.log(errorResponse)
    })
  }else{
    this.vouncherService.getAllVoucher("Voucher/VouncherGetDto").subscribe(response => {
      if (response.success) {
        this.rowData = response.data
        console.log(response)
      }else{
        console.log(response)
      }
    },errorResponse => {
      console.log(errorResponse)
    })
  }  
}
  onCellClicked(data,id:string){
    this.vouncherService.getByVouncherId(id).subscribe(response=>{
      let temp=response.data.id
      return "vouncher-details/" + temp; 
    })
    
  }
  
  deleteVouncher(vouncherId:string){
    var vouncher=this.rowData.filter((v)=>v.id==vouncherId)[0];
    const dialogRef=this.dialog.open(VouncherDeleteDialogTemplate,{
      width:'450px',
      data:vouncher,
    });

    dialogRef.afterClosed().subscribe((result)=>{
      if (result) {
        this.vouncherService.getRequest(this.apiUrlDeleteVouncher+vouncherId).subscribe(
          (response)=>{
            if (response.success) {
              this.toastrService.success(response.message)
              this.getall();
            }else{
              this.toastrService.info(response.message)
            }
          },errResponse=>{
            this.toastrService.error(errResponse.error.message)
          }
        )
      }
    });
  }

  openPDF(){
    this.pdfExporter.exportPDF(this.gridApi,this.columnApi); 
  }

  openExcel(){
    this.excelExporter.excelExporter(this.gridApi,this.columnApi)
  }

}

@Component({
  selector: 'vouncher-delete-dialog-template',
  templateUrl: 'vouncher-delete-dialog-template.html',
})
export class VouncherDeleteDialogTemplate {
  lang:ILanguage
  constructor(
    public dialogRef: MatDialogRef<VouncherDeleteDialogTemplate>,
    @Inject(MAT_DIALOG_DATA) public data: Vouncher
  ) {
    this.lang = Languages.lngs.get(localStorage.getItem('lng'));
  }
}

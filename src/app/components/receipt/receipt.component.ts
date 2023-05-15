import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CellClickedEvent, ColDef, ColGroupDef, ColumnApi, GridApi, GridReadyEvent, SideBarDef } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { Receipt } from 'src/app/models/receipt/receipt';
import { ExcelExporter } from 'src/app/services/excelExporter/excel-exporter';
import { PDFExporter } from 'src/app/services/pdfExporter/pdf-exporter';
import { ReceiptService } from 'src/app/services/receipt/receipt.service';
import { ILanguage } from 'src/assets/locales/ILanguage';
import { Languages } from 'src/assets/locales/languages';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {
  lang:ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  gridApi:GridApi;
  columnApi:ColumnApi;

  /*-----------------------------------------------------------*/
  public columnDefs: (ColDef | ColGroupDef)[] = [
    {field:"documentDate",headerName:this.lang.receiptDate,unSortIcon: true},
    {field:"total",headerName:this.lang.total,unSortIcon: true},
    {field:"documentDescription",headerName:this.lang.documentDescriotion,unSortIcon: true},
    {field:"companyName",headerName:this.lang.company,unSortIcon: true},
    {field:"authorizedName",headerName:this.lang.authorizedName,unSortIcon: true},
    {field:"employee",headerName:this.lang.employeeId,unSortIcon: true,cellRenderer:(param) => { 
      return param.data.employee.passwordHash=null, param.data.employee.passwordSalt=null,param.data.employee.name
     }},
    {field:"address",headerName:this.lang.address,unSortIcon: true},
    {headerName:this.lang.receiptImage,unSortIcon: true,cellRenderer: (param)=>{
      console.log(param)
      return '<a class="btn btn-primary"href="'+window.location.href+'/receipt-details/'+param.data.id+'">Makbuz Görseli</a>'
    },},
    {field:"Delete",width:10,headerName:this.lang.delete,filter:false,valueGetter: (params) => {return "Delete";},cellRenderer:() => {return '<mat-icon class="mat-icon material-icons" style="cursor:pointer;color:gray; font-size:20px;" aria-hidden="true">delete_outline</mat-icon>'},onCellClicked:(event: CellClickedEvent) => this.deleteReceipt(event.data.id) },
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

  apiUrlDeleteReceipt="Receipt/Delete?id=";
  constructor(public dialog:MatDialog,private toastrService:ToastrService,private receiptService:ReceiptService,private pdfExporter:PDFExporter,private excelExporter:ExcelExporter) { }

  ngOnInit(): void {
  }

  onGridReady(params: GridReadyEvent){
    console.log(params)
    this.gridApi=params.api;
    this.columnApi=params.columnApi;
    this.getall();
  }
  getall(){
    if(localStorage.getItem("employeeid")){
      this.receiptService.getDetailsByEmployeeId(localStorage.getItem("employeeid")).subscribe(response => {
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
      this.receiptService.getAllReceipt("Receipt/ReceiptGetDto").subscribe(response => {
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

  // onCellClicked(data,id:string){
  //   this.receiptService.getImagesByReceiptId(id).subscribe(response=>{
  //     let temp=response.data
  //     return "vouncher-details/" + temp; 
  //   })
  // }

  deleteReceipt(receiptId:string){
    var receipt=this.rowData.filter((r)=>r.id==receiptId)[0]
    const dialogRef=this.dialog.open(ReceiptDeleteDialogTemplate,{
      width:'450',
      data:receipt,
    });

    dialogRef.afterClosed().subscribe((result)=>{
      if (result) {
        this.receiptService.getRequest(this.apiUrlDeleteReceipt+receiptId).subscribe(
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
    })
  } 

  openPDF(){
    this.pdfExporter.exportPDF(this.gridApi,this.columnApi); 
  }

  openExcel(){
    this.excelExporter.excelExporter(this.gridApi,this.columnApi)
  }
}

@Component({
  selector: 'receipt-delete-dialog-template',
  templateUrl: 'receipt-delete-dialog-template.html',
})
export class ReceiptDeleteDialogTemplate {
  lang:ILanguage
  constructor(
    public dialogRef: MatDialogRef<ReceiptDeleteDialogTemplate>,
    @Inject(MAT_DIALOG_DATA) public data: Receipt
  ) {
    this.lang = Languages.lngs.get(localStorage.getItem('lng'));
  }
}

import { Component, OnInit } from '@angular/core';
import { ColDef, ColGroupDef, ColumnApi, GridApi, GridReadyEvent, SideBarDef } from 'ag-grid-community';
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
      return  param.data.employee.name 
     }},
    {field:"address",headerName:this.lang.address,unSortIcon: true},
    {field:"receiptImage",headerName:this.lang.receiptImage,unSortIcon: true,cellRenderer: (param)=>{
      return '<a class="btn btn-primary" href="/#/admin/receipt-details/'+param.data.id+this.lang.receiptImage+'">Makbuz Görseli</a>'
    },},
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

  constructor(private receiptService:ReceiptService,private pdfExporter:PDFExporter,private excelExporter:ExcelExporter) { }

  ngOnInit(): void {
  }

  onGridReady(params: GridReadyEvent){
    console.log(params)
    this.gridApi=params.api;
    this.columnApi=params.columnApi;
    if(localStorage.getItem("employeeid")){
      this.receiptService.getAllByEmployeeId(localStorage.getItem("employeeid")).subscribe(response => {
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

  onCellClicked(data,id:string){
    this.receiptService.getImagesByReceiptId(id).subscribe(response=>{
      let temp=response.data
      return "vouncher-details/" + temp; 
    })
  }

  openPDF(){
    this.pdfExporter.exportPDF(this.gridApi,this.columnApi); 
  }

  openExcel(){
    this.excelExporter.excelExporter(this.gridApi,this.columnApi)
  }
}

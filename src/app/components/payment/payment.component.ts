import { Component, OnInit } from '@angular/core';
import { ColDef, ColGroupDef, ColumnApi, GridApi, GridReadyEvent, SideBarDef } from 'ag-grid-community';
import { ExcelExporter } from 'src/app/services/excelExporter/excel-exporter';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { PDFExporter } from 'src/app/services/pdfExporter/pdf-exporter';
import { ILanguage } from 'src/assets/locales/ILanguage';
import { Languages } from 'src/assets/locales/languages';
import { EmployeeLoginComponent } from '../employee-login/employee-login.component';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  lang:ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  gridApi:GridApi;
  columnApi:ColumnApi;

  /*-----------------------------------------------------------*/
  public columnDefs: (ColDef | ColGroupDef)[] = [
    {field:"employee",headerName:this.lang.employeeId,unSortIcon: true,cellRenderer:(param) => { 
      return  param.data.employee.name
     }},
    {field:"amount",headerName:this.lang.amount,unSortIcon: true,},
    {field:"paymentChoices",headerName:this.lang.paymentChoices,unSortIcon: true},
    {field:"description",headerName:this.lang.description,unSortIcon: true},
    {field:"pay",headerName:this.lang.pay,unSortIcon: true},
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
  
  constructor(private paymentService:PaymentService, private pdfExporter:PDFExporter,private excelExporter:ExcelExporter) { }

  ngOnInit(): void {
  }

   onGridReady(params: GridReadyEvent){
    console.log(params)
    this.gridApi=params.api;
    this.columnApi=params.columnApi;
    if(localStorage.getItem("employeeid")){
      this.paymentService.getAllByEmployeeId(localStorage.getItem("employeeid")).subscribe(response => {
        if (response.success) {
          console.log(response)
          this.rowData = response.data
          console.log(response)
        }else{
          console.log(response)
        }
      },errorResponse => {
        console.log(errorResponse)
      })
    }else{
      this.paymentService.getAll("Payment/GetAll").subscribe(response => {
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

  openPDF(){
    this.pdfExporter.exportPDF(this.gridApi,this.columnApi); 
  }

  openExcel(){
    this.excelExporter.excelExporter(this.gridApi,this.columnApi)
  }

}

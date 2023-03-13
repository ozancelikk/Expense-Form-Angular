import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { ColDef, ColGroupDef, ColumnApi, GridApi, GridReadyEvent, ICellRendererParams, SideBarDef } from 'ag-grid-community';
import { VouncherService } from 'src/app/services/vouncher/vouncher.service';
import { ILanguage } from 'src/assets/locales/ILanguage';
import { Languages } from 'src/assets/locales/languages';
import { PDFExporter } from 'src/app/services/pdfExporter/pdf-exporter';
import { ExcelExporter } from 'src/app/services/excelExporter/excel-exporter';
import { Vouncher } from 'src/app/models/vouncher/vouncher';
import { VoucherImage } from 'src/app/models/vouncher/voucherImage';
import { data, param } from 'jquery';
import { ActivatedRoute } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-vouncher',
  templateUrl: './vouncher.component.html',
  styleUrls: ['./vouncher.component.css']


  
})
export class VouncherComponent implements OnInit {
  lang:ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  gridApi:GridApi;
  columnApi:ColumnApi;
  vouncherImage:VoucherImage[];
  vouncher:Vouncher;
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
      return  param.data.employee.name
     }},
    {field:"vouncherImage",headerName:this.lang.vouncherimage,unSortIcon: true,cellRenderer: (param)=>{
      return '<a class="btn btn-primary" href="/#/admin/vouncher-details/'+param.data.id+this.lang.vouncherimage+'">Fiş Görseli</a>'
    },},
    {field:"pay",headerName:this.lang.pay,unSortIcon: true, editable: true,},
    {field:"update",headerName:this.lang.update,unSortIcon: true,cellRenderer: (param)=>{
      return '<a class="btn btn-primary" href="/#/admin/vouncher-update/'+param+'">Update</a>'
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
  
  rowDatas:Vouncher[];
  constructor(private vouncherService:VouncherService, private pdfExporter:PDFExporter,private excelExporter:ExcelExporter,private activatedRoute:ActivatedRoute,public dialog: MatDialog,) { }
    refresh(params: ICellRendererParams): boolean {
      throw new Error('Method not implemented.');
    }

  ngOnInit(): void {
    
  }


   onGridReady(params: GridReadyEvent){
    console.log(params)
    this.gridApi=params.api;
    this.columnApi=params.columnApi;
    if(localStorage.getItem("employeeid")){
      this.vouncherService.getAllByEmployeeId(localStorage.getItem("employeeid")).subscribe(response => {
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

  openPDF(){
    this.pdfExporter.exportPDF(this.gridApi,this.columnApi); 
  }

  openExcel(){
    this.excelExporter.excelExporter(this.gridApi,this.columnApi)
  }

}
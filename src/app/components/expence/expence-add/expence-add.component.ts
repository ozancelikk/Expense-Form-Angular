import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColDef, ColGroupDef, GridReadyEvent, SideBarDef } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { VouncherService } from 'src/app/services/vouncher/vouncher.service';
import { ILanguage } from 'src/assets/locales/ILanguage';
import { Languages } from 'src/assets/locales/languages';

@Component({
  selector: 'app-expence-add',
  templateUrl: './expence-add.component.html',
  styleUrls: ['./expence-add.component.css']
})
export class ExpenceAddComponent implements OnInit {
  lang:ILanguage = Languages.lngs.get(localStorage.getItem("lng"));


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
    {field:"vouncherImage",headerName:this.lang.vouncherimage,unSortIcon: true},
    {field:"expenceId",unSortIcon: true},
    {field:"employeeId",unSortIcon: true},
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


  voucherAddForm:FormGroup;
  taxRate:number;
  total:number=0;
  taxTotal:number=0;
  taxSum:number=0;
  expenceService: any;

  constructor(private formBuilder:FormBuilder,private voucherService:VouncherService,private toastrService:ToastrService) { }

  
  ngOnInit(): void {
    this.createCarAddForm();
    this.valuechange;
  }
  onGridReady(params:GridReadyEvent){
    this.voucherService.getAll("Voucher/GetAll").subscribe(response=>{
      if (response.success) {
        this.rowData=response.data
        console.log(response);
      }else{
        console.log(response)
      }
    },errorResponse =>{
        console.log(errorResponse);
    })
  }


  createCarAddForm(){
    this.voucherAddForm=this.formBuilder.group({
      documentDate:["",Validators.required],
      vouncherNo:["",Validators.required],
      company:["",Validators.required],
      vouncherType:["",Validators.required],
      taxRate:["",Validators.required],
      total:["",Validators.required],
      taxTotal:[this.taxTotal,Validators.required],
      taxSum:[this.taxSum,Validators.required],
      vouncherImage:["",Validators.required],
    })
  }

  
  valuechange(value:any){
      this.taxTotal=this.total/100*value
      this.taxSum=this.taxTotal+this.total
  }
  
  add(){
    let voucherModel2=Object.assign({},this.voucherAddForm.value)
    console.log(voucherModel2)
    if(this.voucherAddForm.valid){
      let voucherModel=Object.assign({},this.voucherAddForm.value)
      this.voucherService.add(voucherModel).subscribe(response=>{
        this.toastrService.success(response.message,"Eklendi")
      },responseError=>{
        if(responseError.error.Errors.length>0){
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Hatası")
          }
        }
      })
    }else{
      this.toastrService.error("Formunuz Eksik","Dikkat")
    }
  }

}

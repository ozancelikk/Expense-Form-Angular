import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/models/employee/employee';
import { VoucherImage } from 'src/app/models/vouncher/voucherImage';
import { Vouncher } from 'src/app/models/vouncher/vouncher';
import { VouncherService } from 'src/app/services/vouncher/vouncher.service';
import { ILanguage } from 'src/assets/locales/ILanguage';
import { Languages } from 'src/assets/locales/languages';

@Component({
  selector: 'app-update-vouncher',
  templateUrl: './update-vouncher.component.html',
  styleUrls: ['./update-vouncher.component.css']
})
export class UpdateVouncherComponent implements OnInit {

  lang:ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  voucherUpdateForm:FormGroup;
  imageAddForm:FormGroup;
  employee:Employee
  taxRate: number;
  total:number=0;
  taxTotal:number=0;
  taxSum:number=0;
  vouncher:Vouncher
  vouncherImage:VoucherImage
  isFormReady:boolean=false
  vouncherId="";
  apiUrlGetById:"Voucher/GetById"
  apiUrlUpdate:"Voucher/Update"
  apiUrlDelete:"Voucher/Delete"

  constructor(
    private formBuilder:FormBuilder,
    private voucherService:VouncherService,
    private toastrService:ToastrService,
    private httpClient:HttpClient,
    private router:Router
    ) { this.lang = Languages.lngs.get(localStorage.getItem("lng"));}

  ngOnInit(): void {
    this.updateVoucherForm();
    this.valuechange;
    
  }
  imageFromGroup(){
    this.imageAddForm=this.formBuilder.group({
      vouncherId:[localStorage.getItem("vouncherId")],
      imagePath:["",Validators.required],
      dateTime:["",Validators.required],
    });
  }
  
  updateVoucherForm(){
    this.voucherUpdateForm=this.formBuilder.group({
      employeeId:[localStorage.getItem("employeeid")],
      documentDate:["",Validators.required],
      vouncherNo:["",Validators.required],
      company:["",Validators.required],
      vouncherType:["",Validators.required],
      taxRate:["",Validators.required],
      total:["",Validators.required],
      taxTotal:[this.taxTotal,Validators.required],
      taxSum:[this.taxSum,Validators.required],
      vouncherImage:["",Validators.required],
      pay:["",Validators.required],
    })
  }
  
  valuechange(value:any){
      this.taxTotal=this.total/100*value
      this.taxSum=this.taxTotal+this.total
  }


  getByVouncherId(vouncherId:string){
    this.voucherService.getById(this.apiUrlGetById + vouncherId)
    .subscribe((response)=>{
      if (response.success) {
        console.log(response)
        this.updateVoucherForm()
        this.isFormReady=true
      }else{
        this.toastrService.info(response.message);
      }
    },errorResponse=>{
      this.toastrService.error(errorResponse.error.message);
    })
  }

  updateVouncher(){
    if (this.voucherUpdateForm.valid) {
      var employeeUpdateModel=Object.assign({},this.voucherUpdateForm.value);
      this.voucherService.postRequest(this.apiUrlUpdate,employeeUpdateModel)
      .subscribe((response)=>{
        if (response.success) {
          this.toastrService.success(response.message);
        }else{
          this.toastrService.info(response.message);
        }
      },errResponse=>{
        this.toastrService.error(errResponse.error.message);
      })
    }
  }
  deleteVouncher(){
    this.voucherService.getRequest(this.apiUrlDelete + this.vouncherId).subscribe((response)=>{
      if (response.success) {
        this.toastrService.success(response.message);
        this.router.navigate(["/admin/vouncher"])
      }else{
        this.toastrService.info(response.message)
      }
    },errResponse=>{
      this.toastrService.error(errResponse.error.message);
    })
  }
}

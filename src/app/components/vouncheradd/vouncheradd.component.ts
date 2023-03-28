import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/models/employee/employee';
import { VoucherImage } from 'src/app/models/vouncher/voucherImage';
import { VouncherService } from 'src/app/services/vouncher/vouncher.service';
import { ILanguage } from 'src/assets/locales/ILanguage';
import { Languages } from 'src/assets/locales/languages';

@Component({
  selector: 'app-vouncheradd',
  templateUrl: './vouncheradd.component.html',
  styleUrls: ['./vouncheradd.component.css']
})
export class VouncheraddComponent implements OnInit {

  lang:ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  voucherAddForm:FormGroup;
  imageAddForm:FormGroup;
  employee:Employee
  taxRate: number;
  total:number=0;
  taxTotal:number=0;
  taxSum:number=0;
  vouncherImage:VoucherImage
  file:File
  vouncherId:string;

  constructor(
    private formBuilder:FormBuilder,
    private voucherService:VouncherService,
    private toastrService:ToastrService,
    private httpClient:HttpClient,
    ) { this.lang = Languages.lngs.get(localStorage.getItem("lng"));}

  ngOnInit(): void {
    this.createVoucherAddForm();
    this.valuechange;
    
  }
  createVoucherAddForm(){
    this.voucherAddForm=this.formBuilder.group({
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


  isAdmin(){
    if (localStorage.getItem("userId")) {
      return true
    }else{
      return false
    }
  }
  
  add(){
    if(this.voucherAddForm.valid){
      let voucherModel=Object.assign({},this.voucherAddForm.value)
      this.voucherService.add(voucherModel).subscribe(response=>{
        this.vouncherId=response.data
        setTimeout(()=>{
          let model2={
            voucherId:this.vouncherId,
            image:this.file
          }
          console.log(model2)
          this.voucherService.imageAdd(model2).subscribe(
            response=>{
              if (response.success) {
                
              }
            })
        },4000)
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

  onChange(event){
    this.file=event.target?.files[0];
  }
}
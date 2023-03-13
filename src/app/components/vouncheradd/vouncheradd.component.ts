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
  imageFromGroup(){
    this.imageAddForm=this.formBuilder.group({
      vouncherId:[localStorage.getItem("vouncherId")],
      imagePath:["",Validators.required],
      dateTime:["",Validators.required],
    });
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
  
  add(){
    let voucherModel2=Object.assign({},this.voucherAddForm.value)
    console.log(voucherModel2)
    if(this.voucherAddForm.valid){
      let voucherModel=Object.assign({},this.voucherAddForm.value)
      this.voucherService.add(voucherModel).subscribe(response=>{
        this.toastrService.success(response.message,"Eklendi")
        setTimeout(function () {
          window.location.reload();
        }, 700);
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


  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!RESİM İŞLEMLERİ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  // imageAdd(vouncherImage:VoucherImage){
 
  //   this.voucherService.Imageadd(vouncherImage).subscribe(response=>{
  //     if (response.success) {
  //       this.toastrService.success(response.message);
  //     }else{
  //       this.toastrService.error(response.message);
  //     }
  //   })
  // }

  // imagePath:File
  // dbImage: any;
  // postResponse: any;
  // successResponse: string;
  // image: any;

  // public onImageUpload(event) {
  //   this.imagePath = event.target.files[0];
  // }


  // imageUploadAction() {
  //   const imageFormData = new FormData();
  //   imageFormData.append('image', this.imagePath, this.imagePath.name);


  //   this.httpClient.post('https://localhost:44357/api/VouncherImage/AddImage', imageFormData)
  //     .subscribe((response) => {
  //       if (response === 200) {
  //         this.postResponse = response;
  //         this.successResponse = this.postResponse.body.message;
  //       } else {
  //         this.successResponse = 'Hata var mq';
  //       }
  //     }
  //     );
  //   }

  // viewImage() {
  //   this.httpClient.get('http://localhost:8080/get/image/info/' + this.image)
  //     .subscribe(
  //       res => {
  //         this.postResponse = res;
  //         this.dbImage = 'data:image/jpeg;base64,' + this.postResponse.image;
  //       }
  //     );
  // }


  // selectImage(vouncherImage:VoucherImage){
  //   this.voucherService.Imageadd(vouncherImage).subscribe(response=>{
  //     this.toastrService.success(response.message,"Eklendi")
  //   })
  // }
}










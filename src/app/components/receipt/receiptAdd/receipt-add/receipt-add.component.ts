import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ReceiptService } from 'src/app/services/receipt/receipt.service';
import { ILanguage } from 'src/assets/locales/ILanguage';
import { Languages } from 'src/assets/locales/languages';

@Component({
  selector: 'app-receipt-add',
  templateUrl: './receipt-add.component.html',
  styleUrls: ['./receipt-add.component.css']
})
export class ReceiptAddComponent implements OnInit {

  receiptAddForm:FormGroup;
  total:number=0;
  lang:ILanguage
  file:File
  receiptId:string;

  constructor(
    private formBuilder:FormBuilder,
    private receiptService:ReceiptService,
    private toastrService:ToastrService,
    ) {this.lang = Languages.lngs.get(localStorage.getItem("lng")); }

  ngOnInit(): void {
    this.createReceiptAddForm();
  }

  createReceiptAddForm(){
    this.receiptAddForm=this.formBuilder.group({
      employeeId:[localStorage.getItem("employeeid")],
      documentDate:["",Validators.required],
      total:["",Validators.required],
      documentDescription:["",Validators.required],
      companyName:["",Validators.required],
      authorizedName:["",Validators.required],
      address:["",Validators.required],
      receiptImage:["",Validators.required],
    })
  }

  onChange(event){
    this.file=event.target?.files[0];
  }

  
  add(){
    let receiptModel=Object.assign({},this.receiptAddForm.value)
    console.log(receiptModel)
    if(this.receiptAddForm.valid){
      let receiptModel=Object.assign({},this.receiptAddForm.value)
      this.receiptService.add(receiptModel).subscribe(response=>{
        this.receiptId=response.data;
        setTimeout(()=>{
          let model2={
            receiptId:this.receiptId,
            image:this.file
          }
          console.log(model2)
          this.receiptService.imageAdd(model2).subscribe(
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
}

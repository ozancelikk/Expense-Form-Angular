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

  

  
  add(){
    let receiptModel=Object.assign({},this.receiptAddForm.value)
    console.log(receiptModel)
    if(this.receiptAddForm.valid){
      let receiptModel=Object.assign({},this.receiptAddForm.value)
      this.receiptService.add(receiptModel).subscribe(response=>{
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
  //url; //Angular 8
	url: any; //Angular 11, for stricter type
	msg = "";
	
	//selectFile(event) { //Angular 8
	selectFile(event: any) { //Angular 11, for stricter type
		if(!event.target.files[0] || event.target.files[0].length == 0) {
			this.msg = 'You must select an image';
			return;
		}
		
		var mimeType = event.target.files[0].type;
		
		if (mimeType.match(/image\/*/) == null) {
			this.msg = "Only images are supported";
			return;
		}
		
		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => {
			this.msg = "";
			this.url = reader.result; 
		}
	}

}

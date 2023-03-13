import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/models/employee/employee';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { ILanguage } from 'src/assets/locales/ILanguage';
import { Languages } from 'src/assets/locales/languages';

@Component({
  selector: 'app-payment-add',
  templateUrl: './payment-add.component.html',
  styleUrls: ['./payment-add.component.css']
})
export class PaymentAddComponent implements OnInit {

  
  dataLoaded=false;
  employee:Employee;
  employees:Employee[];
  paymentAddForm:FormGroup;
  lang:ILanguage;
  constructor(
    private formBuilder:FormBuilder,
    private paymentService:PaymentService,
    private toastrService:ToastrService,
    private employeeService:EmployeeService
  ) {this.lang=Languages.lngs.get(localStorage.getItem("lng")); }

  ngOnInit(): void {
    this.createPaymentAddForm();
    this.getEmployee();
  }

  createPaymentAddForm(){
    this.paymentAddForm=this.formBuilder.group({
      employeeId:["",Validators.required],
      amount:["",Validators.required],
      paymentChoices:["",Validators.required],
      description:["",Validators.required],
      pay:["",Validators.required]
    })
  }


  add(){
    let paymentModel=Object.assign({},this.paymentAddForm.value)
    console.log(paymentModel);
    if (this.paymentAddForm.valid) {
      let paymentModel=Object.assign({},this.paymentAddForm.value);
      this.paymentService.add(paymentModel).subscribe(response=>{
        this.toastrService.success(response.message,"Eklendi")

      },responseError=>{
        if (responseError.error.Errors.length>0) {
          for (let i = 0; i < responseError.Errors.error.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Hatası")
            
          }
        }
      })
    }else{
      this.toastrService.error("Formunuz eksik","Dikkat")
    }
  }
  getEmployee(){
    this.employeeService.getAll("Employee/GetAll").subscribe(response=>{
      this.employees=response.data
      this.dataLoaded=true  
    })
  }
}

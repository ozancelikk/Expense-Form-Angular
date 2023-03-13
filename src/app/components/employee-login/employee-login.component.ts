import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeeAuthService } from 'src/app/services/employeeAuth/employee-auth.service';

@Component({
  selector: 'app-employee-login',
  templateUrl: './employee-login.component.html',
  styleUrls: ['./employee-login.component.css']
})
export class EmployeeLoginComponent implements OnInit {
  employeeLoginForm:FormGroup
  apiUrlLogin = "EmployeeAuth/login";
  constructor(
    private formBuilder:FormBuilder,
    private employeeAuthService:EmployeeAuthService,
    private toastrService:ToastrService,
    private datePipe:DatePipe,
    private router:Router
  ) { }

  ngOnInit(): void {
    var date = new Date();
    var dateNow = this.datePipe.transform(date,"yyyy-MM-dd HH:mm:ss")
    var expirationDate = localStorage.getItem("expiration")
    if (dateNow < expirationDate) {
     
      this.router.navigate(["employee"]);
    }
    this.createLoginForm();
  }

  createLoginForm(){
    this.employeeLoginForm=this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required],
    })
  }
  login(){
    if (this.employeeLoginForm.valid) {
      var employeeLoginModel=Object.assign({},this.employeeLoginForm.value)
      this.employeeAuthService.postRequest(this.apiUrlLogin,employeeLoginModel).subscribe(response =>{
        console.log(response)
        if (response.success) {
          this.toastrService.success(response.message);
          localStorage.setItem("token",response.data.token);
          localStorage.setItem("expiration",response.data.expiration);
          localStorage.setItem("employeeid",response.data.employeeId);
          
          this.router.navigate(["/employee"]);
        }else{
          this.toastrService.info(response.message)
        }
      },errorResponse =>{
        this.toastrService.error(errorResponse.error.message);
      })
    }
  }

}

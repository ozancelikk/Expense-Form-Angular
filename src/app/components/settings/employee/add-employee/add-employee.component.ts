import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddEmployee } from 'src/app/models/employee/addEmployee';
import { EmployeeAuthService } from 'src/app/services/employeeAuth/employee-auth.service';
import { ILanguage } from 'src/assets/locales/ILanguage';
import { Languages } from 'src/assets/locales/languages';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  apiUrlRegister= "EmployeeAuth/Register"
  employee:AddEmployee;
  employeeAddForm:FormGroup;
  lang: ILanguage = Languages.lngs.get(localStorage.getItem('lng'));;
  constructor(private employeeAuthService:EmployeeAuthService,private router:Router,private toastrService:ToastrService,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.createEmployeeAddForm();
  }

  createEmployeeAddForm(){
    this.employeeAddForm=this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
      name: ["", Validators.required],
      surname: ["", Validators.required],
      department: ["", Validators.required],
    })
  }
  get password() {
    return this.employeeAddForm.get("password")
  }
  get email() {
    return this.employeeAddForm.get("email")
  }
  onKeyUpEmailEvent(event: Event) {
    let htmlInputElement = document.getElementById("email")
    if (this.email.valid)
      htmlInputElement.setAttribute("class", "form-control is-valid")
    else
      htmlInputElement.setAttribute("class", "form-control is-invalid")
  }
  onKeyUpPasswordEvent(event: Event) {
    let htmlInputElement = document.getElementById("password")
    let htmlValidationElement = document.getElementById("passwordValidation")
    if (this.password.valid) {
      htmlInputElement.setAttribute("class", "form-control is-valid")
      htmlValidationElement.style.display = "none"
    }
    else {
       htmlInputElement.setAttribute("class", "form-control is-invalid") 
      htmlValidationElement.style.display = "block"
      }
  }
  registerNewEmployee(){
    if (this.employeeAddForm.valid) {
      var employeeAddModel=Object.assign({},this.employeeAddForm.value)
      this.employeeAuthService.register(this.apiUrlRegister,employeeAddModel).subscribe(response =>{
        if (response.success) {
          this.toastrService.success(response.message);
          this.router.navigate(["/admin/settings/employees"]) 
        }else{
          this.toastrService.info(response.message)
        }
      },errorResponse =>{
        this.toastrService.error(errorResponse.error.message)
      })
    }else{
      let htmlElement = document.getElementsByClassName("is-invalid")
      let validationElement = document.getElementById(htmlElement.item(0)["id"])
      validationElement.focus()
    }
  }
}

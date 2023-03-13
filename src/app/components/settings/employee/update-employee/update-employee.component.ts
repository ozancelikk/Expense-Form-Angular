import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/models/employee/employee';
import { OperationClaim } from 'src/app/models/operationClaim/operationClaim';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { ILanguage } from 'src/assets/locales/ILanguage';
import { Languages } from 'src/assets/locales/languages';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {
  apiUrlGetById ='Employee/GetById?id=';
  apiUrlUpdate='Employee/Update';
  apiUrlDelete='Employee/Delete?id=';
  employee:Employee;
  employeeId='';
  employeeUpdateForm:FormGroup;
  lang:ILanguage;
  employeeOperationClaims:OperationClaim[];

  constructor(
    private employeeService:EmployeeService,
    private activatedRoot:ActivatedRoute,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private router:Router
  ) { 
    this.lang=Languages.lngs.get(localStorage.getItem('lng'));
  }

  createEmployeeUpdateForm(){
    this.employeeUpdateForm=this.formBuilder.group({
      id: ['', Validators.required],
      name:['', Validators.required],
      surname:['',Validators.required],
      eMail:['', Validators.required],
      department:['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.createEmployeeUpdateForm();
    this.activatedRoot.params.subscribe((param)=>{
      if (param['employeeId']) {
        this.employeeId=param['employeeId'];
        this.getByEmployeeId(param['employeeId']);
      }
    });
  }

  getByEmployeeId(employeeId:string){
    this.employeeService.getById(this.apiUrlGetById + employeeId)
    .subscribe((response)=>{
      if (response.success) {
        console.log(response)
        this.employee=response.data;
        this.employeeUpdateForm.patchValue(this.employee);
      }else{
        this.toastrService.info(response.message);
      }
    },errorResponse=>{
      this.toastrService.error(errorResponse.error.message);
    })
  }

  updateEmployee(){
    if (this.employeeUpdateForm.valid) {
      var employeeUpdateModel=Object.assign({},this.employeeUpdateForm.value);
      this.employeeService.postRequest(this.apiUrlUpdate,employeeUpdateModel)
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
  deleteEmployee(){
    this.employeeService.getRequest(this.apiUrlDelete + this.employeeId).subscribe((response)=>{
      if (response.success) {
        this.toastrService.success(response.message);
        this.router.navigate(["/admin/settings/employees"])
      }else{
        this.toastrService.info(response.message)
      }
    },errResponse=>{
      this.toastrService.error(errResponse.error.message);
    })
  }
}

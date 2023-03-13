import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { ILanguage } from 'src/assets/locales/ILanguage';
import { Languages } from 'src/assets/locales/languages';

@Component({
  selector: 'app-employee-change-password',
  templateUrl: './employee-change-password.component.html',
  styleUrls: ['./employee-change-password.component.css']
})
export class EmployeeChangePasswordComponent implements OnInit {

  employeeEmail: string;
  changePasswordForm: FormGroup;
  apiUrlChangePassword = 'Employee/ChangePassword';
  lang: ILanguage;
  constructor(
    private employeeService: EmployeeService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) {
    this.lang = Languages.lngs.get(localStorage.getItem('lng'));
  }

  ngOnInit(): void {
    this.createChangePasswordForm();
    this.activatedRoute.params.subscribe((param) => {
      if (param['employeeEmail']) {
        this.employeeEmail = param['employeeEmail'];
        this.patchForm();
      }
    });
  }

  createChangePasswordForm() {
    this.changePasswordForm = this.formBuilder.group({
      email: ['', Validators.required],
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
    });
  }
  changePassword() {
    if (this.changePasswordForm.valid) {
      var changePasswordModel = Object.assign({},this.changePasswordForm.value);
      if (changePasswordModel.newPassword == changePasswordModel.passwordConfirm) {
        this.employeeService.postRequest(this.apiUrlChangePassword, changePasswordModel).subscribe(
            (response) => {
              if (response.success) {
                this.toastrService.success(response.message);
              }else{
                this.toastrService.info(response.message)
              }
            },errorResponse => {
              this.toastrService.error(errorResponse.error.message)
            })
      }
    }
  }
  patchForm() {
    this.changePasswordForm.controls['email'].patchValue(this.employeeEmail);
  }

}

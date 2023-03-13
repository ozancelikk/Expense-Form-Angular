import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ForgotPasswordService } from 'src/app/services/forgotPassword/forgot-password.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  passwordForgotForm:FormGroup
  changePasswordForm:FormGroup
  apiUrlForgotPassword = "Auth/ForgotPassword?eMail="
  apiUrlChangePassword = "Auth/ChangeForgottenPassword"
  isCodeSended = false;
  constructor(
    private formBuilder:FormBuilder,
    private forgotPasswordService:ForgotPasswordService,
    private router:Router,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createPasswordForgotForm()
    this.createChangePasswordForm()
  }

  createPasswordForgotForm(){
    this.passwordForgotForm = this.formBuilder.group({
      email:["",Validators.required],
    })
  }

  createChangePasswordForm(){
    this.changePasswordForm = this.formBuilder.group({
      email:["",Validators.required],
      newPassword:["",Validators.required],
      passwordConfirm: ['', Validators.required],
      privateKey:["",Validators.required]

    })
  }

  changePassword(){
    if (this.changePasswordForm.valid) {
      var changePasswordModel = Object.assign({},this.changePasswordForm.value)
      if (changePasswordModel.newPassword == changePasswordModel.passwordConfirm) {
      this.forgotPasswordService.postRequest(this.apiUrlChangePassword, changePasswordModel).subscribe(response => {
        if (response.success) {
        this.toastrService.info(response.message)
        this.router.navigate(["/login"]);
        }else{
          this.toastrService.info(response.message)
        }
      },errorResponse => {
        this.toastrService.error(errorResponse.error.message)
      })
    }
    } 
  }

  sendActivationMail(){
    if (this.passwordForgotForm.valid) {
      var activeMail = Object.assign({},this.passwordForgotForm.value)
      this.forgotPasswordService.getRequest(this.apiUrlForgotPassword + activeMail.email).subscribe(response => {
        if (response.success) {
        this.toastrService.info(response.message)
       this.isCodeSended = true;
        }else{
          this.toastrService.info(response.message)
        }
      },errorResponse => {
        this.toastrService.error(errorResponse.error.message)
      })

    }
  }



}
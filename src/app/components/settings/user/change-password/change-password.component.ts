import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user/user.service';
import { ILanguage } from 'src/assets/locales/ILanguage';
import { Languages } from 'src/assets/locales/languages';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  userEMail: string;
  changePasswordForm: FormGroup;
  apiUrlChangePassword = 'User/ChangePassword';
  lang: ILanguage;
  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) {
    this.lang = Languages.lngs.get(localStorage.getItem('lng'));
  }

  ngOnInit(): void {
    this.createChangePasswordForm();
    this.activatedRoute.params.subscribe((param) => {
      if (param['userEmail']) {
        this.userEMail = param['userEmail'];
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
        this.userService.postRequest(this.apiUrlChangePassword, changePasswordModel).subscribe(
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
    this.changePasswordForm.controls['email'].patchValue(this.userEMail);
  }
}

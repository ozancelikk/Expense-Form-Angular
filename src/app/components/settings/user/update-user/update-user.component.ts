import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OperationClaim } from 'src/app/models/operationClaim/operationClaim';
import { User } from 'src/app/models/user/user';
import { UserOperationClaim } from 'src/app/models/userOperationClaims/userOperationClaim';
import { UserService } from 'src/app/services/user/user.service';
import { ILanguage } from 'src/assets/locales/ILanguage';
import { Languages } from 'src/assets/locales/languages';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent implements OnInit {
  apiUrlGetById = 'User/GetById?id=';
  apiUrlUpdate = 'User/Update';
  apiUrlDelete = 'User/Delete?id=';
  user: User;
  userId = '';
  userUpdateForm: FormGroup;
  lang: ILanguage;
  userOperationClaims: OperationClaim[];
  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.lang = Languages.lngs.get(localStorage.getItem('lng'));
  }

  createUserUpdateForm() {
    this.userUpdateForm = this.formBuilder.group({
      id: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      status: [false, Validators.required],
    });
  }
  ngOnInit(): void {
    this.createUserUpdateForm();
    this.activatedRoute.params.subscribe((param) => {
      if (param['userId']) {
        this.userId = param['userId'];
        this.getUserById(param['userId']);
      }
    });
  }

  getUserById(userId: string) {
    this.userService
      .getById(this.apiUrlGetById + userId)
      .subscribe((response) => {
        if (response.success) {
          this.user = response.data;
          this.userUpdateForm.patchValue(this.user);
        }else{
          this.toastrService.info(response.message)
        }
      },errorResponse => {
        this.toastrService.error(errorResponse.error.message)
      })
  }

  updateUser() {
    if (this.userUpdateForm.valid) {
      var userUpdateModel = Object.assign({}, this.userUpdateForm.value);
      this.userService
        .postRequest(this.apiUrlUpdate, userUpdateModel)
        .subscribe(
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

  deleteUser() {
    this.userService.getRequest(this.apiUrlDelete + this.userId).subscribe(
      (response) => {
        if (response.success) {
          this.toastrService.success(response.message);
          this.router.navigate(["/admin/settings/users"])
        }else{
          this.toastrService.info(response.message)
        }
      },errorResponse => {
        this.toastrService.error(errorResponse.error.message)
      })
  }
}

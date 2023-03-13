import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddUser } from 'src/app/models/user/addUser';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ILanguage } from 'src/assets/locales/ILanguage';
import { Languages } from 'src/assets/locales/languages';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  apiUrlRegister = "Auth/Register"
  user:AddUser
  userAddForm:FormGroup
  lang: ILanguage = Languages.lngs.get(localStorage.getItem('lng'));;
  constructor(private authService:AuthService,private router: Router,private toastrService:ToastrService,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.createUserAddForm();
  }

  createUserAddForm() {
    this.userAddForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required,]],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      status: [false, Validators.required]
    })
  }

  get password() {
    return this.userAddForm.get("password")
  }
  get email() {
    return this.userAddForm.get("email")
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
  registerNewUser() {
    if (this.userAddForm.valid) {
      var userAddModel = Object.assign({}, this.userAddForm.value)
      this.authService.register(this.apiUrlRegister, userAddModel).subscribe(response => {
        if (response.success) {
          this.toastrService.success(response.message)
          this.router.navigate(["/admin/settings/users"])
        }else{
          this.toastrService.info(response.message)
        }
      },errorResponse => {
        this.toastrService.error(errorResponse.error.message)

      })
    }else{
      let htmlElement = document.getElementsByClassName("is-invalid")
      let validationElement = document.getElementById(htmlElement.item(0)["id"])
      validationElement.focus()
    }

  }

}

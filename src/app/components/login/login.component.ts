import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup
  apiUrlLogin = "Auth/Login";
  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private toastrService:ToastrService,
    private datePipe: DatePipe,
    private router:Router
  ) { }

  ngOnInit(): void {
    var date = new Date();
    var dateNow = this.datePipe.transform(date,"yyyy-MM-dd HH:mm:ss")
    var expirationDate = localStorage.getItem("expiration")
    if (dateNow < expirationDate) {
     
      this.router.navigate(["admin"]);
    }
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }
  login(){
    if (this.loginForm.valid) {
      var loginModel = Object.assign({},this.loginForm.value)
      this.authService.postRequest(this.apiUrlLogin,loginModel).subscribe(response =>{
        console.log(response)
        if (response.success) {
            this.toastrService.success(response.message);
            localStorage.setItem("token",response.data.token);
            localStorage.setItem("expiration",response.data.expiration);
            localStorage.setItem("userId",response.data.userId)

            this.router.navigate(["/admin"]);
        }else{
          this.toastrService.info(response.message)
        }
      },errorResponse => {
        this.toastrService.error(errorResponse.error.message)
      })
    }
  }
}

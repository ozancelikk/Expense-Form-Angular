import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { EmployeeAuthService } from '../services/employeeAuth/employee-auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeLoginGuard implements CanActivate {
  constructor(
    private employeeAuthService:EmployeeAuthService,
    private toastrService:ToastrService,
    private router: Router,
    private datePipe:DatePipe
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      var date=new Date();
      var dateNow=this.datePipe.transform(date,"yyy-MM-dd HH:mm:ss")
      var expirationDate = localStorage.getItem("expiration")

    if (this.employeeAuthService.isAuthenticated()) {
      if (dateNow>expirationDate) {
        this.router.navigate(["login"]);
        this.toastrService.info("sisteme Giriş Yapmalısınız!","Bilgi");
        return false;
      }
      return true;
    }else{
      this.router.navigate(["login"]);
      this.toastrService.info("Sisteme Girşi Yapmalısınız","Bilgi")
      return false
    }
  }
  
}

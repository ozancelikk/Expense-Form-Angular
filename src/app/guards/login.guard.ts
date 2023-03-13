import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private authService:AuthService,
    private toastrService:ToastrService,
    private router:Router,
    private datePipe: DatePipe
  ) {

    
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      var date = new Date();
      var dateNow = this.datePipe.transform(date,"yyyy-MM-dd HH:mm:ss")
      var expirationDate = localStorage.getItem("expiration")

   if (this.authService.isAuthentitaced()) {
     if (dateNow > expirationDate ) {
      this.router.navigate(["login"]);
      this.toastrService.info("Sisteme Giriş Yapmalısınız!","Bilgi");
       return false;
       
     }
    return true;
   }else{
     this.router.navigate(["login"]);
     this.toastrService.info("Sisteme Giriş Yapmalısınız!","Bilgi");
     return false;
   }
  }
  
}

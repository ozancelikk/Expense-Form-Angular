import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ILanguage } from 'src/assets/locales/ILanguage';
import { Languages } from 'src/assets/locales/languages';

@Component({
  selector: 'app-employee-navbar',
  templateUrl: './employee-navbar.component.html',
  styleUrls: ['./employee-navbar.component.css']
})
export class EmployeeNavbarComponent implements OnInit {
  isNavbarLoad:boolean=false;
  lang:ILanguage;
  menuItems:string;
  

  constructor(private toastrService: ToastrService, private activatedRoute: ActivatedRoute, private router:Router) {
    this.lang= Languages.lngs.get(localStorage.getItem("lng"));
   }

  ngOnInit(): void {
    this.activatedRoute.url.subscribe(() => {
      this.menuItems = this.activatedRoute.snapshot.firstChild.data["breadcrumb"]
      this.isNavbarLoad = true;
  })
}

  Logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("expiration")
    localStorage.removeItem("employeeid")
    this.router.navigate(["/login"]);
  }
  userUpdateChangeRoute(params:any){
    this.router.navigate(["/employee/settings/change-password/"+params])
  }
}

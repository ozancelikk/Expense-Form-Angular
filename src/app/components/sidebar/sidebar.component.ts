import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from 'src/app/services/language/language-service.service';
import { ILanguage } from 'src/assets/locales/ILanguage';
import { Languages } from 'src/assets/locales/languages';
import { SidebarMenus } from './sidebar-menus';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit{
  lang:ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  sidebarMenus = SidebarMenus
  searchInput:string = ""

  filterMenus:any[]
  menus:any= [
    {name:this.lang.vouncher,icon:"article",children:[
      {name:this.lang.vouncher,path:"/admin/vouncher",icon:"receipt_long"},
      {name:this.lang.vouncheradd,path:"/admin/vouncher-add",icon:"add" },
    ]},

    {name:this.lang.receipt,icon:"article2",children:[
      {name:this.lang.receipt,path:"/admin/receipt",icon:"receipt_long"},
      {name:this.lang.receiptadd,path:"/admin/receipt-add",icon:"add"},
    ]},
    {name:this.lang.payment,icon:"article3",children:[
      {name:this.lang.payment,path:"/admin/payment",icon:"receipt_long"},
      {name:this.lang.paymentadd,path:"/admin/payment-add",icon:"add"},
    ]},
    
    // {name:this.lang.expence,icon:"article3",children:[
    //   {name:this.lang.expence,path:"/admin/expence",icon:"receipt_long"},
    //   {name:this.lang.expenceadd,path:"/admin/expence-add",icon:"add"},
    // ]},
    {name:this.lang.loginactivities,path:"/admin/login-activities",icon:"verified_user"},
    {name:this.lang.systemlogs,path:"/admin/system-logs",icon:"fact_check"},
  ]
  constructor(private toastrService:ToastrService,private renderer: Renderer2, private languageService:LanguageService) { 
    this.filterMenus = this.menus

  }

  ngOnInit(): void {
    var sidebarToggleStatus = localStorage.getItem("sidebar-toggle")

    if(sidebarToggleStatus != null && sidebarToggleStatus =="-1"){
      this.renderer.removeClass(document.body, 'show-sidebar');
    }
  }
  changeLanguage(language:string){
    localStorage.setItem("lng",language)
    this.languageService.setLanguage("Language/SetLanguage?language="+language).subscribe(response => {
      if (response.success) {
        this.toastrService.success(response.message)
      }else{
        this.toastrService.info(response.message)
      }
    },errorResponse => {
      this.toastrService.error(errorResponse.error.message)
    })
    location.reload()

  }
  
  toggleSidebar(){
      
      if (document.body.classList.contains('show-sidebar')) {
        localStorage.setItem("sidebar-toggle","-1")
        this.renderer.removeClass(document.body, 'show-sidebar');
      }else{
        localStorage.setItem("sidebar-toggle","show-sidebar")
        this.renderer.addClass(document.body, 'show-sidebar');
      }
   
  }
  clickedRealtimeItem(htmlInputElementId:string){
    let sidebarThreatLogs = document.getElementById(htmlInputElementId)
    if(sidebarThreatLogs.style.pointerEvents=="none"){
      this.toastrService.info(this.lang.pleasewaitafewsecond)
    }
  }

  searchsidebar() {



    var  filter

    
    filter = this.searchInput.toUpperCase()

    filter = filter ? filter.toUpperCase() : "";
    var filterUsedDevices = filter ? this.filterMenus.filter((u: any) =>{
     var t = u.name.toUpperCase().indexOf(filter) !== -1 ? u : null

     if (u.children !== undefined) {
     u.children.filter((a:any)=> {
      t =a.name.toUpperCase().indexOf(filter) !== -1 ? u : t
      })
     }
     return t;
    }
     ) : this.filterMenus

    
  this.menus = filterUsedDevices

}


}

import { Component, OnInit, Renderer2 } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from 'src/app/services/language/language-service.service';
import { ILanguage } from 'src/assets/locales/ILanguage';
import { Languages } from 'src/assets/locales/languages';
import { SidebarMenus } from '../sidebar/sidebar-menus';

@Component({
  selector: 'app-employee-sidebar',
  templateUrl: './employee-sidebar.component.html',
  styleUrls: ['./employee-sidebar.component.css']
})
export class EmployeeSidebarComponent implements OnInit {

  lang:ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  sidebarMenus = SidebarMenus
  searchInput:string = ""

  filterMenus:any[]
  menus:any= [
    {name:this.lang.vouncher,icon:"article",children:[
      {name:this.lang.vouncher,path:"/employee/vouncher",icon:"receipt_long"},
      {name:this.lang.vouncheradd,path:"/employee/vouncher-add",icon:"add" },
    ]},

    {name:this.lang.receipt,icon:"article2",children:[
      {name:this.lang.receipt,path:"/employee/receipt",icon:"receipt_long"},
      {name:this.lang.receiptadd,path:"/employee/receipt-add",icon:"add"},
    ]},
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


import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Octokit } from 'octokit';

import { SystemLog } from 'src/app/models/systemLogs/systemLog';
import { SystemLogService } from 'src/app/services/systemLog/system-log.service';

import { ILanguage } from 'src/assets/locales/ILanguage';
import { Languages } from 'src/assets/locales/languages';
import { OrianaWebApiVersion } from 'src/assets/versions/oriaanwebapiversion';
import { OrianaUIVersion } from 'src/assets/versions/orianauiversion';
import { OrianaVersion } from 'src/assets/versions/orianaversion';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  readonly home = { icon: 'pi pi-home', url: 'home' };
  static readonly ROUTE_DATA_BREADCRUMB = 'breadcrumb';
  menuItems: string;
  lang: ILanguage;
  script: any
  systemLogs: SystemLog[]
  page:number=0
  limit:number=50
  isNavbarLoad:boolean = false
  orianauiversion:boolean = true
  orianaversion:boolean = true
  orianawebapiversion:boolean = true
  clickedElement: boolean = false
  orianacurrentversion = new OrianaVersion();
  orianauicurrentversion = new OrianaUIVersion();
  orianawebapicurrentversion = new OrianaWebApiVersion();
  constructor(private toastrService: ToastrService, private activatedRoute: ActivatedRoute, private router: Router,
    private systemLogService: SystemLogService,) {
    this.lang = Languages.lngs.get(localStorage.getItem("lng"));
  }

  async ngOnInit(): Promise<void> {

    this.activatedRoute.url.subscribe(() => {
      this.menuItems = this.activatedRoute.snapshot.firstChild.data["breadcrumb"]
    });
    this.getAllUnReadMessageWithPage()

    this.orianaversion = false
    this.orianauiversion = false
    this.orianawebapiversion = false;
   
    this.isNavbarLoad = true;
  
  }

  
  

  async getOrianaVersions(){

    const octokit = new Octokit({ 
      auth: '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',
    });
    octokit.request("GET /repos/{owner}/{repo}/contents/oriana.json", {mediaType: {previews: ["raw"],},owner: "oriana-ozztech",repo: "OrianaVersionControls"}).then(response => {
      var result = Object.assign({},JSON.parse(atob(response.data.content))) as OrianaUIVersion
      this.orianacurrentversion.version != result.version ? this.orianaversion = false : this.orianaversion = true;
    })
    octokit.request("GET /repos/{owner}/{repo}/contents/orianaui.json", {mediaType: {previews: ["raw"],},owner: "oriana-ozztech",repo: "OrianaVersionControls"}).then(response => {
      var result = Object.assign({},JSON.parse(atob(response.data.content))) as OrianaUIVersion
      this.orianauicurrentversion.version != result.version ? this.orianauiversion = false : this.orianauiversion = true;
    })
    octokit.request("GET /repos/{owner}/{repo}/contents/orianawebapi.json", {mediaType: {previews: ["raw"],},owner: "oriana-ozztech",repo: "OrianaVersionControls"}).then(response => {
      var result = Object.assign({},JSON.parse(atob(response.data.content))) as OrianaUIVersion
      this.orianawebapicurrentversion.version != result.version ? this.orianawebapiversion = false : this.orianawebapiversion = true;
    })
    
  }
  getAllUnReadMessageWithPage() {
    this.systemLogService.GetAllUnReadMessageWithPage(this.page,this.limit).subscribe((response) => {
      if (response.success) {
        this.systemLogs = response.data
      }else{
        this.toastrService.info(response.message)
      }
    },errorResponse => {
      this.toastrService.error(errorResponse.error.message)
    })
  }
  toggleNotifi() {


    var box = document.getElementById('box')
    if (this.clickedElement) {
      box.style.height = "0px"
      box.style.opacity = "0"
      this.clickedElement = false
    } else {
      box.style.maxHeight = "500px"
      box.style.height = "auto"
      box.style.opacity = "1"
      this.clickedElement = true
    }


  }
  updateAllUnReadMessage() {
    const id = this.systemLogs.map(x => x.id)
    this.systemLogService.updateAllUnReadMessage("SystemInformationsLog/UpdateAllUnReadMessage").subscribe((response) => {
      if (response.success) {
        this.getAllUnReadMessageWithPage()
        this.toastrService.success(response.message)
      }else{
        this.toastrService.info(response.message)
      }
    },errorResponse => {
      this.toastrService.error(errorResponse.error.message)
    })

  }
  updateAllUnReadMessageById() {
    const id = this.systemLogs.map(x => x.id)
    this.systemLogService.updateAllUnReadMessageById("SystemInformationsLog/UpdateAllUnReadMessageById",id).subscribe((response) => {
      if (response.success) {
        this.getAllUnReadMessageWithPage()
        this.toastrService.success(response.message)
      }else{
        this.toastrService.info(response.message)
      }
    },errorResponse => {
      this.toastrService.error(errorResponse.error.message)
    })

  }
  updateSelectedUnReadMessage() {

    this.systemLogs.forEach(x => {

      if (x.status === true) {
        this.systemLogService.updateUnReadMessage("SystemInformationsLog/UpdateUnReadMessage", x.id).subscribe((response) => {

          if (response.success) {
            this.getAllUnReadMessageWithPage()
            this.toastrService.success(response.message)

          }else{
            this.toastrService.info(response.message)
          }
        },errorResponse => {
          this.toastrService.error(errorResponse.error.message)
        })
      }
    })


  }
  Logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("expiration")
    localStorage.removeItem("employeeid")
    localStorage.removeItem("userId")
    this.router.navigate(["/login"]);
  }
}

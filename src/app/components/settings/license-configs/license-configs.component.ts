import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LicenseConfig } from 'src/app/models/licenseConfigs/licenseConfig';
import { LicenseConfigsService } from 'src/app/services/licenseConfigs/license-configs.service';
import { ILanguage } from 'src/assets/locales/ILanguage';
import { Languages } from 'src/assets/locales/languages';

@Component({
  selector: 'app-license-configs',
  templateUrl: './license-configs.component.html',
  styleUrls: ['./license-configs.component.css']
})
export class LicenseConfigsComponent implements OnInit {
  licanseConfigsForm:FormGroup;
  licenseConfig:LicenseConfig
  apiUrlGet = "LicenseConfig/Get"
  apiUrlUpdate = "LicenseConfig/Update"
  apiUrlAdd = "LicenseConfig/Add"
  updateLicenseConfigs = false
  lang: ILanguage;
  constructor(private formBuilder:FormBuilder,private licenseConfigService:LicenseConfigsService,private toastrService:ToastrService) {
    this.lang = Languages.lngs.get(localStorage.getItem("lng"));
   }

  ngOnInit(): void {
    this.createLicenseConfigForm()
    this.getLicenseConfigs()
   
  }
  createLicenseConfigForm() {
    this.licanseConfigsForm = this.formBuilder.group({   
      id:[""],
      licenseServerAddress: ["", Validators.required],
      licenseServerMethod: ["", Validators.required]

    })
  }
  getLicenseConfigs(){
    this.licenseConfigService.getRequest(this.apiUrlGet).subscribe(response => {
      if (response.success) {
        if (response.data != null) {
          this.updateLicenseConfigs= true;
        }
        this.licanseConfigsForm.patchValue(response.data)
      }else{
        this.toastrService.info(response.message)
      }
    },errorResponse => {
      this.toastrService.error(errorResponse.error.message)
    })
  }
  add(){
    if (this.licanseConfigsForm.valid) {
      this.licanseConfigsForm.removeControl("id")
      var licenseConfigModel = Object.assign({},this.licanseConfigsForm.value)
        this.licenseConfigService.postRequest(this.apiUrlAdd,licenseConfigModel).subscribe(response => {
          if (response.success) {
            this.updateLicenseConfigs = true;
            this.licanseConfigsForm.addControl('id',new FormControl())
            this.getLicenseConfigs()
            this.toastrService.success(response.message,"Başarılı")
          }else{
            this.toastrService.info(response.message)
          }
        },errorResponse => {
          this.toastrService.error(errorResponse.error.message)
        })
    }
  }

  update(){
    if (this.licanseConfigsForm.valid) {
      var licenseConfigModel = Object.assign({},this.licanseConfigsForm.value)
        this.licenseConfigService.postRequest(this.apiUrlUpdate,licenseConfigModel).subscribe(response => {
          if (response.success) {
            this.toastrService.success(response.message,"Başarılı")
          }else{
            this.toastrService.info(response.message)
          }
        },errorResponse => {
          this.toastrService.error(errorResponse.error.message)
        })
    }
  }


  

}

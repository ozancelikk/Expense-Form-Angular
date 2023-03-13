import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TimeStampConfigService } from 'src/app/services/timeStampConfigs/time-stamp-config.service';
import { ILanguage } from 'src/assets/locales/ILanguage';
import { Languages } from 'src/assets/locales/languages';

@Component({
  selector: 'app-time-stamp-configs',
  templateUrl: './time-stamp-configs.component.html',
  styleUrls: ['./time-stamp-configs.component.css'],
})
export class TimeStampConfigsComponent implements OnInit {
  apiUrlGet = 'TimeStampConfig/Get';
  apiUrlAdd = 'TimeStampConfig/Add';
  apiUrlUpdate = 'TimeStampConfig/Update';
  updateTimeStampConfigs = false;
  timeStampConfigForm: FormGroup;
  currentPassword: string;
  isClaimed = true;
  lang: ILanguage;
  constructor(
    private timeStampConfigService: TimeStampConfigService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder
  ) {
    this.lang = Languages.lngs.get(localStorage.getItem("lng"));
  }

  ngOnInit(): void {
    this.createTimeStampForm();
    this.getTimeStampConfigs();
  }

  createTimeStampForm() {
    this.timeStampConfigForm = this.formBuilder.group({
      id: [''],
      timeStampServer: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  getTimeStampConfigs() {
    this.timeStampConfigService.getRequest(this.apiUrlGet).subscribe(
      (response) => {
        if (response.success) {
          if (response.data != null) {
            this.updateTimeStampConfigs = true;
            this.currentPassword = response.data.password;
            response.data.password = '*****';
            this.timeStampConfigForm.patchValue(response.data);
          }
        }else{
          this.toastrService.info(response.message)
        }
      },errorResponse => {
        this.toastrService.error(errorResponse.error.message)
      })
  }
  add() {
    if (this.timeStampConfigForm.valid) {
      this.timeStampConfigForm.removeControl('id');
      var licenseConfigModel = Object.assign(
        {},
        this.timeStampConfigForm.value
      );
      console.log(licenseConfigModel)
      this.timeStampConfigService.postRequest(this.apiUrlAdd, licenseConfigModel).subscribe( (response) => {
            if (response.success) {
              this.updateTimeStampConfigs = true;
              this.timeStampConfigForm.addControl('id', new FormControl());
              this.getTimeStampConfigs();
              this.toastrService.success(response.message, 'Başarılı');
            }else{
              this.toastrService.info(response.message)
            }
          },errorResponse => {
            console.log(errorResponse)
            this.toastrService.error(errorResponse.error.message + errorResponse.status)
          })
    }
  }

  update() {
    if (this.timeStampConfigForm.valid) {
      var licenseConfigModel = Object.assign(
        {},
        this.timeStampConfigForm.value
      );
      if (licenseConfigModel.password == '*****') {
        licenseConfigModel.password = this.currentPassword;
      }
      this.timeStampConfigService
        .postRequest(this.apiUrlUpdate, licenseConfigModel)
        .subscribe(
          (response) => {
            if (response.success) {
              this.toastrService.success(response.message, 'Başarılı');
            } else{
              this.toastrService.info(response.message)
            }
          },errorResponse => {
            this.toastrService.error(errorResponse.error.message)
          })
    }
  }
}

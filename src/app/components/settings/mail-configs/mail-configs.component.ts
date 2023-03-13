import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MailConfigsService } from 'src/app/services/mailConfigs/mail-configs.service';
import { ILanguage } from 'src/assets/locales/ILanguage';
import { Languages } from 'src/assets/locales/languages';

@Component({
  selector: 'app-mail-configs',
  templateUrl: './mail-configs.component.html',
  styleUrls: ['./mail-configs.component.css'],
})
export class MailConfigsComponent implements OnInit {
  mailConfigForm: FormGroup;
  apiUrlGet = 'MailConfiguration/Get';
  apiUrlUpdate = 'MailConfiguration/Update';
  apiUrlAdd = 'MailConfiguration/Add';
  oldPassword = '';
  updateMailConfigs = false;
  lang: ILanguage;
  constructor(
    private formBuilder: FormBuilder,
    private mailConfigService: MailConfigsService,
    private toastrService: ToastrService
  ) {
    this.lang = Languages.lngs.get(localStorage.getItem("lng"));
  }

  ngOnInit(): void {
    this.createMailConfigForm();
    this.getMailConfigs();
  }

  createMailConfigForm() {
    this.mailConfigForm = this.formBuilder.group({
      id: [''],
      smtpServer: ['', Validators.required],
      from: ['', Validators.required],
      to: [[''], Validators.required],
      password: ['', Validators.required],
      port: [0, Validators.required],
      enableSsl: [false, Validators.required],
    });
  }

  getMailConfigs() {
    this.mailConfigService.getRequest(this.apiUrlGet).subscribe((response) => {
      if (response.success) {
        if (response.data != null) {
          this.oldPassword = response.data.password;
          response.data.password = '*******';
          this.updateMailConfigs = true;
        }

        this.mailConfigForm.patchValue(response.data);
      }else{
        this.toastrService.info(response.message)
      }
    },errorResponse => {
      this.toastrService.error(errorResponse.error.message)
    })
  }
  add() {
    if (this.mailConfigForm.valid) {
      this.mailConfigForm.removeControl('id');
      let customerInformationsModel = Object.assign(
        {},
        this.mailConfigForm.value
      );

      customerInformationsModel.to = customerInformationsModel.to.toString();
      customerInformationsModel.to = customerInformationsModel.to.split(',');

      if (customerInformationsModel.password == '*******') {
        customerInformationsModel.password = this.oldPassword;
      }
      this.mailConfigService
        .postRequest(this.apiUrlAdd, customerInformationsModel)
        .subscribe(
          (response) => {
            if (response.success) {
              this.mailConfigForm.addControl('id', new FormControl());
              this.getMailConfigs();
              this.updateMailConfigs = true;
              this.toastrService.success('İşlem Başarılı');
            }else{
              this.toastrService.info(response.message)
            }
          },errorResponse => {
            this.toastrService.error(errorResponse.error.message)
          })
    } else {
      this.toastrService.error('Hata');
    }
  }

  update() {
    if (this.mailConfigForm.valid) {
      let customerInformationsModel = Object.assign(
        {},
        this.mailConfigForm.value
      );
      customerInformationsModel.to = customerInformationsModel.to.toString();
      customerInformationsModel.to = customerInformationsModel.to.split(',');
      if (customerInformationsModel.password == '*******') {
        customerInformationsModel.password = this.oldPassword;
      }
      this.mailConfigService
        .postRequest(this.apiUrlUpdate, customerInformationsModel)
        .subscribe(
          (response) => {
            if (response.success) {
              this.toastrService.success('İşlem Başarılı');
            }else{
              this.toastrService.info(response.message)
            }
          },errorResponse => {
            this.toastrService.error(errorResponse.error.message)
          })
    } else {
      this.toastrService.error('Hata');
    }
  }
}

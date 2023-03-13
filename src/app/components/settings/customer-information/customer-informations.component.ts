import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomerInformation } from 'src/app/models/customerInformations/customerInformation';
import { CustomerInformationService } from 'src/app/services/customerInformations/customer-information.service';
import { ILanguage } from 'src/assets/locales/ILanguage';
import { Languages } from 'src/assets/locales/languages';

@Component({
  selector: 'customer-informations',
  templateUrl: './customer-informations.component.html',
  styleUrls: ['./customer-informations.component.css'],
})
export class CustomerInformationsComponent implements OnInit {
  apiUrlGetAll = 'CustomerInformation/Get';
  apiUrlAdd = 'CustomerInformation/Add';
  apiUrlUpdate = 'CustomerInformation/Update';
  customerInformations: CustomerInformation;
  customerInformationsAddForm: FormGroup;
  updateCutomerInformations = false;
  lang: ILanguage;
  constructor(
    private formBuilder: FormBuilder,
    private customerInformationService: CustomerInformationService,
    private toastrService: ToastrService
  ) {
    this.lang = Languages.lngs.get(localStorage.getItem("lng"));
  }

  ngOnInit(): void {
    this.createUsedDeviceAddForm();
    this.getCustomerInformations();
  }
  getCustomerInformations() {
    this.customerInformationService.getRequest(this.apiUrlGetAll).subscribe(
      (response) => {
        if (response.success) {
          this.customerInformations = response.data;
          this.customerInformationsAddForm.patchValue(response.data);
          if (this.customerInformations != null) {
            this.updateCutomerInformations = true;
          }
        }else{
          this.toastrService.info(response.message)
        }
      },errorResponse => {
        this.toastrService.error(errorResponse.error.message)
      })
  }
  createUsedDeviceAddForm() {
    this.customerInformationsAddForm = this.formBuilder.group({
      address: ['', Validators.required],
      city: ['', Validators.required],
      comments: ['', Validators.required],
      company: ['', Validators.required],
      country: ['', Validators.required],
      eMail: ['', Validators.required],
      firstName: ['', Validators.required],
      id: [''],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      state: ['', Validators.required],
      title: ['', Validators.required],
      zipCode: ['', Validators.required],
    });
  }
  add() {
    if (this.customerInformationsAddForm.valid) {
      this.customerInformationsAddForm.removeControl('id');
      let customerInformationsModel = Object.assign(
        {},
        this.customerInformationsAddForm.value
      );
      this.customerInformationService
        .postRequest(this.apiUrlAdd, customerInformationsModel)
        .subscribe(
          (response) => {
            if (response.success) {
              this.updateCutomerInformations = true;
              this.customerInformationsAddForm.addControl(
                'id',
                new FormControl()
              );
              this.getCustomerInformations();
              this.toastrService.success(response.message);
            } else{
              this.toastrService.info(response.message)
            }
          },errorResponse => {
            this.toastrService.error(errorResponse.error.message)
          })
    } else {
      this.toastrService.error('Hatalı Bir Giriş Yaptınız!', 'Hata');
    }
  }

  update() {
    if (this.customerInformationsAddForm.valid) {
      let customerInformationsModel = Object.assign(
        {},
        this.customerInformationsAddForm.value
      );
      this.customerInformationService
        .postRequest(this.apiUrlUpdate, customerInformationsModel)
        .subscribe(
          (response) => {
            if (response.success) {
              this.toastrService.success(response.message);
            }else{
              this.toastrService.info(response.message)
            }
          },errorResponse => {
            this.toastrService.error(errorResponse.error.message)
          })
    } else {
      this.toastrService.error('Hatalı Bir Giriş Yaptınız!', 'Hata');
    }
  }
}

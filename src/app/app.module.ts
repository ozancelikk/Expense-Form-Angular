import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './components/login/login.component';
import { LoginActivitiesComponent } from './components/login-activities/login-activities.component';
import { LoginActivitiesFilterPipePipe } from './pipes/loginActivitiesPipes/login-activities-filter-pipe.pipe';
import { SystemLogsComponent } from './components/system-logs/system-logs.component';
import { SystemLogPipePipe } from './pipes/systemLogsPipe/system-log-pipe.pipe';
import { AdminComponent } from './components/admin/admin.component';
import { MaterialModule } from '../assets/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { SettingsComponent } from './components/settings/settings.component';
import { CustomerInformationsComponent } from './components/settings/customer-information/customer-informations.component';
import { LicenseConfigsComponent } from './components/settings/license-configs/license-configs.component';
import { MailConfigsComponent } from './components/settings/mail-configs/mail-configs.component';
import { TimeStampConfigsComponent } from './components/settings/time-stamp-configs/time-stamp-configs.component';
import { UserComponent, UserDeleteDialogTemplate } from './components/settings/user/user.component';
import { UpdateUserComponent } from './components/settings/user/update-user/update-user.component';
import { UserOperationClaimsComponent } from './components/settings/user-operation-claims/user-operation-claims.component';
import { ChangePasswordComponent } from './components/settings/user/change-password/change-password.component';
import { AddUserComponent } from './components/settings/user/add-user/add-user.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { VouncherComponent, VouncherDeleteDialogTemplate } from './components/vouncher/vouncher.component';
import { NewVouncherComponent } from './components/navbar/new-vouncher/new-vouncher.component';
import { VouncheraddComponent } from './components/vouncheradd/vouncheradd.component';
import { ReceiptComponent, ReceiptDeleteDialogTemplate } from './components/receipt/receipt.component';
import { ReceiptAddComponent } from './components/receipt/receiptAdd/receipt-add/receipt-add.component';
import { EmployeeComponent, EmployeeDeleteDialogTemplate } from './components/settings/employee/employee.component';
import { AddEmployeeComponent } from './components/settings/employee/add-employee/add-employee.component';
import { EmployeeLoginComponent } from './components/employee-login/employee-login.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { EmployeeNavbarComponent } from './components/employee-navbar/employee-navbar.component';
import { EmployeeSidebarComponent } from './components/employee-sidebar/employee-sidebar.component';
import { ExpenceComponent } from './components/expence/expence.component';
import { ExpenceAddComponent } from './components/expence/expence-add/expence-add.component';
import { ExpenceDetailComponent } from './components/expence/expence-detail/expence-detail.component';
import { UpdateEmployeeComponent } from './components/settings/employee/update-employee/update-employee.component';
import { DxFileUploaderModule } from 'devextreme-angular/ui/file-uploader';
import { SelectVoucherImageComponent } from './components/select-voucher-image/select-voucher-image.component';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { EmployeeSettingsComponent } from './components/employee-settings/employee-settings.component';
import { ProfileComponent } from './components/employee-settings/profile/profile.component';
import { PaymentComponent } from './components/payment/payment.component';
import { PaymentAddComponent } from './components/payment/payment-add/payment-add.component';
import { VouncherDetailComponent } from './components/vouncher/vouncher-detail/vouncher-detail.component';
import { EmployeeChangePasswordComponent } from './components/settings/employee/employee-change-password/employee-change-password.component';
import { UpdateVouncherComponent } from './components/vouncher/update-vouncher/update-vouncher.component';
import { ReceiptDetailComponent } from './components/receipt/receipt-detail/receipt-detail.component';












@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    LoginComponent,
    LoginActivitiesComponent,
    LoginActivitiesFilterPipePipe,
    SystemLogsComponent,
    SystemLogPipePipe,
    AdminComponent,
    SettingsComponent,
    CustomerInformationsComponent,
    LicenseConfigsComponent,
    MailConfigsComponent,
    TimeStampConfigsComponent,
    UserComponent,
    UpdateUserComponent,
    UserOperationClaimsComponent,
    ChangePasswordComponent,
    AddUserComponent,
    UserDeleteDialogTemplate,
    EmployeeDeleteDialogTemplate,
 
    ForgotPasswordComponent,
       VouncherComponent,
       NewVouncherComponent,
       VouncheraddComponent,
       ReceiptComponent,
       ReceiptAddComponent,
       EmployeeComponent,
       AddEmployeeComponent,
       EmployeeLoginComponent,
       EmployeesComponent,
       EmployeeNavbarComponent,
       EmployeeSidebarComponent,
       ExpenceComponent,
       ExpenceAddComponent,
       ExpenceDetailComponent,
       UpdateEmployeeComponent,
       SelectVoucherImageComponent,
       EmployeeSettingsComponent,
       ProfileComponent,
       PaymentComponent,
       PaymentAddComponent,
       VouncherDetailComponent,
       EmployeeChangePasswordComponent,
       UpdateVouncherComponent,
       ReceiptDetailComponent,
       VouncherDeleteDialogTemplate,
       ReceiptDeleteDialogTemplate,

  
  ],
  exports:[
    MatDialogTitle,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgApexchartsModule,

    CommonModule,
    MatDialogModule,
    MatButtonModule,
    BreadcrumbModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    MatTableModule,
    DxFileUploaderModule,
    MatIconModule,
    AgGridModule,
    RouterModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      preventDuplicates: false,
      closeButton: true,
      countDuplicates: true,
      positionClass: "toast-bottom-right",
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    DatePipe

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

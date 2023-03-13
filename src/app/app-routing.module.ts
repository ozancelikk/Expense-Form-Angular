import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ILanguage } from 'src/assets/locales/ILanguage';
import { Languages } from 'src/assets/locales/languages';
import { AdminComponent } from './components/admin/admin.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginActivitiesComponent } from './components/login-activities/login-activities.component';
import { LoginComponent } from './components/login/login.component';
import { CustomerInformationsComponent } from './components/settings/customer-information/customer-informations.component';
import { LicenseConfigsComponent } from './components/settings/license-configs/license-configs.component';
import { MailConfigsComponent } from './components/settings/mail-configs/mail-configs.component';
import { SettingsComponent } from './components/settings/settings.component';
import { TimeStampConfigsComponent } from './components/settings/time-stamp-configs/time-stamp-configs.component';
import { AddUserComponent } from './components/settings/user/add-user/add-user.component';
import { ChangePasswordComponent } from './components/settings/user/change-password/change-password.component';
import { UpdateUserComponent } from './components/settings/user/update-user/update-user.component';
import { UserComponent } from './components/settings/user/user.component';
import { SystemLogsComponent } from './components/system-logs/system-logs.component';
import { VouncherComponent } from './components/vouncher/vouncher.component';
import { ReceiptComponent } from './components/receipt/receipt.component';
import { VouncheraddComponent } from './components/vouncheradd/vouncheradd.component';
import { LoginGuard } from './guards/login.guard';
import { ReceiptAddComponent } from './components/receipt/receiptAdd/receipt-add/receipt-add.component';
import { EmployeeComponent } from './components/settings/employee/employee.component';
import { AddEmployeeComponent } from './components/settings/employee/add-employee/add-employee.component';
import { EmployeeLoginComponent } from './components/employee-login/employee-login.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { EmployeeLoginGuard } from './guards/employee-login.guard';
import { ExpenceComponent } from './components/expence/expence.component';
import { ExpenceAddComponent } from './components/expence/expence-add/expence-add.component';
import { UpdateEmployeeComponent } from './components/settings/employee/update-employee/update-employee.component';
import { EmployeeSettingsComponent } from './components/employee-settings/employee-settings.component';
import { ProfileComponent } from './components/employee-settings/profile/profile.component';
import { PaymentComponent } from './components/payment/payment.component';
import { PaymentAddComponent } from './components/payment/payment-add/payment-add.component';
import { VouncherDetailComponent } from './components/vouncher/vouncher-detail/vouncher-detail.component';
import { EmployeeChangePasswordComponent } from './components/settings/employee/employee-change-password/employee-change-password.component';
import { UpdateVouncherComponent } from './components/vouncher/update-vouncher/update-vouncher.component';
import { ReceiptDetailComponent } from './components/receipt/receipt-detail/receipt-detail.component';



var lang:ILanguage = Languages.lngs.get(localStorage.getItem("lng"));

if (lang == undefined) {
  localStorage.setItem("lng","tr")
  lang = Languages.lngs.get(localStorage.getItem("lng"));
}

const routes: Routes = [
  {path:"",pathMatch:"full",component:LoginComponent, data:{breadcrumb: "Oriana"},canActivate:[LoginGuard]},
    {path:"login",component:LoginComponent, data:{breadcrumb: lang.login}},
    {path:"employee-login",component:EmployeeLoginComponent, data:{breadcrumb: lang.login}},
    {path:"forgot-password",component:ForgotPasswordComponent, data:{breadcrumb: lang.forgotPassword}},
    {path:"admin",component:AdminComponent, data:{breadcrumb: "Admin",},children:[
      {path:"",pathMatch:"full",component:VouncherComponent, data:{breadcrumb: lang.useddevices},canActivate:[LoginGuard]},
      {path:"vouncher",component:VouncherComponent, data:{breadcrumb: lang.vouncher},canActivate:[LoginGuard]},
      {path:"vouncher-add",component:VouncheraddComponent,data:{breadcrumb: lang.vouncheradd},canActivate:[LoginGuard]},
      {path:"vouncher-details/:id",component:VouncherDetailComponent,data:{breadcrumb: lang.vouncherDetail},canActivate:[LoginGuard]}, 
      {path:"vouncher-update/:id",component:UpdateVouncherComponent,canActivate:[LoginGuard]},     
      {path:"receipt",component:ReceiptComponent, data:{breadcrumb: lang.receipt},canActivate:[LoginGuard]},
      {path:"receipt-add",component:ReceiptAddComponent,data:{breadcrumb: lang.receiptadd},canActivate:[LoginGuard]},  
      {path:"receipt-details/:id",component:ReceiptDetailComponent,data:{breadcrumb: lang.receiptDetail},canActivate:[LoginGuard]},
      {path:"payment",component:PaymentComponent, data:{breadcrumb: lang.payment},canActivate:[LoginGuard]},
      {path:"payment-add",component:PaymentAddComponent, data:{breadcrumb: lang.paymentadd},canActivate:[LoginGuard]},
      {path:"settings",component:SettingsComponent, data:{breadcrumb: lang.settings},canActivate:[LoginGuard],children:[
        {path:"customer-informations",component:CustomerInformationsComponent, data:{breadcrumb: lang.newdevice},canActivate:[LoginGuard]}, 
        {path:"users",component:UserComponent, data:{breadcrumb: lang.newdevice},canActivate:[LoginGuard]}, 
        {path:"employees",component:EmployeeComponent, data:{breadcrumb: lang.newdevice},canActivate:[LoginGuard]},  

        {path:"add-new-user",component:AddUserComponent, data:{breadcrumb: lang.newdevice},canActivate:[LoginGuard]}, 
        {path:"add-new-employee",component:AddEmployeeComponent, data:{breadcrumb: lang.newdevice},canActivate:[LoginGuard]}, 
        {path:"update-user/:userId",component:UpdateUserComponent, data:{breadcrumb: lang.newdevice},canActivate:[LoginGuard]},
        {path:"update-employee/:employeeId",component:UpdateEmployeeComponent, data:{breadcrumb: lang.newdevice},canActivate:[LoginGuard]},   
        {path:"change-password/:userEmail",component:ChangePasswordComponent, data:{breadcrumb: lang.newdevice},canActivate:[LoginGuard]},
        {path:"license-configs",component:LicenseConfigsComponent, data:{breadcrumb: lang.newdevice},canActivate:[LoginGuard]}, 
        {path:"mail-configs",component:MailConfigsComponent, data:{breadcrumb: lang.newdevice},canActivate:[LoginGuard]},  
        {path:"time-stamp-configs",component:TimeStampConfigsComponent, data:{breadcrumb: lang.newdevice},canActivate:[LoginGuard]},  
      ]},

      {path:"expence",component:ExpenceComponent, data:{breadcrub: lang.expence},canActivate:[LoginGuard]},
      {path:"expence-add",component:ExpenceAddComponent, data:{breadcrub: lang.expence},canActivate:[LoginGuard]},
      {path:"system-logs",component:SystemLogsComponent, data:{breadcrumb: lang.systemlogs},canActivate:[LoginGuard]},
      {path:"login-activities",component:LoginActivitiesComponent, data:{breadcrumb: lang.loginactivities},canActivate:[LoginGuard]},
    ]},

    {path:"employee",component:EmployeesComponent, data:{breadcrumb: "Employee",},children:[
      {path:"",pathMatch:"full",component:VouncherComponent, data:{breadcrumb: lang.useddevices},canActivate:[EmployeeLoginGuard]},
      {path:"vouncher",component:VouncherComponent, data:{breadcrumb: lang.vouncher},canActivate:[EmployeeLoginGuard]},
      {path:"vouncher-add",component:VouncheraddComponent,canActivate:[EmployeeLoginGuard]},   
      {path:"vouncher-details/:id",component:VouncherDetailComponent,data:{breadcrumb: lang.vouncherDetail},canActivate:[LoginGuard]},
      {path:"vouncher-update/:id",component:UpdateVouncherComponent,canActivate:[EmployeeLoginGuard]},    
      {path:"receipt",component:ReceiptComponent, data:{breadcrumb: lang.receipt},canActivate:[EmployeeLoginGuard]},
      {path:"receipt-add",component:ReceiptAddComponent,canActivate:[EmployeeLoginGuard]},
      {path:"payment",component:PaymentComponent, data:{breadcrumb: lang.payment},canActivate:[EmployeeLoginGuard]},
      {path:"settings", component:EmployeeSettingsComponent,data:{breadcrumb:lang.settings},canActivate:[EmployeeLoginGuard],children:[
        {path:"customer-informations",component:CustomerInformationsComponent, data:{breadcrumb: lang.newdevice},canActivate:[LoginGuard]}, 
        {path:"employee-change-password",component:EmployeeChangePasswordComponent,canActivate:[EmployeeLoginGuard]},  
      ]}  
      
    ]},  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
